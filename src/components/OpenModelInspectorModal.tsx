import React, { useState } from 'react';
import { Cpu, ShieldCheck, Check, Key, Server, X } from 'lucide-react';
import type { AIProviderConfig } from '../types';
import { saveAIConfig } from '../utils/storage';
import { getFastApiUrl } from '../utils/apiUrl';

interface OpenModelInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AIProviderConfig;
  setConfig: (config: AIProviderConfig) => void;
}

export const OpenModelInspectorModal: React.FC<OpenModelInspectorModalProps> = ({
  isOpen,
  onClose,
  config,
  setConfig
}) => {
  const [activeProvider, setActiveProvider] = useState<AIProviderConfig['provider']>(config.provider);
  const [hfApiKey, setHfApiKey] = useState<string>(config.hfApiKey || '');
  const [ollamaUrl, setOllamaUrl] = useState<string>(config.ollamaUrl || 'http://localhost:11434');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSaveConfig = () => {
    const newConfig: AIProviderConfig = {
      provider: activeProvider,
      hfApiKey,
      ollamaUrl,
      fastapiUrl: config.fastapiUrl
    };
    setConfig(newConfig);
    saveAIConfig(newConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-3xl p-6 sm:p-8 rounded-3xl glass-panel border-emerald-500/30 text-left space-y-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-500/20 border border-lime-400/40 text-lime-400 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Open AI Model Architecture</h3>
              <p className="text-xs text-emerald-200/80">
                Hacktoberfest Open-Weight Model Transparency & Provider Configuration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-900/60 text-emerald-300 hover:text-white hover:bg-emerald-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Why Open Weight AI Section */}
        <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 space-y-2">
          <span className="text-xs font-bold text-lime-300 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-lime-400" /> Why Open-Weight AI for Touch Grass?
          </span>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Unlike closed commercial APIs, open-weight models (Llama 3.2 Vision, Qwen2-VL, BLIP) can be run locally in the browser or self-hosted in remote wilderness without cellular connectivity. They ensure complete user privacy, community fine-tuning capability, and zero vendor lock-in.
          </p>
        </div>

        {/* Provider Switcher Tabs */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
            Select Active Open Model Provider:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* 1. Browser Local */}
            <button
              onClick={() => setActiveProvider('local-browser')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeProvider === 'local-browser'
                  ? 'border-lime-400 bg-emerald-900/60 ring-2 ring-lime-400/40'
                  : 'border-emerald-500/20 bg-emerald-950/40 hover:border-emerald-400/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  🖥️ Browser-Local Open Model
                </span>
                {activeProvider === 'local-browser' && <Check className="w-4 h-4 text-lime-400" />}
              </div>
              <p className="text-[11px] text-emerald-200/80">
                BLIP / ViT client-side WASM engine. Works 100% offline with zero setup or API keys!
              </p>
            </button>

            {/* 2. Groq Qwen Vision */}
            <button
              onClick={() => setActiveProvider('groq')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeProvider === 'groq'
                  ? 'border-lime-400 bg-emerald-900/60 ring-2 ring-lime-400/40'
                  : 'border-emerald-500/20 bg-emerald-950/40 hover:border-emerald-400/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  ⚡ Groq Qwen Vision
                </span>
                {activeProvider === 'groq' && <Check className="w-4 h-4 text-lime-400" />}
              </div>
              <p className="text-[11px] text-emerald-200/80">
                Meta's Llama-3.2-11B-Vision open model running on ultra-fast Groq LPUs (&lt;500ms latency).
              </p>
            </button>

            {/* 3. Hugging Face Serverless */}
            <button
              onClick={() => setActiveProvider('huggingface')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeProvider === 'huggingface'
                  ? 'border-lime-400 bg-emerald-900/60 ring-2 ring-lime-400/40'
                  : 'border-emerald-500/20 bg-emerald-950/40 hover:border-emerald-400/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  🤗 Hugging Face Open API
                </span>
                {activeProvider === 'huggingface' && <Check className="w-4 h-4 text-lime-400" />}
              </div>
              <p className="text-[11px] text-emerald-200/80">
                Qwen2-VL-7B & BLIP2 open models hosted on Hugging Face Serverless endpoints.
              </p>
            </button>

            {/* 4. Local Ollama */}
            <button
              onClick={() => setActiveProvider('ollama')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeProvider === 'ollama'
                  ? 'border-lime-400 bg-emerald-900/60 ring-2 ring-lime-400/40'
                  : 'border-emerald-500/20 bg-emerald-950/40 hover:border-emerald-400/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  🦙 Local Ollama (Self-Hosted)
                </span>
                {activeProvider === 'ollama' && <Check className="w-4 h-4 text-lime-400" />}
              </div>
              <p className="text-[11px] text-emerald-200/80">
                Run LLaVA or Llama 3.2 Vision on your local hardware via Ollama localhost endpoint.
              </p>
            </button>

          </div>
        </div>

        {/* API Key / Configuration Fields */}
        {activeProvider === 'groq' && (
          <div className="space-y-2 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-lime-400" /> Secure Backend Groq Vision API
            </div>
            <p className="text-[11px] text-emerald-200/80 leading-relaxed">
              The Groq API key is managed securely on the server using the <code className="text-lime-300 font-mono">GROQ_API_KEY</code> environment variable. No API key is stored in your browser or exposed to frontend code.
            </p>
            <p className="text-[10px] text-emerald-300/70">
              Model: <strong className="text-white font-mono">qwen/qwen3.8-27b</strong> (via Python FastAPI backend proxy at {getFastApiUrl(config.fastapiUrl)})
            </p>
          </div>
        )}

        {activeProvider === 'huggingface' && (
          <div className="space-y-2 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20">
            <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-lime-400" /> Hugging Face Access Token:
            </label>
            <input
              type="password"
              value={hfApiKey}
              onChange={(e) => setHfApiKey(e.target.value)}
              placeholder="hf_..."
              className="w-full px-4 py-2.5 rounded-xl bg-emerald-900/40 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-lime-400 font-mono"
            />
          </div>
        )}

        {activeProvider === 'ollama' && (
          <div className="space-y-2 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20">
            <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-lime-400" /> Local Ollama Endpoint URL:
            </label>
            <input
              type="text"
              value={ollamaUrl}
              onChange={(e) => setOllamaUrl(e.target.value)}
              placeholder="http://localhost:11434"
              className="w-full px-4 py-2.5 rounded-xl bg-emerald-900/40 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-lime-400 font-mono"
            />
          </div>
        )}

        {/* Technical Specs Comparison Table */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
            Open-Weight Model Specs Matrix:
          </span>

          <div className="overflow-x-auto rounded-xl border border-emerald-500/20 text-xs">
            <table className="w-full text-left text-emerald-200/90">
              <thead className="bg-emerald-950 text-emerald-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Model</th>
                  <th className="p-2.5">Params</th>
                  <th className="p-2.5">License</th>
                  <th className="p-2.5">Execution Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/10 bg-emerald-900/20">
                <tr>
                  <td className="p-2.5 font-bold text-white">Llama-3.2-11B-Vision</td>
                  <td className="p-2.5">11 Billion</td>
                  <td className="p-2.5 font-mono text-lime-300">Llama 3.2 Community</td>
                  <td className="p-2.5">Groq LPU / Ollama Local</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">Qwen2-VL-7B-Instruct</td>
                  <td className="p-2.5">7 Billion</td>
                  <td className="p-2.5 font-mono text-lime-300">Apache 2.0</td>
                  <td className="p-2.5">Hugging Face Serverless</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">BLIP / ViT Vision Engine</td>
                  <td className="p-2.5">300 Million</td>
                  <td className="p-2.5 font-mono text-lime-300">BSD / MIT</td>
                  <td className="p-2.5">100% In-Browser (WASM/WebGL)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Save & Close Actions */}
        <div className="pt-2 flex items-center justify-between">
          {savedSuccess ? (
            <span className="text-xs font-bold text-lime-300 flex items-center gap-1">
              <Check className="w-4 h-4 text-lime-400" /> Saved model configuration!
            </span>
          ) : (
            <span className="text-xs text-emerald-400/70">
              Active Provider: <strong className="text-white capitalize">{activeProvider}</strong>
            </span>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleSaveConfig}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-emerald-950 font-extrabold text-xs shadow-md transition-all"
            >
              Save Open Model Settings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
