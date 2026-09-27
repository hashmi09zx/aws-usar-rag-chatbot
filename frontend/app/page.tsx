'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Message, Source, ConnectionStatusType, RecentQuery } from '@/types/chat';
import { checkHealth, sendMessage } from '@/lib/api';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ChatWindow } from '@/components/ChatWindow';
import { ChatInput } from '@/components/ChatInput';
import { SourcePanel } from '@/components/SourcePanel';
import { SourceViewer } from '@/components/SourceViewer';

const LOCAL_STORAGE_KEY = 'aws_usar_rag_recent_queries';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [topK, setTopK] = useState<number>(3);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatusType>('checking');
  const [recentQueries, setRecentQueries] = useState<RecentQuery[]>([]);
  
  // UI Drawers & Modals
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sourcesOpen, setSourcesOpen] = useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  // Health check handler
  const handleCheckHealth = useCallback(async () => {
    setConnectionStatus('checking');
    const isOnline = await checkHealth();
    setConnectionStatus(isOnline ? 'connected' : 'offline');
  }, []);

  // Check backend health on initial mount
  useEffect(() => {
    handleCheckHealth();
  }, [handleCheckHealth]);

  // Load recent queries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setRecentQueries(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load recent queries from localStorage:', e);
    }
  }, []);

  // Save query to localStorage
  const saveRecentQuery = (question: string, usedTopK: number) => {
    try {
      setRecentQueries((prev) => {
        // Filter out duplicate questions
        const filtered = prev.filter((q) => q.question.toLowerCase() !== question.toLowerCase());
        const updated: RecentQuery[] = [
          {
            id: Date.now().toString(),
            question,
            timestamp: new Date().toISOString(),
            top_k: usedTopK,
          },
          ...filtered,
        ].slice(0, 15); // keep latest 15

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error('Failed to save query to localStorage:', e);
    }
  };

  // Clear query history
  const handleClearHistory = () => {
    setRecentQueries([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
  };

  // Send message flow
  const handleSendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(question, topK);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setSources(response.sources || []);
      saveRecentQuery(question, topK);
      setConnectionStatus('connected');
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error?.message || 'Unable to connect to the knowledge assistant.',
        isError: true,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      setConnectionStatus('offline');
    } finally {
      setIsLoading(false);
    }
  };

  // New Chat handler
  const handleNewChat = () => {
    setMessages([]);
    setSources([]);
  };

  // Retry handler for failing requests
  const handleRetry = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      // Remove last error message if present
      setMessages((prev) => {
        if (prev[prev.length - 1]?.isError) {
          return prev.slice(0, prev.length - 1);
        }
        return prev;
      });
      handleSendMessage(lastUserMsg.content);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900">
      {/* Header */}
      <Header
        connectionStatus={connectionStatus}
        onRefreshHealth={handleCheckHealth}
        topK={topK}
        onTopKChange={setTopK}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onToggleSources={() => setSourcesOpen((prev) => !prev)}
        sourcesCount={sources.length}
      />

      {/* Main Layout: Sidebar | Chat Window | Sources Panel */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewChat={handleNewChat}
          recentQueries={recentQueries}
          onSelectQuery={(query) => handleSendMessage(query)}
          onClearHistory={handleClearHistory}
        />

        {/* Center Main Chat Column */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-white/60 relative">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSelectPrompt={(prompt) => handleSendMessage(prompt)}
            onSelectSource={(source) => setSelectedSource(source)}
            onRetry={handleRetry}
          />

          {/* Bottom Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            topK={topK}
            onTopKChange={setTopK}
          />
        </main>

        {/* Right Sources Panel */}
        <SourcePanel
          sources={sources}
          onSelectSource={(source) => setSelectedSource(source)}
          isOpen={sourcesOpen}
          onClose={() => setSourcesOpen(false)}
        />
      </div>

      {/* Full Source Viewer Modal */}
      <SourceViewer
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />
    </div>
  );
}
