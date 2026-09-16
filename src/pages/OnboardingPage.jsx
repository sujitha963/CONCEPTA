import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Calendar, Phone, GraduationCap, Target, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const { user, completeOnboarding } = useApp();

  const [fullName, setFullName] = useState(user.name || 'Alex Johnson');
  const [age, setAge] = useState(user.age || '21');
  const [dob, setDob] = useState(user.dob || '2003-05-14');
  const [mobile, setMobile] = useState(user.mobile || '+1 (555) 234-5678');
  const [studyType, setStudyType] = useState(user.studyType || 'College');

  // Conditional fields
  const [schoolClass, setSchoolClass] = useState(user.schoolDetails?.class || 'Class 12');
  const [schoolBoard, setSchoolBoard] = useState(user.schoolDetails?.board || 'CBSE');

  const [collegeDegree, setCollegeDegree] = useState(user.collegeDetails?.degree || 'B.Tech');
  const [collegeYear, setCollegeYear] = useState(user.collegeDetails?.year || '3rd Year');
  const [collegeDept, setCollegeDept] = useState(user.collegeDetails?.department || 'Computer Science & Engineering');

  const [selfInterest, setSelfInterest] = useState(user.selfLearnerDetails?.interest || 'Full Stack & DSA');

  const [learningGoal, setLearningGoal] = useState(user.learningGoal || 'Interview Preparation');
  const [dailyTarget, setDailyTarget] = useState(user.dailyTargetMinutes || 45);

  const handleSubmit = (e) => {
    e.preventDefault();

    const onboardingData = {
      name: fullName,
      age,
      dob,
      mobile,
      studyType,
      schoolDetails: { class: schoolClass, board: schoolBoard },
      collegeDetails: { degree: collegeDegree, year: collegeYear, department: collegeDept },
      selfLearnerDetails: { interest: selfInterest },
      learningGoal,
      dailyTargetMinutes: Number(dailyTarget)
    };

    completeOnboarding(onboardingData);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
        
        {/* Onboarding Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full mb-2">
            Student Setup Step 2 of 2
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Personalize Your Concepta Profile</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Help Concepta adapt diagnostic recommendations to your specific academic goals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Personal Info */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <User size={16} className="text-indigo-600" /> Basic Student Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-semibold focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="text"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-semibold focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                <input
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-semibold focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-semibold focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Current Study Type */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap size={16} className="text-indigo-600" /> Current Study Status
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {['School', 'College', 'Self Learner'].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setStudyType(type)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border transition ${
                    studyType === type
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Dynamic Fields based on Study Type */}
            {studyType === 'School' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class / Grade</label>
                  <input
                    type="text"
                    value={schoolClass}
                    onChange={(e) => setSchoolClass(e.target.value)}
                    placeholder="e.g. Class 11 or 12"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Education Board</label>
                  <input
                    type="text"
                    value={schoolBoard}
                    onChange={(e) => setSchoolBoard(e.target.value)}
                    placeholder="e.g. CBSE / ICSE / State Board"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
              </div>
            )}

            {studyType === 'College' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={collegeDegree}
                    onChange={(e) => setCollegeDegree(e.target.value)}
                    placeholder="e.g. B.Tech / B.Sc / BCA"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Year</label>
                  <select
                    value={collegeYear}
                    onChange={(e) => setCollegeYear(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department / Branch</label>
                  <input
                    type="text"
                    value={collegeDept}
                    onChange={(e) => setCollegeDept(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
              </div>
            )}

            {studyType === 'Self Learner' && (
              <div className="pt-2 border-t border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1">Learning Interest</label>
                <input
                  type="text"
                  value={selfInterest}
                  onChange={(e) => setSelfInterest(e.target.value)}
                  placeholder="e.g. Algorithms & Software Development"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none"
                />
              </div>
            )}
          </div>

          {/* Learning Goal & Daily Target */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Target size={16} className="text-indigo-600" /> Learning Goal & Daily Study Target
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Primary Goal</label>
              <select
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none"
              >
                <option>Exam Preparation</option>
                <option>Concept Understanding</option>
                <option>Interview Preparation</option>
                <option>Competitive Programming</option>
                <option>General Learning</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Daily Target Study Time</span>
                <span className="text-indigo-600 font-extrabold">{dailyTarget} Mins / Day</span>
              </label>
              <input
                type="range"
                min="15"
                max="120"
                step="15"
                value={dailyTarget}
                onChange={(e) => setDailyTarget(e.target.value)}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                <span>15m (Casual)</span>
                <span>45m (Recommended)</span>
                <span>120m (Intensive)</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs md:text-sm py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
          >
            Complete Onboarding & Launch Dashboard <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
