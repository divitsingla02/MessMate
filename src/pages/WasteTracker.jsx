import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Scale, 
  Utensils, 
  TrendingUp, 
  Sparkles, 
  CloudRain, 
  Droplets, 
  IndianRupee, 
  Sliders, 
  Trophy, 
  Info,
  CheckCircle2,
  Calendar,
  Building2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import WasteStats from '../components/WasteStats';
import AchievementCard from '../components/AchievementCard';
import { 
  calculateUserWasteMetrics, 
  calculateCommunityWasteMetrics 
} from '../utils/wasteCalculations';
import { getAssumptions, saveAssumptions } from '../utils/storage';
import { triggerToast } from '../components/Toast';

export default function WasteTracker() {
  const [assumptions, setAssumptionsState] = useState(getAssumptions());
  const [activeTab, setActiveTab] = useState('overview'); // overview, charts, achievements, leaderboard
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const userMetrics = calculateUserWasteMetrics();
  const commMetrics = calculateCommunityWasteMetrics();

  // Listen to storage update events
  useEffect(() => {
    const handleUpdate = () => {
      setAssumptionsState(getAssumptions());
      setRefreshTrigger((prev) => prev + 1);
    };
    window.addEventListener('messmate_storage_update', handleUpdate);
    return () => window.removeEventListener('messmate_storage_update', handleUpdate);
  }, []);

  // Update portion assumption
  const handlePortionChange = (newGrams) => {
    const updated = { ...assumptions, portionGrams: Number(newGrams) };
    setAssumptionsState(updated);
    saveAssumptions(updated);
    triggerToast({
      type: 'info',
      message: `Portion assumption updated to ${newGrams}g`,
      subtitle: 'All waste savings calculations and charts recalculated.'
    });
  };

  // Prepare chart data dynamically based on the current assumption
  const last7DaysChartData = commMetrics.last7Days.map(d => ({
    day: d.day,
    breakfast: d.breakfast,
    lunch: d.lunch,
    snacks: d.snacks,
    dinner: d.dinner,
    totalSkips: d.total,
    kgSaved: Number(((d.total * assumptions.portionGrams) / 1000).toFixed(1))
  }));

  const weeklyTrendsChartData = commMetrics.weeklyTrends.map(w => ({
    week: w.week,
    foodSavedKg: Number(((w.mealsSkipped * assumptions.portionGrams) / 1000).toFixed(0)),
    mealsSkipped: w.mealsSkipped,
    carbonSavedKg: Math.round(w.mealsSkipped * (assumptions.co2ePerMealKg || 0.85))
  }));

  const pieColors = ['#234D3B', '#E99A48', '#4E876B', '#F4B266'];

  return (
    <div className="min-h-screen pb-24 lg:pb-16 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-secondary-dark/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-100">
              Sustainability Engine
            </span>
            <span className="text-xs text-messText-light font-medium">
              Hostel Food Waste Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-messText tracking-tight">
            Food Waste Savings Tracker
          </h1>
          <p className="text-xs sm:text-sm text-messText-muted mt-1">
            Measure avoided kitchen preparation through timely student skip notifications.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-secondary-dark/40 shadow-xs self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-primary text-white shadow-xs'
                : 'text-messText-muted hover:text-messText'
            }`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'charts'
                ? 'bg-primary text-white shadow-xs'
                : 'text-messText-muted hover:text-messText'
            }`}
          >
            Analytics & Trends
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'achievements'
                ? 'bg-primary text-white shadow-xs'
                : 'text-messText-muted hover:text-messText'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Achievements</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-primary text-white shadow-xs'
                : 'text-messText-muted hover:text-messText'
            }`}
          >
            Hostel Leaderboard
          </button>
        </div>
      </div>

      {/* Editable Demo Assumption Banner */}
      <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-secondary-dark/40 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-light text-accent-dark flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-messText flex items-center gap-2">
                <span>Transparent Estimation Model Parameters</span>
                <span className="text-[10px] bg-secondary text-primary px-2 py-0.5 rounded-full font-semibold">
                  Live Recalculation
                </span>
              </h3>
              <p className="text-xs text-messText-muted mt-0.5 max-w-xl">
                Standard mess prep assumption per single student plate. Adjust this slider to test different portion sizes:
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-surface-subtle p-3 rounded-xl border border-secondary-dark/30">
            <div className="text-right">
              <span className="text-xs text-messText-muted block">Grams / Meal:</span>
              <span className="text-base font-black text-primary">
                {assumptions.portionGrams}g
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="500"
              step="25"
              value={assumptions.portionGrams}
              onChange={(e) => handlePortionChange(e.target.value)}
              className="w-32 sm:w-40 accent-primary cursor-pointer"
            />
          </div>
        </div>

        <p className="text-[11px] text-messText-light mt-3 pt-2.5 border-t border-secondary-dark/20 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-accent shrink-0" />
          <span>
            <b>Notice:</b> Avoided kitchen preparation calculations reflect timely student skip commitments and raw ingredient batch reductions (flour, rice, dal), rather than direct scale readings of waste bins.
          </span>
        </p>
      </div>

      {/* TAB 1: OVERVIEW & STATS */}
      {activeTab === 'overview' && (
        <div className="mt-6 space-y-6 animate-fade-in">
          {/* Main Waste Stats Component */}
          <WasteStats />

          {/* Personal vs Community Impact Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Your Personal Impact */}
            <div className="bg-white p-5 sm:p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft">
              <div className="flex items-center justify-between pb-4 border-b border-secondary-dark/30">
                <div>
                  <h3 className="text-base font-bold text-messText">Your Student Impact</h3>
                  <p className="text-xs text-messText-muted mt-0.5">
                    Cumulative contributions from your attendance choices
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  YOU
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3.5 rounded-xl bg-surface-subtle border border-secondary-dark/20">
                  <span className="text-[11px] font-semibold text-messText-light block uppercase">
                    Meals Notified
                  </span>
                  <span className="text-2xl font-black text-messText mt-0.5 block">
                    {userMetrics.totalUserSkips}
                  </span>
                  <span className="text-[10px] text-messText-light">
                    Avoided portion waste
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-subtle border border-secondary-dark/20">
                  <span className="text-[11px] font-semibold text-messText-light block uppercase">
                    Food Weight Saved
                  </span>
                  <span className="text-2xl font-black text-emerald-800 mt-0.5 block">
                    {userMetrics.userKgSaved} <span className="text-sm font-bold">kg</span>
                  </span>
                  <span className="text-[10px] text-messText-light">
                    Based on {assumptions.portionGrams}g/meal
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-subtle border border-secondary-dark/20">
                  <span className="text-[11px] font-semibold text-messText-light block uppercase">
                    CO₂e Prevented
                  </span>
                  <span className="text-2xl font-black text-blue-900 mt-0.5 block">
                    {userMetrics.userCo2Avoided} <span className="text-sm font-bold">kg</span>
                  </span>
                  <span className="text-[10px] text-messText-light">
                    Agricultural emissions
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-subtle border border-secondary-dark/20">
                  <span className="text-[11px] font-semibold text-messText-light block uppercase">
                    Water Preserved
                  </span>
                  <span className="text-2xl font-black text-teal-900 mt-0.5 block">
                    {userMetrics.userWaterSaved} <span className="text-sm font-bold">L</span>
                  </span>
                  <span className="text-[10px] text-messText-light">
                    Virtual crop water
                  </span>
                </div>
              </div>

              {/* Progress towards next achievement */}
              <div className="mt-5 p-3.5 rounded-xl bg-secondary-light/70 border border-secondary">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-messText">Next Milestone Progress</span>
                  <span className="font-bold text-primary">
                    {userMetrics.unlockedAchievements.find(a => !a.isUnlocked)?.title || 'All Milestones Cleared!'}
                  </span>
                </div>
                {userMetrics.unlockedAchievements.find(a => !a.isUnlocked) && (
                  <div className="h-2 bg-secondary-dark/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ 
                        width: `${userMetrics.unlockedAchievements.find(a => !a.isUnlocked)?.progress || 0}%` 
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Meal Category Distribution Chart */}
            <div className="bg-white p-5 sm:p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-secondary-dark/30">
                  <div>
                    <h3 className="text-base font-bold text-messText">Meal-Wise Skip Distribution</h3>
                    <p className="text-xs text-messText-muted mt-0.5">
                      Which meals see the highest advance skip rates?
                    </p>
                  </div>
                  <span className="text-xs font-bold text-accent-dark bg-accent-light px-2.5 py-1 rounded-full">
                    Dinner is #1
                  </span>
                </div>

                <div className="h-56 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={commMetrics.distribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {commMetrics.distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(val) => [`${val}% of all skips`, 'Share']}
                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #CBD5CD' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-secondary-dark/20 text-xs">
                {commMetrics.distribution.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: pieColors[i] }} />
                    <span className="font-semibold text-messText">{item.name}:</span>
                    <span className="text-messText-muted">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DETAILED ANALYTICS & TRENDS CHARTS */}
      {activeTab === 'charts' && (
        <div className="mt-6 space-y-6 animate-fade-in">
          {/* Chart 1: Daily Skips Breakdown (Last 7 Days) */}
          <div className="bg-white p-5 sm:p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-secondary-dark/30">
              <div>
                <h3 className="text-base font-bold text-messText">Daily Meal Skips & Estimated Food Weight Saved</h3>
                <p className="text-xs text-messText-muted mt-0.5">
                  Breakdown by Breakfast, Lunch, Snacks, and Dinner over the last 7 days.
                </p>
              </div>
              <span className="text-xs font-semibold bg-secondary px-3 py-1 rounded-full text-primary">
                Weekend peak skips observed
              </span>
            </div>

            <div className="h-72 mt-5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={last7DaysChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F0" />
                  <XAxis dataKey="day" stroke="#617065" fontSize={12} />
                  <YAxis stroke="#617065" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #CBD5CD' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="breakfast" name="Breakfast" stackId="a" fill="#4E876B" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="lunch" name="Lunch" stackId="a" fill="#E99A48" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="snacks" name="Evening Snacks" stackId="a" fill="#F4B266" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="dinner" name="Dinner" stackId="a" fill="#234D3B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Weekly Cumulative Food Saved Trend */}
          <div className="bg-white p-5 sm:p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-secondary-dark/30">
              <div>
                <h3 className="text-base font-bold text-messText">Weekly Sustainability Trajectory</h3>
                <p className="text-xs text-messText-muted mt-0.5">
                  Monthly trend of total food kilograms saved and greenhouse gas avoided across campus.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <TrendingUp className="w-4 h-4" />
                <span>+38.6% adoption this month</span>
              </div>
            </div>

            <div className="h-72 mt-5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrendsChartData}>
                  <defs>
                    <linearGradient id="foodGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#234D3B" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#234D3B" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E99A48" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#E99A48" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F0" />
                  <XAxis dataKey="week" stroke="#617065" fontSize={12} />
                  <YAxis stroke="#617065" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #CBD5CD' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey="foodSavedKg"
                    name="Food Prep Saved (kg)"
                    stroke="#234D3B"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#foodGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="carbonSavedKg"
                    name="CO₂e Avoided (kg)"
                    stroke="#E99A48"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#carbonGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ACHIEVEMENTS & MILESTONES */}
      {activeTab === 'achievements' && (
        <div className="mt-6 space-y-6 animate-fade-in">
          <div className="p-6 rounded-card-lg bg-white border border-secondary-dark/40 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-accent" />
              <h3 className="text-base font-bold text-messText">Student Waste Reduction Badges</h3>
            </div>
            <p className="text-xs text-messText-muted leading-relaxed">
              Earn badges and green dining honors by consistently notifying the mess kitchen before meals you plan to skip.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {userMetrics.unlockedAchievements.map((ach) => (
                <AchievementCard key={ach.id} achievement={ach} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HOSTEL LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="mt-6 space-y-6 animate-fade-in">
          <div className="bg-white p-5 sm:p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-secondary-dark/30">
              <div>
                <h3 className="text-base font-bold text-messText">Inter-Hostel Waste Reduction Ranking</h3>
                <p className="text-xs text-messText-muted mt-0.5">
                  Campus hostels competing to minimize preventable kitchen preparation surplus.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Semester 2026 Season
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {commMetrics.leaderboard.map((item) => (
                <div
                  key={item.rank}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    item.rank === 1
                      ? 'border-accent/40 bg-accent-light/40 shadow-xs'
                      : 'border-secondary-dark/30 bg-surface-subtle/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                      item.rank === 1
                        ? 'bg-accent text-white shadow-xs'
                        : item.rank === 2
                        ? 'bg-slate-300 text-slate-800'
                        : item.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-secondary text-messText-muted'
                    }`}>
                      #{item.rank}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-messText flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.rank === 1 && <Sparkles className="w-3.5 h-3.5 text-accent" />}
                      </h4>
                      <span className="text-xs text-messText-light">
                        {item.students} resident students enrolled
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 self-end sm:self-auto text-xs">
                    <div>
                      <span className="text-messText-light block text-[10px] uppercase font-semibold">Confirmed Skips</span>
                      <span className="font-bold text-messText">{item.skips}</span>
                    </div>

                    <div>
                      <span className="text-messText-light block text-[10px] uppercase font-semibold">Prep Saved</span>
                      <span className="font-bold text-emerald-800">{item.foodSavedKg} kg</span>
                    </div>

                    <div className="text-right">
                      <span className="text-messText-light block text-[10px] uppercase font-semibold">Efficiency</span>
                      <span className="font-extrabold text-primary">{item.reductionRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

