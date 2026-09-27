'use client';

import React from 'react';
import { Source } from '@/types/chat';
import { SourceCard } from './SourceCard';
import { BookOpen, X, Info } from 'lucide-react';

interface SourcePanelProps {
  sources: Source[];
  onSelectSource: (source: Source) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const SourcePanel: React.FC<SourcePanelProps> = ({
  sources,
  onSelectSource,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:static top-0 right-0 bottom-0 w-80 sm:w-88 bg-slate-50 border-l border-slate-200/80 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Panel Header */}
        <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Retrieved Sources
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {sources.length > 0
                  ? `${sources.length} document ${sources.length === 1 ? 'chunk' : 'chunks'} retrieved`
                  : 'Vector Search Results'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close sources panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Panel Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sources.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                No Sources Available
              </h3>
              <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
                Ask a question to view the grounding document chunks retrieved by Pinecone.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-1">
                <span>Retrieved Context</span>
                <span className="text-orange-600 font-bold">{sources.length} active</span>
              </div>
              {sources.map((source, index) => (
                <SourceCard
                  key={index}
                  source={source}
                  index={index}
                  onSelectSource={onSelectSource}
                />
              ))}
            </div>
          )}
        </div>

        {/* Panel Footer */}
        <div className="p-3.5 border-t border-slate-200/80 bg-white text-center">
          <p className="text-[11px] text-slate-400">
            Grounding provided by <span className="font-semibold text-slate-600">Pinecone Vector DB</span>
          </p>
        </div>
      </aside>
    </>
  );
};
