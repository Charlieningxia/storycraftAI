export type ArtStyleId =
  | 'pixar-3d'
  | 'studio-ghibli'
  | 'cinematic-historical'
  | 'lego-animation'
  | 'byzantine-icon'
  | 'storybook-gouache'
  | 'claymation'
  | 'dark-fantasy-oil'
  | 'chinese-ink-wash'
  | 'makoto-shinkai'
  | 'cyberpunk-neon'
  | 'dark-gothic-fantasy';

export interface ArtStyleConfig {
  id: ArtStyleId;
  name: string;
  tagline: string;
  description: string;
  baseModifiers: string[];
  renderEngine: string;
  lightingStyle: string;
  negativePrompts: string[];
  cameraHint: string;
  sampleImage: string;
  accentColor: string;
}

export type StoryCategoryId = 
  | 'xianxia-wuxia' 
  | 'suspense-gothic' 
  | 'cyber-scifi' 
  | 'healing-anime' 
  | 'epic-myths';

export interface StoryPreset {
  id: string;
  title: string;
  description: string;
  recommendedStyle: ArtStyleId;
  characterName: string;
  characterAttrs: string;
  sceneDesc: string;
  moodLighting: string;
  shotType: ShotTypeId;
  cameraMovement: CameraMovementId;
}

export interface StoryCategoryConfig {
  id: StoryCategoryId;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  presets: StoryPreset[];
}

export type ShotTypeId = 'wide' | 'medium' | 'close-up' | 'extreme-close';

export interface ShotTypeConfig {
  id: ShotTypeId;
  name: string;
  description: string;
  promptModifier: string;
  icon: string;
}

export type CameraMovementId =
  | 'slow-push'
  | 'pan-right'
  | 'drone-orbit'
  | 'low-angle-tracking'
  | 'handheld-subtle'
  | 'static-cinematic';

export interface CameraMovementConfig {
  id: CameraMovementId;
  name: string;
  description: string;
  promptModifier: string;
}

export type VideoMode = 'all' | 't2v' | 'i2v' | 'comfyui';

export type PlatformTarget =
  | 'runway-gen3'
  | 'kling-ai'
  | 'luma-dream'
  | 'pika-2'
  | 'sora-veo'
  | 'comfyui-wan21'
  | 'comfyui-cogvideo'
  | 'comfyui-animatediff';

export interface PlatformConfig {
  id: PlatformTarget;
  name: string;
  badge: string;
  aspectRatios: string[];
  motionSyntax: string;
  negativeSupport: boolean;
  notes: string;
}

export interface CharacterLockConfig {
  enabled: boolean;
  characterName: string;
  physicalAttrs: string;
  ageAndGender: string;
  attireAndAccessories: string;
  lockTokens: string[];
  antiDriftKeywords: string[];
}

export interface PromptBuildParams {
  styleId: ArtStyleId;
  categoryId: StoryCategoryId;
  characterName: string;
  characterAttrs: string;
  sceneDesc: string;
  moodLighting: string;
  shotType: ShotTypeId;
  cameraMovement: CameraMovementId;
  platformTarget: PlatformTarget;
  aspectRatio: string;
  motionScale: number; // 1-10
  enableCharLock: boolean;
  customModifiers?: string;
}

export interface PromptBuildOutput {
  id: string;
  fullPrompt: string;
  characterLockBlock: string;
  sceneBlock: string;
  styleBlock: string;
  cameraBlock: string;
  negativePrompt: string;
  platformFlags: string;
  i2vMotionPrompt: string;
  comfyuiSyntax: string;
  createdAt: string;
  params: PromptBuildParams;
}

export interface StoryboardShot {
  shotIndex: number;
  shotTitle: string;
  shotType: ShotTypeId;
  movement: CameraMovementId;
  sceneAction: string;
  fullPrompt: string;
}

export interface StoryboardSequence {
  title: string;
  characterName: string;
  styleId: ArtStyleId;
  shots: StoryboardShot[];
}
