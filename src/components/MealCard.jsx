import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  Users, 
  Leaf, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  Sparkles,
  Info
} from 'lucide-react';
import SkipToggle from './SkipToggle';
import { calculateMealHeadcount } from '../utils/wasteCalculations';
import { getUserReviewForMeal } from '../utils/storage';

export default function MealCard({ 
  meal, 
  dateStr, 
  onRateClick, 
  onSkipToggle,
  defaultExpanded = true 
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // Calculate dynamic live headcount for this meal & date
  const headcount = calculateMealHeadcount(meal.mealType, dateStr);
  const userReview = getUserReviewForMeal(meal.id, dateStr);

  // Determine meal timing status relative to current time
  const getStatusBadge = () => {
    // Current time parsing or friendly badges
    const now = new Date();
    const currentHour = now.getHours();
    
    // Simple heuristic for live demo
    if (meal.mealType === 'breakfast' && currentHour >= 7 && currentHour < 10) {
      return { label: 'Live Serving Now', color: 'bg-emerald-500 text-white animate-pulse' };
    }
    if (meal.mealType === 'lunch' && currentHour >= 12 && currentHour < 15) {
      return { label: 'Live Serving Now', color: 'bg-emerald-500 text-white animate-pulse' };
    }
    if (meal.mealType === 'snacks' && currentHour >= 17 && currentHour < 19) {
      return { label: 'Live Serving Now', color: 'bg-emerald-500 text-white animate-pulse' };
    }
    if (meal.mealType === 'dinner' && currentHour >= 20 && currentHour < 22) {
      return { label: 'Live Serving Now', color: 'bg-emerald-500 text-white animate-pulse' };
    }

    return { label: 'Scheduled', color: 'bg-secondary text-primary' };
  };

  const status = getStatusBadge();

  return (
    <div className={`bg-white rounded-card-lg border transition-all duration-300 shadow-soft hover:shadow-soft-md overflow-hidden ${
      headcount.userSkipped ? 'border-amber-200/80 bg-amber-50/20' : 'border-secondary-dark/40'
    }`}>
      {/* Top Banner with Image & Meta */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden group">
        <img
          src={meal.image}
          alt={meal.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback food image if unsplash link has transient issues
            e.target.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80';
          }}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-messText shadow-xs backdrop-blur-md">
              {meal.mealType}
            </span>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs ${status.color}`}>
              {status.label}
            </span>
          </div>

          {/* Veg / Non-Veg Indicator */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg shadow-xs">
            <div className={`w-3.5 h-3.5 border-2 flex items-center justify-center rounded-xs ${
              meal.isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                meal.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`} />
            </div>
            <span className="text-[11px] font-semibold text-messText">
              {meal.isVeg ? 'Pure Veg' : 'Non-Veg / Veg Counter'}
            </span>
          </div>
        </div>

        {/* Bottom Hero Info inside Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-200 mb-1">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>{meal.time}</span>
            <span className="text-white/40">•</span>
            <span className="text-white/80">{meal.category}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight line-clamp-1 drop-shadow-sm">
            {meal.title}
          </h3>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 sm:p-5">
        {/* Tagline / Description */}
        <p className="text-xs sm:text-sm text-messText-muted leading-relaxed line-clamp-2">
          {meal.tagline}
        </p>

        {/* Rating & Headcount Quick Bar */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-secondary-dark/30">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent-light border border-accent/20">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="text-xs font-bold text-accent-dark">
                {meal.rating}
              </span>
            </div>
            <span className="text-xs text-messText-light">
              ({meal.reviewCount} student ratings)
            </span>
          </div>

          {/* Headcount estimation */}
          <div className="flex items-center justify-end gap-1.5 text-xs text-messText-muted">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="font-semibold text-messText">
              {headcount.attendingCount}
            </span>
            <span className="text-messText-light">/ {headcount.baseCapacity} eating</span>
          </div>
        </div>

        {/* Headcount Savings Alert when user or peers skip */}
        <div className="mt-2.5 py-1.5 px-3 rounded-xl bg-secondary-light/60 flex items-center justify-between text-xs">
          <span className="text-messText-muted flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span><b>{headcount.totalSkips}</b> students skipping</span>
          </span>
          <span className="font-semibold text-emerald-800">
            ~{headcount.estimatedKgAvoided} kg prep avoided
          </span>
        </div>

        {/* Interactive Meal Skip System Toggle */}
        <div className="mt-4">
          <SkipToggle 
            meal={meal} 
            dateStr={dateStr} 
            onStateChange={onSkipToggle} 
          />
        </div>

        {/* Menu Items Preview & Expand */}
        <div className="mt-4 pt-3 border-t border-secondary-dark/30">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-xs font-semibold text-messText hover:text-primary transition-colors py-1"
          >
            <span className="flex items-center gap-1.5">
              <span>What's on the platter ({meal.items.length} items)</span>
            </span>
            <span className="flex items-center gap-1 text-messText-light text-[11px]">
              {isExpanded ? 'Hide items' : 'View full menu'}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-2 animate-fade-in">
              {meal.items.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-surface-subtle border border-secondary-dark/20 text-xs"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-messText">{item.name}</span>
                      <span className="text-[10px] text-messText-light font-medium bg-white px-1.5 py-0.5 rounded border border-secondary-dark/30">
                        {item.cal}
                      </span>
                    </div>
                    <p className="text-[11px] text-messText-muted mt-0.5 leading-tight">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Highlights & Allergens */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {meal.highlights?.map((h, i) => (
                  <span key={i} className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {h}
                  </span>
                ))}
                {meal.allergens && (
                  <span className="text-[10px] text-messText-light px-1.5 py-0.5">
                    Contains: {meal.allergens.join(', ')}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions: Rate this Meal */}
        <div className="mt-4 pt-3 border-t border-secondary-dark/30 flex items-center justify-between gap-2">
          {userReview ? (
            <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span>You rated this: <b>{userReview.rating}/5</b></span>
            </div>
          ) : (
            <span className="text-xs text-messText-light">
              Had this meal? Share feedback
            </span>
          )}

          <button
            type="button"
            onClick={() => onRateClick(meal)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-secondary text-primary hover:bg-secondary-dark transition-all border border-secondary-dark/40 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{userReview ? 'Edit Rating' : 'Rate Meal'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

