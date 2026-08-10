import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ArtStyleSelector } from './components/ArtStyleSelector';
import { StoryCategorySelector } from './components/StoryCategorySelector';
import { CharacterLockPanel } from './components/CharacterLockPanel';
import { SceneAndShotConfig } from './components/SceneAndShotConfig';
import { PromptOutputCard } from './components/PromptOutputCard';
import { StoryboardBuilderModal } from './components/StoryboardBuilderModal';
import { GumroadMonetizationSection, GumroadModal } from './components/GumroadMonetizationSection';
import { PromptHistoryModal } from './components/PromptHistoryModal';

import { ArtStyleId, StoryCategoryId, ShotTypeId, CameraMovementId, PlatformTarget, StoryPreset, PromptBuildOutput } from './types';
import { buildStoryPrompt } from './utils/promptGenerator';
import { STORY_CATEGORIES } from './data/storyPresets';
import { ART_STYLES } from './data/artStyles';

import { Sparkles, Film, Layers, ShieldCheck, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function App() {
  // State variables
  const [styleId, setStyleId] = useState<ArtStyleId>('chinese-ink-wash');
  const [categoryId, setCategoryId] = useState<StoryCategoryId>('xianxia-wuxia');
  const [characterName, setCharacterName] = useState<string>('Shushan Sword Immortal');
  const [characterAttrs, setCharacterAttrs] = useState<string>(
    'Ethereal young man in white silk robes with silver cloud embroidery, dark hair flowing, holding a glowing teal sword'
  );
  const [sceneDesc, setSceneDesc] = useState<string>(
    'Standing on a solitary mountain peak above a sea of clouds, encircled by thousands of gold spectral flying swords'
  );
  const [moodLighting, setMoodLighting] = useState<string>(
    'Poetic oriental morning golden light filtered through swirling mountain mist'
  );
  const [shotType, setShotType] = useState<ShotTypeId>('wide');
  const [cameraMovement, setCameraMovement] = useState<CameraMovementId>('slow-push');
  const [platformTarget, setPlatformTarget] = useState<PlatformTarget>('runway-gen3');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [motionScale, setMotionScale] = useState<number>(5);
  const [enableCharLock, setEnableCharLock] = useState<boolean>(true);

  // Modals & Pro status
  const [isGumroadModalOpen, setIsGumroadModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isStoryboardOpen, setIsStoryboardOpen] = useState(false);
  const [isProUnlocked, setIsProUnlocked] = useState<boolean>(() => localStorage.getItem('storycraft_pro_unlocked') === 'true');

  // Enhancing state
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Saved prompts in localStorage
  const [savedPrompts, setSavedPrompts] = useState<PromptBuildOutput[]>(() => {
    try {
      const stored = localStorage.getItem('storycraft_saved_prompts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('storycraft_saved_prompts', JSON.stringify(savedPrompts));
    } catch (e) {
      console.error('Failed to save prompts to localStorage', e);
    }
  }, [savedPrompts]);

  // Real-time computed full prompt output
  const currentOutput = useMemo(() => {
    return buildStoryPrompt({
      styleId,
      categoryId,
      characterName,
      characterAttrs,
      sceneDesc,
      moodLighting,
      shotType,
      cameraMovement,
      platformTarget,
      aspectRatio,
      motionScale,
      enableCharLock
    });
  }, [
    styleId,
    categoryId,
    characterName,
    characterAttrs,
    sceneDesc,
    moodLighting,
    shotType,
    cameraMovement,
    platformTarget,
    aspectRatio,
    motionScale,
    enableCharLock
  ]);

  // Load a preset from category
  const handleLoadPreset = (preset: StoryPreset) => {
    setStyleId(preset.recommendedStyle);
    setCharacterName(preset.characterName);
    setCharacterAttrs(preset.characterAttrs);
    setSceneDesc(preset.sceneDesc);
    setMoodLighting(preset.moodLighting);
    setShotType(preset.shotType);
    setCameraMovement(preset.cameraMovement);
  };

  // Save prompt to history
  const handleSavePrompt = (output: PromptBuildOutput) => {
    setSavedPrompts((prev) => [output, ...prev.filter((p) => p.id !== output.id)]);
  };

  const handleRemoveSavedPrompt = (id: string) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearHistory = () => {
    setSavedPrompts([]);
  };

  const handleLoadSavedToEditor = (saved: PromptBuildOutput) => {
    setStyleId(saved.params.styleId);
    setCategoryId(saved.params.categoryId);
    setCharacterName(saved.params.characterName);
    setCharacterAttrs(saved.params.characterAttrs);
    setSceneDesc(saved.params.sceneDesc);
    setMoodLighting(saved.params.moodLighting);
    setShotType(saved.params.shotType);
    setCameraMovement(saved.params.cameraMovement);
    setPlatformTarget(saved.params.platformTarget);
    setAspectRatio(saved.params.aspectRatio);
    setMotionScale(saved.params.motionScale);
    setEnableCharLock(saved.params.enableCharLock);
    setIsHistoryOpen(false);
  };

  // AI Auto Enhance trigger
  const handleTriggerEnhance = async () => {
    setIsEnhancing(true);
    try {
      const currentStyle = ART_STYLES.find((s) => s.id === styleId);
      const currentCategory = STORY_CATEGORIES.find((c) => c.id === categoryId);

      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterName,
          characterAttrs,
          sceneDesc,
          styleName: currentStyle?.name,
          categoryName: currentCategory?.title,
          shotType,
          cameraMovement
        })
      });

      const data = await response.json();
      if (data.success) {
        if (data.enhancedScene) {
          setSceneDesc(data.enhancedScene);
        }
        if (data.enhancedChar) {
          setCharacterAttrs(data.enhancedChar);
        }
      }
    } catch (err) {
      console.error('Enhance request failed:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#D4AF37] selection:text-[#0F172A] pb-24">
      {/* Top Sticky Header */}
      <Navbar
        onOpenGumroad={() => setIsGumroadModalOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        savedCount={savedPrompts.length}
        isProUnlocked={isProUnlocked}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-7 pb-6 border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-[#D4AF37]/40 text-amber-900 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="tracking-wide">AI STORY STUDIO • PRO VIDEO PROMPT ENGINE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-4xl mx-auto">
            Generate Epic AI Video Prompts with{' '}
            <span className="text-[#D4AF37] border-b-2 border-[#D4AF37]">
              Locked Character Consistency
            </span>
          </h1>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-medium">
            Built for short video creators, YouTube explainers, and animation storytellers. Instant prompt compilation for Runway Gen-3, Sora, Kling AI, Luma & Pika.
          </p>
        </div>
      </section>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Output Prompt Section (Top Prominent Placement) */}
        <section id="output-section">
          <PromptOutputCard
            output={currentOutput}
            onSaveHistory={handleSavePrompt}
            onOpenStoryboardModal={() => setIsStoryboardOpen(true)}
          />
        </section>

        {/* Form Controls Container */}
        <div className="space-y-6">
          {/* Section 1: 8 Commercial Art Styles */}
          <ArtStyleSelector
            selectedStyleId={styleId}
            onSelectStyle={setStyleId}
          />

          {/* Section 2: Narrative Story Tracks & Presets */}
          <StoryCategorySelector
            selectedCategoryId={categoryId}
            onSelectCategory={setCategoryId}
            onLoadPreset={handleLoadPreset}
          />

          {/* Section 3: Character Consistency Lock (Core Moat) */}
          <CharacterLockPanel
            enabled={enableCharLock}
            onToggleEnabled={setEnableCharLock}
            characterName={characterName}
            onChangeCharacterName={setCharacterName}
            characterAttrs={characterAttrs}
            onChangeCharacterAttrs={setCharacterAttrs}
          />

          {/* Section 4: Camera Framing, Movement, Lighting & AI Engine Parameters */}
          <SceneAndShotConfig
            sceneDesc={sceneDesc}
            onChangeSceneDesc={setSceneDesc}
            moodLighting={moodLighting}
            onChangeMoodLighting={setMoodLighting}
            shotType={shotType}
            onChangeShotType={setShotType}
            cameraMovement={cameraMovement}
            onChangeCameraMovement={setCameraMovement}
            platformTarget={platformTarget}
            onChangePlatformTarget={setPlatformTarget}
            aspectRatio={aspectRatio}
            onChangeAspectRatio={setAspectRatio}
            motionScale={motionScale}
            onChangeMotionScale={setMotionScale}
            onTriggerEnhance={handleTriggerEnhance}
            isEnhancing={isEnhancing}
          />
        </div>

        {/* Section 6: Commercial Monetization Section (Mandatory Copy & Gumroad Link) */}
        <GumroadMonetizationSection
          onOpenModal={() => setIsGumroadModalOpen(true)}
          isProUnlocked={isProUnlocked}
        />
      </main>

      {/* Floating Sticky Bottom Gumroad CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDBA74] border-t border-[#D4AF37]/30 px-6 py-3 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3 text-xs font-bold text-amber-950">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
            <span>
              {isProUnlocked
                ? 'PRO LICENSE ACTIVE: Access all 12 commercial art styles, character consistency & 1,880+ prompt database.'
                : 'PREMIUM UNLOCK: Get full consistency packs, 1,880+ commercial scene prompts & negative library.'}
            </span>
          </div>

          <button
            onClick={() => setIsGumroadModalOpen(true)}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0F172A] text-white text-xs font-black rounded-full tracking-widest shadow-lg hover:scale-105 transition-transform flex items-center justify-center space-x-2 shrink-0 border border-[#D4AF37]/40"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
            <span>{isProUnlocked ? 'VIEW PRO ASSETS ($19)' : 'GET FULL PROMPT PACK ON GUMROAD'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <GumroadModal
        isOpen={isGumroadModalOpen}
        onClose={() => setIsGumroadModalOpen(false)}
        onUnlockPro={() => setIsProUnlocked(true)}
      />

      <PromptHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedPrompts={savedPrompts}
        onLoadPrompt={handleLoadSavedToEditor}
        onClearHistory={handleClearHistory}
        onRemovePrompt={handleRemoveSavedPrompt}
      />

      <StoryboardBuilderModal
        isOpen={isStoryboardOpen}
        onClose={() => setIsStoryboardOpen(false)}
        isProUnlocked={isProUnlocked}
        onOpenGumroad={() => setIsGumroadModalOpen(true)}
        params={{
          styleId,
          categoryId,
          characterName,
          characterAttrs,
          sceneDesc,
          moodLighting,
          shotType,
          cameraMovement,
          platformTarget,
          aspectRatio,
          motionScale,
          enableCharLock
        }}
      />
    </div>
  );
}
