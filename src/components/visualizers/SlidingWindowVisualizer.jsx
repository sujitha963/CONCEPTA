import React, { useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { SLIDING_WINDOW_LEARNING_CONTENT } from '../../data/initialData';

export default function SlidingWindowVisualizer() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = SLIDING_WINDOW_LEARNING_CONTENT.visualSteps;
  const activeStep = steps[currentStepIndex];

  React.useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 my-4">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Interactive Visualizer
            </span>
            <span className="text-xs font-semibold text-slate-500">Fixed Window Size K = 3</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Max Sum Subarray of Size 3
          </h3>
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
            title="Reset to Step 1"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
          <button
            disabled={currentStepIndex >= steps.length - 1}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
            }}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 rounded-xl transition"
            title="Next Step"
          >
            <SkipForward size={16} />
          </button>
        </div>
      </div>

      {/* Array Elements Visualization Grid */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl mb-6 shadow-inner relative overflow-hidden">
        <div className="text-center mb-2">
          <span className="text-xs font-mono text-indigo-300 font-semibold uppercase tracking-widest">
            Array Index & Element Visualization
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 my-6 flex-wrap">
          {activeStep.array.map((num, idx) => {
            const inWindow = idx >= activeStep.left && idx <= activeStep.right;
            const isLeftPointer = idx === activeStep.left;
            const isRightPointer = idx === activeStep.right;

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                {/* Pointer indicator above array */}
                <div className="h-5 text-[10px] font-mono font-bold flex items-center gap-1">
                  {isLeftPointer && <span className="bg-emerald-500 text-slate-950 px-1.5 rounded font-bold">L={idx}</span>}
                  {isRightPointer && <span className="bg-amber-400 text-slate-950 px-1.5 rounded font-bold">R={idx}</span>}
                </div>

                {/* Number Box */}
                <div
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-extrabold text-lg sm:text-xl transition-all duration-300 border-2 ${
                    inWindow
                      ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/40 scale-105'
                      : 'bg-slate-800 text-slate-400 border-slate-700 opacity-60'
                  }`}
                >
                  {num}
                </div>

                {/* Index label below */}
                <span className={`text-[10px] font-mono font-semibold ${inWindow ? 'text-indigo-300 font-bold' : 'text-slate-500'}`}>
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Live Calculation Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] uppercase font-bold text-slate-400">Current Window Sum</p>
            <p className="text-xl font-extrabold text-indigo-300 mt-0.5">{activeStep.currentSum}</p>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] uppercase font-bold text-slate-400">Overall Maximum Sum</p>
            <p className="text-xl font-extrabold text-emerald-400 mt-0.5">{activeStep.maxSum}</p>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] uppercase font-bold text-slate-400">Window Range</p>
            <p className="text-sm font-bold text-amber-300 mt-1">
              Indices [{activeStep.left} .. {activeStep.right}]
            </p>
          </div>
        </div>
      </div>

      {/* Step Explanation Card */}
      <div className="bg-indigo-50 border border-indigo-200/80 rounded-xl p-4 flex items-start gap-3">
        <div className="p-2 bg-indigo-600 text-white rounded-lg shrink-0 mt-0.5">
          <Info size={18} />
        </div>
        <div>
          <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">
            Step {activeStep.step} of {steps.length}
          </h4>
          <p className="text-sm font-medium text-slate-800 mt-1 leading-relaxed">
            {activeStep.explanation}
          </p>
        </div>
      </div>

      {/* Step Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {steps.map((s, index) => (
          <button
            key={index}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentStepIndex
                ? 'w-8 bg-indigo-600'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
            title={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
