import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  CalendarDays, 
  Star, 
  Leaf, 
  User, 
  Menu, 
  X, 
  Building2, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { getProfile, getSelectedHostel, getAllSkips } from '../utils/storage';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(getProfile());
  const [selectedHostel, setSelectedHostel] = useState(getSelectedHostel());
  const [skipsCount, setSkipsCount] = useState(Object.keys(getAllSkips()).length);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Listen to storage update events
  useEffect(() => {
    const handleStorageUpdate = () => {
      setProfile(getProfile());
      setSelectedHostel(getSelectedHostel());
      setSkipsCount(Object.keys(getAllSkips()).length);
    };

    window.addEventListener('messmate_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('messmate_storage_update', handleStorageUpdate);
  }, []);

  const navLinks = [
    { to: '/', label: "Today's Menu", icon: UtensilsCrossed, badge: null },
    { to: '/weekly', label: 'Weekly Menu', icon: CalendarDays, badge: '7 Days' },
    { to: '/ratings', label: 'Meal Ratings', icon: Star, badge: null },
    { 
      to: '/tracker', 
      label: 'Waste Tracker', 
      icon: Leaf, 
      badge: skipsCount > 0 ? `${skipsCount} saved` : null,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    { to: '/profile', label: 'Profile', icon: User, badge: null },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-secondary-dark/40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo Section */}
            <NavLink to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-primary flex items-center justify-center text-white shadow-soft group-hover:bg-primary-dark transition-colors">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-primary font-sans">
                    Mess<span className="text-accent">Mate</span>
                  </span>
                  <span className="hidden md:inline text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary text-primary">
                    Hostel Edition
                  </span>
                </div>
                <p className="text-[11px] font-medium text-messText-muted tracking-tight hidden sm:block">
                  Eat smart. Waste less.
                </p>
              </div>
            </NavLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-white shadow-soft'
                          : 'text-messText-muted hover:text-messText hover:bg-secondary/70'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        link.badgeColor || 'bg-white/20 text-white'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Profile & Hostel Quick Badge */}
            <div className="hidden sm:flex items-center gap-3">
              <NavLink
                to="/profile"
                className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-2xl bg-secondary-light/80 hover:bg-secondary border border-secondary transition-all"
              >
                <div className="text-right">
                  <span className="text-xs font-bold text-messText block line-clamp-1">
                    {profile.name}
                  </span>
                  <span className="text-[10px] text-messText-light block line-clamp-1">
                    {selectedHostel.hostel.split(' ')[0]} • Room {profile.room}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {profile.name ? profile.name.charAt(0) : 'A'}
                </div>
              </NavLink>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-messText hover:bg-secondary transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-secondary-dark/30 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-soft-lg animate-fade-in">
            {/* Quick hostel banner in mobile menu */}
            <div className="p-3 mb-2 rounded-xl bg-secondary-light flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="font-semibold text-messText">
                  {selectedHostel.hostel}
                </span>
              </div>
              <NavLink to="/profile" className="text-accent font-bold text-[11px]">
                Change
              </NavLink>
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-soft'
                        : 'text-messText-muted hover:text-messText hover:bg-secondary'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-secondary text-primary">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Tab Bar for Quick Access on Smartphones */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-secondary-dark/40 lg:hidden flex items-center justify-around py-2 px-1 shadow-soft-lg">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-medium transition-all ${
                  isActive
                    ? 'text-primary font-bold scale-105'
                    : 'text-messText-light hover:text-messText'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5 mb-0.5" />
                {link.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent" />
                )}
              </div>
              <span className="truncate max-w-[64px]">{link.label.split(' ')[0]}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}

