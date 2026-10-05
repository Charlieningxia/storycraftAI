import { ART_STYLES } from '../data/artStyles';
import { SHOT_TYPES, CAMERA_MOVEMENTS, AI_PLATFORMS } from '../data/shotTemplates';
import { PromptBuildParams, PromptBuildOutput } from '../types';

export const SYSTEM_MANDATORY_CONSISTENCY_DIRECTIVES =
  'definitive consistent character design, retain identical facial features, same face, consistent facial structure, fixed hairstyle, do not redesign character, only change posture and expression';

export const SYSTEM_ANTI_DRIFT_KEYWORDS =
  'flicker-free character geometry, consistent facial anatomy across frames, steady character proportions, zero morphological facial shifting';

export const SYSTEM_DEFAULT_NEGATIVE_PROMPT =
  'deformed, blurry, ugly, distorted face, extra limbs, modern objects, inconsistent character, morphing face, floating limbs, duplicated features, asymmetrical face, mutating body, low quality video, compression artifacts';

export function generatePromptId(): string {
  return `prompt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

export function buildStoryPrompt(params: PromptBuildParams): PromptBuildOutput {
  const style = ART_STYLES.find((s) => s.id === params.styleId) || ART_STYLES[0];
  const shot = SHOT_TYPES.find((s) => s.id === params.shotType) || SHOT_TYPES[0];
  const camera = CAMERA_MOVEMENTS.find((c) => c.id === params.cameraMovement) || CAMERA_MOVEMENTS[0];
  const platform = AI_PLATFORMS.find((p) => p.id === params.platformTarget) || AI_PLATFORMS[0];

  // 1. Character Lock Block
  let characterLockBlock = '';
  if (params.enableCharLock && (params.characterName.trim() || params.characterAttrs.trim())) {
    const charHeader = params.characterName.trim()
      ? `[CHAR ANCHOR: ${params.characterName.trim()}]`
      : '[CHAR ANCHOR]';
    const charDetails = params.characterAttrs.trim() ? `${params.characterAttrs.trim()}, ` : '';

    characterLockBlock = `${charHeader} ${charDetails}${SYSTEM_MANDATORY_CONSISTENCY_DIRECTIVES}, ${SYSTEM_ANTI_DRIFT_KEYWORDS}`;
  }

  // 2. Camera & Shot Block
  const cameraBlock = `${shot.promptModifier}, ${camera.promptModifier}`;

  // 3. Style & Environment Block
  const styleBlock = `${style.baseModifiers.join(', ')}, ${style.renderEngine}, ${params.moodLighting || style.lightingStyle}`;

  // 4. Scene Context Block
  const sceneBlock = params.sceneDesc.trim() || 'standing in ancient scenic landscape';

  // Assemble full prompt sentence
  const promptParts: string[] = [];

  // Lead with shot & camera for video generators
  promptParts.push(cameraBlock);

  // Character Anchor if enabled
  if (characterLockBlock) {
    promptParts.push(characterLockBlock);
  } else if (params.characterName || params.characterAttrs) {
    const charText = [params.characterName, params.characterAttrs].filter(Boolean).join(' - ');
    promptParts.push(`Featuring character: ${charText}`);
  }

  // Action / Scene description
  promptParts.push(`Scene action: ${sceneBlock}`);

  // Art style & rendering spec
  promptParts.push(styleBlock);

  // Custom user modifiers if present
  if (params.customModifiers && params.customModifiers.trim()) {
    promptParts.push(params.customModifiers.trim());
  }

  // Platform flags
  let platformFlags = '';
  if (params.aspectRatio) {
    platformFlags += `--ar ${params.aspectRatio} `;
  }
  if (params.motionScale) {
    platformFlags += `--motion ${params.motionScale} `;
  }

  const fullPrompt = `${promptParts.join('. ')}. ${platformFlags}`.trim();

  // 5. Dedicated Image-to-Video (I2V / 图生视频) Motion Prompt
  // Crucial rule: Do not repeat static character clothing/face from image; focus 100% on motion, camera, and physics!
  const i2vMotionPrompt = `[CAMERA ACTION]: ${camera.promptModifier}. [DYNAMIC MOVEMENT]: Subject performs smooth natural action: ${params.sceneDesc.replace(/standing in ancient scenic landscape/i, 'initiating dynamic movement and dramatic physical gesture')}. [PHYSICAL DYNAMICS]: Natural cloth sway and hair physics, particle drift in air, realistic environmental reaction. [LIGHTING INTERACTION]: Volumetric light rays shifting with camera glide. Maintain exact character likeness and face geometry from source image without redrawing static features.`;

  // 6. ComfyUI Node & CLIP Text Formatting
  const comfyuiSyntax = `// === COMFYUI CLIP TEXT ENCODE (POSITIVE) ===
${shot.promptModifier}, ${camera.promptModifier}, (cinematic motion:1.2), (temporal coherence:1.2), ${params.sceneDesc}, ${style.baseModifiers.slice(0, 3).join(', ')}, ${params.moodLighting || style.lightingStyle}

// === COMFYUI MODEL-SPECIFIC DIRECTIVES ===
// Recommended Model: Wan 2.1 (14B) / CogVideoX-5B / Kling I2V
// Motion Strength / Bucket: ${params.motionScale * 15} | FPS: 24 | Sampler: UniPC / Euler Ancestral
(camera_${params.cameraMovement.replace('-', '_')}:1.15), <lora:motion_dynamics:0.85>
// Prompt Travel Schedule (FizzNodes):
"0": "${camera.promptModifier}, begins motion",
"16": "peak dynamic action of ${params.characterName || 'subject'}",
"32": "smooth continuation and atmospheric particle settle"`;

  // Combine negative prompts
  const negativeParts = [...style.negativePrompts, SYSTEM_DEFAULT_NEGATIVE_PROMPT];
  const combinedNegativePrompt = Array.from(new Set(negativeParts.flatMap(p => p.split(', ')))).join(', ');

  return {
    id: generatePromptId(),
    fullPrompt,
    characterLockBlock,
    sceneBlock,
    styleBlock,
    cameraBlock,
    negativePrompt: combinedNegativePrompt,
    platformFlags: platformFlags.trim(),
    i2vMotionPrompt,
    comfyuiSyntax,
    createdAt: new Date().toISOString(),
    params
  };
}
