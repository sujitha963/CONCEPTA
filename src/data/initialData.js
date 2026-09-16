export const INITIAL_STUDENT = {
  name: "Alex Johnson",
  email: "alex.johnson@ciphermates.dev",
  isRegistered: true,
  isOnboarded: true,
  age: "21",
  dob: "2003-05-14",
  mobile: "+1 (555) 234-5678",
  studyType: "College", // School | College | Self Learner
  collegeDetails: {
    degree: "B.Tech",
    year: "3rd Year",
    department: "Computer Science & Engineering"
  },
  schoolDetails: {
    class: "",
    board: ""
  },
  selfLearnerDetails: {
    interest: ""
  },
  learningGoal: "Interview Preparation",
  dailyTargetMinutes: 45,
  dailyTargetCompletedMinutes: 35,
  dailyConceptsTarget: 2,
  dailyConceptsCompleted: 1,
  conceptCoins: 240,
  masteryStreak: 5,
  streakFreezes: 1,
  lastActivityDate: new Date().toISOString().split('T')[0]
};

export const INITIAL_SUBJECTS = [
  {
    id: "ds",
    title: "Data Structures",
    category: "Core Computer Science",
    icon: "Boxes",
    description: "Master fundamental data organization techniques, memory layouts, arrays, hashing, trees, and windowing patterns.",
    conceptCount: 5,
    averageMastery: 61.8,
    status: "In Progress",
    color: "indigo"
  },
  {
    id: "algo",
    title: "Algorithms",
    category: "Problem Solving",
    icon: "GitFork",
    description: "Understand sorting, searching, greedy techniques, dynamic programming, and graph traversal strategies.",
    conceptCount: 6,
    averageMastery: 42.0,
    status: "Diagnostic Ready",
    color: "emerald"
  },
  {
    id: "dbms",
    title: "Database Management System",
    category: "Backend & Systems",
    icon: "Database",
    description: "Relational modeling, SQL optimization, indexing, ACID transactions, and normalization paradigms.",
    conceptCount: 5,
    averageMastery: 55.0,
    status: "Diagnostic Ready",
    color: "amber"
  },
  {
    id: "python",
    title: "Python Programming",
    category: "Languages & Scripting",
    icon: "Code2",
    description: "Pythonic idioms, list comprehensions, OOP constructs, generators, async IO, and standard libraries.",
    conceptCount: 4,
    averageMastery: 78.0,
    status: "Completed",
    color: "sky"
  }
];

export const INITIAL_CONCEPTS_DS = [
  {
    id: "c-arrays",
    name: "Arrays",
    mastery: 90,
    status: "Mastered", // Mastered | Developing | Needs Attention
    description: "Contiguous memory allocation, indexing, dynamic resizing, and in-place mutations.",
    icon: "LayoutGrid",
    isPrimaryGap: false,
    subtopics: ["Index Manipulation", "In-place Reversal", "Prefix Sums", "Two Pointer Basic"]
  },
  {
    id: "c-strings",
    name: "Strings",
    mastery: 84,
    status: "Mastered",
    description: "Immutable character sequences, pattern matching, substring search, and string transformations.",
    icon: "Type",
    isPrimaryGap: false,
    subtopics: ["ASCII & Unicode", "Anagram Detection", "Palindrome Checking", "String Builder"]
  },
  {
    id: "c-hashing",
    name: "Hashing",
    mastery: 62,
    status: "Developing",
    description: "Hash maps, set lookups, collision resolution (chaining vs open addressing), and constant-time search.",
    icon: "Hash",
    isPrimaryGap: false,
    subtopics: ["Hash Tables", "HashSet", "Frequency Maps", "Collision Resolution"]
  },
  {
    id: "c-recursion",
    name: "Recursion",
    mastery: 45,
    status: "Needs Attention",
    description: "Base case formulation, recursive call stacks, back-tracking, and divide-and-conquer strategy.",
    icon: "Repeat",
    isPrimaryGap: false,
    subtopics: ["Call Stack", "Base Conditions", "Tree Recursion", "Backtracking"]
  },
  {
    id: "c-sliding-window",
    name: "Sliding Window",
    mastery: 28,
    status: "Needs Attention",
    description: "Optimizing O(N²) nested loops to O(N) by maintaining dynamic or fixed window boundaries across arrays/strings.",
    icon: "Maximize2",
    isPrimaryGap: true, // Primary Knowledge Gap
    subtopics: ["Fixed-size Window", "Dynamic Variable Window", "Two Pointer Sync", "Frequency Counter Window"]
  }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: "first_mastered",
    title: "First Concept Mastered",
    description: "Achieve ≥80% accuracy in at least one core concept.",
    icon: "Trophy",
    rewardCoins: 20,
    unlocked: true,
    unlockedAt: "2026-09-10",
    progress: 100,
    category: "Mastery"
  },
  {
    id: "streak_7",
    title: "7-Day Mastery Streak",
    description: "Maintain an active learning streak for 7 consecutive days.",
    icon: "Flame",
    rewardCoins: 50,
    unlocked: false,
    unlockedAt: null,
    progress: 71, // 5/7 days
    category: "Consistency"
  },
  {
    id: "streak_10",
    title: "10-Day Mastery Master",
    description: "Maintain a 10-day streak. Earn 1 bonus Concept Coin & special status!",
    icon: "Award",
    rewardCoins: 100,
    unlocked: false,
    unlockedAt: null,
    progress: 50, // 5/10 days
    category: "Consistency"
  },
  {
    id: "gap_crusher",
    title: "Gap Crusher",
    description: "Transform a primary knowledge gap (<50%) into Mastered status (≥80%) via reassessment.",
    icon: "Zap",
    rewardCoins: 75,
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    category: "Improvement"
  },
  {
    id: "learning_explorer",
    title: "Learning Explorer",
    description: "Complete 3 learning concepts or study cheat sheet notes.",
    icon: "BookOpen",
    rewardCoins: 30,
    unlocked: true,
    unlockedAt: "2026-09-12",
    progress: 100,
    category: "Exploration"
  }
];

