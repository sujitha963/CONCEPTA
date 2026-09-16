import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FlowBanner from '../components/layout/FlowBanner';
import { FileText, Search, CheckCircle2, BookOpen, Tag, Clock, ArrowRight, X, AlertCircle, RefreshCw } from 'lucide-react';

export default function NotesPage() {
  const { notes, markNoteComplete, navigate } = useApp();
  const [search, setSearch] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');
  const [selectedNote, setSelectedNote] = useState(null);

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.concept.toLowerCase().includes(search.toLowerCase()) ||
      n.subjectName.toLowerCase().includes(search.toLowerCase());

    const matchesSubj = activeSubject === 'All' || n.subjectName === activeSubject;

    return matchesSearch && matchesSubj;
  });

  return (
    <div className="space-y-6 pb-12">
      <FlowBanner />

      {/* Header & Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Structured Repository
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Subject Notes & Cheat Sheets
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Search, view, and mark concept notes as completed.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes or concepts (e.g. Sliding Window)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none transition text-slate-800"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto">
          {['All', 'Data Structures', 'Algorithms', 'Database Management'].map((subj) => (
            <button
              key={subj}
              onClick={() => setActiveSubject(subj)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${
                activeSubject === subj
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid vs Empty State */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`bg-white rounded-3xl border p-6 shadow-sm flex flex-col justify-between transition hover:shadow-md ${
                note.completed ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                    {note.concept}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {note.readTime}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 mb-2">{note.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium mb-4">
                  {note.content.replace(/[`#]/g, '')}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => markNoteComplete(note.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition ${
                    note.completed
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <CheckCircle2 size={14} className={note.completed ? 'text-emerald-600' : 'text-slate-400'} />
                  <span>{note.completed ? 'Completed ✓' : 'Mark Complete'}</span>
                </button>

                <button
                  onClick={() => setSelectedNote(note)}
                  className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  Read Full Note <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">No matching notes found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We couldn't find any cheat sheets matching "<strong>{search}</strong>". Try searching for "Sliding Window", "Arrays", or clear your filter.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setActiveSubject('All');
            }}
            className="bg-indigo-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition inline-flex items-center gap-1.5"
          >
            <RefreshCw size={14} /> Clear Search & Filters
          </button>
        </div>
      )}

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-md">
                  {selectedNote.concept}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 mt-1">{selectedNote.title}</h3>
              </div>
              <button onClick={() => setSelectedNote(null)} className="p-2 text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm text-slate-800 leading-relaxed bg-white">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {selectedNote.content}
                </pre>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => {
                  markNoteComplete(selectedNote.id);
                  setSelectedNote(null);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5"
              >
                <CheckCircle2 size={16} /> Mark as Completed
              </button>
              <button
                onClick={() => setSelectedNote(null)}
                className="bg-white border border-slate-300 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
