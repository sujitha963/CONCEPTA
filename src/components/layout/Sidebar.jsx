import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Network,
  GraduationCap,
  FileQuestion,
  FileText,
  TrendingUp,
  User,
  HelpCircle,
  Sparkles,
  Flame,
  ChevronRight,
  X
} from 'lucide-react';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { currentView, navigate, primaryGapConcept } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'knowledge-map', label: 'Knowledge Map', icon: Network },
    { id: 'recommended-learning', label: 'Learning', icon: GraduationCap, badge: primaryGapConcept ? 'Gap Alert' : null },
    { id: 'diagnostic-quiz', label: 'Quiz Engine', icon: FileQuestion },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'progress', label: 'Weekly Progress', icon: TrendingUp },
    { id: 'profile', label: 'Profile & Badges', icon: User },
    { id: 'help', label: 'Help & FAQ', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              navigate('landing');
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              C
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-white tracking-wider">CONCEPTA</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono font-bold">v1.0</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Learn what you need next.</p>
            </div>
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
            aria-label="Close Mobile Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Primary Gap Banner Callout */}
        {primaryGapConcept && (
          <div className="mx-4 mt-4 p-3 rounded-xl bg-gradient-to-r from-rose-950/80 to-amber-950/80 border border-rose-700/50 shadow-inner">
            <div className="flex items-center justify-between text-xs text-rose-300 font-bold mb-1">
              <span className="flex items-center gap-1">
                <Flame size={14} className="text-rose-400" /> Primary Gap
              </span>
              <span className="bg-rose-500/20 text-rose-200 px-1.5 py-0.5 rounded text-[10px]">
                {primaryGapConcept.mastery}%
              </span>
            </div>
            <p className="text-xs font-semibold text-white truncate">{primaryGapConcept.name}</p>
            <button
              onClick={() => {
                navigate('gap-result');
                setMobileOpen(false);
              }}
              className="mt-2 w-full text-[11px] font-bold text-rose-200 bg-rose-900/50 hover:bg-rose-900/80 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 border border-rose-700/40 transition"
            >
              Repair Gap <ChevronRight size={12} />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-rose-500 text-white font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Hackathon Team Credits */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-400">
            <Sparkles size={12} className="text-amber-400" />
            <span>Team Cipher Mates</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Adaptive EdTech Hackathon Prototype</p>
        </div>
      </aside>
    </>
  );
}
