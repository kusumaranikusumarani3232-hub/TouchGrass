import React, { useState } from 'react';
import type { AIAnalysisResult, Mission } from '../types';
import { Volume2, VolumeX, ShieldCheck, Trophy, Smartphone, Eye, Music } from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/audio';
import confetti from 'canvas-confetti';

interface AIResultCardProps {
  analysis: AIAnalysisResult;
  uploadedImageUrl: string;
  activeMission: Mission;
  onCompleteMission: (analysis: AIAnalysisResult, imageUrl: string) => void;
  onClose: () => void;
  onOpenPocketMode: () => void;
}

export const AIResultCard: React.FC<AIResultCardProps> = ({
  analysis,
  uploadedImageUrl,
  activeMission,
  onCompleteMission,
  onClose,
  onOpenPocketMode
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);

  const isAudio = analysis.isAudioAnalysis || uploadedImageUrl.startsWith('data:audio/');

  const handleSpeechToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const textToRead = `${analysis.identification}. ${analysis.scientificName ? `Scientific name: ${analysis.scientificName}.` : ''} ${analysis.description}. Key facts: ${analysis.facts.join(' ')}. Observation: ${analysis.sensoryObservation}. ${analysis.nextChallenge}`;
      speakText(textToRead);
      setIsSpeaking(true);
    }
  };

  const handleClaim = () => {
    if (isClaimed) return;
    setIsClaimed(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onCompleteMission(analysis, uploadedImageUrl);
  };

  const getCategoryEmoji = (cat: AIAnalysisResult['category']) => {
    switch (cat) {
      case 'water': return '🌊';
      case 'plant': return '🌿';
      case 'animal': return '🦋';
      case 'landscape': return '🌲';
      case 'geology': return '🪨';
      case 'sky': return '☁️';
      default: return '🌱';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl glass-panel border-emerald-500/30 text-left space-y-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Top Open Model Spec Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{isAudio ? '🐦' : getCategoryEmoji(analysis.category)}</span>
            <div>
              <span className="text-xs uppercase font-extrabold text-lime-400 tracking-wider">
                {isAudio ? 'BirdNET Sound Recognition Complete' : 'AI Nature Analysis Complete'}
              </span>
              <p className="text-xs text-emerald-200/70">
                Mission: <strong className="text-white">{activeMission.title}</strong>
              </p>
            </div>
          </div>

          {/* Model Tech Badge */}
          <div className="px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
            <span>{analysis.modelUsed}</span>
            <span className="text-emerald-400/50">•</span>
            <span className="text-lime-300 font-bold">{(analysis.confidenceScore * 100).toFixed(0)}% Match</span>
          </div>
        </div>

        {/* Main Content Layout: Photo/Audio & Identification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          
          {/* Media Container */}
          {isAudio ? (
            <div className="rounded-2xl overflow-hidden border border-teal-500/30 bg-emerald-950 p-4 flex flex-col items-center justify-center text-center space-y-3 min-h-[180px] shadow-md relative">
              <div className="w-14 h-14 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shadow-inner">
                <Music className="w-7 h-7 text-teal-300 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Captured Audio</span>
                <span className="text-[10px] text-teal-300 font-mono">BirdNET Bioacoustics</span>
              </div>
              <audio controls src={uploadedImageUrl} className="w-full h-8 mt-1 text-xs" />
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden border border-emerald-500/30 bg-emerald-950 h-48 md:h-full relative shadow-md">
              <img
                src={uploadedImageUrl}
                alt={analysis.identification}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* AI Observation Card */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                {isAudio ? '🐦 Identified Bird:' : `${getCategoryEmoji(analysis.category)} You found:`} {analysis.identification}!
              </h3>
              {analysis.scientificName && (
                <p className="text-xs text-lime-300 font-mono italic mt-0.5">
                  Scientific Name: {analysis.scientificName}
                </p>
              )}
              <p className="text-emerald-100/90 text-sm mt-1 leading-relaxed">
                {analysis.description}
              </p>
            </div>

            {/* Facts Box */}
            <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 space-y-2">
              <span className="text-xs font-bold text-lime-300 uppercase tracking-wider block">
                💡 Fascinating Nature Facts:
              </span>
              <ul className="space-y-1.5 text-xs text-emerald-100/90 list-disc list-inside">
                {analysis.facts.map((fact, idx) => (
                  <li key={idx} className="leading-normal">{fact}</li>
                ))}
              </ul>
            </div>

            {/* Sensory Observation */}
            <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-xs text-teal-200">
              <span className="font-bold text-teal-300 block mb-1 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-teal-400" /> What to observe next right now:
              </span>
              <p>{analysis.sensoryObservation}</p>
            </div>

            {/* Next Outdoor Challenge */}
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
              <span className="font-bold text-amber-300 block mb-1">
                {analysis.nextChallenge}
              </span>
            </div>
          </div>

        </div>

        {/* Audio Speech Button */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20">
          <span className="text-xs text-emerald-300 font-medium">
            Listen to observation while walking:
          </span>
          <button
            onClick={handleSpeechToggle}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              isSpeaking
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-lime-400" />}
            <span>{isSpeaking ? 'Stop Audio' : '🔊 Listen Voice'}</span>
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <button
            onClick={handleClaim}
            disabled={isClaimed}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
              isClaimed
                ? 'bg-emerald-800/60 text-emerald-300 border border-emerald-500/20'
                : 'bg-gradient-to-r from-lime-400 to-emerald-400 text-emerald-950 hover:from-lime-300 hover:to-emerald-300 nature-glow active:scale-95'
            }`}
          >
            <Trophy className="w-4 h-4 text-emerald-950" />
            <span>{isClaimed ? '✓ Claimed +100 XP' : 'Complete Quest & Claim +100 XP'}</span>
          </button>

          <button
            onClick={() => {
              handleClaim();
              onClose();
              onOpenPocketMode();
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl glass-panel text-emerald-200 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 border-emerald-400/30"
          >
            <Smartphone className="w-4 h-4 text-lime-400" />
            <span>📱 Put Phone Away & Continue</span>
          </button>

        </div>

      </div>
    </div>
  );
};
