import React, { useState, useEffect } from 'react';
import { 
  User, 
  Building2, 
  Utensils, 
  Bell, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Sliders,
  Download,
  AlertTriangle,
  Heart
} from 'lucide-react';
import { 
  getProfile, 
  saveProfile, 
  getSelectedHostel, 
  saveSelectedHostel, 
  resetDemoData, 
  getAllSkips,
  DEFAULT_PROFILE 
} from '../utils/storage';
import { HOSTEL_OPTIONS } from '../data/menuData';
import ConfirmationModal from '../components/ConfirmationModal';
import { triggerToast } from '../components/Toast';

export default function Profile() {
  const [profile, setProfileState] = useState(getProfile());
  const [selectedHostel, setSelectedHostelState] = useState(getSelectedHostel());
  const [skipsCount, setSkipsCount] = useState(Object.keys(getAllSkips()).length);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  // Sync state on storage events
  useEffect(() => {
    const handleUpdate = () => {
      setProfileState(getProfile());
      setSelectedHostelState(getSelectedHostel());
      setSkipsCount(Object.keys(getAllSkips()).length);
    };
    window.addEventListener('messmate_storage_update', handleUpdate);
    return () => window.removeEventListener('messmate_storage_update', handleUpdate);
  }, []);

  const handleProfileChange = (field, value) => {
    setProfileState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationToggle = (field) => {
    setProfileState((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field]
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveProfile(profile);

    // Save corresponding hostel capacity
    const foundHostel = HOSTEL_OPTIONS.find((h) => h.name === profile.hostel);
    if (foundHostel) {
      saveSelectedHostel({
        hostel: foundHostel.name,
        mess: foundHostel.mess,
        capacity: foundHostel.capacity
      });
      setSelectedHostelState({
        hostel: foundHostel.name,
        mess: foundHostel.mess,
        capacity: foundHostel.capacity
      });
    }

    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 3000);

    triggerToast({
      type: 'success',
      message: 'Profile & Preferences Updated!',
      subtitle: 'Your meal reminders and dietary tags have been saved to local device storage.'
    });
  };

  const handleResetConfirm = () => {
    resetDemoData();
    setProfileState(DEFAULT_PROFILE);
    setIsResetModalOpen(false);

    triggerToast({
      type: 'info',
      message: 'Demo Data Reset',
      subtitle: 'Cleared all local skips, custom ratings and reverted to factory defaults.'
    });
  };

  // Export JSON summary of student skips
  const handleExportSkips = () => {
    const skips = getAllSkips();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(skips, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `messmate_skips_${profile.rollNumber || 'export'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    triggerToast({
      type: 'success',
      message: 'Export Complete',
      subtitle: 'Downloaded your meal skip history as JSON.'
    });
  };

  return (
    <div className="min-h-screen pb-24 lg:pb-16 pt-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-secondary-dark/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-accent-light">
              Account & Settings
            </span>
            <span className="text-xs text-messText-light font-medium">
              Student Resident ID
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-messText tracking-tight">
            Profile & Dining Preferences
          </h1>
          <p className="text-xs sm:text-sm text-messText-muted mt-1">
            Manage your hostel allocation, caterer preferences, dietary requirements and notification triggers.
          </p>
        </div>

        {/* Quick summary badge */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-secondary-dark/30 shadow-xs self-start md:self-auto">
          <div className="w-10 h-10 rounded-xl bg-primary text-white font-black flex items-center justify-center text-sm">
            {profile.name ? profile.name.charAt(0) : 'A'}
          </div>
          <div>
            <span className="text-xs font-bold text-messText block">
              {profile.name}
            </span>
            <span className="text-[11px] text-messText-light block">
              Roll No: {profile.rollNumber}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-8 space-y-8">
        {/* Section 1: Student Information */}
        <div className="bg-white p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft">
          <div className="flex items-center gap-2.5 pb-4 border-b border-secondary-dark/30">
            <User className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-messText">Student Details</h2>
              <p className="text-xs text-messText-muted">Official campus identification for mess check-in</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <div>
              <label className="block text-xs font-semibold text-messText-muted uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-secondary-dark/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-messText-muted uppercase tracking-wider mb-1.5">
                Roll / Student Number
              </label>
              <input
                type="text"
                value={profile.rollNumber}
                onChange={(e) => handleProfileChange('rollNumber', e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-secondary-dark/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-messText-muted uppercase tracking-wider mb-1.5">
                Room Number
              </label>
              <input
                type="text"
                value={profile.room}
                onChange={(e) => handleProfileChange('room', e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-secondary-dark/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-messText-muted uppercase tracking-wider mb-1.5">
                Student Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-secondary-dark/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Hostel & Mess Allocation */}
        <div className="bg-white p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft">
          <div className="flex items-center gap-2.5 pb-4 border-b border-secondary-dark/30">
            <Building2 className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-messText">Hostel & Dining Hall Allocation</h2>
              <p className="text-xs text-messText-muted">Assigned catering wing on campus</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <div>
              <label className="block text-xs font-semibold text-messText-muted uppercase tracking-wider mb-1.5">
                Hostel Residence Block
              </label>
              <select
                value={profile.hostel}
                onChange={(e) => {
                  const targetHostel = e.target.value;
                  const matching = HOSTEL_OPTIONS.find(h => h.name === targetHostel);
                  setProfileState(prev => ({
                    ...prev,
                    hostel: targetHostel,
                    mess: matching ? matching.mess : prev.mess
                  }));
                }}
                className="w-full p-2.5 rounded-xl border border-secondary-dark/40 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
              >
                {HOSTEL_OPTIONS.map((h) => (
                  <option key={h.id} value={h.name}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-messText-muted uppercase tracking-wider mb-1.5">
                Mess Facility & Contractor
              </label>
              <input
                type="text"
                value={profile.mess}
                readOnly
                className="w-full p-2.5 rounded-xl border border-secondary-dark/30 text-sm bg-surface-subtle text-messText-muted focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Dietary & Portion Preferences */}
        <div className="bg-white p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft">
          <div className="flex items-center gap-2.5 pb-4 border-b border-secondary-dark/30">
            <Utensils className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-messText">Dietary Requirements & Portion Sizes</h2>
              <p className="text-xs text-messText-muted">Helps the kitchen tailor daily prep batches</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
            {/* Dietary Preference */}
            <div>
              <label className="block text-xs font-semibold text-messText-muted uppercase tracking-wider mb-2">
                Dietary Category
              </label>
              <div className="space-y-2">
                {['Vegetarian', 'Non-Vegetarian', 'Jain (No Root Veg)', 'Vegan', 'Eggetarian'].map((diet) => (
                  <label
                    key={diet}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      profile.dietary === diet
                        ? 'border-primary bg-secondary-light/70 font-semibold text-primary'
                        : 'border-secondary-dark/30 hover:bg-surface-subtle text-messText'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="dietary"
                        value={diet}
                        checked={profile.dietary === diet}
                        onChange={(e) => handleProfileChange('dietary', e.target.value)}
                        className="accent-primary"
                      />
                      <span className="text-xs">{diet}</span>
                    </div>
                    {profile.dietary === diet && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Typical Portion Preference */}
            <div>
              <label className="block text-xs font-semibold text-messText-muted uppercase tracking-wider mb-2">
                Typical Appetite / Portion Size
              </label>
              <div className="space-y-2">
                {[
                  { label: 'Light Portion (~250g)', desc: '1 roti / half bowl rice, light appetite' },
                  { label: 'Standard (350g)', desc: 'Average balanced mess platter (Recommended)' },
                  { label: 'Hearty Portion (~450g)', desc: 'Extra rotis / generous gym intake' },
                ].map((item) => (
                  <label
                    key={item.label}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      profile.portionPreference?.startsWith(item.label.split(' ')[0])
                        ? 'border-accent bg-accent-light/50 font-semibold text-accent-dark'
                        : 'border-secondary-dark/30 hover:bg-surface-subtle text-messText'
                    }`}
                  >
                    <input
                      type="radio"
                      name="portionPreference"
                      value={item.label}
                      checked={profile.portionPreference?.startsWith(item.label.split(' ')[0])}
                      onChange={(e) => handleProfileChange('portionPreference', e.target.value)}
                      className="accent-accent mt-0.5"
                    />
                    <div>
                      <span className="text-xs block font-bold">{item.label}</span>
                      <span className="text-[11px] text-messText-muted font-normal block mt-0.5">{item.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Notifications & Cutoff Timers */}
        <div className="bg-white p-6 rounded-card-lg border border-secondary-dark/40 shadow-soft">
          <div className="flex items-center gap-2.5 pb-4 border-b border-secondary-dark/30">
            <Bell className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-messText">Alerts & Meal Cutoff Reminders</h2>
              <p className="text-xs text-messText-muted">Never forget to submit advance skip decisions</p>
            </div>
          </div>

          <div className="space-y-4 mt-5">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-secondary-dark/30 bg-surface-subtle/50">
              <div>
                <span className="text-xs font-bold text-messText block">
                  Advance Cutoff Reminder (45 mins prior)
                </span>
                <span className="text-[11px] text-messText-muted">
                  Send notification before headchefs begin food boiling/preparation.
                </span>
              </div>
              <input
                type="checkbox"
                checked={!!profile.notifications?.reminders}
                onChange={() => handleNotificationToggle('reminders')}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-secondary-dark/30 bg-surface-subtle/50">
              <div>
                <span className="text-xs font-bold text-messText block">
                  Daily Morning Menu Broadcast
                </span>
                <span className="text-[11px] text-messText-muted">
                  Receive the 4-meal daily menu card at 7:00 AM every morning.
                </span>
              </div>
              <input
                type="checkbox"
                checked={!!profile.notifications?.dailyMenu}
                onChange={() => handleNotificationToggle('dailyMenu')}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-secondary-dark/30 bg-surface-subtle/50">
              <div>
                <span className="text-xs font-bold text-messText block">
                  Hostel Sustainability Milestones
                </span>
                <span className="text-[11px] text-messText-muted">
                  Get notified when your hostel saves 100+ kg of food prep surplus.
                </span>
              </div>
              <input
                type="checkbox"
                checked={!!profile.notifications?.communityAlerts}
                onChange={() => handleNotificationToggle('communityAlerts')}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-soft flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Preferences</span>
            </button>
            {isSavedRecently && (
              <span className="text-xs text-primary font-bold flex items-center gap-1 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Saved to browser!
              </span>
            )}
          </div>

          {/* Export skip history button */}
          <button
            type="button"
            onClick={handleExportSkips}
            className="px-4 py-2.5 border border-secondary-dark text-xs font-semibold rounded-xl hover:bg-secondary text-messText transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Skip Data</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>

        {/* Danger Zone: Reset Demo Data */}
        <div className="mt-12 p-5 sm:p-6 rounded-card-lg border border-rose-200 bg-rose-50/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-rose-950">Developer & Demo Data Reset</h3>
                <p className="text-xs text-rose-800/80 mt-1 leading-relaxed">
                  Clear all active meal skip states, locally authored ratings, custom portion assumptions, and revert to initial demo data.
                </p>
                <span className="inline-block mt-2 text-[11px] text-rose-700 font-semibold bg-rose-100/70 px-2 py-0.5 rounded">
                  Current logged skips: {skipsCount} meals
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </form>

      {/* Confirmation Modal for Resetting Data */}
      <ConfirmationModal
        isOpen={isResetModalOpen}
        title="Reset All Demo Data?"
        message="This will clear your local meal attendance toggles, personal reviews, and restored default assumptions. Are you sure you want to proceed?"
        confirmLabel="Yes, Reset Everything"
        cancelLabel="Keep My Data"
        isDanger={true}
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}

