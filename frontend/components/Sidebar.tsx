'use client';

import React from 'react';
import { RecentQuery } from '@/types/chat';
import { Plus, MessageSquare, Trash2, X, Clock, Sparkles } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  recentQueries: RecentQuery[];
  onSelectQuery: (query: string) => void;
  onClearHistory: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onNewChat,
  recentQueries,
  onSelectQuery,
  onClearHistory,
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 w-72 bg-slate-50 border-r border-slate-200/80 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header & New Chat Button */}
        <div className="p-4 border-b border-slate-200/60 flex flex-col gap-3">
          <div className="flex items-center justify-between lg:hidden">
            <span className="font-semibold text-xs uppercase tracking-wider text-slate-500">
              Navigation
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] group"
          >
            <Plus className="w-4 h-4 text-orange-400 group-hover:rotate-90 transition-transform duration-200" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Recent Queries List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Recent Queries
              </span>
              {recentQueries.length > 0 && (
                <button
                  onClick={onClearHistory}
                  title="Clear query history"
                  className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>

            {recentQueries.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl my-2">
                <MessageSquare className="w-5 h-5 mx-auto mb-2 text-slate-300" />
                No recent queries yet.
                <p className="mt-1 text-[11px] text-slate-400">Ask a question to save it here.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {recentQueries.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      onSelectQuery(q.question);
                      onClose();
                    }}
                    className="w-full text-left px-3 py-2.5 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors flex items-start gap-2.5 truncate group"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 shrink-0 mt-0.5" />
                    <span className="truncate">{q.question}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Prompt guide hint */}
          <div className="p-3 bg-orange-500/5 border border-orange-500/15 rounded-xl text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-orange-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Search</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Queries retrieve vector-indexed document chunks from Pinecone and synthesize answers using Gemini.
            </p>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200/60 text-center">
          <p className="text-xs font-semibold text-slate-700">AWS Cloud Club USAR</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Knowledge Assistant • v1.0</p>
        </div>
      </aside>
    </>
  );
};
