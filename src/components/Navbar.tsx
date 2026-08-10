import React from 'react';
import { Film, Sparkles, ShoppingBag, BookOpen, Layers, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenGumroad: () => void;
  onOpenHistory: () => void;
  savedCount: number;
  isProUnlocked?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGumroad,
  onOpenHistory,
  savedCount,
  isProUnlocked = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center shadow-sm">
            <Film className="w-5 h-5 text-[#D4AF37] stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-[#0F172A]">
                AI STORY STUDIO
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#D4AF37] border border-[#D4AF37]/40">
                PRO V3.2
              </span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold hidden sm:block">
              Pro Video Prompt Engine
            </p>
          </div>
        </div>

        {/* Feature Highlights Badges */}
        <div className="hidden lg:flex items-center space-x-3 text-xs font-medium text-slate-600">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200">
            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>12 Commercial Styles</span>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Character Lock 2.0</span>
          </div>

          {/* Conditional Offline Web App & Prompt Vault Button */}
          {isProUnlocked ? (
            <a
              href="/prompt-forge.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 border border-emerald-500/30 transition-colors cursor-pointer"
              title="已解锁付费权限：点击打开离线单页应用并下载提示词库"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-bold">⚡ 打开离线版 Web App & 下载提示词</span>
            </a>
          ) : (
            <button
              onClick={onOpenGumroad}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border border-amber-500/30 transition-colors cursor-pointer"
              title="PRO 专属离线应用与 1880+ 提示词库，购买或激活后即可打开"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-bold">🔒 离线 App & 提示词库 (PRO 专属)</span>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Saved Prompts</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#0F172A] text-[#D4AF37] font-bold text-[10px]">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenGumroad}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#0F172A] hover:bg-slate-800 text-white shadow-md transition-all transform active:scale-95 border border-[#D4AF37]/30"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
            <span>UNLOCK FULL PACK</span>
          </button>
        </div>
      </div>
    </header>
  );
};
