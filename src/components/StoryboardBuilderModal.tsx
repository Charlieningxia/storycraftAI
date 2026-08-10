import React, { useState } from 'react';
import { PromptBuildParams, StoryboardSequence } from '../types';
import { ART_STYLES } from '../data/artStyles';
import { Layers, X, Copy, Check, Sparkles, Film, ArrowRight, Lock, ShieldCheck } from 'lucide-react';

interface StoryboardBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: PromptBuildParams;
  isProUnlocked?: boolean;
  onOpenGumroad?: () => void;
}

export const StoryboardBuilderModal: React.FC<StoryboardBuilderModalProps> = ({
  isOpen,
  onClose,
  params,
  isProUnlocked = false,
  onOpenGumroad
}) => {
  const [customStoryText, setCustomStoryText] = useState(params.sceneDesc || 'An adventurous protagonist discovering a glowing ancient crystal inside a dark cyberpunk alleyway.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sequence, setSequence] = useState<StoryboardSequence | null>(null);
  const [copiedShotIndex, setCopiedShotIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentStyle = ART_STYLES.find((s) => s.id === params.styleId) || ART_STYLES[0];

  const handleGenerateSequence = async () => {
    setIsGenerating(true);
    const activeText = customStoryText.trim() || params.sceneDesc || 'Epic story moment';
    try {
      const response = await fetch('/api/generate-storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: activeText.slice(0, 30) || 'Epic Story Shot Sequence',
          characterName: params.characterName || 'Hero Character',
          styleName: currentStyle.name,
          sceneDesc: activeText
        })
      });

      const data = await response.json();
      if (data.success && data.shots) {
        setSequence({
          title: activeText.slice(0, 40) || 'Epic Storyboard Sequence',
          characterName: params.characterName || 'Hero Character',
          styleId: params.styleId,
          shots: data.shots.map((s: any, idx: number) => ({
            shotIndex: idx + 1,
            shotTitle: s.shotTitle || `Shot ${idx + 1}`,
            shotType: s.shotType || (idx === 0 ? 'wide' : idx === 1 ? 'medium' : 'close-up'),
            movement: s.movement || (idx === 0 ? 'slow-push' : idx === 1 ? 'handheld-subtle' : 'drone-orbit'),
            sceneAction: s.sceneAction || activeText,
            fullPrompt: `${s.shotType || 'wide'} shot, ${s.movement || 'slow push-in'}. [CHAR ANCHOR: ${params.characterName || 'Hero'}] ${params.characterAttrs ? `${params.characterAttrs}, ` : ''}definitive consistent character design, retain identical facial features, same face. Scene action: ${s.sceneAction}. ${currentStyle.baseModifiers.join(', ')}. --ar ${params.aspectRatio}`
          }))
        });
      }
    } catch (err) {
      console.error('Failed to generate storyboard:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyShotPrompt = (promptText: string, idx: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedShotIndex(idx);
    setTimeout(() => setCopiedShotIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl text-white p-6 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pr-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">3-Shot Storyboard Generator</h2>
                {isProUnlocked ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> PRO UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> FREE TRIAL (1 SHOT SEQUENCE)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically builds Shot 1 (Establishing Wide), Shot 2 (Medium Action Climax), and Shot 3 (Close-Up Reaction) with locked character consistency.
              </p>
            </div>
          </div>

          {!isProUnlocked && onOpenGumroad && (
            <button
              onClick={() => {
                onClose();
                onOpenGumroad();
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#D4AF37] text-slate-950 hover:bg-amber-300 transition-all flex items-center space-x-1.5 shrink-0 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade Pro ($19)</span>
            </button>
          )}
        </div>

        {/* Control & Generate Action */}
        {!sequence && (
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="text-center space-y-1">
              <Film className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Generate 3-Shot Video Sequence</h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Paste your story excerpt, novel scene, or video script below. Our AI will split it into Shot 1 (Establishing Wide), Shot 2 (Climax Medium), and Shot 3 (Close-Up Reaction) with consistent character framing.
              </p>
            </div>

            <div className="text-left space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Story Plot / Script Excerpt:</span>
                <span className="text-[10px] text-amber-400 font-normal">Supports Chinese or English novel plots</span>
              </label>
              <textarea
                value={customStoryText}
                onChange={(e) => setCustomStoryText(e.target.value)}
                placeholder="Paste your story excerpt or scene script here..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors resize-none placeholder:text-slate-600"
              />
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleGenerateSequence}
                disabled={isGenerating}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-lg shadow-amber-500/20 transition-all inline-flex items-center space-x-2 active:scale-95 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Assembling Storyboard...' : 'Generate 3-Shot Prompts'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Generated Shots List */}
        {sequence && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-800">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Sequence for: {sequence.title}
              </span>
              <button
                onClick={handleGenerateSequence}
                disabled={isGenerating}
                className="text-slate-400 hover:text-white transition-colors underline"
              >
                Regenerate
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {sequence.shots.map((shot) => (
                <div
                  key={shot.shotIndex}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                        #{shot.shotIndex}
                      </span>
                      <h4 className="text-xs font-extrabold text-white">{shot.shotTitle}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {shot.shotType.toUpperCase()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyShotPrompt(shot.fullPrompt, shot.shotIndex)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                    >
                      {copiedShotIndex === shot.shotIndex ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Copied Shot #{shot.shotIndex}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Shot Prompt</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 italic">"{shot.sceneAction}"</p>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 break-words select-all">
                    {shot.fullPrompt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
