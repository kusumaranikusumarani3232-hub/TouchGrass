import React, { useState, useEffect } from 'react';
import { Smartphone, Volume2, VolumeX, X, CheckCircle2, TreePine } from 'lucide-react';
import { natureAudio } from '../utils/audio';

interface PocketModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  missionTitle: string;
  durationMinutes: number;
  onReadyToAnalyze: () => void;
}

export const PocketModeModal: React.FC<PocketModeModalProps> = ({
  isOpen,
  onClose,
  missionTitle,
  durationMinutes,
  onReadyToAnalyze
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(durationMinutes * 60);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  useEffect(() => {
    setSecondsRemaining(durationMinutes * 60);
  }, [durationMinutes, isOpen]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isOpen && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isOpen) {
      natureAudio.playTimerCompleteChime();
    }
    return () => clearInterval(timer);
  }, [isOpen, secondsRemaining]);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      natureAudio.stopForestBreeze();
      setIsAudioPlaying(false);
    } else {
      natureAudio.startForestBreeze();
      setIsAudioPlaying(true);
    }
  };

  const handleCloseModal = () => {
    natureAudio.stopForestBreeze();
    setIsAudioPlaying(false);
    onClose();
  };

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isTimeUp = secondsRemaining === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/95 backdrop-blur-xl animate-fade-in">
      
      {/* Background Breath Orb */}
      <div className="absolute w-[400px] h-[400px] bg-emerald-500/10 rounded-full animate-breath pointer-events-none" />
      <div className="absolute w-[280px] h-[280px] bg-teal-500/15 rounded-full animate-breath pointer-events-none delay-1000" />

      <div className="relative w-full max-w-md p-8 rounded-3xl glass-panel border-emerald-500/30 text-center space-y-6 shadow-2xl z-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <TreePine className="w-4 h-4 text-emerald-300" />
            <span>TOUCH GRASS POCKET MODE</span>
          </div>

          <button
            onClick={handleCloseModal}
            className="p-1.5 rounded-full bg-emerald-900/60 text-emerald-300 hover:text-white hover:bg-emerald-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pocket Illustration */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-800/40 border border-emerald-400/40 flex items-center justify-center text-emerald-300 nature-glow">
          <Smartphone className="w-10 h-10 animate-bounce" />
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-white">
            {isTimeUp ? '✨ Time to Upload Your Photo!' : 'Put Your Phone Away Now'}
          </h3>
          <p className="text-emerald-200/80 text-sm leading-relaxed">
            {isTimeUp
              ? `You've spent ${durationMinutes} minutes outdoors for "${missionTitle}". Take or upload your photo to analyze!`
              : `Slip your phone into your pocket or bag. Walk around outdoors for "${missionTitle}" and observe nature.`}
          </p>
        </div>

        {/* Big Timer */}
        <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/30">
          <span className="text-xs uppercase font-bold text-emerald-400/80 tracking-widest block mb-1">
            Outdoor Time Left
          </span>
          <div className="text-5xl font-mono font-extrabold text-lime-300 tracking-wider">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Ambient Nature Sound Synth Toggle */}
        <button
          onClick={toggleAudio}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border ${
            isAudioPlaying
              ? 'bg-emerald-600/40 border-emerald-400 text-emerald-200'
              : 'bg-emerald-900/40 border-emerald-500/20 text-emerald-300 hover:bg-emerald-800/40'
          }`}
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4 text-lime-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          <span>{isAudioPlaying ? 'Playing Forest Wind Synth (Offline)' : 'Play Forest Ambient Sound Synth'}</span>
        </button>

        {/* Action Button */}
        <div className="pt-2">
          {isTimeUp ? (
            <button
              onClick={() => {
                handleCloseModal();
                onReadyToAnalyze();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-emerald-950 font-extrabold text-base shadow-xl nature-glow transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-950" />
              <span>I'm Back! Upload Nature Photo</span>
            </button>
          ) : (
            <button
              onClick={() => {
                handleCloseModal();
                onReadyToAnalyze();
              }}
              className="w-full py-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 font-bold text-sm transition-all border border-emerald-500/30"
            >
              Found Something Interesting? Upload Photo
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