export const TIMER_PRESETS = [
  { id: 'quick', label: '15 min Quick Focus', minutes: 15, coinReward: 15, tag: 'Speed Session' },
  { id: 'standard', label: '25 min Focus', minutes: 25, coinReward: 25, tag: 'Standard Pomodoro' },
  { id: 'deep', label: '45 min Deep Focus', minutes: 45, coinReward: 45, tag: 'Deep Work' }
];

export const DIAGNOSTIC_QUIZ_QUESTIONS = [
  {
    id: 1,
    concept: "Arrays",
    difficulty: "Easy",
    question: "What is the time complexity of accessing an element at a given index in a standard fixed-size Array?",
    options: [
      "O(1) - Constant time",
      "O(N) - Linear time",
      "O(log N) - Logarithmic time",
      "O(N²) - Quadratic time"
    ],
    correctAnswer: 0,
    explanation: "Arrays store elements in contiguous memory locations, allowing direct calculation of memory offsets in constant O(1) time."
  },
  {
    id: 2,
    concept: "Strings",
    difficulty: "Medium",
    question: "Which data structure is optimal for quickly verifying if two strings are anagrams of each other in O(N) time?",
    options: [
      "Binary Search Tree",
      "Character Frequency Map / Hash Table",
      "Stack",
      "Singly Linked List"
    ],
    correctAnswer: 1,
    explanation: "A frequency map counts occurrences of each character in O(N) time and O(1) auxiliary space (for fixed alphabet size)."
  },
  {
    id: 3,
    concept: "Hashing",
    difficulty: "Medium",
    question: "When a hash collision occurs using separate chaining, how are colliding key-value pairs typically stored?",
    options: [
      "In a contiguous array expanding rightward",
      "In a linked list or balanced tree at the hash bucket index",
      "They overwrite the previous value automatically",
      "In a separate global stack"
    ],
    correctAnswer: 1,
    explanation: "Separate chaining handles collisions by maintaining a linked list or tree bucket for key-value pairs that hash to the same index."
  },
  {
    id: 4,
    concept: "Recursion",
    difficulty: "Medium",
    question: "What happens if a recursive function fails to hit or define a valid base case?",
    options: [
      "The loop terminates silently with return value 0",
      "It results in a Stack Overflow Error due to call stack depletion",
      "The compiler converts it to an iterative while-loop",
      "Execution speed increases exponentially"
    ],
    correctAnswer: 1,
    explanation: "Without a valid base case, recursive function calls stack up endlessly until call stack memory allocation is exceeded."
  },
  {
    id: 5,
    concept: "Sliding Window",
    difficulty: "Hard",
    question: "You need to find the maximum sum of a contiguous subarray of size K in an array of size N. What is the optimal time complexity using Sliding Window?",
    options: [
      "O(N * K) using nested brute force loops",
      "O(N) by adding the incoming element and subtracting the outgoing element",
      "O(N log N) by sorting the subarray repeatedly",
      "O(K²) by scanning backward from window end"
    ],
    correctAnswer: 1,
    explanation: "Instead of recomputing the sum of K elements from scratch (O(N*K)), sliding the window updates the sum in O(1) per step, yielding O(N) total time."
  }
];

