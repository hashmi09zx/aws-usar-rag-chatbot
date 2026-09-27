'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message, Source } from '@/types/chat';
import { Sparkles, User, Copy, Check, BookOpen, AlertCircle, RotateCcw } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onSelectSource?: (source: Source) => void;
  onRetry?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onSelectSource,
  onRetry,
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%]">
          <div className="bg-slate-900 text-white rounded-2xl rounded-tr-xs px-4 py-3 shadow-sm text-xs sm:text-sm leading-relaxed">
            {message.content}
          </div>
          <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-start gap-3 max-w-[95%] sm:max-w-[85%] w-full">
        {/* Assistant Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-xs shrink-0 mt-1">
          <Sparkles className="w-4.5 h-4.5" />
        </div>

        {/* Message Content Container */}
        <div className="flex-1 bg-white border border-slate-200/80 rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-2xs">
          {message.isError ? (
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-rose-700 bg-rose-50 p-3.5 rounded-xl border border-rose-200/80 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <div className="space-y-1">
                  <p className="font-semibold">Unable to reach the knowledge assistant.</p>
                  <p className="text-slate-600 text-xs">{message.content}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Please make sure the FastAPI server is running on <code className="bg-rose-100/60 px-1 py-0.5 rounded font-mono text-rose-800">http://127.0.0.1:8000</code>.
                  </p>
                </div>
              </div>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Request</span>
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Markdown Rendered Answer */}
              <div className="prose prose-slate prose-xs sm:prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-code:font-mono prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none text-slate-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>

              {/* Grounding Sources Info */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                {message.sources && message.sources.length > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                      Based on {message.sources.length} retrieved {message.sources.length === 1 ? 'source' : 'sources'}
                    </span>
                    <div className="flex items-center gap-1">
                      {message.sources.map((src, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSelectSource && onSelectSource(src)}
                          className="px-2 py-0.5 bg-orange-50 hover:bg-orange-100 border border-orange-200/80 text-orange-700 font-mono text-[10px] font-bold rounded-md transition-colors"
                          title={`Chunk ${src.chunk} from ${src.source || 'doc'}`}
                        >
                          [{idx + 1}]
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">
                    No sources were returned for this query.
                  </span>
                )}

                {/* Actions: Copy */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors text-xs flex items-center gap-1 ml-auto"
                  title="Copy response"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px] text-emerald-600 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
