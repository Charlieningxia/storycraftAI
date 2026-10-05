import React, { useState, useEffect } from 'react';
import {
  Flame,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Zap,
  Eye,
  Layers,
  Clock,
  ArrowUpRight,
  Calendar,
  X,
  ShieldCheck,
  Code,
  Video,
  Image as ImageIcon,
  Cpu,
  BookOpen
} from 'lucide-react';
import { ArtStyleId, StoryCategoryId, ShotTypeId, CameraMovementId, PlatformTarget, VideoMode } from '../types';

export interface TrendingPromptItem {
  id: string;
  rank: number;
  title: string;
  tag: string;
  category: StoryCategoryId;
  mode?: 't2v' | 'i2v' | 'comfyui';
  styleId: ArtStyleId;
  characterName: string;
  characterAttrs: string;
  sceneDesc: string;
  moodLighting: string;
  shotType: ShotTypeId;
  cameraMovement: CameraMovementId;
  platformTarget: PlatformTarget;
  aspectRatio: string;
  motionScale: number;
  views: string;
  copies: string;
  rating: string;
  hotBadge: string;
  modelTag: string;
  weeklyDrop?: string;
  assembledPrompt: string;
  i2vMotionPrompt?: string;
  comfyuiNodeSyntax?: string;
}

interface TrendingPromptsSectionProps {
  onApplyPrompt: (prompt: TrendingPromptItem) => void;
  onOpenStoryboard: (prompt: TrendingPromptItem) => void;
}

