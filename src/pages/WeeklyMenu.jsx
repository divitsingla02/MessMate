import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Star, 
  ChevronRight, 
  Sparkles, 
  Check, 
  UserX, 
  UserCheck, 
  Layers,
  Utensils
} from 'lucide-react';
import { DAYS_OF_WEEK, WEEKLY_MENU, MEAL_TYPES, getTodayDateString } from '../data/menuData';
import SkipToggle from '../components/SkipToggle';
import RatingModal from '../components/RatingModal';
import { isMealSkipped } from '../utils/storage';

export default function WeeklyMenu() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('dayView'); // 'dayView' (all 4 meals of day) or 'compareView' (all 7 days for 1 meal type)
  const [compareMealType, setCompareMealType] = useState('dinner');
  const [ratingModalMeal, setRatingModalMeal] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Compute mock date string corresponding to each day of this current week for skip storage keying
  const getWeekDateString = (dayName) => {
    const today = new Date();
    // Monday is index 0
    const targetIndex = DAYS_OF_WEEK.indexOf(dayName);
    // Find current Monday
    const currentDayIndex = (today.getDay() + 6) % 7; // Mon is 0, Sun is 6
    const diff = targetIndex - currentDayIndex;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);

    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const activeDateStr = getWeekDateString(selectedDay);
  const dayMenu = WEEKLY_MENU[selectedDay] || WEEKLY_MENU['Monday'];
  const dayMeals = [dayMenu.breakfast, dayMenu.lunch, dayMenu.snacks, dayMenu.dinner].filter(Boolean);

  // Listen to storage changes
  useEffect(() => {
    const handleUpdate = () => setRefreshTrigger((prev) => prev + 1);
    window.addEventListener('messmate_storage_update', handleUpdate);
    return () => window.removeEventListener('messmate_storage_update', handleUpdate);
  }, []);

  return (
    <div className="min-h-screen pb-24 lg:pb-16 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-secondary-dark/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-accent-light">
              Full Schedule
            </span>
            <span className="text-xs text-messText-light font-medium">
              Hostel Master Menu
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-messText tracking-tight">
            Weekly Mess Calendar
          </h1>
          <p className="text-xs sm:text-sm text-messText-muted mt-1">
            Browse daily culinary menus, plan meal skips in advance, and compare offerings across the week.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-secondary-dark/40 shadow-xs self-start md:self-auto">
          <button
            onClick={() => setViewMode('dayView')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'dayView'
                ? 'bg-primary text-white shadow-xs'
                : 'text-messText-muted hover:text-messText'
            }`}
          >
            Day-by-Day View
          </button>
          <button
            onClick={() => setViewMode('compareView')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'compareView'
                ? 'bg-primary text-white shadow-xs'
                : 'text-messText-muted hover:text-messText'
            }`}
          >
            Compare 7 Days
          </button>
        </div>
      </div>

      {/* MODE 1: DAY-BY-DAY VIEW */}
      {viewMode === 'dayView' && (
        <div className="mt-6 space-y-6">
          {/* Day Selector Pills */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = selectedDay === day;
              const dateStr = getWeekDateString(day);
              // Count how many meals skipped for that day
              const skippedCount = ['breakfast', 'lunch', 'snacks', 'dinner'].filter(type => 
                isMealSkipped(dateStr, type)
              ).length;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`p-3 rounded-2xl text-left border transition-all duration-200 relative overflow-hidden ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-soft'
                      : 'bg-white text-messText border-secondary-dark/30 hover:border-primary/40'
                  }`}
                >
                  <span className={`text-[11px] uppercase tracking-wider block font-semibold ${
                    isSelected ? 'text-emerald-200' : 'text-messText-light'
                  }`}>
                    {day.substring(0, 3)}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold block mt-0.5">
                    {day}
                  </span>
                  
                  {/* Status dot / skip badge */}
                  <div className="mt-2 flex items-center justify-between">
                    {skippedCount > 0 ? (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-amber-400 text-amber-950' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {skippedCount} skip
                      </span>
                    ) : (
                      <span className={`text-[10px] ${isSelected ? 'text-white/60' : 'text-messText-light'}`}>
                        All meals
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Day Banner */}
          <div className="p-4 rounded-2xl bg-secondary-light/60 border border-secondary flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-messText">
                Showing full menu for {selectedDay} ({activeDateStr})
              </span>
            </div>
            <span className="text-xs text-messText-muted">
              Pre-skipping meals helps mess staff avoid excess grocery purchase.
            </span>
          </div>

          {/* 4 Meal Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dayMeals.map((meal) => {
              const skipped = isMealSkipped(activeDateStr, meal.mealType);

              return (
                <div
                  key={`${meal.id}_${activeDateStr}_${refreshTrigger}`}
                  className={`bg-white rounded-card-lg border transition-all shadow-soft overflow-hidden ${
                    skipped ? 'border-amber-300 bg-amber-50/20' : 'border-secondary-dark/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Meal Image */}
                    <div className="sm:w-44 h-36 sm:h-auto shrink-0 relative overflow-hidden">
                      <img
                        src={meal.image}
                        alt={meal.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/95 text-messText shadow-xs">
                          {meal.mealType}
                        </span>
                      </div>
                    </div>

                    {/* Meal Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-messText-muted flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-accent" />
                            {meal.time}
                          </span>
                          <div className="flex items-center gap-1 text-xs font-bold text-accent-dark">
                            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                            <span>{meal.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-messText mt-1 line-clamp-1">
                          {meal.title}
                        </h3>

                        <p className="text-xs text-messText-muted mt-1 line-clamp-2">
                          {meal.tagline}
                        </p>

                        {/* Platter preview */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {meal.items.slice(0, 3).map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium text-messText-muted bg-surface-subtle px-2 py-0.5 rounded border border-secondary-dark/30"
                            >
                              {item.name}
                            </span>
                          ))}
                          {meal.items.length > 3 && (
                            <span className="text-[10px] font-semibold text-primary px-1">
                              +{meal.items.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom skip toggle & rate action */}
                      <div className="mt-4 pt-3 border-t border-secondary-dark/30 flex items-center justify-between gap-2">
                        <SkipToggle
                          meal={meal}
                          dateStr={activeDateStr}
                          compact
                          onStateChange={() => setRefreshTrigger((prev) => prev + 1)}
                        />

                        <button
                          type="button"
                          onClick={() => setRatingModalMeal(meal)}
                          className="text-xs font-semibold text-primary hover:underline px-2 py-1"
                        >
                          View/Rate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: COMPARE 7 DAYS FOR 1 MEAL TYPE */}
      {viewMode === 'compareView' && (
        <div className="mt-6 space-y-6">
          {/* Meal type selector for comparison */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-messText-muted uppercase tracking-wider shrink-0">
              Compare across week:
            </span>
            {MEAL_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setCompareMealType(type.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  compareMealType === type.id
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-white text-messText-muted border border-secondary-dark/40 hover:bg-secondary'
                }`}
              >
                {type.label} ({type.time})
              </button>
            ))}
          </div>

          {/* 7 Days Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DAYS_OF_WEEK.map((day) => {
              const meal = WEEKLY_MENU[day][compareMealType];
              const dateStr = getWeekDateString(day);
              const skipped = isMealSkipped(dateStr, compareMealType);

              if (!meal) return null;

              return (
                <div
                  key={day}
                  className={`bg-white rounded-card p-4 border transition-all shadow-soft flex flex-col justify-between ${
                    skipped ? 'border-amber-300 bg-amber-50/20' : 'border-secondary-dark/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-primary">
                        {day}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-accent-dark">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        <span>{meal.rating}</span>
                      </div>
                    </div>

                    <div className="h-32 rounded-xl overflow-hidden mb-3 relative">
                      <img
                        src={meal.image}
                        alt={meal.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <div className={`w-3.5 h-3.5 border-2 rounded-xs bg-white flex items-center justify-center ${
                          meal.isVeg ? 'border-emerald-600' : 'border-rose-600'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            meal.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                          }`} />
                        </div>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-messText line-clamp-1">
                      {meal.title}
                    </h4>
                    <p className="text-[11px] text-messText-muted mt-1 line-clamp-2">
                      {meal.tagline}
                    </p>

                    <div className="mt-3 space-y-1">
                      {meal.items.map((item, idx) => (
                        <div key={idx} className="text-[11px] text-messText-muted flex items-center justify-between">
                          <span className="truncate max-w-[180px]">• {item.name}</span>
                          <span className="text-[10px] text-messText-light">{item.cal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-secondary-dark/30 flex items-center justify-between">
                    <SkipToggle
                      meal={meal}
                      dateStr={dateStr}
                      compact
                      onStateChange={() => setRefreshTrigger((prev) => prev + 1)}
                    />
                    <button
                      onClick={() => setRatingModalMeal(meal)}
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      Rate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Rating modal if clicked */}
      {ratingModalMeal && (
        <RatingModal
          isOpen={!!ratingModalMeal}
          onClose={() => setRatingModalMeal(null)}
          meal={ratingModalMeal}
          dateStr={activeDateStr}
          onReviewSaved={() => setRefreshTrigger((prev) => prev + 1)}
        />
      )}
    </div>
  );
}

