import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { MissionView } from './components/MissionView';
import { ProgressView } from './components/ProgressView';
import { PocketModeModal } from './components/PocketModeModal';
import { PhotoUploadModal } from './components/PhotoUploadModal';
import { AudioUploadModal } from './components/AudioUploadModal';
import { AIResultCard } from './components/AIResultCard';
import { OpenModelInspectorModal } from './components/OpenModelInspectorModal';

import type { Mission, UserProgress, AIAnalysisResult, AIProviderConfig } from './types';
import { OUTDOOR_MISSIONS, SAMPLE_NATURE_IMAGES } from './data/missions';
import { getInitialProgress, addJournalEntry, getAIConfig } from './utils/storage';
import { analyzeNatureImage } from './services/aiInference';
import { analyzeBirdAudio } from './services/birdnetInference';

export function App() {
  const [currentTab, setCurrentTab] = useState<'landing' | 'missions' | 'progress'>('landing');
  const [userProgress, setUserProgress] = useState<UserProgress>(getInitialProgress());
  const [activeMission, setActiveMission] = useState<Mission>(OUTDOOR_MISSIONS[0]);
  const [aiConfig, setAiConfig] = useState<AIProviderConfig>(getAIConfig());

  // Modals state
  const [isPocketModeOpen, setIsPocketModeOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isModelInspectorOpen, setIsModelInspectorOpen] = useState<boolean>(false);
  const [isAIResultOpen, setIsAIResultOpen] = useState<boolean>(false);

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AIAnalysisResult | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [preselectedSample, setPreselectedSample] = useState<typeof SAMPLE_NATURE_IMAGES[0] | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const isAcousticMission = activeMission.category === 'acoustic' || activeMission.id === 'm4';

  const handleStartAdventure = () => {
    setCurrentTab('missions');
  };

  const handleSelectSampleImage = (sampleUrl: string, sampleData: typeof SAMPLE_NATURE_IMAGES[0]) => {
    setPreselectedSample(sampleData);
    setUploadedImageUrl(sampleUrl);
    setIsUploadModalOpen(true);
  };

  const handleAnalyzeImage = async (imageDataBase64: string) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setUploadedImageUrl(imageDataBase64);

    try {
      if (preselectedSample && preselectedSample.url === imageDataBase64) {
        await new Promise((r) => setTimeout(r, 600));
        setCurrentAnalysis(preselectedSample.presetAnalysis);
      } else {
        const result = await analyzeNatureImage(imageDataBase64, activeMission.description, aiConfig);
        setCurrentAnalysis(result);
      }

      setIsUploadModalOpen(false);
      setIsAIResultOpen(true);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Analysis failed. Please try again.';
      console.error('[NatureBuddy] Analysis error:', msg);
      setAnalysisError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeAudio = async (audioDataBase64: string) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setUploadedImageUrl(audioDataBase64);

    try {
      const result = await analyzeBirdAudio(audioDataBase64, aiConfig);
      setCurrentAnalysis(result);
      setIsUploadModalOpen(false);
      setIsAIResultOpen(true);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'BirdNET Audio Analysis failed.';
      console.error('[NatureBuddy] BirdNET error:', msg);
      setAnalysisError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCompleteMission = (analysis: AIAnalysisResult, imageUrl: string) => {
    const { updatedProgress } = addJournalEntry(userProgress, {
      missionTitle: activeMission.title,
      missionCategory: activeMission.category,
      imageUrl,
      analysis,
      pointsEarned: 100,
      outdoorMinutes: activeMission.durationMinutes
    });

    setUserProgress(updatedProgress);
  };

  return (
    <div className="min-h-screen bg-[#061811] text-emerald-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-emerald-950">
      
      {/* Sticky Header Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userProgress={userProgress}
        onOpenModelInspector={() => setIsModelInspectorOpen(true)}
        onOpenPocketMode={() => setIsPocketModeOpen(true)}
      />

      {/* Main Tab Views */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onStartAdventure={handleStartAdventure}
            onOpenModelInspector={() => setIsModelInspectorOpen(true)}
          />
        )}

        {currentTab === 'missions' && (
          <MissionView
            activeMission={activeMission}
            setActiveMission={setActiveMission}
            onOpenUpload={() => {
              setPreselectedSample(null);
              setIsUploadModalOpen(true);
            }}
            onOpenPocketMode={() => setIsPocketModeOpen(true)}
            onSelectSampleImage={handleSelectSampleImage}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressView
            userProgress={userProgress}
            onStartNewMission={() => setCurrentTab('missions')}
          />
        )}
      </main>

      {/* Modals & Overlays */}
      <PocketModeModal
        isOpen={isPocketModeOpen}
        onClose={() => setIsPocketModeOpen(false)}
        missionTitle={activeMission.title}
        durationMinutes={activeMission.durationMinutes}
        onReadyToAnalyze={() => {
          setIsPocketModeOpen(false);
          setIsUploadModalOpen(true);
        }}
      />

      {isAcousticMission ? (
        <AudioUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => { setIsUploadModalOpen(false); setAnalysisError(null); }}
          activeMission={activeMission}
          onAnalyzeAudio={handleAnalyzeAudio}
          isLoading={isAnalyzing}
          analysisError={analysisError}
        />
      ) : (
        <PhotoUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => { setIsUploadModalOpen(false); setAnalysisError(null); }}
          activeMission={activeMission}
          onAnalyze={handleAnalyzeImage}
          isLoading={isAnalyzing}
          preselectedSample={preselectedSample}
          analysisError={analysisError}
        />
      )}

      {isAIResultOpen && currentAnalysis && uploadedImageUrl && (
        <AIResultCard
          analysis={currentAnalysis}
          uploadedImageUrl={uploadedImageUrl}
          activeMission={activeMission}
          onCompleteMission={handleCompleteMission}
          onClose={() => setIsAIResultOpen(false)}
          onOpenPocketMode={() => setIsPocketModeOpen(true)}
        />
      )}

      <OpenModelInspectorModal
        isOpen={isModelInspectorOpen}
        onClose={() => setIsModelInspectorOpen(false)}
        config={aiConfig}
        setConfig={setAiConfig}
      />

    </div>
  );
}

export default App;
