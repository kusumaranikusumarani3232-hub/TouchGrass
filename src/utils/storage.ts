import type { UserProgress, JournalEntry, AIProviderConfig } from '../types';
import { INITIAL_BADGES } from '../data/missions';
import { getFastApiUrl } from './apiUrl';

const STORAGE_KEY_PROGRESS = 'naturebuddy_user_progress_v1';
const STORAGE_KEY_CONFIG = 'naturebuddy_ai_config_v1';

export const getInitialProgress = (): UserProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse saved user progress', e);
  }

  return {
    xp: 150, // Welcome XP
    level: 1,
    completedMissionsCount: 0,
    totalOutdoorMinutes: 0,
    badges: INITIAL_BADGES,
    journal: [],
    currentStreak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0]
  };
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress', e);
  }
};

export const addJournalEntry = (
  currentProgress: UserProgress,
  entry: Omit<JournalEntry, 'id' | 'completedAt'>
): { updatedProgress: UserProgress; newlyUnlockedBadges: string[] } => {
  const newEntry: JournalEntry = {
    ...entry,
    id: 'j_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    completedAt: new Date().toISOString()
  };

  const updatedJournal = [newEntry, ...currentProgress.journal];
  const newMissionCount = currentProgress.completedMissionsCount + 1;
  const newOutdoorMinutes = currentProgress.totalOutdoorMinutes + entry.outdoorMinutes;
  const newXP = currentProgress.xp + entry.pointsEarned;
  const newLevel = Math.floor(newXP / 250) + 1;

  const today = new Date().toISOString().split('T')[0];
  let streak = currentProgress.currentStreak;
  if (currentProgress.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (currentProgress.lastActiveDate === yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }
  }

  const newlyUnlockedBadges: string[] = [];
  const updatedBadges = currentProgress.badges.map((badge) => {
    if (!badge.unlocked && newMissionCount >= badge.requiredMissions) {
      newlyUnlockedBadges.push(badge.name);
      return {
        ...badge,
        unlocked: true,
        unlockedAt: new Date().toISOString()
      };
    }
    return badge;
  });

  const updatedProgress: UserProgress = {
    ...currentProgress,
    xp: newXP,
    level: newLevel,
    completedMissionsCount: newMissionCount,
    totalOutdoorMinutes: newOutdoorMinutes,
    badges: updatedBadges,
    journal: updatedJournal,
    currentStreak: streak,
    lastActiveDate: today
  };

  saveProgress(updatedProgress);
  return { updatedProgress, newlyUnlockedBadges };
};

export const getAIConfig = (): AIProviderConfig => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (data) {
      const parsed = JSON.parse(data);
      parsed.fastapiUrl = getFastApiUrl(parsed.fastapiUrl);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse AI config', e);
  }

  return {
    provider: 'local-browser',
    hfApiKey: '',
    groqApiKey: '',
    ollamaUrl: 'http://localhost:11434',
    fastapiUrl: getFastApiUrl()
  };
};

export const saveAIConfig = (config: AIProviderConfig): void => {
  try {
    const sanitized: AIProviderConfig = {
      ...config,
      fastapiUrl: getFastApiUrl(config.fastapiUrl)
    };
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(sanitized));
  } catch (e) {
    console.error('Failed to save AI config', e);
  }
};
