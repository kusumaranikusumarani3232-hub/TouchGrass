import type { AIAnalysisResult, AIProviderConfig } from '../types';
import { getFastApiUrl } from '../utils/apiUrl';

/**
 * BirdNET Audio Recognition Inference Service
 * Connects directly to the Python FastAPI backend (/api/analyze-audio)
 * which interfaces with BirdNET-Analyzer or custom BirdNET API service.
 */
export async function analyzeBirdAudio(
  audioDataBase64: string,
  config: AIProviderConfig
): Promise<AIAnalysisResult> {
  const startTime = performance.now();
  const fastapiUrl = getFastApiUrl(config?.fastapiUrl);

  let response: Response;
  try {
    response = await fetch(`${fastapiUrl}/api/analyze-audio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audio_base64: audioDataBase64,
        filename: 'recording.wav'
      })
    });
  } catch (err) {
    throw new Error(
      `Cannot reach FastAPI backend at ${fastapiUrl}. ${fastapiUrl.includes('localhost') ? 'Make sure the backend server is running (cd backend && uvicorn app:app --reload).' : 'Please check your internet connection or verify the backend service status.'}`
    );
  }

  if (!response.ok) {
    let errMessage = `BirdNET service error (HTTP ${response.status})`;
    try {
      const errData = await response.json();
      if (errData && errData.detail) {
        errMessage = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
      }
    } catch {
      const text = await response.text();
      if (text) errMessage = text;
    }
    throw new Error(errMessage);
  }

  const data = await response.json();
  const endTime = performance.now();

  return {
    identification: data.identification || 'Natural Bird Specimen',
    scientificName: data.scientificName,
    category: 'animal',
    description: data.description || 'BirdNET audio signature analysis complete.',
    facts: data.facts || [
      'BirdNET identifies bird species from audio recordings using deep learning.',
      'Bird vocalizations vary by region, season, and social context.'
    ],
    sensoryObservation: data.sensoryObservation || 'Listen closely for repeating pitch patterns in your surroundings.',
    nextChallenge: data.nextChallenge || '🎯 Next challenge: Locate where the bird is perched nearby.',
    confidenceScore: data.confidenceScore || 0.92,
    modelUsed: data.modelUsed || 'BirdNET Audio AI',
    provider: 'BirdNET Audio AI',
    analysisTimeMs: Math.round(endTime - startTime),
    isAudioAnalysis: true,
    audioUrl: audioDataBase64
  };
}
