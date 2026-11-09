import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import WeeklyMenu from './pages/WeeklyMenu';
import MealRatings from './pages/MealRatings';
import WasteTracker from './pages/WasteTracker';
import Profile from './pages/Profile';
import { ToastProvider } from './components/Toast';
import { Leaf, Heart, Coffee, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-messText flex flex-col font-sans selection:bg-accent-light selection:text-accent-dark">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content View */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/weekly" element={<WeeklyMenu />} />
            <Route path="/ratings" element={<MealRatings />} />
            <Route path="/tracker" element={<WasteTracker />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <footer className="bg-white border-t border-secondary-dark/40 py-10 mt-16 text-xs text-messText-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-secondary-dark/30">
              {/* Brand and Mission */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-black">
                    <Leaf className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-lg font-black text-primary tracking-tight">
                    Mess<span className="text-accent">Mate</span>
                  </span>
                </div>
                <p className="text-xs text-messText-muted leading-relaxed max-w-sm">
                  Smart hostel mess companion designed to empower students and kitchen staff. By bridging advance attendance communication, we eliminate preventable food preparation waste on campus.
                </p>
                <div className="flex items-center gap-2 text-emerald-800 text-[11px] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Campus Sustainability Initiative • 2026</span>
                </div>
              </div>

              {/* Navigation Quick Links */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-messText mb-3">
                  Quick Navigation
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="hover:text-primary transition-colors">Today's 4 Meals</Link>
                  </li>
                  <li>
                    <Link to="/weekly" className="hover:text-primary transition-colors">7-Day Menu Calendar</Link>
                  </li>
                  <li>
                    <Link to="/ratings" className="hover:text-primary transition-colors">Student Ratings & Reviews</Link>
                  </li>
                  <li>
                    <Link to="/tracker" className="hover:text-primary transition-colors">Waste Reduction Engine</Link>
                  </li>
                  <li>
                    <Link to="/profile" className="hover:text-primary transition-colors">Student Profile & Preferences</Link>
                  </li>
                </ul>
              </div>

              {/* Impact Modeling Info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-messText mb-3">
                  Estimation Model
                </h4>
                <p className="text-[11px] leading-relaxed text-messText-light">
                  Estimates assume an average baseline of <b>350 grams</b> raw culinary preparation avoided per advance meal skip notification.
                </p>
                <div className="mt-3 p-2.5 rounded-xl bg-secondary-light/60 border border-secondary text-[11px] text-primary font-medium">
                  🌱 Eat smart. Waste less.
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-messText-light">
              <p>© 2026 MessMate. Built for college hostel mess management.</p>
              <p className="flex items-center gap-1">
                Designed with care for hostel students & mess kitchen teams
              </p>
            </div>
          </div>
        </footer>

        {/* Slide-out Sidebar Drawer */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </ToastProvider>
  );
}

