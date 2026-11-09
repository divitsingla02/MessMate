// MessMate LocalStorage utility with complete persistence, fallback defaults, and event dispatching

const STORAGE_KEYS = {
  USER_PROFILE: 'messmate_user_profile',
  MEAL_SKIPS: 'messmate_meal_skips',
  REVIEWS: 'messmate_reviews',
  SETTINGS: 'messmate_settings',
  SELECTED_HOSTEL: 'messmate_selected_hostel',
  ASSUMPTIONS: 'messmate_waste_assumptions',
};

// Default profile
export const DEFAULT_PROFILE = {
  name: 'Aarav Sharma',
  rollNumber: '21BCE1042',
  room: 'B-304',
  hostel: 'Aryabhata Hall of Residence (Boys)',
  mess: 'Central Food Court (Caterer: Royal Feast)',
  dietary: 'Vegetarian',
  portionPreference: 'Standard (350g)',
  email: 'aarav.sharma@hostel.edu',
  phone: '+91 98765 43210',
  notifications: {
    reminders: true,
    dailyMenu: true,
    communityAlerts: false,
    cutoffMinutes: 45
  }
};

// Default Waste Modeling Assumptions
export const DEFAULT_ASSUMPTIONS = {
  portionGrams: 350, // grams per meal
  costPerMealRupees: 65, // INR saved
  co2ePerMealKg: 0.85, // kg CO2 equivalent saved per meal
  waterPerMealLitres: 125, // litres of agricultural water saved
  hostelTotalStudents: 520, // total registered students for mess headcount
};

// Helper to dispatch custom events so any component across the tree can sync immediately
const triggerUpdate = (type, detail = {}) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('messmate_storage_update', { detail: { type, ...detail } }));
  }
};

// Storage Safe Helpers
export const getStoredItem = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`Error reading key ${key} from localStorage:`, e);
    return fallback;
  }
};

export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving key ${key} to localStorage:`, e);
  }
};

// Profile methods
export const getProfile = () => getStoredItem(STORAGE_KEYS.USER_PROFILE, DEFAULT_PROFILE);
export const saveProfile = (profile) => {
  setStoredItem(STORAGE_KEYS.USER_PROFILE, profile);
  triggerUpdate('PROFILE_UPDATED', { profile });
};

// Waste assumptions methods
export const getAssumptions = () => getStoredItem(STORAGE_KEYS.ASSUMPTIONS, DEFAULT_ASSUMPTIONS);
export const saveAssumptions = (assumptions) => {
  setStoredItem(STORAGE_KEYS.ASSUMPTIONS, assumptions);
  triggerUpdate('ASSUMPTIONS_UPDATED', { assumptions });
};

// Selected Hostel & Mess
export const getSelectedHostel = () => getStoredItem(STORAGE_KEYS.SELECTED_HOSTEL, {
  hostel: 'Aryabhata Hall of Residence (Boys)',
  mess: 'Central Food Court (Royal Feast)',
  capacity: 520
});
export const saveSelectedHostel = (data) => {
  setStoredItem(STORAGE_KEYS.SELECTED_HOSTEL, data);
  triggerUpdate('HOSTEL_CHANGED', { data });
};

// Meal Skips Methods
// Schema: Key = `${dateStr}_${mealType}` (e.g. "2026-11-09_breakfast")
// Value = { date: "YYYY-MM-DD", mealType: "breakfast", mealId: "mon-breakfast", timestamp: 1731130000000, reason: "Eating out with friends" }
export const getAllSkips = () => getStoredItem(STORAGE_KEYS.MEAL_SKIPS, {});

export const isMealSkipped = (dateStr, mealType) => {
  const skips = getAllSkips();
  const key = `${dateStr}_${mealType.toLowerCase()}`;
  return !!skips[key];
};

export const toggleMealSkip = (dateStr, mealType, mealInfo = {}) => {
  const skips = getAllSkips();
  const key = `${dateStr}_${mealType.toLowerCase()}`;
  let skippedNow = false;

  if (skips[key]) {
    delete skips[key];
    skippedNow = false;
  } else {
    skips[key] = {
      id: key,
      date: dateStr,
      mealType: mealType.toLowerCase(),
      mealTitle: mealInfo.title || mealType,
      mealId: mealInfo.id || key,
      timestamp: Date.now(),
      portionGrams: getAssumptions().portionGrams,
      reason: mealInfo.reason || 'Not dining in mess',
      hostel: getSelectedHostel().hostel
    };
    skippedNow = true;
  }

  setStoredItem(STORAGE_KEYS.MEAL_SKIPS, skips);
  triggerUpdate('SKIP_TOGGLED', { key, isSkipped: skippedNow, dateStr, mealType });
  return skippedNow;
};

export const getSkipsForDate = (dateStr) => {
  const skips = getAllSkips();
  return Object.values(skips).filter(s => s.date === dateStr);
};

export const getTotalUserSkipsCount = () => {
  const skips = getAllSkips();
  return Object.keys(skips).length;
};

// Reviews Methods
export const getStoredReviews = () => getStoredItem(STORAGE_KEYS.REVIEWS, []);

export const saveUserReview = (reviewData) => {
  const reviews = getStoredReviews();
  const profile = getProfile();
  
  // Check if a review already exists for this meal on this date by this user
  const existingIndex = reviews.findIndex(
    r => r.mealId === reviewData.mealId && r.date === reviewData.date && r.isUserReview
  );

  const updatedReview = {
    ...reviewData,
    id: reviewData.id || `rev_${Date.now()}`,
    isUserReview: true,
    authorName: profile.name,
    authorRoll: profile.rollNumber,
    authorHostel: profile.hostel,
    createdAt: new Date().toISOString(),
    timestamp: Date.now()
  };

  if (existingIndex >= 0) {
    reviews[existingIndex] = {
      ...reviews[existingIndex],
      ...updatedReview,
      updatedAt: new Date().toISOString()
    };
  } else {
    reviews.unshift(updatedReview);
  }

  setStoredItem(STORAGE_KEYS.REVIEWS, reviews);
  triggerUpdate('REVIEWS_UPDATED', { review: updatedReview });
  return updatedReview;
};

export const getUserReviewForMeal = (mealId, dateStr) => {
  const reviews = getStoredReviews();
  return reviews.find(r => r.mealId === mealId && r.date === dateStr && r.isUserReview) || null;
};

// Reset demo data
export const resetDemoData = () => {
  localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  localStorage.removeItem(STORAGE_KEYS.MEAL_SKIPS);
  localStorage.removeItem(STORAGE_KEYS.REVIEWS);
  localStorage.removeItem(STORAGE_KEYS.ASSUMPTIONS);
  localStorage.removeItem(STORAGE_KEYS.SELECTED_HOSTEL);
  triggerUpdate('DEMO_RESET');
};

