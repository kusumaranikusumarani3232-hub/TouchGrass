import React from 'react';
import { Leaf, Award, Cpu, Smartphone, Flame, Compass } from 'lucide-react';
import type { UserProgress } from '../types';

interface NavbarProps {
  currentTab: 'landing' | 'missions' | 'progress';
  setCurrentTab: (tab: 'landing' | 'missions' | 'progress') => void;
  userProgress: UserProgress;
  onOpenModelInspector: () => void;
  onOpenPocketMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userProgress,
  onOpenModelInspector,
  onOpenPocketMode
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-emerald-500/20 bg-emerald-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => setCurrentTab('landing')}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/40 group-hover:scale-105 transition-all shadow-md nature-glow">
            <Leaf className="w-6 h-6 text-emerald-300" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-200 via-teal-100 to-lime-300 bg-clip-text text-transparent">
                NatureBuddy
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold tracking-wider uppercase">
                AI
              </span>
            </div>
            <p className="text-[10px] text-emerald-300/70 font-medium tracking-wide">
              TOUCH GRASS companion
            </p>
          </div>
        </button>

        {/* Center Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-emerald-900/40 p-1 rounded-xl border border-emerald-500/20">
          <button
            onClick={() => setCurrentTab('missions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentTab === 'missions'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-200/80 hover:text-emerald-100 hover:bg-emerald-800/40'
            }`}
          >
            <Compass className="w-4 h-4" />
            Missions
          </button>

          <button
            onClick={() => setCurrentTab('progress')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentTab === 'progress'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-200/80 hover:text-emerald-100 hover:bg-emerald-800/40'
            }`}
          >
            <Award className="w-4 h-4" />
            Badges & Journal
          </button>

          <button
            onClick={onOpenModelInspector}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-300 hover:bg-emerald-800/30 transition-all border border-emerald-500/20"
          >
            <Cpu className="w-3.5 h-3.5 text-lime-400" />
            Open AI Spec
          </button>
        </nav>

        {/* Right Stats & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Streak pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30 animate-pulse" />
            <span>{userProgress.currentStreak}d Streak</span>
          </div>

          {/* Level Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
            <span className="text-emerald-400 font-bold">Lvl {userProgress.level}</span>
            <span className="text-emerald-400/50">|</span>
            <span className="text-lime-300">{userProgress.xp} XP</span>
          </div>

          {/* Pocket Mode button */}
          <button
            onClick={onOpenPocketMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg nature-glow transition-all active:scale-95"
            title="Put phone in pocket and explore outdoor"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Pocket Mode</span>
          </button>

        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex border-t border-emerald-500/20 bg-emerald-950/90 py-1.5 px-3 justify-around text-xs font-semibold">
        <button
          onClick={() => setCurrentTab('missions')}
          className={`flex items-center gap-1 py-1 px-3 rounded-lg ${
            currentTab === 'missions' ? 'bg-emerald-600 text-white' : 'text-emerald-200/70'
          }`}
        >
          <Compass className="w-4 h-4" />
          Missions
        </button>
        <button
          onClick={() => setCurrentTab('progress')}
          className={`flex items-center gap-1 py-1 px-3 rounded-lg ${
            currentTab === 'progress' ? 'bg-emerald-600 text-white' : 'text-emerald-200/70'
          }`}
        >
          <Award className="w-4 h-4" />
          Progress
        </button>
        <button
          onClick={onOpenModelInspector}
          className="flex items-center gap-1 py-1 px-3 rounded-lg text-lime-300"
        >
          <Cpu className="w-4 h-4" />
          Open AI
        </button>
      </div>
    </header>
  );
};
