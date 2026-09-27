'use client';

import React from 'react';
import { ConnectionStatusType } from '@/types/chat';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface ConnectionStatusProps {
  status: ConnectionStatusType;
  onRefresh: () => void;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status, onRefresh }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${
          status === 'connected'
            ? 'bg-emerald-50 border-emerald-200/80 text-emerald-700'
            : status === 'offline'
            ? 'bg-rose-50 border-rose-200/80 text-rose-700'
            : 'bg-amber-50 border-amber-200/80 text-amber-700'
        }`}
        title={`FastAPI Backend at ${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}`}
      >
        <span className="relative flex h-2 w-2">
          {status === 'connected' && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              status === 'connected'
                ? 'bg-emerald-500'
                : status === 'offline'
                ? 'bg-rose-500'
                : 'bg-amber-500 animate-pulse'
            }`}
          ></span>
        </span>
        <span className="flex items-center gap-1.5">
          {status === 'connected' ? (
            <>
              <Wifi className="w-3 h-3 text-emerald-600" />
              <span>API Connected</span>
            </>
          ) : status === 'offline' ? (
            <>
              <WifiOff className="w-3 h-3 text-rose-600" />
              <span>API Offline</span>
            </>
          ) : (
            <span>Checking API...</span>
          )}
        </span>
      </div>

      <button
        onClick={onRefresh}
        aria-label="Recheck API connection"
        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        title="Check server status"
      >
        <RefreshCw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
