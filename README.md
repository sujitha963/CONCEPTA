# CONCEPTA — Learn what you need next.

> **Team Cipher Mates — Adaptive EdTech Hackathon Project**

Concepta is a student-first adaptive learning platform. Instead of only showing an overall quiz score (e.g. "65%"), Concepta identifies exactly which concepts the student understands and which concepts they struggle with.

---

## 🚀 Core Adaptive Flow

```
Registration ➔ Student Onboarding ➔ Dashboard ➔ Select Subject (Data Structures)
 ➔ Diagnostic Quiz ➔ Concept-wise Analysis ➔ Knowledge Map ➔ Identify Knowledge Gap
  ➔ Recommended Learning (Visualizer) ➔ Practice Quiz ➔ Reassessment (28% ➔ 81%) ➔ Updated Knowledge Map
```

---

## 🛠️ Tech Stack

- **React + Vite**
- **Tailwind CSS**
- **Lucide React Icons**
- **Recharts** (Visual analytics)
- **LocalStorage** (Demo persistence)

---

## 🏁 Quick Start Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open `http://localhost:3000` (or the URL printed in terminal) in your browser!

### 3. Production Build
```bash
npm run build
```

---

## 🏆 Key Features

- **Diagnostic Engine**: Calculates concept-wise accuracy (Arrays 90%, Strings 84%, Hashing 62%, Recursion 45%, Sliding Window 28%).
- **Primary Gap Isolation**: Highlights **Sliding Window** as primary knowledge gap.
- **Interactive Step Visualizer**: Step-by-step slider visualization for Sliding Window subarray calculations.
- **Targeted Reassessment**: Reassess weak concepts to upgrade mastery from **28% ➔ 81%**!
- **Gamification**: Meaningful Mastery Streak, Smart Focus Study Timer (15m, 25m, 45m), Daily Concept Goal, Concept Coins, Streak Freeze Shop, and Achievement Badges.
- **Weekly Learning Report**: Recharts analytics breakdown showing study minutes, concept accuracy shift, and recommended focus for next week.
- **Reset Demo State**: Reset button in Profile for replay during judging.
