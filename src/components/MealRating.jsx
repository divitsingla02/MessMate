import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Check, ShieldCheck } from 'lucide-react';

export function StarRatingDisplay({ rating, size = 'sm', showValue = false }) {
  const iconSize = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? 'fill-accent text-accent'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-bold text-messText ml-1">
          {Number(rating).toFixed(1)}
        </span>
      )}
    </div>
  );
}

export function RatingDistributionBar({ distribution, totalReviews }) {
  // distribution = { 5: count, 4: count, 3: count, 2: count, 1: count }
  return (
    <div className="space-y-1.5 w-full">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = distribution[stars] || 0;
        const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

        return (
          <div key={stars} className="flex items-center gap-2 text-xs">
            <span className="w-6 text-messText-muted font-medium flex items-center gap-0.5 justify-end">
              {stars} <Star className="w-3 h-3 fill-accent text-accent inline" />
            </span>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-8 text-[11px] text-messText-light text-right">
              {percentage}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ReviewCard({ review }) {
  const [likes, setLikes] = useState(review.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : review.date || 'Recent';

  return (
    <div className={`p-4 rounded-card border transition-all ${
      review.isUserReview 
        ? 'border-primary/30 bg-secondary-light/40 shadow-xs' 
        : 'border-secondary-dark/30 bg-white hover:border-secondary-dark/60'
    }`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
            {review.authorName ? review.authorName.charAt(0) : 'S'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-messText">
                {review.authorName || 'Student Resident'}
              </span>
              {review.isUserReview && (
                <span className="text-[10px] bg-primary text-white px-1.5 py-0.2 rounded font-semibold">
                  You
                </span>
              )}
              <span className="text-[11px] text-messText-light">
                • {review.authorRoll || 'Hosteller'}
              </span>
            </div>
            <p className="text-[11px] text-messText-light line-clamp-1">
              {review.authorHostel || 'Aryabhata Hall (Boys)'}
            </p>
          </div>
        </div>

        {/* Rating and date */}
        <div className="flex flex-col items-end">
          <StarRatingDisplay rating={review.rating} size="sm" showValue />
          <span className="text-[10px] text-messText-light mt-0.5">
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Review text */}
      {review.reviewText && (
        <p className="text-xs text-messText mt-2.5 leading-relaxed">
          "{review.reviewText}"
        </p>
      )}

      {/* Sub-ratings badges if available */}
      {review.ratingsBreakdown && (
        <div className="flex flex-wrap items-center gap-2 mt-2.5 pt-2 border-t border-secondary-dark/20 text-[11px]">
          <span className="text-messText-muted">
            Taste: <b className="text-messText">{review.ratingsBreakdown.taste}/5</b>
          </span>
          <span className="text-messText-muted">
            Quality: <b className="text-messText">{review.ratingsBreakdown.quality}/5</b>
          </span>
          <span className="text-messText-muted">
            Portion: <b className="text-messText">{review.ratingsBreakdown.quantity}/5</b>
          </span>
        </div>
      )}

      {/* Tags & footer */}
      <div className="flex items-center justify-between gap-2 mt-3 pt-2">
        <div className="flex flex-wrap gap-1">
          {review.tags?.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-medium text-messText-muted bg-surface-subtle px-2 py-0.5 rounded-md border border-secondary-dark/30"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-md transition-colors ${
            liked
              ? 'text-primary bg-primary/10 font-bold'
              : 'text-messText-light hover:text-messText hover:bg-surface-subtle'
          }`}
        >
          <ThumbsUp className={`w-3 h-3 ${liked ? 'fill-primary' : ''}`} />
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
}

export default function MealRating({ 
  overallRating, 
  totalReviews, 
  reviews = [], 
  onWriteReviewClick 
}) {
  // Distribution calculation
  const distribution = reviews.reduce((acc, r) => {
    const star = Math.round(r.rating) || 5;
    acc[star] = (acc[star] || 0) + 1;
    return acc;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  return (
    <div className="bg-white rounded-card-lg p-5 sm:p-6 border border-secondary-dark/40 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-secondary-dark/30">
        <div>
          <h3 className="text-base font-bold text-messText">Student Reviews & Ratings</h3>
          <p className="text-xs text-messText-muted mt-0.5">
            Transparent culinary feedback from resident hostel peers.
          </p>
        </div>

        {onWriteReviewClick && (
          <button
            onClick={onWriteReviewClick}
            className="self-start sm:self-auto px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-soft flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
        {/* Rating score big summary */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-secondary-light/60 border border-secondary text-center">
          <span className="text-4xl font-black text-messText tracking-tight">
            {overallRating || '4.6'}
          </span>
          <div className="mt-1">
            <StarRatingDisplay rating={overallRating || 4.6} size="md" />
          </div>
          <span className="text-xs text-messText-muted mt-2 font-medium">
            Based on {totalReviews || reviews.length} student ratings
          </span>
        </div>

        {/* Rating distribution breakdown */}
        <div className="md:col-span-2 flex items-center">
          <RatingDistributionBar
            distribution={distribution}
            totalReviews={reviews.length}
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="mt-6 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-messText-muted">
          Recent Student Reviews
        </h4>
        {reviews.length === 0 ? (
          <div className="p-8 text-center text-xs text-messText-light bg-surface-subtle rounded-xl border border-dashed border-secondary-dark">
            No reviews yet for this meal. Be the first hosteller to share feedback!
          </div>
        ) : (
          reviews.slice(0, 5).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
}

