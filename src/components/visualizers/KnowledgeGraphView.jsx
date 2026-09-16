import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Network, CheckCircle2, AlertTriangle, Flame, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function KnowledgeGraphView() {
  const { concepts, navigate } = useApp();
  const [selectedConcept, setSelectedConcept] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Mastered':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          badge: 'bg-emerald-500 text-white',
          ring: 'border-emerald-500',
          dot: 'bg-emerald-500'
        };
      case 'Developing':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          badge: 'bg-amber-500 text-white',
          ring: 'border-amber-500',
          dot: 'bg-amber-500'
        };
      default:
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          badge: 'bg-rose-600 text-white',
          ring: 'border-rose-500',
          dot: 'bg-rose-500'
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
        <div>
          <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Network className="text-indigo-600" size={20} /> Data Structures Concept Dependency Map
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive visual network map showing mastery levels and key prerequisite relationships.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Mastered (≥80%)
          </span>
          <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Developing (50-79%)
          </span>
          <span className="flex items-center gap-1.5 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Needs Attention (&lt;50%)
          </span>
        </div>
      </div>

      {/* Graphical Concept Grid Nodes */}
      <div className="relative bg-slate-900 rounded-2xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between overflow-hidden shadow-inner border border-slate-800">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#818cf8 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {concepts.map((concept) => {
            const styles = getStatusColor(concept.status);
            const isPrimary = concept.isPrimaryGap;

            return (
              <div
                key={concept.id}
                onClick={() => setSelectedConcept(concept)}
                className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 relative border ${
                  isPrimary
                    ? 'bg-gradient-to-b from-rose-950/90 to-slate-900 border-rose-500 shadow-xl shadow-rose-950/80 ring-2 ring-rose-500/60 animate-pulse-subtle scale-[1.02]'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600 shadow-md'
                }`}
              >
                {/* Primary Knowledge Gap Flag Badge */}
                {isPrimary && (
                  <div className="absolute -top-3 left-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-rose-400/50">
                    <Flame size={12} className="fill-white" /> Primary Knowledge Gap
                  </div>
                )}

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-extrabold text-base text-white">{concept.name}</h4>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Data Structures</span>
                  </div>

                  {/* Percentage Score Circle */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center text-center shadow-inner">
                    <span
                      className={`text-sm font-extrabold ${
                        concept.mastery >= 80
                          ? 'text-emerald-400'
                          : concept.mastery >= 50
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {concept.mastery}%
                    </span>
                  </div>
                </div>

                {/* Subtopics chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {concept.subtopics?.map((sub, i) => (
                    <span key={i} className="text-[10px] bg-slate-900/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Status Bar & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-xs">
                  <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${styles.badge}`}>
                    {concept.status}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (concept.isPrimaryGap) {
                        navigate('gap-result');
                      } else {
                        navigate('recommended-learning');
                      }
                    }}
                    className="text-[11px] font-bold text-indigo-300 hover:text-white flex items-center gap-1 transition"
                  >
                    {concept.isPrimaryGap ? 'Repair Gap' : 'Study Notes'} <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Concept Modal/Detail Drawer */}
      {selectedConcept && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900">{selectedConcept.name}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                {selectedConcept.mastery}% Mastery
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">{selectedConcept.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSelectedConcept(null)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (selectedConcept.isPrimaryGap) navigate('gap-result');
                else navigate('recommended-learning');
              }}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-xs"
            >
              Learn Concept
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
