import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Image as ImageIcon, Sparkles, AlertTriangle } from 'lucide-react';
import type { Mission } from '../types';
import { SAMPLE_NATURE_IMAGES } from '../data/missions';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMission: Mission;
  onAnalyze: (imageDataBase64: string) => Promise<void>;
  isLoading: boolean;
  preselectedSample?: typeof SAMPLE_NATURE_IMAGES[0] | null;
  analysisError?: string | null;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  activeMission,
  onAnalyze,
  isLoading,
  preselectedSample,
  analysisError
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (preselectedSample) {
      setImagePreview(preselectedSample.url);
    } else {
      setImagePreview(null);
    }
  }, [preselectedSample, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_NATURE_IMAGES[0]) => {
    setImagePreview(sample.url);
  };

  const handleStartAnalysis = async () => {
    if (!imagePreview) return;
    await onAnalyze(imagePreview);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-panel border-emerald-500/30 text-left space-y-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              Upload Outdoor Discovery Photo
            </h3>
            <p className="text-xs text-emerald-200/80">
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

        {/* Dropzone / Preview */}
        {!imagePreview ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
              dragOver
                ? 'border-lime-400 bg-emerald-900/60'
                : 'border-emerald-500/30 bg-emerald-950/40 hover:border-emerald-400/60'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-600/30 text-emerald-300 border border-emerald-400/30 flex items-center justify-center">
              <Upload className="w-8 h-8" />
            </div>

            <div>
              <p className="text-base font-bold text-white">Click or drag & drop nature photo</p>
              <p className="text-xs text-emerald-200/70 mt-1">Supports JPG, PNG, WEBP (Mobile Camera supported)</p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-emerald-950 shadow-md max-h-64 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Uploaded Nature Specimen"
                className="max-h-64 w-full object-contain"
              />
              <button
                onClick={() => setImagePreview(null)}
                disabled={isLoading}
                className="absolute top-3 right-3 p-2 rounded-full bg-emerald-950/80 text-white hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Sample Images Quick Choice */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5" /> Or choose a test sample photo:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {SAMPLE_NATURE_IMAGES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                disabled={isLoading}
                className={`rounded-xl overflow-hidden border h-16 relative transition-all ${
                  imagePreview === sample.url
                    ? 'border-lime-400 ring-2 ring-lime-400/50'
                    : 'border-emerald-500/20 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Error Banner */}
        {analysisError && (
          <div className="mx-1 mb-2 flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-950/60 px-4 py-3 text-sm text-red-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <div>
              <p className="font-semibold text-red-200">Analysis Failed</p>
              <p className="mt-0.5 leading-snug opacity-90">{analysisError}</p>
            </div>
          </div>
        )}

        {/* Analysis Action Button */}
        <div className="pt-2">
          <button
            onClick={handleStartAnalysis}
            disabled={!imagePreview || isLoading}
            className={`w-full py-4 rounded-2xl font-extrabold text-base shadow-xl transition-all flex items-center justify-center gap-3 ${
              !imagePreview || isLoading
                ? 'bg-emerald-900/60 text-emerald-500 cursor-not-allowed border border-emerald-500/20'
                : 'bg-gradient-to-r from-emerald-400 via-teal-400 to-lime-400 text-emerald-950 hover:from-emerald-300 hover:to-lime-300 nature-glow active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 text-emerald-950 animate-spin" />
                <span>Open-Weight AI Analyzing Specimen...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-emerald-950" />
                <span>Analyze with Open AI Model</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
