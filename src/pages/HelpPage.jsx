import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import { FAQ_DATA } from '../data/initialData';
import { HelpCircle, ChevronDown, Sparkles, BookOpen, Flame, Coins, ShieldAlert } from 'lucide-react';

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Frequently Asked Questions
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            How Concepta Works
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Everything you need to know about concept-wise adaptive diagnostic analysis and mastery updates.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 max-w-3xl">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition ${
                  isOpen ? 'bg-indigo-50/50 border-indigo-300 shadow-xs' : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-3 text-sm font-extrabold text-slate-900"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle size={18} className={isOpen ? 'text-indigo-600' : 'text-slate-400'} />
                    {faq.q}
                  </span>
                  <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-700 leading-relaxed font-medium pt-1 border-t border-indigo-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Hackathon Credits Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center">
              C
            </div>
            <div>
              <h4 className="font-extrabold text-sm">CONCEPTA by Team Cipher Mates</h4>
              <p className="text-xs text-slate-400">Adaptive Learning EdTech Hackathon Project</p>
            </div>
          </div>

          <div className="text-xs text-indigo-300 font-semibold bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
            Learn what you need next.
          </div>
        </div>

      </div>
    </div>
  );
}
