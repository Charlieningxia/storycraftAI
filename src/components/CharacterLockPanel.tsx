import React from 'react';
import { ShieldCheck, Lock, UserCheck, AlertTriangle, Sparkles, Sliders } from 'lucide-react';
import { SYSTEM_MANDATORY_CONSISTENCY_DIRECTIVES, SYSTEM_ANTI_DRIFT_KEYWORDS } from '../utils/promptGenerator';

interface CharacterLockPanelProps {
  enabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
  characterName: string;
  onChangeCharacterName: (val: string) => void;
  characterAttrs: string;
  onChangeCharacterAttrs: (val: string) => void;
}

export const CharacterLockPanel: React.FC<CharacterLockPanelProps> = ({
  enabled,
  onToggleEnabled,
  characterName,
  onChangeCharacterName,
  characterAttrs,
  onChangeCharacterAttrs
}) => {
  return (
    <div
      className={`rounded-xl p-5 border transition-all ${
        enabled
          ? 'bg-white text-slate-900 border-2 border-[#D4AF37] shadow-sm'
          : 'bg-white text-slate-900 border border-slate-200'
      }`}
    >
      {/* Top Header & Toggle */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">
            03. Character Lock & Consistency
          </label>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-[#0F172A]">
              Character Consistency Shield
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-[#D4AF37]/40">
              ACTIVE SHIELD
            </span>
          </div>
        </div>

        {/* Enable / Disable Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggleEnabled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F172A]"></div>
          <span className="ml-2 text-xs font-bold text-[#0F172A]">
            {enabled ? 'LOCKED' : 'OFF'}
          </span>
        </label>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Character Name / Role Anchor */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Character Role Anchor Name:
          </label>
          <div className="relative">
            <input
              type="text"
              value={characterName}
              onChange={(e) => onChangeCharacterName(e.target.value)}
              placeholder="e.g. Moses the Prophet, Young David, Queen Amytis..."
              className="w-full text-xs font-medium rounded-lg px-3 py-2 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:border-[#D4AF37] transition-all"
            />
            <UserCheck className="w-4 h-4 absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Physical Attributes & Attire */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Physical Attributes (Face, Hair, Attire):
          </label>
          <div className="relative">
            <input
              type="text"
              value={characterAttrs}
              onChange={(e) => onChangeCharacterAttrs(e.target.value)}
              placeholder="e.g. Silver braided beard, deep blue eyes, woven dark linen robe..."
              className="w-full text-xs font-medium rounded-lg px-3 py-2 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:border-[#D4AF37] transition-all"
            />
            <Lock className="w-4 h-4 absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Live Auto-Injected Directives Display */}
      {enabled && (
        <div className="mt-4 p-3 rounded-lg bg-[#0F172A] border border-[#D4AF37]/30 text-xs text-white">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-[#D4AF37] flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Auto-Injected Consistency Tokens:
            </span>
            <span className="text-[10px] text-green-400 font-mono">100% Locked</span>
          </div>

          <p className="text-[11px] font-mono text-slate-200 bg-slate-900/70 p-2 rounded border border-white/5 leading-relaxed mb-1">
            "{SYSTEM_MANDATORY_CONSISTENCY_DIRECTIVES}"
          </p>
        </div>
      )}
    </div>
  );
};
