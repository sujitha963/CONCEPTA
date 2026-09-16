import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Flame, Award, Zap, BookOpen, Lock, CheckCircle2, Coins, Sparkles } from 'lucide-react';

export default function AchievementsView() {
  const { achievements } = useApp();

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'Trophy': return Trophy;
      case 'Flame': return Flame;
      case 'Award': return Award;
      case 'Zap': return Zap;
      default: return BookOpen;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Sparkles size={14} className="text-amber-500" /> Gamification Badges
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Student Achievements & Milestones
          </h2>
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Unlocked: <strong className="text-indigo-600 font-bold">{achievements.filter(a => a.unlocked).length}</strong> / {achievements.length} Badges
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((item) => {
          const Icon = getBadgeIcon(item.icon);
          const isUnlocked = item.unlocked;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all duration-300 relative ${
                isUnlocked
                  ? 'bg-gradient-to-b from-amber-50/50 via-white to-white border-amber-300 shadow-md ring-1 ring-amber-400/30'
                  : 'bg-slate-50/60 border-slate-200 opacity-80'
              }`}
            >
              {isUnlocked && (
                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <CheckCircle2 size={10} /> Unlocked
                </span>
              )}

              <div className="flex items-start gap-3.5 mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isUnlocked
                      ? 'bg-amber-100 text-amber-700 border-amber-300 shadow-inner'
                      : 'bg-slate-200 text-slate-400 border-slate-300'
                  }`}
                >
                  {isUnlocked ? <Icon size={24} /> : <Lock size={20} />}
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">{item.category}</span>
                  <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Progress & Reward info */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
                  <Coins size={14} className="fill-amber-400 text-amber-500" /> +{item.rewardCoins} Coins
                </span>

                {!isUnlocked ? (
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${item.progress}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">{item.progress}%</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-400 font-medium">Unlocked {item.unlockedAt || 'Recently'}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
