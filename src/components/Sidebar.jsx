import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Clock, 
  Users, 
  Sparkles, 
  ChevronRight, 
  X, 
  Building2,
  Calendar,
  UtensilsCrossed
} from 'lucide-react';
import { WEEKLY_MENU, getTodayDateString, getDayName, HOSTEL_OPTIONS } from '../data/menuData';
import { getSelectedHostel, getAllSkips } from '../utils/storage';
import { calculateMealHeadcount } from '../utils/wasteCalculations';

export default function Sidebar({ isOpen, onClose }) {
  const [selectedHostel, setSelectedHostel] = useState(getSelectedHostel());
  const todayStr = getTodayDateString();
  const dayName = getDayName(todayStr);
  const todaysMenu = WEEKLY_MENU[dayName] || WEEKLY_MENU['Monday'];
  const skips = getAllSkips();

  useEffect(() => {
    const handleUpdate = () => setSelectedHostel(getSelectedHostel());
    window.addEventListener('messmate_storage_update', handleUpdate);
    return () => window.removeEventListener('messmate_storage_update', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const meals = [
    { type: 'breakfast', data: todaysMenu.breakfast },
    { type: 'lunch', data: todaysMenu.lunch },
    { type: 'snacks', data: todaysMenu.snacks },
    { type: 'dinner', data: todaysMenu.dinner },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-soft-lg flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-secondary-dark/30">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center">
                <Leaf className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-messText">Today's Quick Platter</h3>
                <span className="text-[11px] text-messText-light">{dayName} Overview</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-messText-light hover:text-messText hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Hostel */}
          <div className="mt-4 p-3 rounded-xl bg-secondary-light/70 border border-secondary flex items-center gap-2.5 text-xs">
            <Building2 className="w-4 h-4 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="font-bold text-messText block truncate">
                {selectedHostel.hostel}
              </span>
              <span className="text-[10px] text-messText-muted block truncate">
                {selectedHostel.mess}
              </span>
            </div>
          </div>

          {/* 4 meals quick timeline */}
          <div className="mt-5 space-y-3">
            {meals.map(({ type, data }) => {
              if (!data) return null;
              const hc = calculateMealHeadcount(type, todayStr, selectedHostel.capacity || 520);
              const key = `${todayStr}_${type.toLowerCase()}`;
              const isSkipped = !!skips[key];

              return (
                <div
                  key={type}
                  className={`p-3.5 rounded-xl border transition-all text-xs ${
                    isSkipped ? 'bg-amber-50/50 border-amber-300' : 'bg-surface-subtle border-secondary-dark/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-primary">
                      {type} • {data.time}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isSkipped ? 'bg-amber-200 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isSkipped ? 'Skipping' : 'Attending'}
                    </span>
                  </div>

                  <h4 className="font-bold text-messText text-sm line-clamp-1">
                    {data.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-messText-muted mt-2 pt-2 border-t border-secondary-dark/20">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-primary" />
                      <b>{hc.attendingCount}</b> eating
                    </span>
                    <span className="text-emerald-700 font-medium">
                      ~{hc.estimatedKgAvoided} kg saved
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-secondary-dark/30 text-center">
          <p className="text-[11px] text-messText-light">
            MessMate • Eat smart. Waste less.
          </p>
        </div>
      </div>
    </div>
  );
}

