import React from 'react';
import { 
  Leaf, 
  Utensils, 
  Scale, 
  Users, 
  Droplets, 
  CloudRain, 
  IndianRupee, 
  Sparkles,
  Info
} from 'lucide-react';
import { calculateUserWasteMetrics, calculateCommunityWasteMetrics } from '../utils/wasteCalculations';

export default function WasteStats({ viewMode = 'combined' }) {
  const userMetrics = calculateUserWasteMetrics();
  const commMetrics = calculateCommunityWasteMetrics();

  const portionGrams = userMetrics.assumptions.portionGrams || 350;

  return (
    <div className="space-y-6">
      {/* Top Highlight Banner */}
      <div className="p-5 sm:p-6 rounded-card-lg bg-gradient-to-br from-primary via-primary-dark to-[#162e24] text-white shadow-soft-lg relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-accent/15 blur-2xl pointer-events-none" />
        <div className="absolute -left-8 -top-8 w-36 h-36 rounded-full bg-emerald-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-white/15 text-emerald-200 backdrop-blur-md">
                <Leaf className="w-3.5 h-3.5 text-accent" />
                Smarter Hostel Dining
              </span>
              <span className="text-xs text-white/70 hidden sm:inline">
                Hostel Waste Reduction Model
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              Every skipped meal notification saves ~{portionGrams}g of food preparation.
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed">
              When students notify the mess before cooking starts, kitchen teams prepare less batter, dough, and gravies — preventing surplus food from ending up in landfill.
            </p>
          </div>

          {/* Quick personal summary box */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
            <div className="text-center px-2">
              <span className="block text-2xl sm:text-3xl font-black text-accent">
                {userMetrics.totalUserSkips}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-white/80 font-semibold">
                Your Skips
              </span>
            </div>
            <div className="h-10 w-[1px] bg-white/20" />
            <div className="text-center px-2">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-300">
                {userMetrics.userKgSaved} <span className="text-sm font-medium">kg</span>
              </span>
              <span className="text-[11px] uppercase tracking-wider text-white/80 font-semibold">
                Food Saved
              </span>
            </div>
          </div>
        </div>

        {/* Transparent Estimation Model Disclaimer */}
        <div className="mt-5 pt-3.5 border-t border-white/15 flex items-start gap-2 text-[11px] text-white/75">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-accent" />
          <span>
            <b>Transparent Estimation Model:</b> 1 confirmed meal skip notification = 1 potentially avoidable food portion (editable benchmark: {portionGrams}g). This is an algorithmically simulated estimate of avoided raw ingredient preparation, not a physical trash scale measurement.
          </span>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Total Skips */}
        <div className="bg-white p-4 sm:p-5 rounded-card border border-secondary-dark/30 shadow-soft hover:shadow-soft-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-messText-muted uppercase tracking-wider">
              Total Meals Skipped
            </span>
            <div className="w-8 h-8 rounded-xl bg-accent-light text-accent-dark flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-messText tracking-tight">
              {commMetrics.totalCommunitySkips.toLocaleString()}
            </span>
            <span className="text-xs text-messText-light block mt-0.5">
              Including {userMetrics.totalUserSkips} by you
            </span>
          </div>
        </div>

        {/* Metric 2: Estimated Weight Saved */}
        <div className="bg-white p-4 sm:p-5 rounded-card border border-secondary-dark/30 shadow-soft hover:shadow-soft-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-messText-muted uppercase tracking-wider">
              Food Weight Saved
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-primary flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight">
              {commMetrics.totalCommunityKgSaved.toLocaleString()} <span className="text-base font-bold">kg</span>
            </span>
            <span className="text-xs text-messText-light block mt-0.5">
              ~{Math.round(commMetrics.totalCommunityKgSaved / 0.35).toLocaleString()} individual plates
            </span>
          </div>
        </div>

        {/* Metric 3: Carbon Footprint Avoided */}
        <div className="bg-white p-4 sm:p-5 rounded-card border border-secondary-dark/30 shadow-soft hover:shadow-soft-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-messText-muted uppercase tracking-wider">
              CO₂e Offset
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <CloudRain className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-blue-900 tracking-tight">
              {commMetrics.totalCommunityCo2Saved.toLocaleString()} <span className="text-base font-bold">kg</span>
            </span>
            <span className="text-xs text-messText-light block mt-0.5">
              0.85 kg GHG saved per portion
            </span>
          </div>
        </div>

        {/* Metric 4: Water Conserved */}
        <div className="bg-white p-4 sm:p-5 rounded-card border border-secondary-dark/30 shadow-soft hover:shadow-soft-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-messText-muted uppercase tracking-wider">
              Water Conserved
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-teal-900 tracking-tight">
              {commMetrics.totalCommunityWaterSaved} <span className="text-base font-bold">L</span>
            </span>
            <span className="text-xs text-messText-light block mt-0.5">
              Agricultural virtual water
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

