import React from 'react';
import { ART_STYLES } from '../data/artStyles';
import { ArtStyleId } from '../types';
import { Check, Sparkles, Sliders } from 'lucide-react';

interface ArtStyleSelectorProps {
  selectedStyleId: ArtStyleId;
  onSelectStyle: (styleId: ArtStyleId) => void;
}

export const ArtStyleSelector: React.FC<ArtStyleSelectorProps> = ({
  selectedStyleId,
  onSelectStyle
}) => {
  const selectedStyle = ART_STYLES.find((s) => s.id === selectedStyleId) || ART_STYLES[0];

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm transition-all">
      {/* Header & Dropdown Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">
            01. Select Art Style
          </label>
          <h2 className="text-base font-bold text-[#0F172A]">
            Commercial Art Style Selector
          </h2>
        </div>

        {/* Quick Dropdown Select */}
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-slate-400" />
          <select
            value={selectedStyleId}
            onChange={(e) => onSelectStyle(e.target.value as ArtStyleId)}
            className="w-full sm:w-64 text-xs font-medium bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            {ART_STYLES.map((style, idx) => (
              <option key={style.id} value={style.id}>
                {idx + 1}. {style.name} ({style.tagline})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {ART_STYLES.map((style) => {
          const isSelected = style.id === selectedStyleId;

          return (
            <button
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              className={`group relative text-left rounded-lg overflow-hidden transition-colors ${
                isSelected
                  ? 'border-2 border-[#D4AF37] bg-amber-50 shadow-sm'
                  : 'border border-slate-200 hover:border-slate-400 bg-white'
              }`}
            >
              {/* Image Preview */}
              <div className="aspect-square relative overflow-hidden bg-slate-900">
                <img
                  src={style.sampleImage}
                  alt={style.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isSelected ? 'scale-105' : 'group-hover:scale-105 opacity-90'
                  }`}
                  loading="lazy"
                />

                {/* Selected Check Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#D4AF37] text-slate-950 flex items-center justify-center shadow font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                {/* Overlay Text */}
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="inline-block text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-0.5">
                    {style.renderEngine.split(' / ')[0]}
                  </span>
                  <h3 className="text-xs font-bold text-white truncate leading-tight">
                    {style.name}
                  </h3>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="p-2 bg-transparent">
                <p className="text-[10px] font-bold text-slate-600 line-clamp-1 uppercase">
                  {style.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Style Modifiers Spec Bar */}
      <div className="mt-4 p-3 rounded-lg bg-[#0F172A] text-slate-200 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2 border border-[#D4AF37]/20">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <div>
            <span className="font-bold text-[#D4AF37] mr-2">Loaded Base Prompt:</span>
            <span className="text-slate-300 text-[11px] italic font-mono">
              "{selectedStyle.baseModifiers.slice(0, 4).join(', ')}..."
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-[11px] text-slate-400 shrink-0">
          <div>
            <span className="text-slate-400">Lighting:</span>{' '}
            <span className="text-white font-semibold">{selectedStyle.lightingStyle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
