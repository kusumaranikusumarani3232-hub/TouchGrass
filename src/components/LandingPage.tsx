import React from 'react';
import { Compass, Sparkles, ShieldCheck, Sun, ArrowRight, TreePine, Eye, Cpu } from 'lucide-react';

interface LandingPageProps {
  onStartAdventure: () => void;
  onOpenModelInspector: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAdventure,
  onOpenModelInspector
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-[400px] h-[400px] bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -right-20 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 flex-1 flex flex-col justify-center items-center text-center z-10">
        
        {/* Challenge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-md backdrop-blur-md animate-float">
          <TreePine className="w-4 h-4 text-emerald-400" />
          <span>Hacktoberfest AI Challenge: <strong className="text-lime-300 font-bold">Touch Grass</strong></span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
          Your AI Companion for{' '}
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-lime-300 bg-clip-text text-transparent">
            Getting Outside
          </span>
        </h1>

        {/* Subtitle / Tagline */}
        <p className="mt-6 text-lg sm:text-xl text-emerald-100/90 max-w-2xl font-normal leading-relaxed">
          NatureBuddy AI uses <span className="text-lime-300 font-semibold underline decoration-lime-400/40">open-weight AI</span> to give you a reason to step outside, explore your surroundings, and reconnect with the natural world.
        </p>

        {/* Core Touch Grass Principle Card */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl glass-panel max-w-xl border-emerald-500/30 bg-emerald-950/70 shadow-2xl">
          <p className="text-sm sm:text-base font-semibold text-emerald-200 flex items-center justify-center gap-2">
            <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <span>"The screen starts the adventure. The outside world is the main experience."</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onStartAdventure}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-lime-500 hover:from-emerald-400 hover:via-teal-400 hover:to-lime-400 text-emerald-950 font-extrabold text-lg shadow-xl nature-glow transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group"
          >
            <Compass className="w-6 h-6 text-emerald-950 group-hover:rotate-45 transition-transform duration-300" />
            <span>Start Adventure Now</span>
            <ArrowRight className="w-5 h-5 text-emerald-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenModelInspector}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel text-emerald-200 hover:text-white hover:border-emerald-400/50 font-semibold text-base transition-all flex items-center justify-center gap-2"
          >
            <Cpu className="w-5 h-5 text-lime-400" />
            <span>Inspect Open AI Architecture</span>
          </button>
        </div>

        {/* 3 Step Flow Illustration */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          
          <div className="glass-panel p-6 rounded-2xl glass-card-hover border-emerald-500/20">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 font-bold text-xl border border-emerald-400/30">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              Get an Outdoor Mission
            </h3>
            <p className="text-emerald-200/80 text-sm leading-relaxed">
              Receive a simple outdoor objective: walk for 15 minutes, find 3 unique leaves, listen for bird calls, or find water reflections.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl glass-card-hover border-emerald-500/20">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center mb-4 font-bold text-xl border border-teal-400/30">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Eye className="w-5 h-5 text-teal-300" />
              Explore Away from Screen
            </h3>
            <p className="text-emerald-200/80 text-sm leading-relaxed">
              Put your phone in pocket mode. Walk outdoors, observe details you've never noticed before, and photograph your discovery.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl glass-card-hover border-emerald-500/20">
            <div className="w-12 h-12 rounded-xl bg-lime-500/20 text-lime-300 flex items-center justify-center mb-4 font-bold text-xl border border-lime-400/30">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-lime-400" />
              Open AI Nature Analysis
            </h3>
            <p className="text-emerald-200/80 text-sm leading-relaxed">
              Open-weight AI identifies the subject, provides concise ecological facts, suggests sensory cues, and awards explorer badges.
            </p>
          </div>

        </div>

        {/* Open Source AI Guarantee Bar */}
        <div className="mt-16 w-full p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
            <span>Powered by <strong>Open-Weight Models</strong> (Llama 3.2 Vision, Qwen2-VL, BLIP & Browser Local Inference)</span>
          </div>
          <button
            onClick={onOpenModelInspector}
            className="text-lime-300 hover:text-lime-200 font-bold underline underline-offset-4"
          >
            Learn Why Open AI Matters →
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-emerald-400/60 border-t border-emerald-500/10">
        <p>NatureBuddy AI — Built for Hacktoberfest 2026 Open-Source AI Challenge "Touch Grass"</p>
      </footer>
    </div>
  );
};
