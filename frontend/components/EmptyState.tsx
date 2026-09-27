'use client';

import React from 'react';
import { SuggestedQuestions } from './SuggestedQuestions';

interface EmptyStateProps {
  onSelectPrompt: (question: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectPrompt }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto my-auto py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
        AWS-USAR Knowledge Assistant
      </h1>

      <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed mb-8">
        Ask questions about AWS Cloud Club USAR, its activities, events, programs, and information available in the knowledge base.
      </p>

      <div className="w-full">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Suggested Prompts
        </h2>
        <SuggestedQuestions onSelect={onSelectPrompt} />
      </div>
    </div>
  );
};
