// Waste calculation utilities & achievement tracking for MessMate

import { getAssumptions, getAllSkips } from './storage';

// Base mock community skips over the past 30 days so analytics and charts look realistic, rich, and dynamic
export const MOCK_COMMUNITY_BASELINE = {
  totalRegisteredStudents: 520,
  historicalCommunitySkipsCount: 1480, // total skips by all hostel residents this semester
  last7DaysSkips: [
    { day: 'Mon', date: '2026-11-03', breakfast: 34, lunch: 58, snacks: 22, dinner: 64, total: 178 },
    { day: 'Tue', date: '2026-11-04', breakfast: 28, lunch: 46, snacks: 18, dinner: 52, total: 144 },
    { day: 'Wed', date: '2026-11-05', breakfast: 32, lunch: 62, snacks: 25, dinner: 70, total: 189 },
    { day: 'Thu', date: '2026-11-06', breakfast: 30, lunch: 50, snacks: 20, dinner: 58, total: 158 },
    { day: 'Fri', date: '2026-11-07', breakfast: 45, lunch: 75, snacks: 38, dinner: 110, total: 268 },
    { day: 'Sat', date: '2026-11-08', breakfast: 62, lunch: 88, snacks: 42, dinner: 125, total: 317 },
    { day: 'Sun', date: '2026-11-09', breakfast: 55, lunch: 92, snacks: 48, dinner: 130, total: 325 },
  ],
  weeklyTrends: [
    { week: 'Week 1', foodSavedKg: 512, mealsSkipped: 1460, carbonSavedKg: 1241 },
    { week: 'Week 2', foodSavedKg: 580, mealsSkipped: 1657, carbonSavedKg: 1408 },
    { week: 'Week 3', foodSavedKg: 645, mealsSkipped: 1842, carbonSavedKg: 1565 },
    { week: 'Week 4 (Current)', foodSavedKg: 710, mealsSkipped: 2028, carbonSavedKg: 1723 },
  ],
  hostelLeaderboard: [
    { rank: 1, name: 'Aryabhata Hall (Boys)', students: 520, skips: 512, foodSavedKg: 179.2, reductionRate: '18.4%' },
    { rank: 2, name: 'Gargi Hall of Residence (Girls)', students: 480, skips: 465, foodSavedKg: 162.7, reductionRate: '16.9%' },
    { rank: 3, name: 'Bhaskara Mega Mess', students: 650, skips: 580, foodSavedKg: 203.0, reductionRate: '15.2%' },
    { rank: 4, name: 'CV Raman Hostel', students: 410, skips: 310, foodSavedKg: 108.5, reductionRate: '12.8%' },
  ]
};

// Achievement milestones definition
export const ACHIEVEMENTS = [
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Marked your first meal skip to notify the mess kitchen in advance.',
    target: 1,
    icon: 'Footprints',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    reward: 'Pioneer Badge'
  },
  {
    id: 'waste_warrior',
    title: 'Waste Warrior',
    description: 'Saved 10 meals from being prepared needlessly.',
    target: 10,
    icon: 'ShieldCheck',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    reward: 'Silver Mess Pass'
  },
  {
    id: 'green_champion',
    title: 'Green Champion',
    description: 'Prevented over 8.75 kg of food waste across 25 meals.',
    target: 25,
    icon: 'Leaf',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    reward: 'Eco-Champion Trophy'
  },
  {
    id: 'planet_protector',
    title: 'Planet Protector',
    description: 'Achieved an outstanding 50 meals saved milestone!',
    target: 50,
    icon: 'Award',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    reward: 'Hostel Sustainability Honor'
  },
  {
    id: 'earth_guardian',
    title: 'Earth Guardian',
    description: 'Super contributor! 100+ meals notified ahead of prep.',
    target: 100,
    icon: 'Crown',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    reward: 'Hall of Fame Plaque'
  }
];

/**
 * Calculate personalized metrics for the logged-in student
 */
