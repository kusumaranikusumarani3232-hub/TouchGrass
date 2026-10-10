import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause, Upload, X, Sparkles, AlertTriangle, Music } from 'lucide-react';
import type { Mission } from '../types';

interface AudioUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMission: Mission;
  onAnalyzeAudio: (audioDataBase64: string) => Promise<void>;
  isLoading: boolean;
  analysisError?: string | null;
}

export const AudioUploadModal: React.FC<AudioUploadModalProps> = ({
  isOpen,
  onClose,
  activeMission,
  onAnalyzeAudio,
  isLoading,
  analysisError
}) => {
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Audio Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setAudioBase64(null);
      setAudioFile(null);
      setFileError(null);
      setIsPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith('audio/') && !file.name.match(/\.(wav|mp3|ogg|m4a|webm|flac)$/i)) {
      setFileError('Please select a valid audio recording file (.wav, .mp3, .m4a, .ogg, .webm).');
      return;
    }
    setFileError(null);
    setAudioFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setAudioBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const togglePlayback = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStartAnalysis = async () => {
    if (!audioBase64) return;
    await onAnalyzeAudio(audioBase64);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-panel border-emerald-500/30 text-left space-y-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-[11px] font-mono font-bold uppercase">
                BirdNET Audio AI
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
              <Volume2 className="w-5 h-5 text-teal-400" />
              Upload Audio for BirdNET Identification
            </h3>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Mission: <strong className="text-lime-300">{activeMission.title}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-full bg-emerald-900/60 text-emerald-300 hover:text-white hover:bg-emerald-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio File Dropzone / Selector */}
        <div>
          {!audioBase64 ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
                dragOver
                  ? 'border-teal-400 bg-emerald-900/60'
                  : 'border-emerald-500/30 bg-emerald-950/40 hover:border-emerald-400/60'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-600/30 text-teal-300 border border-teal-400/30 flex items-center justify-center">
                <Upload className="w-8 h-8" />
              </div>

              <div>
                <p className="text-base font-bold text-white">Click or drag & drop audio recording</p>
                <p className="text-xs text-emerald-200/70 mt-1">Accepts WAV, MP3, OGG, M4A, WEBM</p>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="audio/*,.wav,.mp3,.ogg,.m4a,.webm"
                className="hidden"
              />
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600/30 text-teal-300 border border-teal-400/30 flex items-center justify-center">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white truncate max-w-[220px]">
                    {audioFile ? audioFile.name : 'Audio Recording File'}
                  </p>
                  <p className="text-[10px] text-teal-300">Ready for BirdNET analysis</p>
                </div>
              </div>

              <button
                onClick={() => { setAudioBase64(null); setAudioFile(null); setIsPlaying(false); }}
                disabled={isLoading}
                className="p-1.5 rounded-full bg-emerald-900/80 text-emerald-300 hover:text-white hover:bg-red-600 transition-colors"
                title="Remove audio file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Audio Player Preview */}
        {audioBase64 && (
          <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-teal-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={togglePlayback}
                className="w-9 h-9 rounded-full bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center transition-all shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div>
                <span className="text-xs font-bold text-white block">Preview Uploaded Audio</span>
                <span className="text-[10px] text-emerald-300/80">Listen to audio recording before sending</span>
              </div>
            </div>

            <audio
              ref={audioPlayerRef}
              src={audioBase64}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        )}

        {/* File Format / Upload Error Banner */}
        {fileError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/40 bg-amber-950/60 px-4 py-3 text-xs text-amber-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <p className="leading-snug">{fileError}</p>
          </div>
        )}

        {/* Backend / BirdNET Service Error Banner */}
        {analysisError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-950/60 px-4 py-3 text-xs text-red-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <div>
              <p className="font-bold text-red-200">BirdNET Analysis Service Error</p>
              <p className="mt-0.5 leading-snug opacity-95">{analysisError}</p>
            </div>
          </div>
        )}

        {/* Start BirdNET Analysis Button */}
        <div className="pt-2">
          <button
            onClick={handleStartAnalysis}
            disabled={!audioBase64 || isLoading}
            className={`w-full py-4 rounded-2xl font-extrabold text-base shadow-xl transition-all flex items-center justify-center gap-3 ${
              !audioBase64 || isLoading
                ? 'bg-emerald-900/60 text-emerald-500 cursor-not-allowed border border-emerald-500/20'
                : 'bg-gradient-to-r from-teal-400 via-emerald-400 to-lime-400 text-emerald-950 hover:from-teal-300 hover:to-lime-300 nature-glow active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 text-emerald-950 animate-spin" />
                <span>BirdNET AI Analyzing Audio...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5 text-emerald-950" />
                <span>Analyse Audio with BirdNET AI</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
