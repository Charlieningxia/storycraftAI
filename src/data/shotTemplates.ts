import { ShotTypeConfig, CameraMovementConfig, PlatformConfig } from '../types';

export const SHOT_TYPES: ShotTypeConfig[] = [
  {
    id: 'wide',
    name: 'Wide Shot (Establishing)',
    description: 'Captures grand scenery, environment, scale and atmospheric depth.',
    promptModifier: 'Wide establishing shot, ultra wide angle perspective, environmental scale depth',
    icon: 'Maximize2'
  },
  {
    id: 'medium',
    name: 'Medium Shot (Interaction)',
    description: 'Focuses on character waist-up, gesture, dialogue and posture.',
    promptModifier: 'Medium shot, waist-up framing, clear character posture and body language',
    icon: 'User'
  },
  {
    id: 'close-up',
    name: 'Close-up Shot (Emotion)',
    description: 'Highlights facial expressions, subtle gaze, and emotional intensity.',
    promptModifier: 'Dramatic close-up shot, detailed facial features framing, emotional depth focus',
    icon: 'Smile'
  },
  {
    id: 'extreme-close',
    name: 'Macro / Eye Close-up',
    description: 'Macro focus on eye gaze, sacred artifact, or micro gesture.',
    promptModifier: 'Extreme macro close-up shot, 100mm macro lens focus on eye reflection and micro detail',
    icon: 'Search'
  }
];

export const CAMERA_MOVEMENTS: CameraMovementConfig[] = [
  {
    id: 'slow-push',
    name: 'Slow Push-In',
    description: 'Dramatically advances camera forward toward subject.',
    promptModifier: 'cinematic slow push-in camera motion, smooth forward zoom glide'
  },
  {
    id: 'pan-right',
    name: 'Smooth Horizontal Pan',
    description: 'Sweeps camera horizontally to reveal landscape or secondary character.',
    promptModifier: 'smooth horizontal pan right camera movement, fluid panorama tracking'
  },
  {
    id: 'drone-orbit',
    name: '360° Circular Orbit',
    description: 'Sweeping orbital camera loop around central character/subject.',
    promptModifier: 'epic 360 degree circular drone orbit shot around subject'
  },
  {
    id: 'low-angle-tracking',
    name: 'Low-Angle Hero Tracking',
    description: 'Positioned low looking up, moving steadily alongside character.',
    promptModifier: 'monumental low angle tracking camera shot, heroic upward angle perspective'
  },
  {
    id: 'handheld-subtle',
    name: 'Subtle Handheld Drift',
    description: 'Documentary style subtle organic sway for realism and tension.',
    promptModifier: 'subtle organic handheld camera sway, realistic documentary camera motion'
  },
  {
    id: 'static-cinematic',
    name: 'Locked Static Shot',
    description: 'Fixed camera composition with moving light beams, fog, or dust particles.',
    promptModifier: 'locked static tripod cinematic frame with subtle atmospheric ambient particle motion'
  }
];

export const AI_PLATFORMS: PlatformConfig[] = [
  {
    id: 'runway-gen3',
    name: 'Runway Gen-3 Alpha',
    badge: 'Popular',
    aspectRatios: ['16:9', '9:16'],
    motionSyntax: '--motion',
    negativeSupport: true,
    notes: 'Optimized for cinematic lighting and high motion physics.'
  },
  {
    id: 'kling-ai',
    name: 'Kling AI 1.5',
    badge: 'High Quality',
    aspectRatios: ['16:9', '9:16', '1:1'],
    motionSyntax: 'motion_scale',
    negativeSupport: true,
    notes: 'Excellent character stability and high frame rate coherence.'
  },
  {
    id: 'luma-dream',
    name: 'Luma Dream Machine',
    badge: 'Smooth Motion',
    aspectRatios: ['16:9', '9:16', '4:3'],
    motionSyntax: 'camera_speed',
    negativeSupport: true,
    notes: 'Great 3D camera sweeps and organic physics simulation.'
  },
  {
    id: 'pika-2',
    name: 'Pika 2.0',
    badge: 'Stylized',
    aspectRatios: ['16:9', '9:16', '1:1', '4:5'],
    motionSyntax: '-camera',
    negativeSupport: true,
    notes: 'Superior stylized animation, 3D clay, and fantasy renders.'
  },
  {
    id: 'sora-veo',
    name: 'OpenAI Sora / Veo 2',
    badge: 'Next-Gen',
    aspectRatios: ['16:9', '9:16', '2.39:1'],
    motionSyntax: 'cinematic_motion',
    negativeSupport: false,
    notes: 'Responds best to dense natural English descriptions.'
  }
];
