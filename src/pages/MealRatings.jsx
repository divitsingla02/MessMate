import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  Filter, 
  TrendingUp, 
  Sparkles, 
  Trophy, 
  ThumbsUp, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_MOCK_REVIEWS } from '../data/mockReviews';
import { getStoredReviews, saveUserReview } from '../utils/storage';
import { WEEKLY_MENU, MEAL_TYPES, getTodayDateString } from '../data/menuData';
import { StarRatingDisplay, RatingDistributionBar, ReviewCard } from '../components/MealRating';
import RatingModal from '../components/RatingModal';

export default function MealRatings() {
  const [userReviews, setUserReviews] = useState(getStoredReviews());
  const [filterMealType, setFilterMealType] = useState('all');
  const [filterStar, setFilterStar] = useState('all');
  const [sortBy, setSortBy] = useState('recent'); // recent, highest, likes
  const [selectedMealForReview, setSelectedMealForReview] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Combine initial mock reviews + user reviews from LocalStorage
  const allReviews = [...userReviews, ...INITIAL_MOCK_REVIEWS];

  // Refresh when storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      setUserReviews(getStoredReviews());
      setRefreshTrigger((prev) => prev + 1);
    };
    window.addEventListener('messmate_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('messmate_storage_update', handleStorageUpdate);
  }, []);

  // Filter reviews
  const filteredReviews = allReviews.filter((r) => {
    if (filterMealType !== 'all' && r.mealType !== filterMealType) return false;
    if (filterStar !== 'all' && Math.round(r.rating) !== Number(filterStar)) return false;
    return true;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'likes') return (b.likes || 0) - (a.likes || 0);
    // default recent
    const dateA = new Date(a.createdAt || a.date).getTime() || 0;
    const dateB = new Date(b.createdAt || b.date).getTime() || 0;
    return dateB - dateA;
  });

  // Compute aggregate stats across reviews
  const totalReviewsCount = allReviews.length;
  const averageRating = totalReviewsCount > 0
    ? (allReviews.reduce((sum, r) => sum + Number(r.rating || 5), 0) / totalReviewsCount).toFixed(1)
    : '4.6';

  const distribution = allReviews.reduce((acc, r) => {
    const s = Math.round(r.rating) || 5;
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  // Top dishes on campus
  const topDishes = [
    { name: 'Veg Hyderabadi Dum Biryani', day: 'Wednesday Dinner', rating: 4.9, reviews: 310, tag: '#1 Campus Favorite' },
    { name: 'Delhi Chole Bhature & Lassi', day: 'Saturday Breakfast', rating: 4.9, reviews: 312, tag: 'Best Weekend Brunch' },
    { name: 'Shahi Paneer & Garlic Naan', day: 'Friday Dinner', rating: 4.9, reviews: 380, tag: 'Gala Night Special' },
    { name: 'Crispy Samosa & Imli Chutney', day: 'Tuesday Snacks', rating: 4.8, reviews: 240, tag: 'Top Teatime Snack' },
    { name: 'Dal Makhani & Paneer Bhurji', day: 'Wednesday Lunch', rating: 4.8, reviews: 265, tag: 'Midweek Hit' },
  ];

  return (
    <div className="min-h-screen pb-24 lg:pb-16 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-secondary-dark/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-accent-light">
              Student Voice
            </span>
            <span className="text-xs text-messText-light font-medium">
              Daily Quality Assurance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-messText tracking-tight">
            Meal Ratings & Community Reviews
          </h1>
          <p className="text-xs sm:text-sm text-messText-muted mt-1">
            Honest feedback from fellow hostellers to help chefs and mess committees improve meal quality.
          </p>
        </div>

        {/* Rate Today's Meal Quick Button */}
        <button
          onClick={() => {
            // Pick Monday lunch as default meal to rate if not chosen
            setSelectedMealForReview(WEEKLY_MENU['Monday'].lunch);
          }}
          className="self-start md:self-auto px-5 py-2.5 bg-primary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-soft flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Rate Today’s Platter</span>
        </button>
      </div>

      {/* Aggregate Score & Distribution Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left: Overall Score Card */}
        <div className="bg-white p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-messText-muted">
            Hostel Food Satisfaction Score
          </span>
          <span className="text-5xl font-black text-messText tracking-tight mt-2">
            {averageRating}
          </span>
          <div className="mt-2">
            <StarRatingDisplay rating={averageRating} size="lg" />
          </div>
          <span className="text-xs text-messText-muted font-medium mt-2">
            Calculated across {totalReviewsCount} verified student ratings
          </span>

          <div className="w-full mt-4 pt-4 border-t border-secondary-dark/30 flex items-center justify-around text-xs text-messText-light">
            <div>
              <span className="block font-bold text-messText text-sm">94%</span>
              <span>Approval Rate</span>
            </div>
            <div className="h-6 w-[1px] bg-secondary-dark" />
            <div>
              <span className="block font-bold text-messText text-sm">{userReviews.length}</span>
              <span>Your Reviews</span>
            </div>
          </div>
        </div>

        {/* Middle: Rating Distribution */}
        <div className="bg-white p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft flex flex-col justify-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-messText-muted mb-3">
            Star Distribution Breakdown
          </h3>
          <RatingDistributionBar
            distribution={distribution}
            totalReviews={totalReviewsCount}
          />
        </div>

        {/* Right: Hall of Fame / Top Rated Dishes */}
        <div className="bg-white p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-accent" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-messText">
              Top Rated Campus Dishes
            </h3>
          </div>

          <div className="space-y-2.5">
            {topDishes.slice(0, 4).map((dish, i) => (
              <div key={i} className="flex items-center justify-between text-xs p-2 rounded-xl bg-surface-subtle border border-secondary-dark/20">
                <div className="min-w-0 pr-2">
                  <span className="font-bold text-messText block truncate">
                    {dish.name}
                  </span>
                  <span className="text-[10px] text-messText-light">
                    {dish.day} • {dish.reviews} ratings
                  </span>
                </div>
                <div className="flex items-center gap-1 font-bold text-accent-dark shrink-0">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  <span>{dish.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-secondary-dark/40 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-messText-muted uppercase tracking-wider mr-1">
            Filter:
          </span>

          {/* Meal type filter */}
          <select
            value={filterMealType}
            onChange={(e) => setFilterMealType(e.target.value)}
            className="text-xs font-semibold bg-surface-subtle text-messText p-2 rounded-xl border border-secondary-dark/40 focus:outline-none cursor-pointer"
          >
            <option value="all">All Meal Times</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="snacks">Evening Snacks</option>
            <option value="dinner">Dinner</option>
          </select>

          {/* Star filter */}
          <select
            value={filterStar}
            onChange={(e) => setFilterStar(e.target.value)}
            className="text-xs font-semibold bg-surface-subtle text-messText p-2 rounded-xl border border-secondary-dark/40 focus:outline-none cursor-pointer"
          >
            <option value="all">All Star Ratings</option>
            <option value="5">5 Stars only</option>
            <option value="4">4 Stars only</option>
            <option value="3">3 Stars only</option>
            <option value="2">2 Stars only</option>
            <option value="1">1 Star only</option>
          </select>

          {(filterMealType !== 'all' || filterStar !== 'all') && (
            <button
              onClick={() => {
                setFilterMealType('all');
                setFilterStar('all');
              }}
              className="text-xs text-primary font-bold hover:underline px-2"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-messText-muted uppercase tracking-wider">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold bg-surface-subtle text-messText p-2 rounded-xl border border-secondary-dark/40 focus:outline-none cursor-pointer"
          >
            <option value="recent">Most Recent First</option>
            <option value="highest">Highest Rating</option>
            <option value="likes">Most Helpful / Liked</option>
          </select>
        </div>
      </div>

      {/* Reviews Feed */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-xs text-messText-muted">
          <span>Showing <b>{sortedReviews.length}</b> verified student reviews</span>
        </div>

        {sortedReviews.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-card-lg border border-dashed border-secondary-dark">
            <p className="text-sm font-semibold text-messText">No reviews match the current filters.</p>
            <button
              onClick={() => {
                setFilterMealType('all');
                setFilterStar('all');
              }}
              className="mt-3 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>

      {/* Rating modal if triggered */}
      {selectedMealForReview && (
        <RatingModal
          isOpen={!!selectedMealForReview}
          onClose={() => setSelectedMealForReview(null)}
          meal={selectedMealForReview}
          dateStr={getTodayDateString()}
          onReviewSaved={() => {
            setUserReviews(getStoredReviews());
            setRefreshTrigger((prev) => prev + 1);
          }}
        />
      )}
    </div>
  );
}

