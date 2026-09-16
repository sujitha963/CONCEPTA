import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Coins, ShieldCheck, CheckCircle2, ShoppingBag, X } from 'lucide-react';

export default function StreakFreezeModal({ isOpen, onClose }) {
  const { user, buyStreakFreeze } = useApp();
  const [feedbackMsg, setFeedbackMsg] = useState('');

  if (!isOpen) return null;

  const handleBuy = () => {
    const success = buyStreakFreeze();
    if (success) {
      setFeedbackMsg('Streak Freeze purchased successfully! 🎉');
      setTimeout(() => setFeedbackMsg(''), 3000);
    } else {
      setFeedbackMsg('Not enough Concept Coins! You need 100 coins.');
      setTimeout(() => setFeedbackMsg(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 relative overflow-hidden">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Streak Protection & Shop</h3>
              <p className="text-[11px] text-slate-500 font-medium">Protect your learning streak</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        {feedbackMsg && (
          <div className={`mb-4 p-3 rounded-xl text-xs font-bold text-center ${
            feedbackMsg.includes('successfully') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            {feedbackMsg}
          </div>
        )}

        {/* Current Inventory Box */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 rounded-2xl mb-6 shadow-md border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-300">Streak Inventory</span>
            <h4 className="text-xl font-extrabold mt-0.5">{user.streakFreezes || 0} Freezes Available</h4>
            <p className="text-[11px] text-slate-300 mt-1">
              Active Streak: <strong className="text-rose-400">{user.masteryStreak} Days 🔥</strong>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center justify-center font-black">
            <Flame size={26} className="fill-rose-400 text-rose-400" />
          </div>
        </div>

        {/* Explanation Card */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 mb-6">
          <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-indigo-600" /> How Streak Freeze Works
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            If you miss a single calendar study day (e.g. 23-day streak ➔ missed 1 day), Concepta automatically consumes 1 Streak Freeze so your streak remains <strong>23 days</strong> uninterrupted!
          </p>
        </div>

        {/* Shop Action */}
        <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-2xl flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold text-amber-900">Buy 1 Streak Freeze</p>
            <p className="text-[11px] text-amber-700 flex items-center gap-1 font-semibold mt-0.5">
              Price: <Coins size={14} className="fill-amber-400 text-amber-500" /> 100 Concept Coins
            </p>
          </div>

          <button
            onClick={handleBuy}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5 shrink-0"
          >
            <ShoppingBag size={14} /> Buy Freeze
          </button>
        </div>

        <div className="mt-5 text-center">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
