import React, { useState } from 'react';
import { PromptBuildOutput } from '../types';
import { Copy, Check, Download, Layers, ShieldCheck, Camera, Sparkles, Code, Play, Pause, RefreshCw, ExternalLink, Video, Eye, Grid } from 'lucide-react';
import { ART_STYLES } from '../data/artStyles';

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
  const [copiedI2V, setCopiedI2V] = useState(false);
  const [copiedComfy, setCopiedComfy] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [activeTab, setActiveTab] = useState<'full' | 'i2v' | 'comfyui' | 'preview' | 'breakdown' | 'negative'>('full');
  const [isPlayingMotion, setIsPlayingMotion] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [copiedModel, setCopiedModel] = useState<string | null>(null);

  // Find sample image for current style
  const currentStyleConfig = ART_STYLES.find((s) => s.id === output.params.styleId) || ART_STYLES[0];
  const sampleImg = currentStyleConfig.sampleImage;

  const handleCopyFullPrompt = () => {
    navigator.clipboard.writeText(output.fullPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyI2VPrompt = () => {
    navigator.clipboard.writeText(output.i2vMotionPrompt || output.fullPrompt);
    setCopiedI2V(true);
    setTimeout(() => setCopiedI2V(false), 2000);
  };

  const handleCopyComfyPrompt = () => {
    navigator.clipboard.writeText(output.comfyuiSyntax || output.fullPrompt);
    setCopiedComfy(true);
    setTimeout(() => setCopiedComfy(false), 2000);
  };

  const handleCopyNegative = () => {
    navigator.clipboard.writeText(output.negativePrompt);
    setCopiedNegative(true);
    setTimeout(() => setCopiedNegative(false), 2000);
  };

  const handleLaunchModel = (modelName: string, url: string) => {
    navigator.clipboard.writeText(output.fullPrompt);
    setCopiedModel(modelName);
    setTimeout(() => setCopiedModel(null), 3000);
    window.open(url, '_blank');
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

  // Determine CSS motion class based on camera movement
  const getCameraMotionClass = () => {
    if (!isPlayingMotion) return '';
    switch (output.params.cameraMovement) {
      case 'slow-push':
        return 'animate-[ping_10s_cubic-bezier(0,0,0.2,1)_infinite] scale-110 transition-transform duration-10000 ease-out';
      case 'pan-right':
        return 'translate-x-4 scale-105 transition-transform duration-7000 ease-in-out';
      case 'drone-orbit':
        return 'rotate-1 scale-110 transition-transform duration-8000 ease-in-out';
      case 'low-angle-tracking':
        return 'translate-y-2 scale-105 transition-transform duration-6000 ease-in-out';
      case 'handheld-subtle':
        return 'animate-pulse scale-105';
      default:
        return 'scale-105';
    }
  };

  const aiVideoPlatforms = [
    { name: 'Runway Gen-3', url: 'https://runwayml.com', badge: 'Recommended', color: 'bg-purple-600 hover:bg-purple-500' },
    { name: 'OpenAI Sora', url: 'https://sora.com', badge: 'Ultra Quality', color: 'bg-emerald-600 hover:bg-emerald-500' },
    { name: 'Kling AI', url: 'https://klingai.com', badge: 'High Motion', color: 'bg-amber-600 hover:bg-amber-500' },
    { name: 'Luma Dream', url: 'https://lumalabs.ai/dream-machine', badge: '3D Realism', color: 'bg-cyan-600 hover:bg-cyan-500' },
    { name: 'Pika 2.0', url: 'https://pika.art', badge: 'Fast Render', color: 'bg-rose-600 hover:bg-rose-500' }
  ];

  return (
    <div className="bg-[#0F172A] rounded-xl p-6 text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden flex flex-col" id="output-section">
      {/* Top Header & Copy Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shrink-0" />
          <h2 className="text-sm font-black text-white tracking-wider uppercase flex items-center gap-2">
            <span>GENERATED OUTPUT ENGINE</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
              PROMPT READY
            </span>
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => onSaveHistory(output)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded text-[11px] font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            title="Save prompt to local history"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={onOpenStoryboardModal}
            className="flex items-center space-x-1.5 px-3 py-1 rounded text-[11px] font-bold bg-slate-800 text-amber-300 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3-Shot Storyboard</span>
          </button>

          <button
            onClick={handleCopyFullPrompt}
            className="text-[11px] text-[#D4AF37] font-bold border border-[#D4AF37]/40 px-3 py-1 rounded hover:bg-[#D4AF37] hover:text-slate-950 transition-all flex items-center space-x-1.5 cursor-pointer"
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
      <div className="flex border-b border-white/10 mb-4 gap-3 text-xs font-bold relative z-10 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('full')}
          className={`pb-2 transition-colors border-b-2 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'full'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>// Positive Prompt (T2V)</span>
        </button>

        <button
          onClick={() => setActiveTab('i2v')}
          className={`pb-2 transition-colors border-b-2 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'i2v'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>🖼️ I2V Motion Mode</span>
        </button>

        <button
          onClick={() => setActiveTab('comfyui')}
          className={`pb-2 transition-colors border-b-2 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'comfyui'
              ? 'border-purple-400 text-purple-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          <span>⚙️ ComfyUI Node Syntax</span>
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`pb-2 transition-colors border-b-2 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'preview'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-sky-400" />
          <span>🎥 Camera Motion Preview</span>
        </button>

        <button
          onClick={() => setActiveTab('breakdown')}
          className={`pb-2 transition-colors border-b-2 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
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
          className={`pb-2 transition-colors border-b-2 flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'negative'
              ? 'border-[#D4AF37] text-[#D4AF37]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
          <span>// Negative Constraints</span>
        </button>
      </div>

      {/* Explanation Banner */}
      <div className="mb-4 bg-slate-900/90 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>
            {activeTab === 'i2v'
              ? <strong>Dedicated Image-to-Video (I2V) Motion Prompt: Stripped of redundant static descriptions to prevent facial distortion. Focuses purely on camera tracking, physical momentum, and particle aerodynamics.</strong>
              : activeTab === 'comfyui'
              ? <strong>ComfyUI Multi-Model Syntax: Formatted for Wan 2.1, CogVideoX, and AnimateDiff with CLIP Text positive tokens and FizzNodes Prompt Travel frame schedules.</strong>
              : <strong>How to generate video: Copy this compiled prompt & launch directly in Runway, Sora, Kling, or Luma to render full HD/4K MP4 videos!</strong>
            }
          </span>
        </div>
        <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded shrink-0">
          {activeTab === 'i2v' ? 'I2V Motion Mode' : activeTab === 'comfyui' ? 'ComfyUI Ready' : 'Prompt Engine Ready'}
        </span>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'full' && (
        <div className="relative z-10 space-y-4">
          <div className="p-4 rounded-lg bg-slate-900/80 border border-white/5 font-mono text-sm text-white leading-relaxed break-words select-all shadow-inner">
            <p className="text-indigo-200 text-xs font-mono italic mb-2">// Assembled Prompt (Text-to-Video)</p>
            {output.fullPrompt}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 uppercase font-mono">
            <div className="flex items-center space-x-3">
              <span>Length: <strong className="text-[#D4AF37]">{output.fullPrompt.length} CHARS</strong></span>
              <span>Words: <strong className="text-[#D4AF37]">{output.fullPrompt.split(' ').length} WORDS</strong></span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyFullPrompt}
                className="flex items-center space-x-1 px-3 py-1 rounded bg-[#D4AF37] text-slate-950 font-bold transition-all cursor-pointer"
              >
                {copiedPrompt ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPrompt ? 'Copied' : 'Copy T2V Prompt'}</span>
              </button>
              <button
                onClick={handleDownloadJSON}
                className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* I2V Motion Tab Content */}
      {activeTab === 'i2v' && (
        <div className="relative z-10 space-y-4">
          <div className="p-4 rounded-lg bg-slate-900/80 border border-cyan-800/40 font-mono text-sm text-cyan-100 leading-relaxed break-words select-all shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <p className="text-cyan-400 text-xs font-mono font-bold flex items-center gap-1.5">
                <span>🖼️ Image-to-Video (I2V) Motion & Camera Prompt</span>
              </p>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                Optimized for Kling 1.5, Wan 2.1 & Runway Gen-3 I2V
              </span>
            </div>
            {output.i2vMotionPrompt}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 uppercase font-mono">
            <div className="flex items-center space-x-3">
              <span>Length: <strong className="text-cyan-400">{output.i2vMotionPrompt?.length || 0} CHARS</strong></span>
              <span className="text-slate-400 font-sans lowercase">zero facial conflict with reference photo</span>
            </div>

            <button
              onClick={handleCopyI2VPrompt}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all cursor-pointer shadow-md"
            >
              {copiedI2V ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedI2V ? 'I2V Motion Copied!' : 'Copy I2V Motion Prompt'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ComfyUI Tab Content */}
      {activeTab === 'comfyui' && (
        <div className="relative z-10 space-y-4">
          <div className="p-4 rounded-lg bg-slate-900/80 border border-purple-800/40 font-mono text-xs text-purple-100 leading-relaxed break-words select-all shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-400 font-mono font-bold flex items-center gap-1.5">
                <span>⚙️ ComfyUI CLIP Positive & Travel Schedule</span>
              </p>
              <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                Wan 2.1 / CogVideoX / AnimateDiff
              </span>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-purple-200 leading-normal">
              {output.comfyuiSyntax}
            </pre>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 uppercase font-mono">
            <div className="flex items-center space-x-3">
              <span>Paste into: <strong className="text-purple-400">CLIPTextEncode / FizzNodes</strong></span>
            </div>

            <button
              onClick={handleCopyComfyPrompt}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all cursor-pointer shadow-md"
            >
              {copiedComfy ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedComfy ? 'ComfyUI Syntax Copied!' : 'Copy ComfyUI Syntax'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Simulated Motion Preview Tab */}
      {activeTab === 'preview' && (
        <div className="relative z-10 space-y-3">
          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center group">
            {/* Background Sample Art with Motion Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={sampleImg}
                alt={currentStyleConfig.name}
                className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${getCameraMotionClass()}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

            {/* Rule of Thirds Grid Overlay */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/10">
                <div className="border-r border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-b border-white/10" />
                <div className="border-r border-white/10" />
                <div className="border-r border-white/10" />
                <div className="" />
              </div>
            )}

            {/* Camera Viewfinder HUD */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90 drop-shadow-md pointer-events-none">
              <div className="flex items-center space-x-2 bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-rose-400 font-bold">REC ● 00:05</span>
                <span>• 24 FPS</span>
              </div>

              <div className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/10 flex items-center space-x-2 text-[#D4AF37]">
                <span>CAM: {output.params.cameraMovement.toUpperCase()}</span>
                <span>• MOTION: {output.params.motionScale}/10</span>
              </div>
            </div>

            {/* Bottom HUD info */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-200 pointer-events-none">
              <div className="bg-slate-900/90 p-2 rounded-lg border border-white/10 max-w-md backdrop-blur-sm">
                <span className="text-emerald-400 font-bold">CHAR ANCHOR: </span>
                <span>{output.params.characterName || 'Locked Subject'}</span>
                <p className="text-[9px] text-slate-400 line-clamp-1">{output.params.characterAttrs}</p>
              </div>

              <div className="bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-white/10 text-right">
                <span className="text-sky-300 font-bold">MODEL TARGET: </span>
                <span>{output.params.platformTarget.toUpperCase()}</span>
                <p className="text-[9px] text-slate-400">Aspect Ratio {output.params.aspectRatio}</p>
              </div>
            </div>

            {/* Play / Control Overlay */}
            <div className="absolute bottom-3 right-3 flex items-center space-x-2 z-20 pointer-events-auto">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="p-1.5 rounded-md bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/10 transition-colors cursor-pointer"
                title="Toggle Viewfinder Grid"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsPlayingMotion(!isPlayingMotion)}
                className="px-2.5 py-1 rounded-md bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center space-x-1 shadow transition-all cursor-pointer"
              >
                {isPlayingMotion ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                <span>{isPlayingMotion ? 'Pause Motion' : 'Play Motion'}</span>
              </button>
            </div>
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
              className="flex items-center space-x-1.5 px-3 py-1 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-900/40 transition-colors cursor-pointer"
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

      {/* Quick Launch on AI Video Platforms */}
      <div className="mt-5 pt-4 border-t border-white/10 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-black uppercase text-amber-300 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-[#D4AF37]" />
            Direct Launch in AI Video Platform (Copy & Open):
          </span>
          {copiedModel && (
            <span className="text-[10px] text-emerald-400 font-bold font-mono animate-bounce">
              ✓ Prompt copied! Opening {copiedModel}...
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {aiVideoPlatforms.map((p) => (
            <button
              key={p.name}
              onClick={() => handleLaunchModel(p.name, p.url)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer border border-white/10 ${p.color}`}
            >
              <span>{p.name}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </button>
          ))}
        </div>
      </div>

      {/* Model Specs Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-slate-500 uppercase flex justify-between font-mono">
        <span>Target: {output.params.platformTarget.toUpperCase()}</span>
        <span>Estimated Tokens: {Math.round(output.fullPrompt.length / 4)}</span>
      </div>
    </div>
  );
};

