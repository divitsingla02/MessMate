import React, { useState, useEffect } from 'react';
import { Star, X, Check, UtensilsCrossed, Sparkles } from 'lucide-react';
import { saveUserReview, getUserReviewForMeal } from '../utils/storage';
import { AVAILABLE_REVIEW_TAGS } from '../data/mockReviews';
import { triggerToast } from './Toast';

export default function RatingModal({ isOpen, onClose, meal, dateStr, onReviewSaved }) {
  if (!isOpen || !meal) return null;

  const [overallRating, setOverallRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [quality, setQuality] = useState(5);
  const [taste, setTaste] = useState(5);
  const [quantity, setQuantity] = useState(4);
  const [presentation, setPresentation] = useState(4);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Check if an existing review exists for this user on this meal and date
  useEffect(() => {
    const existing = getUserReviewForMeal(meal.id, dateStr);
    if (existing) {
      setIsEditing(true);
      setOverallRating(existing.rating || 5);
      setQuality(existing.ratingsBreakdown?.quality || 5);
      setTaste(existing.ratingsBreakdown?.taste || 5);
      setQuantity(existing.ratingsBreakdown?.quantity || 4);
      setPresentation(existing.ratingsBreakdown?.presentation || 4);
      setReviewText(existing.reviewText || '');
      setSelectedTags(existing.tags || []);
    } else {
      setIsEditing(false);
      setOverallRating(5);
      setQuality(5);
      setTaste(5);
      setQuantity(4);
      setPresentation(4);
      setReviewText('');
      setSelectedTags([]);
    }
  }, [meal.id, dateStr]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewPayload = {
      mealId: meal.id,
      mealTitle: meal.title,
      mealType: meal.mealType,
      date: dateStr,
      rating: overallRating,
      ratingsBreakdown: {
        quality,
        taste,
        quantity,
        presentation
      },
      reviewText: reviewText.trim(),
      tags: selectedTags,
      likes: 1
    };

    saveUserReview(reviewPayload);

    triggerToast({
      type: 'success',
      message: isEditing ? 'Meal Review Updated!' : 'Review Submitted Successfully!',
      subtitle: `Thank you for rating today's ${meal.mealType}. Your feedback directly helps mess cooks adjust prep.`
    });

    if (onReviewSaved) {
      onReviewSaved(reviewPayload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-messText/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-card-lg max-w-lg w-full p-6 sm:p-7 shadow-soft-lg border border-secondary-dark/30 transform transition-all my-8 max-h-[92vh] overflow-y-auto"
        role="dialog"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-secondary-dark/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-accent px-2 py-0.5 rounded-full bg-accent-light">
                  {meal.mealType}
                </span>
                <span className="text-xs text-messText-light font-medium">
                  {dateStr}
                </span>
              </div>
              <h3 className="text-lg font-bold text-messText mt-0.5 line-clamp-1">
                {meal.title}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-messText-light hover:text-messText p-1.5 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Main 5-Star Rating Control */}
          <div className="text-center bg-secondary-light/60 p-4 rounded-2xl border border-secondary">
            <p className="text-xs font-semibold text-messText-muted uppercase tracking-wider mb-2">
              Overall Student Experience
            </p>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setOverallRating(star)}
                  className="p-1.5 rounded-lg hover:scale-110 transition-transform focus:outline-none"
                  aria-label={`Rate ${star} star`}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      (hoverRating || overallRating) >= star
                        ? 'fill-accent text-accent'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-medium text-accent-dark mt-2">
              {overallRating === 5 && 'Outstanding! Chef hit the spot.'}
              {overallRating === 4 && 'Very tasty & satisfying meal.'}
              {overallRating === 3 && 'Average — room for improvement.'}
              {overallRating === 2 && 'Subpar quality or cold food.'}
              {overallRating === 1 && 'Unsatisfactory food experience.'}
            </p>
          </div>

          {/* Sub-Criteria Breakdown Ratings */}
          <div className="grid grid-cols-2 gap-3">
            {/* Food Quality */}
            <div className="p-3 rounded-xl border border-secondary-dark/20 bg-surface-subtle/50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-messText">Food Quality</span>
                <span className="text-xs font-bold text-primary">{quality}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-secondary-dark rounded-lg cursor-pointer"
              />
            </div>

            {/* Taste & Spice */}
            <div className="p-3 rounded-xl border border-secondary-dark/20 bg-surface-subtle/50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-messText">Taste & Flavor</span>
                <span className="text-xs font-bold text-accent-dark">{taste}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={taste}
                onChange={(e) => setTaste(Number(e.target.value))}
                className="w-full accent-accent h-1.5 bg-secondary-dark rounded-lg cursor-pointer"
              />
            </div>

            {/* Quantity / Serving Size */}
            <div className="p-3 rounded-xl border border-secondary-dark/20 bg-surface-subtle/50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-messText">Portion / Quantity</span>
                <span className="text-xs font-bold text-primary">{quantity}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-secondary-dark rounded-lg cursor-pointer"
              />
            </div>

            {/* Presentation & Cleanliness */}
            <div className="p-3 rounded-xl border border-secondary-dark/20 bg-surface-subtle/50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-messText">Hygiene / Counter</span>
                <span className="text-xs font-bold text-accent-dark">{presentation}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={presentation}
                onChange={(e) => setPresentation(Number(e.target.value))}
                className="w-full accent-accent h-1.5 bg-secondary-dark rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Quick Feedback Tags */}
          <div>
            <label className="block text-xs font-semibold text-messText-muted uppercase tracking-wider mb-2">
              Tags that best describe this meal (Optional)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_REVIEW_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-white text-messText-muted border-secondary-dark/50 hover:border-primary/50'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Written Review */}
          <div>
            <label className="block text-xs font-semibold text-messText-muted uppercase tracking-wider mb-1.5">
              Detailed Feedback for Mess Committee
            </label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="e.g., Dal was properly cooked and rotis were fresh! Tea could have slightly less sugar next time."
              className="w-full p-3 rounded-xl border border-secondary-dark/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-messText-light"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-messText-light">
              {isEditing ? '✎ Editing your existing rating' : '★ First rating for this meal'}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-messText hover:bg-secondary rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-soft flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                {isEditing ? 'Update Review' : 'Submit Review'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

