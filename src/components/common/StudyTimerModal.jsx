import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TIMER_PRESETS } from '../../data/initialData';
import { Clock, Play, Pause, RotateCcw, CheckCircle2, Coins, Sparkles, X, FastForward } from 'lucide-react';

export default function StudyTimerModal({ isOpen, onClose }) {
  const { completeTimerSession } = useApp();
  const [selectedPreset, setSelectedPreset] = useState(TIMER_PRESETS[1]); // 25 min default
  const [timeLeft, setTimeLeft] = useState(selectedPreset.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setTimeLeft(selectedPreset.minutes * 60);
    setIsRunning(false);
    setIsCompleted(false);
  }, [selectedPreset]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setIsCompleted(true);
      completeTimerSession(selectedPreset.minutes, selectedPreset.coinReward);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, selectedPreset, completeTimerSession]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = Math.round(
    ((selectedPreset.minutes * 60 - timeLeft) / (selectedPreset.minutes * 60)) * 100
  );

  const handleFastForwardDemo = () => {
    setTimeLeft(3); // 3 seconds remaining for quick testing
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 relative overflow-hidden">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Smart Study Timer</h3>
              <p className="text-[11px] text-slate-500 font-medium">Focus session with rewarded coins</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        {!isCompleted ? (
          <div className="space-y-6 text-center">
            {/* Preset Selector Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {TIMER_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset)}
                  className={`p-3 rounded-2xl border text-xs font-extrabold transition flex flex-col items-center gap-1 ${
                    selectedPreset.id === preset.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{preset.minutes} Mins</span>
                  <span className={`text-[10px] ${selectedPreset.id === preset.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                    +{preset.coinReward} Coins
                  </span>
                </button>
              ))}
            </div>

            {/* Countdown Circular Display */}
            <div className="relative w-52 h-52 mx-auto flex items-center justify-center my-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-100 fill-none"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-indigo-600 fill-none transition-all duration-1000 ease-linear"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * progressPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900 tracking-tight font-mono">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-extrabold uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full mt-1">
                  {selectedPreset.tag}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setTimeLeft(selectedPreset.minutes * 60);
                  setIsRunning(false);
                }}
                className="p-3 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl transition"
                title="Reset Timer"
              >
                <RotateCcw size={18} />
              </button>

              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition"
              >
                {isRunning ? <Pause size={18} /> : <Play size={18} />}
                <span>{isRunning ? 'Pause Focus' : 'Start Focus Session'}</span>
              </button>

              <button
                onClick={handleFastForwardDemo}
                className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl transition"
                title="Demo: Fast Forward to End"
              >
                <FastForward size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* Completion Reward Screen */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Focus Session Completed! 🎉
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Awesome focus, Alex!
              </h2>
              <p className="text-xs text-slate-600 max-w-xs mx-auto mt-1 leading-relaxed">
                You completed <strong>{selectedPreset.minutes} minutes</strong> of deep study time.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-5 py-2.5 rounded-2xl text-xs font-extrabold shadow-xs">
              <Coins size={18} className="fill-amber-400 text-amber-500" />
              <span>+{selectedPreset.coinReward} Concept Coins Earned!</span>
            </div>

            <div>
              <button
                onClick={() => {
                  setIsCompleted(false);
                  onClose();
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-md transition"
              >
                Claim Reward & Continue Learning
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
