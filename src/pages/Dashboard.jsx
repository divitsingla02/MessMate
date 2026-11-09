import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Building2, 
  Clock, 
  Sparkles, 
  Filter, 
  CheckCircle, 
  Leaf, 
  Users, 
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { 
  WEEKLY_MENU, 
  getDayName, 
  getTodayDateString, 
  HOSTEL_OPTIONS, 
  MEAL_TYPES 
} from '../data/menuData';
import MealCard from '../components/MealCard';
import RatingModal from '../components/RatingModal';
import { 
  getSelectedHostel, 
  saveSelectedHostel, 
  getAllSkips 
} from '../utils/storage';
import { calculateMealHeadcount } from '../utils/wasteCalculations';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [selectedHostel, setSelectedHostel] = useState(getSelectedHostel());
  const [activeFilter, setActiveFilter] = useState('all'); // all, breakfast, lunch, snacks, dinner, vegOnly
  const [ratingModalMeal, setRatingModalMeal] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Determine current day of week for selected date
  const dayOfWeek = getDayName(selectedDate);
  const todaysMenu = WEEKLY_MENU[dayOfWeek] || WEEKLY_MENU['Monday'];

  // Listen to storage update events
  useEffect(() => {
    const handleStorageUpdate = () => {
      setSelectedHostel(getSelectedHostel());
      setRefreshTrigger((prev) => prev + 1);
    };
    window.addEventListener('messmate_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('messmate_storage_update', handleStorageUpdate);
  }, []);

  const handleHostelChange = (e) => {
    const found = HOSTEL_OPTIONS.find((h) => h.id === e.target.value);
    if (found) {
      saveSelectedHostel({
        hostel: found.name,
        mess: found.mess,
        capacity: found.capacity
      });
    }
  };

  // Convert todaysMenu into an array of meals
  const mealList = [
    todaysMenu.breakfast,
    todaysMenu.lunch,
    todaysMenu.snacks,
    todaysMenu.dinner
  ].filter(Boolean);

  // Apply active filters
  const filteredMeals = mealList.filter((meal) => {
    if (activeFilter === 'vegOnly' && !meal.isVeg) return false;
    if (activeFilter !== 'all' && activeFilter !== 'vegOnly' && meal.mealType !== activeFilter) {
      return false;
    }
    return true;
  });

  // Calculate day-level headcount & skips summary
  const daySummary = mealList.reduce((acc, m) => {
    const hc = calculateMealHeadcount(m.mealType, selectedDate, selectedHostel.capacity || 520);
    acc.totalCapacity += hc.baseCapacity;
    acc.totalAttending += hc.attendingCount;
    acc.totalSkips += hc.totalSkips;
    acc.userSkips += hc.userSkipped ? 1 : 0;
    return acc;
  }, { totalCapacity: 0, totalAttending: 0, totalSkips: 0, userSkips: 0 });

  return (
    <div className="min-h-screen pb-24 lg:pb-16 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative rounded-card-lg bg-white border border-secondary-dark/30 p-6 sm:p-8 lg:p-10 shadow-soft overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/70 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-accent-light/60 rounded-full blur-2xl -z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-secondary text-primary mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Smart Hostel Dining</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-messText tracking-tight leading-tight">
              What’s cooking today?
            </h1>

            <p className="text-sm sm:text-base text-messText-muted mt-2 sm:mt-3 leading-relaxed">
              Your daily mess menu, student ratings and smarter meal planning — all in one place.
            </p>

            {/* Quick date & mess indicator */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-medium text-messText">
              <div className="flex items-center gap-1.5 bg-secondary-light px-3 py-1.5 rounded-xl border border-secondary">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  {dayOfWeek}, {new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-secondary-light px-3 py-1.5 rounded-xl border border-secondary">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="truncate max-w-[240px]">{selectedHostel.mess}</span>
              </div>
            </div>
          </div>

          {/* Interactive Hostel & Date Selectors Card */}
          <div className="bg-surface-subtle/80 p-5 rounded-2xl border border-secondary-dark/40 shadow-xs shrink-0 max-w-sm w-full">
            <h3 className="text-xs font-bold uppercase tracking-wider text-messText-muted mb-3 flex items-center justify-between">
              <span>Campus Mess Settings</span>
              <span className="text-[10px] text-accent font-semibold">Active</span>
            </h3>

            <div className="space-y-3">
              {/* Hostel Selector */}
              <div>
                <label className="block text-xs font-semibold text-messText mb-1">
                  Select Hostel & Mess Hall
                </label>
                <div className="relative">
                  <select
                    value={
                      HOSTEL_OPTIONS.find((h) => h.name === selectedHostel.hostel)?.id || 'h1'
                    }
                    onChange={handleHostelChange}
                    className="w-full bg-white text-xs font-medium text-messText p-2.5 rounded-xl border border-secondary-dark/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer pr-8"
                  >
                    {HOSTEL_OPTIONS.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.capacity} students)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Selector */}
              <div>
                <label className="block text-xs font-semibold text-messText mb-1">
                  Explore Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white text-xs font-medium text-messText p-2.5 rounded-xl border border-secondary-dark/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
                />
              </div>

              {/* Quick jump to today */}
              {selectedDate !== getTodayDateString() && (
                <button
                  type="button"
                  onClick={() => setSelectedDate(getTodayDateString())}
                  className="w-full text-center text-xs font-bold text-primary hover:underline py-1"
                >
                  Jump back to Today
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Daily Headcount & Food Waste Avoided Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-secondary-dark/30">
          <div className="bg-surface-subtle p-3.5 rounded-xl border border-secondary-dark/20">
            <span className="text-[11px] font-semibold text-messText-light block uppercase tracking-wider">
              Total Day Headcount
            </span>
            <span className="text-xl sm:text-2xl font-black text-messText mt-1 block">
              {daySummary.totalAttending} <span className="text-xs text-messText-light font-normal">/ {daySummary.totalCapacity}</span>
            </span>
          </div>

          <div className="bg-surface-subtle p-3.5 rounded-xl border border-secondary-dark/20">
            <span className="text-[11px] font-semibold text-messText-light block uppercase tracking-wider">
              Today's Skips Notified
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-700 mt-1 block">
              {daySummary.totalSkips} <span className="text-xs text-messText-light font-normal">portions</span>
            </span>
          </div>

          <div className="bg-surface-subtle p-3.5 rounded-xl border border-secondary-dark/20">
            <span className="text-[11px] font-semibold text-messText-light block uppercase tracking-wider">
              Avoided Waste (Est.)
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-800 mt-1 block">
              ~{((daySummary.totalSkips * 350) / 1000).toFixed(1)} <span className="text-xs text-messText-light font-normal">kg prep</span>
            </span>
          </div>

          <div className="bg-surface-subtle p-3.5 rounded-xl border border-secondary-dark/20">
            <span className="text-[11px] font-semibold text-messText-light block uppercase tracking-wider">
              Your Daily Status
            </span>
            <span className="text-xs sm:text-sm font-bold text-primary mt-1.5 block">
              {daySummary.userSkips > 0 ? `${daySummary.userSkips} meals skipped` : 'Attending all meals'}
            </span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-messText tracking-tight">
            Today’s 4 Meals
          </h2>
          <p className="text-xs text-messText-muted mt-0.5">
            Serving Breakfast, Lunch, Evening Snacks & Dinner for {dayOfWeek}.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white text-messText-muted border border-secondary-dark/40 hover:bg-secondary/60'
            }`}
          >
            All 4 Meals
          </button>
          <button
            onClick={() => setActiveFilter('breakfast')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'breakfast'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white text-messText-muted border border-secondary-dark/40 hover:bg-secondary/60'
            }`}
          >
            Breakfast
          </button>
          <button
            onClick={() => setActiveFilter('lunch')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'lunch'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white text-messText-muted border border-secondary-dark/40 hover:bg-secondary/60'
            }`}
          >
            Lunch
          </button>
          <button
            onClick={() => setActiveFilter('snacks')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'snacks'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white text-messText-muted border border-secondary-dark/40 hover:bg-secondary/60'
            }`}
          >
            Snacks
          </button>
          <button
            onClick={() => setActiveFilter('dinner')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'dinner'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white text-messText-muted border border-secondary-dark/40 hover:bg-secondary/60'
            }`}
          >
            Dinner
          </button>
          <button
            onClick={() => setActiveFilter('vegOnly')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
              activeFilter === 'vegOnly'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Pure Veg</span>
          </button>
        </div>
      </section>

      {/* Meals Grid */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMeals.map((meal) => (
          <MealCard
            key={`${meal.id}_${selectedDate}_${refreshTrigger}`}
            meal={meal}
            dateStr={selectedDate}
            onRateClick={(m) => setRatingModalMeal(m)}
            onSkipToggle={() => setRefreshTrigger((prev) => prev + 1)}
          />
        ))}

        {filteredMeals.length === 0 && (
          <div className="col-span-2 p-12 text-center bg-white rounded-card-lg border border-dashed border-secondary-dark">
            <p className="text-sm font-semibold text-messText">No meals match your selected filter.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-3 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl"
            >
              Show all meals
            </button>
          </div>
        )}
      </section>

      {/* Sustainable Eating Education Pill */}
      <section className="mt-12 p-5 rounded-2xl bg-secondary-light/80 border border-secondary flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-messText">
              Planning to eat outside or visit home?
            </h4>
            <p className="text-xs text-messText-muted">
              Toggle "I'm skipping this meal" above. Mess headchefs finalize meal cooking 45 mins before serving.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-messText-light">
            Model: 1 Skip = ~350g Saved
          </span>
        </div>
      </section>

      {/* Rating & Review Modal */}
      {ratingModalMeal && (
        <RatingModal
          isOpen={!!ratingModalMeal}
          onClose={() => setRatingModalMeal(null)}
          meal={ratingModalMeal}
          dateStr={selectedDate}
          onReviewSaved={() => setRefreshTrigger((prev) => prev + 1)}
        />
      )}
    </div>
  );
}

