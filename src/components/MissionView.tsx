import React, { useState, useEffect } from 'react';
import type { Mission, MissionCategory } from '../types';
import { OUTDOOR_MISSIONS, SAMPLE_NATURE_IMAGES } from '../data/missions';
import { Footprints, Leaf, Wind, Volume2, Sparkles, Eye, Droplets, Camera, Smartphone, RefreshCw, CheckCircle2, Play, Pause, RotateCcw } from 'lucide-react';

interface MissionViewProps {
  activeMission: Mission;
  setActiveMission: (mission: Mission) => void;
  onOpenUpload: () => void;
  onOpenPocketMode: () => void;
  onSelectSampleImage: (sampleUrl: string, sampleData: typeof SAMPLE_NATURE_IMAGES[0]) => void;
}

export const MissionView: React.FC<MissionViewProps> = ({
  activeMission,
  setActiveMission,
  onOpenUpload,
  onOpenPocketMode,
  onSelectSampleImage
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MissionCategory>('all');
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(activeMission.durationMinutes * 60);

  // Timer tick effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  // When active mission changes, reset timer
  useEffect(() => {
    setSecondsRemaining(activeMission.durationMinutes * 60);
    setIsTimerRunning(false);
  }, [activeMission]);

  const filteredMissions = OUTDOOR_MISSIONS.filter(
    (m) => selectedCategory === 'all' || m.category === selectedCategory
  );

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const getMissionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'Leaf': return <Leaf className="w-5 h-5" />;
      case 'Wind': return <Wind className="w-5 h-5" />;
      case 'Volume2': return <Volume2 className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      default: return <Leaf className="w-5 h-5" />;
    }
  };

  const handleRandomShuffle = () => {
    const random = OUTDOOR_MISSIONS[Math.floor(Math.random() * OUTDOOR_MISSIONS.length)];
    setActiveMission(random);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* ACTIVE MISSION HIGHLIGHT HERO CARD */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/30 bg-emerald-950/80 shadow-2xl relative overflow-hidden">
        
        {/* Glow accent background */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          {/* Mission Info */}
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              {activeMission.category === 'acoustic' || activeMission.id === 'm4' ? (
                <span className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  🎙️ BirdNET Audio AI Mission
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  Active Outdoor Quest
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center gap-1">
                ⏱️ {activeMission.durationMinutes} Minutes Walk
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-emerald-600/30 border border-emerald-400/40 text-emerald-300 shadow-md">
                {getMissionIcon(activeMission.iconName)}
              </span>
              {activeMission.title}
            </h2>

            <p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed">
              {activeMission.description}
            </p>

            <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-xs sm:text-sm text-emerald-300 flex items-center gap-2">
              <span className="font-bold text-lime-300">💡 Pro Tip:</span>
              <span>{activeMission.hint}</span>
            </div>
          </div>

          {/* Timer & Screen-Free Actions */}
          <div className="w-full lg:w-auto flex flex-col items-center justify-center p-5 rounded-2xl bg-emerald-900/60 border border-emerald-500/30 shadow-inner space-y-4">
            
            {/* Walk Timer Display */}
            <div className="text-center">
              <span className="text-xs uppercase font-bold text-emerald-400/80 tracking-widest">Outdoor Timer</span>
              <div className="text-4xl font-mono font-extrabold text-lime-300 tracking-wider">
                {formatTime(secondsRemaining)}
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 transition-all"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setSecondsRemaining(activeMission.durationMinutes * 60);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-1 transition-all border border-emerald-600/30"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Primary Mission Action Buttons */}
            <div className="w-full flex flex-col gap-2 pt-2 border-t border-emerald-500/20">
              <button
                onClick={onOpenPocketMode}
                className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md nature-glow transition-all flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-emerald-200" />
                <span>📱 Put Phone in Pocket & Walk</span>
              </button>

              {activeMission.category === 'acoustic' || activeMission.id === 'm4' ? (
                <button
                  onClick={onOpenUpload}
                  className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-lime-400 hover:from-teal-300 hover:to-lime-300 text-emerald-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Volume2 className="w-4 h-4 text-emerald-950" />
                  <span>📁 Upload Audio File (BirdNET AI)</span>
                </button>
              ) : (
                <button
                  onClick={onOpenUpload}
                  className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-emerald-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4 text-emerald-950" />
                  <span>📸 Upload Photo & Analyze</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Indoor Demo / Instant Sample Testing Section */}
        <div className="mt-8 pt-6 border-t border-emerald-500/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
            <span className="text-xs font-bold text-lime-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Testing indoors or on desktop? Try a sample nature photo:
            </span>
            <button
              onClick={handleRandomShuffle}
              className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 font-medium underline"
            >
              <RefreshCw className="w-3 h-3" /> Shuffle random mission
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLE_NATURE_IMAGES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onSelectSampleImage(sample.url, sample)}
                className="group relative rounded-xl overflow-hidden border border-emerald-500/30 bg-emerald-900/40 text-left hover:border-lime-400/60 transition-all focus:outline-none"
              >
                <img
                  src={sample.url}
                  alt={sample.name}
                  className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent p-2 flex flex-col justify-end">
                  <span className="text-xs font-bold text-white leading-tight truncate">
                    {sample.name}
                  </span>
                  <span className="text-[10px] text-lime-300/90 font-medium">
                    {sample.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* ALL MISSIONS EXPLORER GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold text-white">Outdoor Mission Directory</h3>
            <p className="text-sm text-emerald-200/80">Select any quest to start your next outdoor adventure</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-emerald-950/60 p-1 rounded-xl border border-emerald-500/20">
            {(['all', 'walk', 'scavenger', 'observer', 'acoustic', 'micro'] as MissionCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-300/70 hover:text-emerald-100 hover:bg-emerald-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMissions.map((mission) => {
            const isSelected = activeMission.id === mission.id;
            return (
              <div
                key={mission.id}
                className={`glass-panel p-6 rounded-2xl transition-all border ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-900/60 ring-2 ring-emerald-400/40 shadow-xl'
                    : 'border-emerald-500/20 hover:border-emerald-400/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
                    {getMissionIcon(mission.iconName)}
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-semibold">
                    ⏱️ {mission.durationMinutes}m
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2">{mission.title}</h4>
                <p className="text-xs text-emerald-200/80 leading-relaxed mb-4">{mission.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-emerald-500/15">
                  <span className="text-[11px] text-lime-300 font-semibold truncate max-w-[60%]">
                    🎯 {mission.targetType}
                  </span>

                  {isSelected ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-lime-300">
                      <CheckCircle2 className="w-4 h-4 text-lime-400" /> Active
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveMission(mission)}
                      className="px-3 py-1 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                    >
                      Select Quest
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
