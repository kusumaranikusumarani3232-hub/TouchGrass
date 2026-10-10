export type MissionCategory = 'all' | 'scavenger' | 'walk' | 'observer' | 'acoustic' | 'micro';

export interface Mission {
  id: string;
  title: string;
  category: MissionCategory;
  durationMinutes: number;
  description: string;
  hint: string;
  iconName: string;
  targetType: string;
}

export interface AIAnalysisResult {
  identification: string;
  scientificName?: string;
  category: 'plant' | 'animal' | 'water' | 'landscape' | 'geology' | 'sky' | 'other';
  description: string;
  facts: string[];
  sensoryObservation: string;
  nextChallenge: string;
  confidenceScore: number;
  modelUsed: string;
  provider: 'Browser-Local Open Model' | 'Hugging Face Open-Weight API' | 'Groq Qwen Vision' | 'Local Ollama API' | 'FastAPI Open Backend' | 'BirdNET Audio AI';
  analysisTimeMs: number;
  isAudioAnalysis?: boolean;
  audioUrl?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requiredMissions: number;
}

export interface JournalEntry {
  id: string;
  missionTitle: string;
  missionCategory: MissionCategory;
  completedAt: string;
  imageUrl: string;
  analysis: AIAnalysisResult;
  pointsEarned: number;
  outdoorMinutes: number;
}

export interface UserProgress {
  xp: number;
  level: number;
  completedMissionsCount: number;
  totalOutdoorMinutes: number;
  badges: Badge[];
  journal: JournalEntry[];
  currentStreak: number;
  lastActiveDate: string;
}

export type AIProviderConfig = {
  provider: 'local-browser' | 'huggingface' | 'groq' | 'ollama' | 'fastapi';
  hfApiKey?: string;
  groqApiKey?: string;
  ollamaUrl?: string;
  fastapiUrl?: string;
  customModelName?: string;
};