export const TrendingPromptsSection: React.FC<TrendingPromptsSectionProps> = ({
  onApplyPrompt
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDrop, setSelectedDrop] = useState<string>('week-33');
  const [activeMode, setActiveMode] = useState<VideoMode>('all');
  const [prompts, setPrompts] = useState<TrendingPromptItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<string>('full');
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Just now');
  const [inspectPrompt, setInspectPrompt] = useState<TrendingPromptItem | null>(null);
  const [inspectTab, setInspectTab] = useState<'assembled' | 'i2v' | 'comfyui'>('assembled');
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  // Fetch trending prompts from server
  const fetchTrendingPrompts = async (
    cat: string = activeCategory,
    mode: VideoMode = activeMode,
    drop: string = selectedDrop
  ) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/trending-prompts?category=${cat}&mode=${mode}&drop=${drop}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.prompts)) {
        setPrompts(data.prompts);
        setLastUpdatedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to load trending prompts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingPrompts(activeCategory, activeMode, selectedDrop);
  }, [activeCategory, activeMode, selectedDrop]);

  const handleCopyText = (id: string, text: string, type: string = 'full') => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedType('full');
    }, 2000);
  };

  const categories = [
    { id: 'all', label: '🔥 All Viral Trends', icon: '🌟' },
    { id: 'xianxia-wuxia', label: '🗡️ Oriental Xianxia', icon: '🏮' },
    { id: 'cyber-scifi', label: '🤖 Cyberpunk & Sci-Fi', icon: '⚡' },
    { id: 'healing-anime', label: '🧸 Cute & Pixar 3D', icon: '🌸' },
    { id: 'suspense-gothic', label: '🍷 Gothic & Dark Fantasy', icon: '🏰' },
    { id: 'epic-myths', label: '🐉 Mythic Epics', icon: '🔥' }
  ];

  const modes: { id: VideoMode; label: string; icon: React.ReactNode; badge: string }[] = [
    { id: 'all', label: 'All Modes', icon: <Layers className="w-3.5 h-3.5" />, badge: '13+ Vault' },
    { id: 'i2v', label: 'Image-to-Video (I2V Motion)', icon: <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />, badge: 'HOT 5' },
    { id: 'comfyui', label: 'ComfyUI Node Models', icon: <Cpu className="w-3.5 h-3.5 text-purple-400" />, badge: 'Wan2.1 / Cog' },
    { id: 't2v', label: 'Text-to-Video (T2V Direct)', icon: <Video className="w-3.5 h-3.5 text-amber-400" />, badge: 'Sora / Gen-3' }
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm relative overflow-hidden">
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-24 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 relative z-10 border-b border-slate-100 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
              WEEKLY PROMPT FEED • VIRAL DISCOVERY
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 inline" /> Updated: {lastUpdatedTime}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5 flex items-center gap-2">
            <Flame className="w-6 h-6 text-rose-500 fill-rose-500 animate-bounce" />
            Trending AI Video Prompts Showcase
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Verified prompts for Runway Gen-3, Sora, Kling AI 1.5, Wan 2.1 & ComfyUI. Supports Text-to-Video & Image-to-Video Motion Prompts.
          </p>
        </div>

        {/* Action Controls & Weekly Drop Selector */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* I2V & ComfyUI Guide Button */}
          <button
            onClick={() => setShowGuideModal(true)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all border border-indigo-200 cursor-pointer shadow-sm"
            title="Read Guide on I2V & ComfyUI Prompt Engineering"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>I2V & ComfyUI Guide</span>
          </button>

          {/* Weekly Drop Dropdown */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-amber-500 ml-1 mr-1" />
            <select
              value={selectedDrop}
              onChange={(e) => setSelectedDrop(e.target.value)}
              className="bg-transparent border-none text-slate-800 text-xs font-bold focus:outline-none cursor-pointer pr-1"
            >
              <option value="week-33">📅 Week 33 Drop (Sept 2026 - Latest Live)</option>
              <option value="week-32">📅 Week 32 Drop (Aug 2026 Summer Vault)</option>
              <option value="week-31">📅 Week 31 Drop (Aug 2026 Specials)</option>
              <option value="all">🌟 All Drops Combined</option>
            </select>
          </div>

          <button
            onClick={() => fetchTrendingPrompts(activeCategory, activeMode, selectedDrop)}
            disabled={isLoading}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer border border-amber-500/30"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Refreshing...' : 'AI Refresh Feed'}</span>
          </button>
        </div>
      </div>

      {/* Target Pipeline Mode Selector (T2V vs I2V vs ComfyUI) */}
      <div className="mb-4 bg-slate-900 text-white p-3 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
          <span className="text-[#D4AF37] font-mono uppercase text-[11px] tracking-wider">TARGET PIPELINE:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeMode === m.id
                  ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                activeMode === m.id ? 'bg-slate-950/20 text-slate-900' : 'bg-slate-700 text-slate-300'
              }`}>
                {m.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly PRO VIP Guarantee Banner */}
      <div className="mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-3.5 sm:p-4 rounded-xl border border-amber-500/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/40 text-amber-300 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase text-amber-300 font-mono">PRO WEEKLY VAULT GUARANTEE</span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded font-bold">
                WEEK 33 ACTIVE • 50+ PROMPTS ADDED
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Every Monday, newly verified prompts for Wan 2.1, Kling 1.5, CogVideoX, Runway Gen-3 & Sora are pushed directly to this live feed.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-amber-500/20 shrink-0">
          ⚡ Next Drop: Monday 00:00 UTC
        </span>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#0F172A] text-white shadow-md ring-2 ring-[#D4AF37]/50'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/60'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200 p-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-5 w-3/4 bg-slate-200 rounded" />
                <div className="h-4 w-1/2 bg-slate-200 rounded" />
                <div className="h-16 w-full bg-slate-200 rounded" />
              </div>
              <div className="h-10 w-full bg-slate-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        /* Prompt Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {prompts.map((item) => {
            const isCopiedFull = copiedId === item.id && copiedType === 'full';
            const isCopiedI2V = copiedId === item.id && copiedType === 'i2v';
            const isCopiedComfy = copiedId === item.id && copiedType === 'comfy';

            return (
              <div
                key={item.id}
                className="group relative bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                {/* Top Badge Row */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        {item.hotBadge || `#${item.rank}`}
                      </span>

                      {/* Mode Badge */}
                      {item.mode === 'i2v' && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                          <ImageIcon className="w-2.5 h-2.5" /> I2V Motion
                        </span>
                      )}
                      {item.mode === 'comfyui' && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                          <Cpu className="w-2.5 h-2.5" /> ComfyUI
                        </span>
                      )}
                      {(!item.mode || item.mode === 't2v') && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          T2V Direct
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                        ★ {item.rating}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Eye className="w-3 h-3" /> {item.views}
                      </span>
                    </div>
                  </div>

                  {/* Title & Target Model Badge */}
                  <h3 className="text-base font-extrabold text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400">
                    <span className="text-amber-400 font-bold">📅 {item.weeklyDrop || 'Week 33 (Sept 2026)'}</span>
                    <span>•</span>
                    <span className="text-sky-300 font-semibold">{item.modelTag}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">{item.copies} applied</span>
                  </div>

                  {/* Character Anchor & Scene Brief */}
                  <div className="mt-2.5 text-xs text-slate-300 space-y-1">
                    <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/60 font-mono text-[11px] text-emerald-300">
                      <span className="text-slate-400 font-sans">Character Anchor: </span>
                      {item.characterName} ({item.characterAttrs})
                    </div>
                  </div>

                  {/* Assembled Prompt Code Box (Prominent Code Display) */}
                  <div className="mt-3 relative bg-slate-950 p-3 rounded-xl border border-slate-800/90 font-mono text-[11px] text-slate-200 leading-relaxed overflow-hidden group/code">
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-500 border-b border-slate-800/80 pb-1 mb-1.5 font-bold">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Code className="w-3 h-3" />
                        {item.mode === 'i2v' ? 'I2V DYNAMIC MOTION' : item.mode === 'comfyui' ? 'COMFYUI SYNTAX' : 'PROMPT CODE'}
                      </span>
                      <span>
                        {(item.i2vMotionPrompt || item.assembledPrompt).length} CHARS
                      </span>
                    </div>
                    <p className="line-clamp-3 select-all text-slate-200 font-mono">
                      {item.mode === 'i2v' && item.i2vMotionPrompt
                        ? item.i2vMotionPrompt
                        : item.mode === 'comfyui' && item.comfyuiNodeSyntax
                        ? item.comfyuiNodeSyntax
                        : item.assembledPrompt}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Layers className="w-3 h-3 text-[#D4AF37]" />
                      Ratio {item.aspectRatio} • Motion {item.motionScale}/10
                    </span>

                    <button
                      onClick={() => {
                        setInspectPrompt(item);
                        setInspectTab(item.mode === 'i2v' ? 'i2v' : item.mode === 'comfyui' ? 'comfyui' : 'assembled');
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer underline text-[11px]"
                    >
                      <span>Inspect Details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {/* Apply to generator button */}
                    <button
                      onClick={() => {
                        onApplyPrompt(item);
                        const el = document.getElementById('output-section');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center space-x-1 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Use Prompt</span>
                    </button>

                    {/* Copy button */}
                    {item.mode === 'i2v' && item.i2vMotionPrompt ? (
                      <button
                        onClick={() => handleCopyText(item.id, item.i2vMotionPrompt!, 'i2v')}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 border cursor-pointer ${
                          isCopiedI2V
                            ? 'bg-cyan-500 text-white border-cyan-400'
                            : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-cyan-700/50'
                        }`}
                        title="Copy dedicated Image-to-Video motion prompt"
                      >
                        {isCopiedI2V ? <Check className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />}
                        <span>{isCopiedI2V ? 'Copied I2V!' : 'Copy I2V'}</span>
                      </button>
                    ) : item.mode === 'comfyui' && item.comfyuiNodeSyntax ? (
                      <button
                        onClick={() => handleCopyText(item.id, item.comfyuiNodeSyntax!, 'comfy')}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 border cursor-pointer ${
                          isCopiedComfy
                            ? 'bg-purple-500 text-white border-purple-400'
                            : 'bg-slate-800 hover:bg-slate-700 text-purple-300 border-purple-700/50'
                        }`}
                        title="Copy ComfyUI node & LoRA syntax"
                      >
                        {isCopiedComfy ? <Check className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5 text-purple-400" />}
                        <span>{isCopiedComfy ? 'Copied Node!' : 'Copy Comfy'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCopyText(item.id, item.assembledPrompt, 'full')}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 border cursor-pointer ${
                          isCopiedFull
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        }`}
                      >
                        {isCopiedFull ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{isCopiedFull ? 'Copied!' : 'Copy Prompt'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Inspector Modal for Prompt Analysis */}
      {inspectPrompt && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-[#D4AF37]/50 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectPrompt(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>PROMPT INSPECTOR & MULTI-MODEL SYNTAX</span>
            </div>

            <h3 className="text-xl font-black text-white">{inspectPrompt.title}</h3>

            <div className="flex flex-wrap items-center gap-2 mt-2 mb-4 text-xs">
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-bold">
                {inspectPrompt.hotBadge}
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-mono font-bold">
                📅 Drop: {inspectPrompt.weeklyDrop || 'Week 33 (Sept 2026)'}
              </span>
              <span className="bg-slate-800 text-sky-300 px-2.5 py-0.5 rounded-full font-mono">
                Engine: {inspectPrompt.modelTag}
              </span>
            </div>

            {/* Syntax Format Tabs */}
            <div className="flex border-b border-slate-800 gap-2 mb-4 text-xs font-bold font-mono">
              <button
                onClick={() => setInspectTab('assembled')}
                className={`pb-2 px-2 border-b-2 transition-colors cursor-pointer ${
                  inspectTab === 'assembled' ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                1. Text-to-Video (T2V Full)
              </button>
              {inspectPrompt.i2vMotionPrompt && (
                <button
                  onClick={() => setInspectTab('i2v')}
                  className={`pb-2 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1 ${
                    inspectTab === 'i2v' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3 h-3 text-cyan-400" />
                  2. Image-to-Video (I2V Motion)
                </button>
              )}
              {inspectPrompt.comfyuiNodeSyntax && (
                <button
                  onClick={() => setInspectTab('comfyui')}
                  className={`pb-2 px-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1 ${
                    inspectTab === 'comfyui' ? 'border-purple-400 text-purple-300' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3 h-3 text-purple-400" />
                  3. ComfyUI Node Syntax
                </button>
              )}
            </div>

            {/* Display Selected Syntax */}
            <div className="space-y-4 text-xs font-mono">
              {inspectTab === 'assembled' && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2 border-b border-slate-800 pb-2">
                    <span className="font-bold text-amber-300">COMPILED T2V ENGLISH PROMPT:</span>
                    <span>{inspectPrompt.assembledPrompt.length} Characters</span>
                  </div>
                  <p className="text-slate-100 leading-relaxed font-mono select-all">
                    {inspectPrompt.assembledPrompt}
                  </p>
                </div>
              )}

              {inspectTab === 'i2v' && (
                <div className="bg-slate-950 p-4 rounded-xl border border-cyan-900/50">
                  <div className="flex items-center justify-between text-slate-400 mb-2 border-b border-slate-800 pb-2">
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                      IMAGE-TO-VIDEO (I2V) MOTION PROMPT:
                    </span>
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                      Zero Facial Conflict
                    </span>
                  </div>
                  <p className="text-cyan-100 leading-relaxed font-mono select-all">
                    {inspectPrompt.i2vMotionPrompt || inspectPrompt.assembledPrompt}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 font-sans italic">
                    💡 <strong>I2V Rule:</strong> Use your initial still image as the visual reference. This prompt dictates camera speed, physical momentum, and dynamic gestures without re-describing the face or clothing.
                  </p>
                </div>
              )}

              {inspectTab === 'comfyui' && (
                <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/50">
                  <div className="flex items-center justify-between text-slate-400 mb-2 border-b border-slate-800 pb-2">
                    <span className="font-bold text-purple-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-purple-400" />
                      COMFYUI CLIP TEXT & SCHEDULING:
                    </span>
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                      Wan 2.1 / CogVideoX / AnimateDiff
                    </span>
                  </div>
                  <pre className="text-purple-100 leading-relaxed font-mono select-all whitespace-pre-wrap">
                    {inspectPrompt.comfyuiNodeSyntax || inspectPrompt.assembledPrompt}
                  </pre>
                </div>
              )}

              {/* Parameter Matrix */}
              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase">Character Anchor Lock</span>
                  <strong className="text-emerald-300 font-sans text-sm">{inspectPrompt.characterName}</strong>
                  <p className="text-[11px] text-slate-300 mt-0.5">{inspectPrompt.characterAttrs}</p>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase">Camera & Lighting</span>
                  <strong className="text-sky-300 font-sans text-sm">{inspectPrompt.cameraMovement}</strong>
                  <p className="text-[11px] text-slate-300 mt-0.5">{inspectPrompt.moodLighting}</p>
                </div>
              </div>

              {/* Model Compatibility Ratings */}
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 space-y-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">AI Video Engine Compatibility:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
                  <div className="bg-purple-950/60 border border-purple-800/50 p-2 rounded">
                    <span className="block text-purple-300 font-bold">Wan 2.1 (Alibaba)</span>
                    <span className="text-emerald-400 font-bold">100% Match</span>
                  </div>
                  <div className="bg-amber-950/60 border border-amber-800/50 p-2 rounded">
                    <span className="block text-amber-300 font-bold">Kling 1.5</span>
                    <span className="text-emerald-400 font-bold">99% Match</span>
                  </div>
                  <div className="bg-cyan-950/60 border border-cyan-800/50 p-2 rounded">
                    <span className="block text-cyan-300 font-bold">CogVideoX 5B</span>
                    <span className="text-emerald-400 font-bold">96% Match</span>
                  </div>
                  <div className="bg-emerald-950/60 border border-emerald-800/50 p-2 rounded">
                    <span className="block text-emerald-300 font-bold">Runway Gen-3</span>
                    <span className="text-emerald-400 font-bold">98% Match</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end space-x-3">
              <button
                onClick={() => {
                  const targetText =
                    inspectTab === 'i2v' && inspectPrompt.i2vMotionPrompt
                      ? inspectPrompt.i2vMotionPrompt
                      : inspectTab === 'comfyui' && inspectPrompt.comfyuiNodeSyntax
                      ? inspectPrompt.comfyuiNodeSyntax
                      : inspectPrompt.assembledPrompt;
                  handleCopyText(inspectPrompt.id, targetText, inspectTab);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer border border-slate-700 flex items-center space-x-1.5"
              >
                {copiedId === inspectPrompt.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === inspectPrompt.id ? 'Copied Syntax!' : 'Copy Current Syntax'}</span>
              </button>

              <button
                onClick={() => {
                  onApplyPrompt(inspectPrompt);
                  setInspectPrompt(null);
                  const el = document.getElementById('output-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer flex items-center space-x-1.5"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Apply to Generator Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal: I2V & ComfyUI Prompt Engineering Guide */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl max-w-3xl w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>OFFICIAL WORKFLOW MANUAL</span>
            </div>

            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <span>Image-to-Video (I2V) & ComfyUI Multi-Model Prompt Engineering Manual</span>
            </h3>

            <div className="mt-4 space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
              {/* Question 1: I2V Prompts */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  Q1: Do Image-to-Video (I2V) Workflows Still Require Text Prompts? How to Write Them?
                </h4>
                <p className="text-slate-300 mb-2">
                  <strong>Answer: Absolutely!</strong> In Image-to-Video generation, the <strong>initial reference image serves as the spatial anchor (responsible for character likeness, costume, and environmental textures)</strong>, while the <strong>text prompt acts as the director (responsible for camera trajectory, subject momentum, and physical aerodynamics)</strong>.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-200 space-y-1">
                  <p className="font-bold text-emerald-400">⚠️ Golden Rule: Never repeat static visual details already present in the source image!</p>
                  <p className="text-slate-400">❌ Incorrect: "A handsome sword master in white robe standing on mountain peak..." (Triggers re-render conflicts, causing facial distortion, melting, or motion freezing).</p>
                  <p className="text-cyan-300">✅ Proven Formula: [Camera Trajectory] + [Subject Dynamic Action] + [Environmental Physics] + [Lighting Fluctuations]</p>
                  <p className="text-slate-300">e.g. Slow push-in camera motion. Subject raises right hand, teal glowing sword rotates and flies forward. Mountain fog swirls violently, cloth fluttering in wind.</p>
                </div>
              </div>

              {/* Question 2: ComfyUI Models Differences */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  Q2: Prompt Structure & Architecture Differences Across ComfyUI Video Models
                </h4>
                <div className="space-y-3">
                  <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    <strong className="text-sky-300 block mb-1">1. Wan 2.1 (Alibaba Open-Source 14B / 1.3B)</strong>
                    <p className="text-slate-300 text-[11px]">
                      • <strong>Highlights:</strong> Current open-source SOTA. Exceptional comprehension of natural English action phrases. Outstanding for both T2V and I2V.<br />
                      • <strong>Prompt Structure:</strong> Natural descriptive sentences with clear subject-action-verb phrasing (e.g. "steps forward, unsheathes long blade, swings with silver arc") combined with cinematic camera terms ("low-angle tracking, smooth cinematic pan").
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    <strong className="text-cyan-300 block mb-1">2. CogVideoX (Zhipu AI Open-Source 5B / 2B)</strong>
                    <p className="text-slate-300 text-[11px]">
                      • <strong>Highlights:</strong> High sensitivity to energetic English motion verbs and mechanical physics.<br />
                      • <strong>Prompt Structure:</strong> Heavily dependent on precise camera terms (Pan, Zoom, Tilt, Dolly) coupled with intense atmospheric action verbs (sparks, steam, turbulent wind).
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    <strong className="text-amber-300 block mb-1">3. AnimateDiff (SD1.5 / SDXL)</strong>
                    <p className="text-slate-300 text-[11px]">
                      • <strong>Highlights:</strong> Highly modular, requires Camera Motion LoRAs (pan/zoom/tilt) and temporal frame scheduling.<br />
                      • <strong>Prompt Structure:</strong> Standard SD prompt weights `(masterpiece:1.2)` + FizzNodes Prompt Travel frame schedules (`"0": "...", "16": "...", "32": "..."`). Essential negative prompt: `(flickering, jitter, morphing:1.4)` to suppress flicker.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    <strong className="text-emerald-300 block mb-1">4. Kling AI (1.5) & Runway Gen-3 I2V</strong>
                    <p className="text-slate-300 text-[11px]">
                      • <strong>Highlights:</strong> Native support for Motion Brush localized control. Prompts only require 1-2 punchy, dynamic physical action sentences for maximum physical coherence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Weekly Drop Explanations */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Q3: How Are Weekly Prompt Drops Curated and Applied?
                </h4>
                <p className="text-slate-300">
                  Every Monday at 00:00 UTC, 50+ new viral commercial prompts verified on Sora, Runway Gen-3, Kling 1.5, Wan 2.1 & ComfyUI are pushed directly to this live feed. Click "Use Prompt" on any card to instantly load parameters into the generator below.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
              >
                Understood, Return to Generator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Banner Inside Section */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Week 33 Live Feed Active • Verified for Wan 2.1, Kling 1.5, Runway Gen-3 & ComfyUI</span>
        </div>
        <button
          onClick={() => setShowGuideModal(true)}
          className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 hover:bg-indigo-100 cursor-pointer"
        >
          View I2V & ComfyUI Architecture Guide →
        </button>
      </div>
    </section>
  );
};
