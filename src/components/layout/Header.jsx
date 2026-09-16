import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import StudyTimerModal from '../common/StudyTimerModal';
import StreakFreezeModal from '../common/StreakFreezeModal';
import {
  Search,
  Bell,
  Coins,
  Flame,
  User,
  RotateCcw,
  Clock,
  ChevronDown,
  Sparkles,
  HelpCircle,
  X,
  ShieldCheck
} from 'lucide-react';

export default function Header({ toggleMobileSidebar }) {
  const { user, navigate, resetDemoData } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      title: 'Primary Gap Identified',
      message: 'Sliding Window is currently your lowest concept (28%). Start recommended learning!',
      time: '10m ago'
    },
    {
      id: 2,
      title: '+20 Concept Coins Earned',
      message: 'Completed Data Structures Diagnostic Quiz.',
      time: '1h ago'
    },
    {
      id: 3,
      title: 'Streak Freeze Available',
      message: 'You have 1 Streak Freeze in your inventory to protect your 5-day streak!',
      time: '3h ago'
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('notes');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 lg:px-8 py-3 transition-all">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          
          {/* Left Side: Mobile Menu & Search */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={toggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle Navigation Sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative w-full hidden sm:block">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search concepts, topics, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/80 border border-slate-200 focus:border-indigo-500 focus:bg-white text-xs md:text-sm rounded-xl pl-10 pr-4 py-2 outline-none transition text-slate-800"
              />
            </form>
          </div>

          {/* Right Side: Badges, Timer & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Smart Study Timer Trigger */}
            <button
              onClick={() => setShowTimerModal(true)}
              className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-full text-xs font-extrabold shadow-xs transition"
              title="Launch Smart Focus Study Timer"
            >
              <Clock size={15} className="text-indigo-600 animate-pulse" />
              <span className="hidden md:inline">Focus Timer</span>
            </button>

            {/* Concept Coins Shop Pill */}
            <button
              onClick={() => setShowFreezeModal(true)}
              className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs hover:bg-amber-100 transition"
              title="Click to open Streak Shop & Coins"
            >
              <Coins size={16} className="text-amber-500 fill-amber-400" />
              <span>{user.conceptCoins}</span>
              <span className="hidden lg:inline text-[10px] text-amber-700 font-medium uppercase tracking-wider">Coins</span>
            </button>

            {/* Mastery Streak & Freeze Pill */}
            <button
              onClick={() => setShowFreezeModal(true)}
              className="flex items-center gap-1.5 bg-rose-50 text-rose-900 border border-rose-200 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs hover:bg-rose-100 transition"
              title="Click to view Streak Protection & Inventory"
            >
              <Flame size={16} className="text-rose-500 fill-rose-500 animate-bounce" />
              <span>{user.masteryStreak}</span>
              <span className="hidden lg:inline text-[10px] text-rose-700 font-medium uppercase tracking-wider">Days</span>
              {user.streakFreezes > 0 && (
                <span className="text-[10px] bg-indigo-600 text-white font-extrabold px-1.5 rounded-full ml-0.5">
                  ❄️ {user.streakFreezes}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <Sparkles size={16} className="text-indigo-600" /> Notifications
                    </h4>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-3 px-1 hover:bg-slate-50 rounded-lg transition">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-xs text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('gap-result');
                      }}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      View Knowledge Gap Result →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{user.name.split(' ')[0]}</p>
                  <p className="text-[10px] text-slate-500 font-medium">Student</p>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('profile');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User size={15} className="text-slate-400" /> Profile & Badges
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowFreezeModal(true);
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ShieldCheck size={15} className="text-indigo-500" /> Streak Freeze Shop
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('help');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <HelpCircle size={15} className="text-slate-400" /> Help & FAQ
                  </button>

                  <div className="my-1 border-t border-slate-100"></div>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (confirm("Reset demo data back to baseline state for Alex?")) {
                        resetDemoData();
                      }
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <RotateCcw size={15} className="text-rose-500" /> Reset Demo State
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Modals */}
      <StudyTimerModal isOpen={showTimerModal} onClose={() => setShowTimerModal(false)} />
      <StreakFreezeModal isOpen={showFreezeModal} onClose={() => setShowFreezeModal(false)} />
    </>
  );
}
