import React from 'react';
import { Check, UserX, UserCheck, Sparkles, Leaf } from 'lucide-react';
import confetti from 'canvas-confetti';
import { isMealSkipped, toggleMealSkip, getAssumptions } from '../utils/storage';
import { triggerToast } from './Toast';

export default function SkipToggle({ 
  meal, 
  dateStr, 
  onStateChange, 
  compact = false 
}) {
  const isSkipped = isMealSkipped(dateStr, meal.mealType);
  const assumptions = getAssumptions();
  const portionGrams = assumptions.portionGrams || 350;

  const handleToggle = (e) => {
    e.stopPropagation();
    const nextSkippedState = toggleMealSkip(dateStr, meal.mealType, meal);

    if (nextSkippedState) {
      // Trigger eco confetti effect
      try {
        confetti({
          particleCount: 28,
          spread: 45,
          origin: { y: 0.8 },
          colors: ['#234D3B', '#E99A48', '#86EFAC', '#FAF9F6']
        });
      } catch (err) {
        // Fallback gracefully if canvas is unavailable
      }

      triggerToast({
        type: 'eco',
        message: `Marked as Skipping: ${meal.title}`,
        subtitle: `Awesome! You notified the kitchen ahead. Estimated ~${portionGrams}g of food prep saved.`
      });
    } else {
      triggerToast({
        type: 'info',
        message: `Marked as Attending: ${meal.title}`,
        subtitle: `Changed your mind? Great! Your portion will be included in the kitchen count.`
      });
    }

    if (onStateChange) {
      onStateChange(nextSkippedState);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleToggle}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
          isSkipped
            ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
            : 'bg-emerald-50 text-primary border-emerald-300 hover:bg-emerald-100'
        }`}
        title={isSkipped ? 'Click to mark as Attending' : 'Click to mark as Skipping'}
      >
        {isSkipped ? (
          <>
            <UserX className="w-3.5 h-3.5 text-amber-600" />
            <span>Skipping Meal</span>
          </>
        ) : (
          <>
            <UserCheck className="w-3.5 h-3.5 text-primary" />
            <span>Attending</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-secondary-light/70 border border-secondary transition-all">
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
          isSkipped ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-primary'
        }`}>
          {isSkipped ? <Leaf className="w-4 h-4 text-emerald-700" /> : <UserCheck className="w-4 h-4 text-primary" />}
        </div>
        <div>
          <span className="text-xs font-semibold text-messText block">
            Planning to eat this meal?
          </span>
          <span className="text-[11px] text-messText-muted flex items-center gap-1">
            {isSkipped ? (
              <span className="text-amber-800 font-medium">
                Notified kitchen: Skipping (~{portionGrams}g saved)
              </span>
            ) : (
              <span>Confirmed attending in mess</span>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 self-end sm:self-auto bg-white p-1 rounded-xl border border-secondary-dark/40 shadow-xs">
        <button
          type="button"
          onClick={!isSkipped ? undefined : handleToggle}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            !isSkipped
              ? 'bg-primary text-white shadow-xs'
              : 'text-messText-muted hover:text-messText hover:bg-secondary/60'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Attending</span>
        </button>

        <button
          type="button"
          onClick={isSkipped ? undefined : handleToggle}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isSkipped
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-messText-muted hover:text-amber-700 hover:bg-amber-50'
          }`}
        >
          <UserX className="w-3.5 h-3.5" />
          <span>Skipping</span>
        </button>
      </div>
    </div>
  );
}

