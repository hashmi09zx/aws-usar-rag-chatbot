'use client';

import React from 'react';
import { ConnectionStatusType } from '@/types/chat';
import { ConnectionStatus } from './ConnectionStatus';
import { Menu, BookOpen, Layers } from 'lucide-react';

interface HeaderProps {
  connectionStatus: ConnectionStatusType;
  onRefreshHealth: () => void;
  topK: number;
  onTopKChange: (val: number) => void;
  onToggleSidebar: () => void;
  onToggleSources: () => void;
  sourcesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  connectionStatus,
  onRefreshHealth,
  topK,
  onTopKChange,
  onToggleSidebar,
  onToggleSources,
  sourcesCount,
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: AWS Mark & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle navigation sidebar"
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          {/* AWS Inspired Brand Icon */}
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 opacity-90"></div>
            <svg
              className="w-5 h-5 text-white relative z-10 transform group-hover:scale-105 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight text-base">
                AWS-USAR
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-orange-500/10 text-orange-600 border border-orange-500/20 rounded-md">
                RAG
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Knowledge Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Right: Controls & Connection Status */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Top-K Selector Control */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1 text-xs">
          <Layers className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
          <span className="text-slate-600 font-medium hidden sm:inline">Sources:</span>
          <select
            value={topK}
            onChange={(e) => onTopKChange(Number(e.target.value))}
            className="bg-transparent text-slate-900 font-semibold focus:outline-hidden cursor-pointer"
            aria-label="Select number of retrieved sources"
          >
            <option value={1}>1</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
          </select>
        </div>

        {/* Real API Connection Status */}
        <ConnectionStatus status={connectionStatus} onRefresh={onRefreshHealth} />

        {/* Mobile Sources Drawer Toggle */}
        <button
          onClick={onToggleSources}
          aria-label="Toggle retrieved sources panel"
          className="lg:hidden relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          {sourcesCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {sourcesCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
