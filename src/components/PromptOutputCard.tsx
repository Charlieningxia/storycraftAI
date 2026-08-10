import React, { useState } from 'react';
import { PromptBuildOutput } from '../types';
import { Copy, Check, Download, Layers, ShieldCheck, Camera, Sparkles, Code } from 'lucide-react';

interface PromptOutputCardProps {
  output: PromptBuildOutput;
  onSaveHistory: (output: PromptBuildOutput) => void;
  onOpenStoryboardModal: () => void;
}

export const PromptOutputCard: React.FC<PromptOutputCardProps> = ({
  output,
  onSaveHistory,
  onOpenStoryboardModal
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [activeTab, setActiveTab] = useState<'full' | 'breakdown' | 'negative'>('full');

  const handleCopyFullPrompt = () => {
    navigator.clipboard.writeText(output.fullPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyNegative = () => {
    navigator.clipboard.writeText(output.negativePrompt);
    setCopiedNegative(true);
    setTimeout(() => setCopiedNegative(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(output, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `prompt_${output.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-[#0F172A] rounded-xl p-6 text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden flex flex-col">
      {/* Top Header & Copy Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" />
          <h2 className="text-sm font-bold text-white tracking-wider uppercase">
            GENERATED OUTPUT ENGINE
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => onSaveHistory(output)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded text-[11px] font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            title="Save prompt to local history"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={onOpenStoryboardModal}
            className="flex items-center space-x-1.5 px-3 py-1 rounded text-[11px] font-bold bg-slate-800 text-amber-300 hover:bg-slate-700 border border-slate-700 transition-all"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3-Shot Storyboard</span>
          </button>

          <button
            onClick={handleCopyFullPrompt}
            className="text-[11px] text-[#D4AF37] font-bold border border-[#D4AF37]/40 px-3 py-1 rounded hover:bg-[#D4AF37] hover:text-slate-950 transition-all flex items-center space-x-1.5"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY ALL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-white/10 mb-4 gap-4 text-xs font-bold relative z-10">
        <button
          onClick={() => setActiveTab('full')}
          className={`pb-2 transition-colors border-b-2 flex items-center space-x-1.5 ${
            activeTab === 'full'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>// Positive Prompt</span>
        </button>

        <button
          onClick={() => setActiveTab('breakdown')}
          className={`pb-2 transition-colors border-b-2 flex items-center space-x-1.5 ${
            activeTab === 'breakdown'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Structured Breakdown</span>
        </button>

        <button
          onClick={() => setActiveTab('negative')}
          className={`pb-2 transition-colors border-b-2 flex items-center space-x-1.5 ${
            activeTab === 'negative'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
          <span>// Negative Constraints</span>
        </button>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'full' && (
        <div className="relative z-10">
          <div className="p-4 rounded-lg bg-slate-900/50 border border-white/5 font-mono text-sm text-white leading-relaxed break-words select-all shadow-inner">
            <p className="text-indigo-200 text-xs font-mono italic mb-2">// Assembled Prompt</p>
            {output.fullPrompt}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-[10px] text-slate-400 uppercase">
            <div className="flex items-center space-x-3">
              <span>Length: <strong className="text-[#D4AF37]">{output.fullPrompt.length} CHARS</strong></span>
              <span>Words: <strong className="text-[#D4AF37]">{output.fullPrompt.split(' ').length} WORDS</strong></span>
            </div>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
            >
              <Download className="w-3 h-3" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'breakdown' && (
        <div className="space-y-3 relative z-10 text-xs">
          {output.characterLockBlock && (
            <div className="p-3 rounded-lg bg-slate-900/50 border border-[#D4AF37]/30">
              <span className="font-bold text-[#D4AF37] flex items-center gap-1.5 mb-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                Character Lock Directives:
              </span>
              <p className="font-mono text-slate-200 text-[11px]">{output.characterLockBlock}</p>
            </div>
          )}

          <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5">
            <span className="font-bold text-sky-300 flex items-center gap-1.5 mb-1 text-[11px]">
              <Camera className="w-3.5 h-3.5 text-sky-400" />
              Camera Composition & Motion:
            </span>
            <p className="font-mono text-slate-200 text-[11px]">{output.cameraBlock}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5">
            <span className="font-bold text-purple-300 flex items-center gap-1.5 mb-1 text-[11px]">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Style Modifiers & Engine:
            </span>
            <p className="font-mono text-slate-200 text-[11px]">{output.styleBlock}</p>
          </div>
        </div>
      )}

      {activeTab === 'negative' && (
        <div className="relative z-10 space-y-3">
          <div className="p-4 rounded-lg bg-slate-900/50 border border-rose-900/30 font-mono text-sm text-rose-300 leading-relaxed break-words select-all">
            <p className="text-rose-400 text-xs font-mono italic mb-2">// Negative Constraints</p>
            {output.negativePrompt}
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 text-[10px]">
              Mount in video model negative prompt field to eliminate deformation & warping.
            </span>

            <button
              onClick={handleCopyNegative}
              className="flex items-center space-x-1.5 px-3 py-1 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-900/40 transition-colors"
            >
              {copiedNegative ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>COPY NEGATIVE</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Model Specs Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-slate-500 uppercase flex justify-between font-mono">
        <span>Model: {output.params.platformTarget.toUpperCase()}</span>
        <span>Tokens: {Math.round(output.fullPrompt.length / 4)}</span>
      </div>
    </div>
  );
};
