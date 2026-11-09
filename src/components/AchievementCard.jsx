import React from 'react';
import { 
  Footprints, 
  ShieldCheck, 
  Leaf, 
  Award, 
  Crown, 
  Lock, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

const ICON_MAP = {
  Footprints: Footprints,
  ShieldCheck: ShieldCheck,
  Leaf: Leaf,
  Award: Award,
  Crown: Crown
};

export default function AchievementCard({ achievement }) {
  const IconComponent = ICON_MAP[achievement.icon] || Award;
  const isUnlocked = achievement.isUnlocked;

  return (
    <div className={`p-4 rounded-card border transition-all relative overflow-hidden ${
      isUnlocked
        ? 'bg-white border-secondary-dark/40 shadow-soft hover:shadow-soft-md'
        : 'bg-surface-subtle/60 border-secondary-dark/20 opacity-75'
    }`}>
      {/* Top right unlock badge */}
      <div className="absolute top-3 right-3">
        {isUnlocked ? (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Unlocked
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-messText-light bg-secondary px-2 py-0.5 rounded-full">
            <Lock className="w-3 h-3" />
            {achievement.current}/{achievement.target}
          </span>
        )}
      </div>

      <div className="flex items-start gap-3.5">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
          isUnlocked
            ? 'bg-primary text-white border-primary-light shadow-xs'
            : 'bg-secondary text-messText-light border-secondary-dark/40'
        }`}>
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0 pr-12">
          <h4 className="text-sm font-bold text-messText flex items-center gap-1.5">
            <span>{achievement.title}</span>
            {isUnlocked && <Sparkles className="w-3.5 h-3.5 text-accent" />}
          </h4>
          <p className="text-xs text-messText-muted mt-1 leading-relaxed">
            {achievement.description}
          </p>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-messText-light">
                {isUnlocked ? 'Goal achieved!' : `${achievement.target - achievement.current} more skips to unlock`}
              </span>
              <span className="font-bold text-messText">
                {achievement.progress}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-secondary-dark/40 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-700 ${
                  isUnlocked ? 'bg-primary' : 'bg-accent'
                }`}
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-secondary-dark/20 text-[10px] font-medium text-accent-dark">
            Reward: {achievement.reward}
          </div>
        </div>
      </div>
    </div>
  );
}

