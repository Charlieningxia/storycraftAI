import React from 'react';
import { SHOT_TYPES, CAMERA_MOVEMENTS, AI_PLATFORMS } from '../data/shotTemplates';
import { ShotTypeId, CameraMovementId, PlatformTarget } from '../types';
import { Video, Camera, Compass, Sliders, Sun, Film, Sparkles } from 'lucide-react';

interface SceneAndShotConfigProps {
  sceneDesc: string;
  onChangeSceneDesc: (val: string) => void;
  moodLighting: string;
  onChangeMoodLighting: (val: string) => void;
  shotType: ShotTypeId;
  onChangeShotType: (val: ShotTypeId) => void;
  cameraMovement: CameraMovementId;
  onChangeCameraMovement: (val: CameraMovementId) => void;
  platformTarget: PlatformTarget;
  onChangePlatformTarget: (val: PlatformTarget) => void;
  aspectRatio: string;
  onChangeAspectRatio: (val: string) => void;
  motionScale: number;
  onChangeMotionScale: (val: number) => void;
  onTriggerEnhance: () => void;
  isEnhancing: boolean;
}

const MOOD_LIGHTING_PRESETS = [
  'Dramatic Chiaroscuro & Volumetric Dust',
  'Warm Golden Hour Sunbeams',
  'Sacred Celestial Glow & Divine Light',
  'Bioluminescent Twilight Mist',
  'Flickering Torchlight & Deep Shadows',
  'Soft Diffused Daylight'
];

export const SceneAndShotConfig: React.FC<SceneAndShotConfigProps> = ({
  sceneDesc,
  onChangeSceneDesc,
  moodLighting,
  onChangeMoodLighting,
  shotType,
  onChangeShotType,
  cameraMovement,
  onChangeCameraMovement,
  platformTarget,
  onChangePlatformTarget,
  aspectRatio,
  onChangeAspectRatio,
  motionScale,
  onChangeMotionScale,
  onTriggerEnhance,
  isEnhancing
}) => {
  const currentPlatform = AI_PLATFORMS.find((p) => p.id === platformTarget) || AI_PLATFORMS[0];

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">
            04. Scene & Camera Params
          </label>
          <h2 className="text-base font-bold text-[#0F172A]">
            Scene Details & Camera Framing
          </h2>
        </div>

        {/* AI Auto-Enhance Button */}
        <button
          onClick={onTriggerEnhance}
          disabled={isEnhancing}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#0F172A] hover:bg-slate-800 text-white shadow transition-all shrink-0 active:scale-95 disabled:opacity-60 border border-[#D4AF37]/30"
        >
          <Sparkles className={`w-4 h-4 text-[#D4AF37] ${isEnhancing ? 'animate-spin' : ''}`} />
          <span>{isEnhancing ? 'Enhancing with AI...' : 'AI Auto-Enhance Scene'}</span>
        </button>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Scene Description TextArea */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Scene Details (Character & Action):
          </label>
          <textarea
            rows={3}
            value={sceneDesc}
            onChange={(e) => onChangeSceneDesc(e.target.value)}
            placeholder="Example: An ancient Pharaoh standing before the Great Sphinx at sunset, majestic and powerful mood..."
            className="w-full h-24 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#D4AF37] resize-none text-slate-900"
          />
        </div>

        {/* Mood & Lighting Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
            Mood & Lighting Preset:
          </label>
          <input
            type="text"
            value={moodLighting}
            onChange={(e) => onChangeMoodLighting(e.target.value)}
            placeholder="e.g. Dramatic Chiaroscuro & Volumetric Dust"
            className="w-full text-xs font-medium rounded-lg px-3 py-2 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:border-[#D4AF37] mb-2"
          />

          <div className="flex flex-wrap gap-1">
            {MOOD_LIGHTING_PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => onChangeMoodLighting(preset)}
                className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                  moodLighting === preset
                    ? 'bg-amber-50 border-[#D4AF37] text-amber-900 font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
                }`}
              >
                {preset.split(' ')[0]} {preset.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shot Type & Camera Movement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shot Framing Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            Camera Shot Type:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SHOT_TYPES.map((shot) => {
              const isSelected = shot.id === shotType;

              return (
                <button
                  key={shot.id}
                  onClick={() => onChangeShotType(shot.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-2 border-[#D4AF37] bg-amber-50 text-[#0F172A] font-bold shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <h4 className="text-xs font-bold">{shot.name}</h4>
                  <p
                    className={`text-[10px] line-clamp-1 mt-0.5 ${
                      isSelected ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {shot.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Camera Movement Pattern */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            Camera Movement Template:
          </label>

          <select
            value={cameraMovement}
            onChange={(e) => onChangeCameraMovement(e.target.value as CameraMovementId)}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#D4AF37] mb-2"
          >
            {CAMERA_MOVEMENTS.map((cam) => (
              <option key={cam.id} value={cam.id}>
                {cam.name} — {cam.description}
              </option>
            ))}
          </select>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 italic">
            Movement Tag:{' '}
            <span className="font-semibold text-slate-900 font-mono">
              "{CAMERA_MOVEMENTS.find((c) => c.id === cameraMovement)?.promptModifier}"
            </span>
          </div>
        </div>
      </div>

      {/* Target Video AI Engine Settings */}
      <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Platform Target */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
            <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
            Target Video AI Generator:
          </label>
          <select
            value={platformTarget}
            onChange={(e) => onChangePlatformTarget(e.target.value as PlatformTarget)}
            className="w-full text-xs font-bold bg-[#0F172A] text-white rounded-lg px-3 py-2 outline-none focus:border-[#D4AF37]"
          >
            {AI_PLATFORMS.map((plat) => (
              <option key={plat.id} value={plat.id}>
                {plat.name} ({plat.badge})
              </option>
            ))}
          </select>
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Aspect Ratio:
          </label>
          <div className="flex gap-1.5">
            {currentPlatform.aspectRatios.map((ratio) => (
              <button
                key={ratio}
                onClick={() => onChangeAspectRatio(ratio)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                  aspectRatio === ratio
                    ? 'border-2 border-[#D4AF37] bg-amber-50 text-[#0F172A]'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Motion Scale Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
              Motion Intensity:
            </label>
            <span className="text-xs font-mono font-bold text-[#D4AF37] bg-amber-50 px-2 py-0.5 rounded border border-[#D4AF37]/30">
              Level {motionScale}/10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={motionScale}
            onChange={(e) => onChangeMotionScale(parseInt(e.target.value))}
            className="w-full accent-[#D4AF37] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
