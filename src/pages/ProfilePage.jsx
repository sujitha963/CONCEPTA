import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import AchievementsView from '../components/common/AchievementsView';
import StreakFreezeModal from '../components/common/StreakFreezeModal';
import {
  User,
  Mail,
  GraduationCap,
  Target,
  Flame,
  Coins,
  RotateCcw,
  CheckCircle2,
  Edit2,
  Save,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUserProfile, resetDemoData, concepts, quizHistory } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [showFreezeModal, setShowFreezeModal] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [goal, setGoal] = useState(user.learningGoal);
  const [target, setTarget] = useState(user.dailyTargetMinutes);

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      learningGoal: goal,
      dailyTargetMinutes: Number(target)
    });
    setIsEditing(false);
  };

  const masteredCount = concepts.filter(c => c.status === 'Mastered').length;

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
                <span className="text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-md">
                  Student
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFreezeModal(true)}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
            >
              <ShieldCheck size={14} /> Streak Shop
            </button>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
              >
                <Edit2 size={14} /> Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <Save size={14} /> Save Changes
              </button>
            )}

            <button
              onClick={() => {
                if (confirm('Reset demo state back to initial Alex baseline?')) {
                  resetDemoData();
                }
              }}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
            >
              <RotateCcw size={14} /> Reset Demo State
            </button>
          </div>
        </div>

        {/* Form & Academic Info */}
        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Academic Status</span>
              <p className="font-extrabold text-slate-900 text-sm">
                {user.studyType} • {user.collegeDetails?.degree || 'School'} ({user.collegeDetails?.year || '12th'})
              </p>
              <p className="text-slate-500">{user.collegeDetails?.department || 'Computer Science'}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Primary Goal</span>
              <p className="font-extrabold text-slate-900 text-sm">{user.learningGoal}</p>
              <p className="text-slate-500">Focus Subject: Data Structures</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Daily Study Target</span>
              <p className="font-extrabold text-slate-900 text-sm">{user.dailyTargetMinutes} Minutes / Day</p>
              <p className="text-emerald-600 font-bold">{user.dailyTargetCompletedMinutes} mins completed today</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Learning Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold outline-none focus:border-indigo-500"
              >
                <option>Exam Preparation</option>
                <option>Concept Understanding</option>
                <option>Interview Preparation</option>
                <option>Competitive Programming</option>
                <option>General Learning</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Daily Target (Mins)</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold outline-none focus:border-indigo-500"
              />
            </div>
          </form>
        )}
      </div>

      {/* Lifetime Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-[10px] font-extrabold uppercase text-slate-400">Total Coins</p>
          <h3 className="text-2xl font-black text-amber-500 mt-1">{user.conceptCoins}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-[10px] font-extrabold uppercase text-slate-400">Streak</p>
          <h3 className="text-2xl font-black text-rose-500 mt-1">{user.masteryStreak} Days</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-[10px] font-extrabold uppercase text-slate-400">Mastered Concepts</p>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">{masteredCount} / {concepts.length}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-[10px] font-extrabold uppercase text-slate-400">Streak Freezes</p>
          <h3 className="text-2xl font-black text-indigo-600 mt-1">{user.streakFreezes || 1}</h3>
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <AchievementsView />

      <StreakFreezeModal isOpen={showFreezeModal} onClose={() => setShowFreezeModal(false)} />
    </div>
  );
}