export const calculateUserWasteMetrics = () => {
  const assumptions = getAssumptions();
  const skips = getAllSkips();
  const userSkipsList = Object.values(skips);
  const totalUserSkips = userSkipsList.length;

  const gramsPerMeal = Number(assumptions.portionGrams) || 350;
  const costPerMeal = Number(assumptions.costPerMealRupees) || 65;
  const co2PerMeal = Number(assumptions.co2ePerMealKg) || 0.85;
  const waterPerMeal = Number(assumptions.waterPerMealLitres) || 125;

  const userGramsSaved = totalUserSkips * gramsPerMeal;
  const userKgSaved = (userGramsSaved / 1000).toFixed(2);
  const userMoneySaved = (totalUserSkips * costPerMeal).toFixed(0);
  const userCo2Avoided = (totalUserSkips * co2PerMeal).toFixed(1);
  const userWaterSaved = (totalUserSkips * waterPerMeal).toFixed(0);

  // Group user skips by meal type
  const mealTypeBreakdown = {
    breakfast: userSkipsList.filter(s => s.mealType === 'breakfast').length,
    lunch: userSkipsList.filter(s => s.mealType === 'lunch').length,
    snacks: userSkipsList.filter(s => s.mealType === 'snacks').length,
    dinner: userSkipsList.filter(s => s.mealType === 'dinner').length,
  };

  // Compute achievements progress
  const unlockedAchievements = ACHIEVEMENTS.map(ach => {
    const isUnlocked = totalUserSkips >= ach.target;
    const progress = Math.min(100, Math.round((totalUserSkips / ach.target) * 100));
    return {
      ...ach,
      isUnlocked,
      progress,
      current: totalUserSkips
    };
  });

  return {
    totalUserSkips,
    userKgSaved: Number(userKgSaved),
    userGramsSaved,
    userMoneySaved: Number(userMoneySaved),
    userCo2Avoided: Number(userCo2Avoided),
    userWaterSaved: Number(userWaterSaved),
    mealTypeBreakdown,
    unlockedAchievements,
    assumptions
  };
};

/**
 * Calculate aggregated community metrics combining baseline + live user interactions
 */
export const calculateCommunityWasteMetrics = () => {
  const userMetrics = calculateUserWasteMetrics();
  const assumptions = getAssumptions();
  const gramsPerMeal = Number(assumptions.portionGrams) || 350;

  const totalCommunitySkips = MOCK_COMMUNITY_BASELINE.historicalCommunitySkipsCount + userMetrics.totalUserSkips;
  const totalCommunityKgSaved = ((totalCommunitySkips * gramsPerMeal) / 1000).toFixed(1);
  const totalCommunityCo2Saved = (totalCommunitySkips * assumptions.co2ePerMealKg).toFixed(0);
  const totalCommunityWaterSaved = (totalCommunitySkips * assumptions.waterPerMealLitres).toLocaleString();
  const totalCommunityMoneySaved = (totalCommunitySkips * assumptions.costPerMealRupees).toLocaleString();

  // Meal breakdown percentages
  const distribution = [
    { name: 'Dinner', value: 38, count: Math.round(totalCommunitySkips * 0.38), color: '#234D3B' },
    { name: 'Lunch', value: 32, count: Math.round(totalCommunitySkips * 0.32), color: '#E99A48' },
    { name: 'Breakfast', value: 18, count: Math.round(totalCommunitySkips * 0.18), color: '#4E876B' },
    { name: 'Evening Snacks', value: 12, count: Math.round(totalCommunitySkips * 0.12), color: '#F4B266' },
  ];

  return {
    totalCommunitySkips,
    totalCommunityKgSaved: Number(totalCommunityKgSaved),
    totalCommunityCo2Saved: Number(totalCommunityCo2Saved),
    totalCommunityWaterSaved,
    totalCommunityMoneySaved,
    distribution,
    last7Days: MOCK_COMMUNITY_BASELINE.last7DaysSkips,
    weeklyTrends: MOCK_COMMUNITY_BASELINE.weeklyTrends,
    leaderboard: MOCK_COMMUNITY_BASELINE.hostelLeaderboard
  };
};

/**
 * Estimate meal headcount given baseline registered students and skips
 */
export const calculateMealHeadcount = (mealType, dateStr, baseCapacity = 520) => {
  const skips = getAllSkips();
  const key = `${dateStr}_${mealType.toLowerCase()}`;
  const userSkipped = !!skips[key];

  // Realistic mock community skips for that meal on that day
  // Hashes dateStr and mealType to produce stable realistic number of peer skips
  let hash = 0;
  for (let i = 0; i < (dateStr + mealType).length; i++) {
    hash = (hash * 31 + (dateStr + mealType).charCodeAt(i)) % 1000;
  }
  
  // Typical skip rates: breakfast ~35-50, lunch ~55-80, snacks ~20-35, dinner ~65-95
  let peerSkips = 45;
  if (mealType.toLowerCase() === 'breakfast') peerSkips = 35 + (hash % 20);
  else if (mealType.toLowerCase() === 'lunch') peerSkips = 60 + (hash % 25);
  else if (mealType.toLowerCase() === 'snacks') peerSkips = 25 + (hash % 15);
  else if (mealType.toLowerCase() === 'dinner') peerSkips = 75 + (hash % 35);

  const totalSkips = peerSkips + (userSkipped ? 1 : 0);
  const attendingCount = Math.max(0, baseCapacity - totalSkips);
  const percentageAttending = Math.round((attendingCount / baseCapacity) * 100);

  return {
    baseCapacity,
    attendingCount,
    totalSkips,
    peerSkips,
    userSkipped,
    percentageAttending,
    estimatedKgAvoided: ((totalSkips * (getAssumptions().portionGrams || 350)) / 1000).toFixed(1)
  };
};

