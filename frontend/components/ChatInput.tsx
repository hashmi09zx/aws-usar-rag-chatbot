'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Layers } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  topK: number;
  onTopKChange: (val: number) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  topK,
  onTopKChange,
}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [text]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-2xl border border-slate-300 shadow-md focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all duration-200 overflow-hidden"
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about AWS Cloud Club USAR..."
          disabled={isLoading}
          rows={1}
          className="w-full px-4 pt-3.5 pb-12 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent resize-none focus:outline-hidden leading-relaxed max-h-40 overflow-y-auto"
        />

        {/* Input Footer Bar inside box */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Top-K Quick Selector Badge */}
          <div className="pointer-events-auto flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200/60">
            <Layers className="w-3 h-3 text-slate-400" />
            <span className="font-medium text-[11px]">Sources:</span>
            <select
              value={topK}
              onChange={(e) => onTopKChange(Number(e.target.value))}
              disabled={isLoading}
              className="bg-transparent font-bold text-slate-800 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
            </select>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            aria-label="Send message"
            className="pointer-events-auto p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white disabled:text-slate-400 transition-all duration-200 shadow-xs active:scale-95 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
        <span>Press <kbd className="font-mono bg-slate-100 border border-slate-200 px-1 py-0.5 rounded text-slate-600">Enter</kbd> to send, <kbd className="font-mono bg-slate-100 border border-slate-200 px-1 py-0.5 rounded text-slate-600">Shift + Enter</kbd> for new line</span>
        <span className="hidden sm:inline">AWS-USAR RAG Chatbot</span>
      </div>
    </div>
  );
};
