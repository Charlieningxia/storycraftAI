import React from 'react';
import { STORY_CATEGORIES } from '../data/storyPresets';
import { ART_STYLES } from '../data/artStyles';
import { StoryCategoryId, StoryPreset } from '../types';
import { BookOpen, Landmark, Sparkles, Wand2, Zap, ArrowRight, Palette } from 'lucide-react';

interface StoryCategorySelectorProps {
  selectedCategoryId: StoryCategoryId;
  onSelectCategory: (categoryId: StoryCategoryId) => void;
  onLoadPreset: (preset: StoryPreset) => void;
}

export const StoryCategorySelector: React.FC<StoryCategorySelectorProps> = ({
  selectedCategoryId,
  onSelectCategory,
  onLoadPreset
}) => {
  const currentCategory = STORY_CATEGORIES.find((c) => c.id === selectedCategoryId) || STORY_CATEGORIES[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-4 h-4" />;
      case 'Landmark':
        return <Landmark className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Wand2':
        return <Wand2 className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getStyleName = (styleId: string) => {
    const style = ART_STYLES.find((s) => s.id === styleId);
    return style ? style.name : styleId;
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">
            02. Story Universe
          </label>
          <h2 className="text-base font-bold text-[#0F172A]">
            Narrative Tracks & Scene Presets
          </h2>
        </div>
      </div>

      {/* Category Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-4">
        {STORY_CATEGORIES.map((category) => {
          const isSelected = category.id === selectedCategoryId;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'bg-amber-50 border-2 border-[#D4AF37] text-[#0F172A] shadow-sm font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <div
                  className={`p-1.5 rounded-md ${
                    isSelected ? 'bg-[#0F172A] text-[#D4AF37]' : 'bg-slate-200/70 text-slate-700'
                  }`}
                >
                  {getCategoryIcon(category.iconName)}
                </div>
                <h3 className="text-xs font-bold truncate">{category.title}</h3>
              </div>
              <p
                className={`text-[11px] line-clamp-1 ${
                  isSelected ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                {category.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Preset Loader Chips */}
      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            Instant Scene Presets ({currentCategory.title}):
          </span>
          <span className="text-[11px] text-slate-500 italic">Click card to auto-fill inputs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {currentCategory.presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onLoadPreset(preset)}
              className="group p-2.5 rounded-lg bg-white border border-slate-200 hover:border-[#D4AF37] hover:shadow-sm transition-all text-left flex flex-col justify-between gap-1.5"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-amber-700 transition-colors line-clamp-1">
                    {preset.title}
                  </h4>
                  <div className="p-1 rounded bg-slate-100 group-hover:bg-amber-100 text-slate-500 group-hover:text-amber-800 shrink-0">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                  {preset.description}
                </p>
              </div>

              <div className="flex items-center space-x-1 pt-1 border-t border-slate-100 mt-1">
                <Palette className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-[10px] font-semibold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  {getStyleName(preset.recommendedStyle)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