export const SLIDING_WINDOW_LEARNING_CONTENT = {
  title: "Sliding Window Technique",
  concept: "Sliding Window",
  estimatedTime: "12 mins",
  difficulty: "Medium to Advanced",
  summary: "The Sliding Window pattern is used to perform required operations on a specific window size of a given Array or Linked List, such as finding the longest subarray containing all 1s.",
  
  intuition: `When an algorithm problem asks for contiguous subarrays or substrings with maximum, minimum, or target properties, brute-force solutions evaluate all pairs of start and end indices (O(N²)). 
  
The Sliding Window technique reduces this to O(N) by keeping a single window bounded by two pointers (left and right) and dynamically expanding or shrinking it.`,

  keyPatterns: [
    {
      name: "Fixed-size Window",
      description: "Window length K is constant. Move right pointer, compute delta by adding array[right] and subtracting array[left].",
      codeSnippet: `let windowSum = 0;
for (let i = 0; i < k; i++) windowSum += arr[i];

let maxSum = windowSum;
for (let i = k; i < arr.length; i++) {
  windowSum += arr[i] - arr[i - k]; // Slide window: add new, remove old
  maxSum = Math.max(maxSum, windowSum);
}`
    },
    {
      name: "Variable-size Dynamic Window",
      description: "Window size expands (right pointer moves) until a condition is broken, then shrinks from left until valid again.",
      codeSnippet: `let left = 0, currentSum = 0, minLength = Infinity;
for (let right = 0; right < arr.length; right++) {
  currentSum += arr[right];
  while (currentSum >= target) {
    minLength = Math.min(minLength, right - left + 1);
    currentSum -= arr[left++]; // Shrink from left
  }
}`
    }
  ],

  visualSteps: [
    {
      step: 1,
      left: 0,
      right: 2,
      array: [2, 1, 5, 1, 3, 2],
      k: 3,
      currentSum: 8,
      maxSum: 8,
      explanation: "Initial window [0..2] -> Elements [2, 1, 5]. Window Sum = 2 + 1 + 5 = 8."
    },
    {
      step: 2,
      left: 1,
      right: 3,
      array: [2, 1, 5, 1, 3, 2],
      k: 3,
      currentSum: 7,
      maxSum: 8,
      explanation: "Slide window right -> Subtract arr[0]=2, Add arr[3]=1. Window Sum = 8 - 2 + 1 = 7. Max Sum stays 8."
    },
    {
      step: 3,
      left: 2,
      right: 4,
      array: [2, 1, 5, 1, 3, 2],
      k: 3,
      currentSum: 9,
      maxSum: 9,
      explanation: "Slide window right -> Subtract arr[1]=1, Add arr[4]=3. Window Sum = 7 - 1 + 3 = 9. New Max Sum = 9!"
    },
    {
      step: 4,
      left: 3,
      right: 5,
      array: [2, 1, 5, 1, 3, 2],
      k: 3,
      currentSum: 6,
      maxSum: 9,
      explanation: "Slide window right -> Subtract arr[2]=5, Add arr[5]=2. Window Sum = 9 - 5 + 2 = 6. Overall Max Sum = 9."
    }
  ]
};

export const PRACTICE_QUESTIONS_SLIDING_WINDOW = [
  {
    id: "p1",
    question: "Given array [1, 4, 2, 10, 2, 3, 1, 0, 20] and K = 4, what is the max sum of 4 consecutive elements?",
    options: ["18", "24", "26", "21"],
    correctAnswer: 1,
    explanation: "The contiguous subarray [3, 1, 0, 20] yields sum 24, which is the maximum achievable."
  },
  {
    id: "p2",
    question: "When finding the longest substring without repeating characters, what triggers the left pointer to move right?",
    options: [
      "When the array length exceeds N",
      "When a duplicate character is encountered inside the current window",
      "When the right pointer reaches the last character",
      "After every 2 iterations automatically"
    ],
    correctAnswer: 1,
    explanation: "Encountering a duplicate character invalidates the window requirement, prompting the left pointer to advance past the previous occurrence."
  }
];

