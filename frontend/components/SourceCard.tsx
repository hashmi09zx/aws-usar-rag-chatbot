'use client';

import React from 'react';
import { Source } from '@/types/chat';
import { FileText, ExternalLink, Hash } from 'lucide-react';

interface SourceCardProps {
  source: Source;
  index: number;
  onSelectSource: (source: Source) => void;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, index, onSelectSource }) => {
  // Format clean file name from path e.g. "data/AWSinformation.pdf" or "data\AWSinformation.pdf" -> "AWSinformation.pdf"
  const fileName = source.source
    ? source.source.split(/[/\\]/).pop() || source.source
    : 'Document Source';

  return (
    <div
      onClick={() => onSelectSource(source)}
      className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-orange-500/40 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer group flex flex-col gap-2.5"
    >
      {/* Card Header: File Name & Chunk Tag */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-600 shrink-0">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-slate-800 truncate group-hover:text-orange-600 transition-colors">
            {fileName}
          </span>
        </div>

        {source.chunk !== null && source.chunk !== undefined && (
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 flex items-center gap-0.5 shrink-0">
            <Hash className="w-2.5 h-2.5" />
            Chunk {source.chunk}
          </span>
        )}
      </div>

      {/* Snippet Excerpt */}
      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        "{source.text}"
      </p>

      {/* Card Footer: Interaction hint */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 group-hover:text-orange-600 pt-1 border-t border-slate-100 transition-colors">
        <span className="font-medium">Source {index + 1}</span>
        <span className="flex items-center gap-1 font-semibold">
          View source
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};
