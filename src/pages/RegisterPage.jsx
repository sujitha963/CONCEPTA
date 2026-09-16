import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const { registerUser, navigate } = useApp();
  const [email, setEmail] = useState('alex.johnson@ciphermates.dev');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    registerUser(email, password);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-600/30">
            C
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Create your Concepta Account</h2>
          <p className="text-xs text-slate-500 mt-1">Start your student-first adaptive learning journey</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-xs md:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-xs md:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <ShieldCheck size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-xs md:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs md:text-sm py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 mt-2"
          >
            Create Account & Continue <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button
            onClick={() => navigate('dashboard')}
            className="font-extrabold text-indigo-600 hover:underline"
          >
            Log In Directly
          </button>
        </div>
      </div>
    </div>
  );
}
