'use client';

import React from 'react';
import { ArrowRight, HelpCircle, Calendar, BookOpen, Users } from 'lucide-react';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const SUGGESTIONS = [
  {
    icon: HelpCircle,
    question: 'What is AWS Cloud Club GGSIPU?',
    tag: 'Overview',
  },
  {
    icon: Users,
    question: 'What does the club do?',
    tag: 'Activities',
  },
  {
    icon: Calendar,
    question: 'What events has the club organized?',
    tag: 'Events',
  },
  {
    icon: BookOpen,
    question: 'What can students learn through the club?',
    tag: 'Learning',
  },
];

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mt-4">
      {SUGGESTIONS.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={() => onSelect(item.question)}
            className="text-left p-4 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-orange-500/40 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-md group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60">
                {item.tag}
              </span>
              <Icon className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800 group-hover:text-slate-900 leading-snug">
              {item.question}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-orange-600 font-medium mt-3 transition-colors">
              <span>Ask question</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        );
      })}
    </div>
  );
};