export const REASSESSMENT_QUESTIONS_SLIDING_WINDOW = [
  {
    id: "r1",
    question: "Why does Sliding Window improve efficiency from O(N²) to O(N)?",
    options: [
      "It uses multi-threading across CPU cores",
      "It reuses computed results from the previous window by subtracting outgoing elements and adding incoming elements",
      "It sorts the array in O(1) time beforehand",
      "It bypasses array bounds checking"
    ],
    correctAnswer: 1,
    explanation: "Reusing previous window computations eliminates duplicate work, performing O(1) operations per array shift."
  },
  {
    id: "r2",
    question: "In a dynamic variable-sized window algorithm searching for minimum subarray length with sum >= target, when do we calculate window length?",
    options: [
      "Only at the start of the array",
      "Inside the while loop whenever currentSum meets or exceeds the target",
      "After the entire loop finishes",
      "When left pointer equals right pointer"
    ],
    correctAnswer: 1,
    explanation: "When currentSum >= target, we evaluate `right - left + 1` as a candidate minimum length before shrinking the window."
  },
  {
    id: "r3",
    question: "What is the spatial complexity of the fixed-size sliding window algorithm on a 1D array?",
    options: [
      "O(N)",
      "O(K)",
      "O(1) - Constant auxiliary space",
      "O(N log N)"
    ],
    correctAnswer: 2,
    explanation: "The algorithm only maintains pointer variables (`left`, `right`, `windowSum`), using O(1) extra space."
  }
];

export const INITIAL_NOTES = [
  {
    id: "n1",
    subjectId: "ds",
    subjectName: "Data Structures",
    title: "Sliding Window Pattern Cheat Sheet",
    concept: "Sliding Window",
    readTime: "4 mins",
    completed: false,
    content: `## Sliding Window Fundamentals
    
### Core Identification Rule
Use Sliding Window when problem asks for:
1. Contiguous subarray or substring
2. Maximum / Minimum sum, length, or target match
3. Window constraint K (fixed size) or dynamic constraint (variable size)

### Fixed Window Template
\`\`\`javascript
function maxSubarraySum(arr, k) {
  let maxSum = 0, windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  maxSum = windowSum;
  
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
\`\`\`
`
  },
  {
    id: "n2",
    subjectId: "ds",
    subjectName: "Data Structures",
    title: "Array Memory Layouts & In-Place Algorithms",
    concept: "Arrays",
    readTime: "5 mins",
    completed: true,
    content: `## Array Memory & Performance
- **Contiguous Allocation**: Elements placed back-to-back in RAM.
- **Cache Locality**: Accessing index i loads nearby elements into L1/L2 cache.
- **In-Place Swaps**: \`[arr[i], arr[j]] = [arr[j], arr[i]]\` avoids extra allocation.`
  },
  {
    id: "n3",
    subjectId: "ds",
    subjectName: "Data Structures",
    title: "Hashing & Collision Resolution Strategies",
    concept: "Hashing",
    readTime: "6 mins",
    completed: false,
    content: `## Hash Table Collision Mechanics
- **Load Factor**: Ratio of items / buckets (\`α = n/m\`).
- **Separate Chaining**: Bucket stores a linked list. Resilient to high load factor.
- **Open Addressing**: Linear or quadratic probing to find next free slot.`
  },
  {
    id: "n4",
    subjectId: "algo",
    subjectName: "Algorithms",
    title: "Recursion Stack & Backtracking Traversal",
    concept: "Recursion",
    readTime: "7 mins",
    completed: false,
    content: `## Call Stack Traversal
Every recursive invocation allocates a stack frame containing local variables and return address. Always ensure base cases precede recursive calls!`
  }
];

export const FAQ_DATA = [
  {
    q: "How does Concepta work?",
    a: "Concepta is an adaptive learning system designed around a 7-step mastery loop: Diagnostic Quiz -> Concept-wise Accuracy Breakdown -> Knowledge Map Visualization -> Knowledge Gap Pinpointing -> Targeted Learning & Visualizers -> Targeted Reassessment -> Real-time Mastery Update."
  },
  {
    q: "What is a Knowledge Gap?",
    a: "Unlike traditional platforms that give you a single overall percentage score (e.g. 70%), Concepta breaks down your test by specific topics. Your Knowledge Gap is the specific underlying concept where your accuracy is lowest, indicating the exact area holding back your overall mastery."
  },
  {
    q: "How is Concept Mastery calculated?",
    a: "Concept Mastery is calculated using a weighted formula based on diagnostic quiz performance, practice completion, and reassessment accuracy. Scores >=80% are categorized as Mastered, 50-79% as Developing, and <50% as Needs Attention."
  },
  {
    q: "What are Concept Coins and how do I earn them?",
    a: "Concept Coins are learning incentives awarded for diagnostic test submissions (+20 coins), completing recommended learning modules (+30 coins), finishing targeted practice (+20 coins), completing daily focus timers (+15 to +45 coins), and achieving mastery upgrades on reassessments (+50 coins)."
  },
  {
    q: "What is a Streak & Streak Freeze?",
    a: "Your Mastery Streak represents active study days in a row where you completed a quiz, learning module, or practice session. If you miss a day, a Streak Freeze preserves your streak intact (e.g., 23 days stay 23 days). Freezes can be purchased for 100 Concept Coins!"
  }
];
