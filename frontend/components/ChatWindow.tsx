'use client';

import React, { useEffect, useRef } from 'react';
import { Message, Source } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { EmptyState } from './EmptyState';
import { Sparkles, Loader2 } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSelectPrompt: (prompt: string) => void;
  onSelectSource: (source: Source) => void;
  onRetry: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  onSelectPrompt,
  onSelectSource,
  onRetry,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return <EmptyState onSelectPrompt={onSelectPrompt} />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
      <div className="max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onSelectSource={onSelectSource}
            onRetry={onRetry}
          />
        ))}

        {/* Loading Indicator State */}
        {isLoading && (
          <div className="flex justify-start mb-6 animate-in fade-in duration-200">
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-xs shrink-0 mt-1">
                <Sparkles className="w-4.5 h-4.5 animate-spin" />
              </div>
              <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-xs px-5 py-4 shadow-2xs flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-slate-700">
                    Searching knowledge base & generating answer...
                  </span>
                  <div className="flex gap-1 items-center ml-1">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};
