import React from 'react';
import type { UserProgress } from '../types';
import { Award, Calendar, Clock, Flame, BookOpen, Compass, CheckCircle2, Volume2 } from 'lucide-react';

interface ProgressViewProps {
  userProgress: UserProgress;
  onStartNewMission: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  userProgress,
  onStartNewMission
}) => {
  const currentLevelXP = userProgress.xp % 250;
  const xpPercentage = Math.min(100, Math.round((currentLevelXP / 250) * 100));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* GAMIFICATION OVERVIEW BANNER */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/30 bg-emerald-950/80 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Level Info */}
          <div className="space-y-3 w-full md:w-1/2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Explorer Status
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400" /> {userProgress.currentStreak} Day Streak
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-white">
              Level {userProgress.level} <span className="text-lime-300 font-normal">Nature Pioneer</span>
            </h2>

            {/* XP Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-emerald-200 font-semibold">
                <span>XP Progress</span>
                <span>{currentLevelXP} / 250 XP (Total: {userProgress.xp} XP)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-emerald-950 border border-emerald-500/30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full transition-all duration-500"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            
            <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 text-center space-y-1">
              <Clock className="w-6 h-6 text-lime-400 mx-auto" />
              <div className="text-2xl font-extrabold text-white">{userProgress.totalOutdoorMinutes}m</div>
              <p className="text-[11px] text-emerald-300/80 font-medium">Outdoor Time</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 text-center space-y-1">
              <Compass className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="text-2xl font-extrabold text-white">{userProgress.completedMissionsCount}</div>
              <p className="text-[11px] text-emerald-300/80 font-medium">Quests Completed</p>
            </div>

          </div>

        </div>

      </section>

      {/* BADGES & ACHIEVEMENTS GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              Explorer Badges
            </h3>
            <p className="text-sm text-emerald-200/80">Earn badges by completing Touch Grass outdoor missions</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-lime-300 font-bold">
            {userProgress.badges.filter(b => b.unlocked).length} / {userProgress.badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userProgress.badges.map((badge) => (
            <div
              key={badge.id}
              className={`glass-panel p-5 rounded-2xl border transition-all ${
                badge.unlocked
                  ? 'border-lime-400/40 bg-emerald-900/60 shadow-lg'
                  : 'border-emerald-500/10 opacity-60 bg-emerald-950/40'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${
                  badge.unlocked ? 'bg-amber-500/20 border-amber-400/40 sunburst-glow' : 'bg-emerald-950 border-emerald-800'
                }`}>
                  {badge.icon}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-base">{badge.name}</h4>
                    {badge.unlocked && (
                      <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">{badge.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUTDOOR DISCOVERY JOURNAL */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-teal-400" />
              Outdoor Discovery Journal
            </h3>
            <p className="text-sm text-emerald-200/80">Your log of nature observations and open AI findings</p>
          </div>
        </div>

        {userProgress.journal.length === 0 ? (
          <div className="glass-panel p-8 rounded-3xl text-center space-y-4 border-emerald-500/20">
            <p className="text-emerald-200/70 text-base">Your journal is empty! Start your first adventure to log findings.</p>
            <button
              onClick={onStartNewMission}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-emerald-950 font-extrabold text-sm nature-glow transition-all"
            >
              Start Adventure Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {userProgress.journal.map((entry) => {
              const isAudioEntry = entry.analysis.isAudioAnalysis || entry.imageUrl.startsWith('data:audio/');
              return (
                <div key={entry.id} className="glass-panel p-5 rounded-2xl border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden border border-emerald-500/30 shrink-0 bg-emerald-950 flex flex-col items-center justify-center p-2 text-center">
                    {isAudioEntry ? (
                      <div className="flex flex-col items-center justify-center space-y-1">
                        <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 flex items-center justify-center">
                          <Volume2 className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-teal-300 uppercase">BirdNET Log</span>
                        <audio controls src={entry.imageUrl} className="w-24 h-6 text-[10px]" />
                      </div>
                    ) : (
                      <img src={entry.imageUrl} alt={entry.analysis.identification} className="w-full h-full object-cover" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-white text-lg">{entry.analysis.identification}</h4>
                        {entry.analysis.scientificName && (
                          <span className="text-xs text-lime-300 font-mono italic block">
                            {entry.analysis.scientificName}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-emerald-300/70 flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(entry.completedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-emerald-200/90 leading-relaxed">{entry.analysis.description}</p>

                    <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-lime-300 font-medium">
                        🤖 {entry.analysis.modelUsed}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 font-medium">
                        +{entry.pointsEarned} XP
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};
