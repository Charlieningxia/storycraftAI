import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Prompt Enhancer Endpoint (uses Gemini if GEMINI_API_KEY is available)
  app.post('/api/enhance-prompt', async (req, res) => {
    try {
      const {
        characterName,
        characterAttrs,
        sceneDesc,
        styleName,
        categoryName,
        shotType,
        cameraMovement
      } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback intelligent enhancement if key not configured
        const enhancedScene = `${sceneDesc || 'Standing in ancient epic setting'} with atmospheric depth, realistic environmental particles, dramatic volumetric lighting, and high-fidelity texture detail.`;
        const enhancedChar = `${characterName || 'Hero character'} (${characterAttrs || 'distinct facial features, period attire'}), displaying natural emotional gaze and steady posture.`;

        return res.json({
          success: true,
          source: 'rule-engine',
          enhancedScene,
          enhancedChar,
          creativeSuggestions: [
            'Add volumetric dust motes caught in sunbeams',
            'Incorporate subtle cloth fabric motion in wind',
            'Specify rim lighting to separate character from dark background'
          ]
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const promptText = `You are a world-class Hollywood AI Cinematographer and Prompt Engineer for video generators like Runway Gen-3, Sora, and Kling AI.
Expand the following user story concept into an ultra-evocative 2-sentence visual description optimized for video AI generation:
- Character: ${characterName || 'N/A'} (${characterAttrs || 'N/A'})
- Scene Action: ${sceneDesc}
- Art Style: ${styleName}
- Category: ${categoryName}
- Camera Framing: ${shotType}, ${cameraMovement}

Return a clean JSON object with keys:
"enhancedScene": concise detailed scene description focused on movement, physics, and lighting.
"enhancedChar": detailed character visual anchors for consistency.
"creativeSuggestions": array of 3 short prompt tweak tips.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const textOutput = response.text || '';
      try {
        const parsed = JSON.parse(textOutput);
        return res.json({
          success: true,
          source: 'gemini-2.5-flash',
          ...parsed
        });
      } catch {
        return res.json({
          success: true,
          source: 'gemini-raw',
          enhancedScene: textOutput,
          enhancedChar: characterAttrs,
          creativeSuggestions: ['Optimize camera speed for model', 'Ensure consistent lighting']
        });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Enhancement failed';
      console.error('Enhance API error:', errorMessage);
      return res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  });

  // Trending prompts live discovery endpoint
  app.get('/api/trending-prompts', async (req, res) => {
    try {
      const category = (req.query.category as string) || 'all';
      const mode = (req.query.mode as string) || 'all'; // 'all' | 't2v' | 'i2v' | 'comfyui'
      const drop = (req.query.drop as string) || 'all'; // 'all' | 'week-33' | 'week-32' | 'week-31' | 'week-30'
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // High quality static fallback trending prompts curated for AI video creators across all categories
        const allPrompts = [
          // ================= WEEK 33 NEWEST RELEASES (SEPT 2026 - CURRENT DROP) =================
          {
            id: 'tp-w33-1',
            rank: 1,
            title: '[I2V • Cyberpunk] Rain Street Hoverbike Neon Drift',
            tag: 'I2V Motion / Cyber',
            category: 'cyber-scifi',
            mode: 'i2v',
            styleId: 'cyberpunk-neon',
            characterName: 'Neon Drifter',
            characterAttrs: 'Black reflective leather coat, glowing cyan visor helmet',
            sceneDesc: 'Hoverbike drifts sideways around a rain-slicked corner at 120mph, blue thruster fire blasting out as puddles spray across the lens.',
            moodLighting: 'High-contrast rainy neon reflection with blinding cyan and magenta neon strobes',
            shotType: 'medium',
            cameraMovement: 'low-angle-tracking',
            platformTarget: 'kling-ai',
            aspectRatio: '16:9',
            motionScale: 9,
            views: '54.6k',
            copies: '16.2k',
            rating: '9.9',
            hotBadge: '🔥 Week 33 #1 Hit',
            modelTag: 'Kling 1.5 I2V / Wan 2.1',
            weeklyDrop: 'Week 33 (Sept 2026 - Latest)',
            assembledPrompt: 'Low angle tracking camera shot, heroic upward angle perspective, monumental velocity. [CHAR ANCHOR: Neon Drifter] Black reflective leather coat, glowing cyan visor helmet, definitive consistent character design. Hoverbike drifts sideways around rain-slicked corner, blue thruster fire blasting out as puddles spray across lens. Cyberpunk neon metropolis, volumetric rain mist.',
            i2vMotionPrompt: '[CAMERA ACTION]: Low-angle tracking shot accelerating forward with realistic motion blur. [DYNAMIC MOVEMENT]: The hoverbike turns sharply, rear thruster flames igniting with blue fire, rear wheel throws up spray of water droplets on the wet asphalt. [PHYSICAL DYNAMICS]: Driver\'s leather coat billows backward in turbulent wind. Neon sign reflections warp and stretch in puddles as the bike passes. No facial redrawing, preserve original helmet and frame consistency.',
            comfyuiNodeSyntax: '(dynamic hoverbike drift:1.2), (rear thruster cyan flame boost:1.3), water spray splash, neon reflections motion, (camera low angle forward tracking:1.15), (motion_bucket:135), <lora:wan21_action_speed:0.8>'
          },
          {
            id: 'tp-w33-2',
            rank: 2,
            title: '[I2V • Xianxia] Celestial Sword Summoning Vortex',
            tag: 'I2V Motion / Xianxia',
            category: 'xianxia-wuxia',
            mode: 'i2v',
            styleId: 'chinese-ink-wash',
            characterName: 'Shushan Grandmaster',
            characterAttrs: 'Pure white Daoist silk robes with gold embroidery, flowing silver hair, calm divine aura',
            sceneDesc: 'Standing on mountain pinnacle, extending two fingers in sword mudra; ten thousand golden spectral swords burst from behind him in a spiraling skyward vortex.',
            moodLighting: 'Morning oriental golden sunlight piercing through dark ink mountain fog',
            shotType: 'wide',
            cameraMovement: 'slow-push',
            platformTarget: 'runway-gen3',
            aspectRatio: '16:9',
            motionScale: 8,
            views: '49.1k',
            copies: '13.9k',
            rating: '9.9',
            hotBadge: '⚡ Week 33 Viral',
            modelTag: 'Runway Gen-3 I2V / Wan 2.1',
            weeklyDrop: 'Week 33 (Sept 2026 - Latest)',
            assembledPrompt: 'Wide establishing shot, cinematic slow push-in camera motion. [CHAR ANCHOR: Shushan Grandmaster] Pure white Daoist silk robes with gold embroidery, flowing silver hair, calm divine aura. Extending two fingers in sword mudra; ten thousand golden spectral swords burst in spiraling skyward vortex breaking through clouds. Traditional Chinese Shan Shui ink wash painting style, gold leaf accents.',
            i2vMotionPrompt: '[CAMERA ACTION]: Smooth cinematic forward zoom into slow crane tilt upward. [DYNAMIC MOVEMENT]: Immortal hero extends two fingers forward in sword-control mudra; thousands of celestial golden swords burst outwards in a swirling spiral vortex breaking through clouds. [PHYSICAL DYNAMICS]: White silk robes and sleeve hems flutter vigorously in sudden spiritual wind. Golden spiritual shockwave radiates across misty atmosphere.',
            comfyuiNodeSyntax: '(sword telekinesis mudra gesture:1.2), flying swords spiral vortex, golden energy shockwave, cloud displacement, volumetric mist, (camera slow crane up:1.1), (smooth motion:1.25)'
          },
          {
            id: 'tp-w33-3',
            rank: 3,
            title: '[ComfyUI • Wan 2.1] Wuxia Bamboo Forest Moon Duel',
            tag: 'ComfyUI / Wan 2.1',
            category: 'xianxia-wuxia',
            mode: 'comfyui',
            styleId: 'cinematic-historical',
            characterName: 'Shadow Assassin',
            characterAttrs: 'Black linen hooded cloak, silver tiger mask, damascus steel dao blade',
            sceneDesc: 'Leaping lightly across tall bamboo stalks under full moon, slicing blade in mid-air leaving silver arc trail, bamboo leaves swirling in night wind.',
            moodLighting: 'Ethereal cold blue moonlight, deep bamboo shadows with shimmering dew highlights',
            shotType: 'medium',
            cameraMovement: 'pan-right',
            platformTarget: 'comfyui-wan21',
            aspectRatio: '16:9',
            motionScale: 8,
            views: '42.8k',
            copies: '11.5k',
            rating: '9.8',
            hotBadge: '🌟 ComfyUI SOTA',
            modelTag: 'ComfyUI Wan 2.1 (14B)',
            weeklyDrop: 'Week 33 (Sept 2026 - Latest)',
            assembledPrompt: 'Medium shot, smooth horizontal pan right camera movement. [CHAR ANCHOR: Shadow Assassin] Black linen hooded cloak, silver tiger mask, damascus steel dao blade. Leaping lightly across tall bamboo stalks under full moon, slicing blade in mid-air leaving silver arc trail, bamboo leaves swirling in night wind. Cinematic historical film lighting, 35mm film grain.',
            i2vMotionPrompt: '[CAMERA ACTION]: Smooth lateral tracking pan following subject mid-air momentum. [DYNAMIC MOVEMENT]: Assassin bounds from bamboo tip to tip, wielding dao blade in swift crescent cut with silver light trail. [PHYSICAL DYNAMICS]: Pliant bamboo poles bend and spring back dynamically under weight, green leaves cascade in swirling vortex. Zero facial re-render.',
            comfyuiNodeSyntax: '// Wan 2.1 14B CLIP Text Positive:\nmasterpiece, cinematic wuxia, bamboo forest night duel, bamboo swaying physics, (moonlit volumetric rays:1.2), (motion scale: 8), smooth temporal consistency, <lora:wan21_action_speed:0.75>\n// Negative: (jitter, flicker, morphing:1.4), bad anatomy, cartoon, duplicate limbs'
          },
          {
            id: 'tp-w33-4',
            rank: 4,
            title: '[ComfyUI • CogVideoX] Hyper-Mecha Hydraulic Drydock Ignition',
            tag: 'ComfyUI / CogVideoX',
            category: 'cyber-scifi',
            mode: 'comfyui',
            styleId: 'cyberpunk-neon',
            characterName: 'Mecha Commander',
            characterAttrs: 'Heavy reinforced armored pilot suit, amber tactical monocle',
            sceneDesc: 'Giant 40-meter industrial mech awakening in drydock, hydraulic pistons hissing with violent white steam ejection, chest reactor core glowing from cold cyan to blinding orange.',
            moodLighting: 'Industrial amber floodlights cutting through dense steam, flashing red emergency beacons',
            shotType: 'wide',
            cameraMovement: 'slow-push',
            platformTarget: 'comfyui-cogvideo',
            aspectRatio: '16:9',
            motionScale: 7,
            views: '38.4k',
            copies: '9.8k',
            rating: '9.7',
            hotBadge: '⚙️ CogVideoX 5B',
            modelTag: 'ComfyUI CogVideoX-5B',
            weeklyDrop: 'Week 33 (Sept 2026 - Latest)',
            assembledPrompt: 'Wide establishing shot, cinematic slow push-in camera motion. Giant 40-meter industrial mech awakening in drydock, hydraulic pistons hissing with violent white steam ejection, chest reactor core glowing from cold cyan to blinding orange. High contrast industrial amber floodlights, dense steam shadows.',
            i2vMotionPrompt: '[CAMERA ACTION]: Slow forward dolly push toward mecha chestplate. [DYNAMIC MOVEMENT]: Heavy cooling vents burst open with high-pressure steam, twin optic sensors snap on with blinding cyan flare, hydraulic limbs lock into combat stance. [PHYSICAL DYNAMICS]: Heat shimmer waves blur ambient industrial background, loose cables swing violently in wind.',
            comfyuiNodeSyntax: '(hydraulic steam ejection:1.3), mecha chest core ignition, volumetric haze, rotating amber strobe light, (slow forward dolly:1.1), high motion coherence, 4k octane render, temporal_guidance: 6.5'
          },
          {
            id: 'tp-w33-5',
            rank: 5,
            title: '[I2V • 3D Pixar] Fluffy Kitten Alchemist Potion Bubble',
            tag: 'I2V Motion / 3D',
            category: 'healing-anime',
            mode: 'i2v',
            styleId: 'pixar-3d',
            characterName: 'Kitten Alchemist',
            characterAttrs: 'Calico kitten with tiny leather scholar glasses and miniature wizard robe, soft fluffy fur',
            sceneDesc: 'Tapping a wooden spoon against a glowing glass beaker; iridescent rainbow potion bubbles float upwards as kitten blinks wide emerald eyes in surprise.',
            moodLighting: 'Warm cozy fireplace glow mixed with soft bioluminescent pastel bubble reflections',
            shotType: 'close-up',
            cameraMovement: 'handheld-subtle',
            platformTarget: 'luma-dream',
            aspectRatio: '9:16',
            motionScale: 6,
            views: '45.3k',
            copies: '12.4k',
            rating: '9.9',
            hotBadge: '🧸 Week 33 Cute Top',
            modelTag: 'Luma Dream / Wan 2.1 I2V',
            weeklyDrop: 'Week 33 (Sept 2026 - Latest)',
            assembledPrompt: 'Close-up shot, subtle organic handheld camera sway. [CHAR ANCHOR: Kitten Alchemist] Calico kitten with tiny leather scholar glasses, miniature wizard robe, soft fluffy fur. Tapping wooden spoon against glowing glass beaker; iridescent rainbow potion bubbles float upwards as kitten blinks wide emerald eyes. Pixar 3D animated style, ray-traced subsurface scattering.',
            i2vMotionPrompt: '[CAMERA ACTION]: Close-up with subtle organic handheld camera sway. [DYNAMIC MOVEMENT]: Cute calico kitten alchemist taps glass beaker with wooden spoon; glowing rainbow bubbles slowly emerge from potion and float into air, kitten tilts head and blinks curiously with expressive wide eyes. [PHYSICAL DYNAMICS]: Fluffy fur texture responds softly to ambient draft, sparkling dust particles twinkle inside floating bubbles.',
            comfyuiNodeSyntax: '(kitten taps potion beaker:1.2), rainbow glowing soap bubbles floating, kitten blinks eyes curiously, soft fur physics, warm fairytale lighting, (subtle handheld camera:1.05)'
          },
          {
            id: 'tp-w33-6',
            rank: 6,
            title: '[ComfyUI • AnimateDiff] Shinkai Sky Whale Flight (Prompt Travel)',
            tag: 'ComfyUI / AnimateDiff',
            category: 'healing-anime',
            mode: 'comfyui',
            styleId: 'makoto-shinkai',
            characterName: 'Seaside Dreamer',
            characterAttrs: 'Navy sailor school uniform, wind-blown bob hair',
            sceneDesc: 'A colossal bioluminescent sky whale swims gracefully through golden sunset cumulonimbus clouds while student watches in awe from a grassy cliff edge.',
            moodLighting: 'Breathtaking Makoto Shinkai golden hour sunlight with shimmering cerulean and pink cloud rims',
            shotType: 'wide',
            cameraMovement: 'pan-right',
            platformTarget: 'comfyui-animatediff',
            aspectRatio: '16:9',
            motionScale: 7,
            views: '35.9k',
            copies: '8.9k',
            rating: '9.8',
            hotBadge: '🌸 Prompt Travel',
            modelTag: 'ComfyUI AnimateDiff v3',
            weeklyDrop: 'Week 33 (Sept 2026 - Latest)',
            assembledPrompt: 'Wide establishing shot, smooth horizontal pan right camera movement. Colossal bioluminescent sky whale swims gracefully through golden sunset cumulonimbus clouds while schoolgirl watches in awe. Makoto Shinkai anime aesthetic, hand-drawn anime backgrounds, cinematic sky reflections.',
            i2vMotionPrompt: '[CAMERA ACTION]: Slow majestic pan following the colossal sky whale swimming through cloudbanks. [DYNAMIC MOVEMENT]: Massive whale fins glide through fluffy sunset clouds, creating visible cloud ripples and trailing stardust. [PHYSICAL DYNAMICS]: Student\'s hair and sailor collar billow in coastal breeze, golden sunbeams shift through cloud crevasses.',
            comfyuiNodeSyntax: '// FizzNodes Prompt Travel Schedule:\n"0": "giant cloud whale gliding slowly through pink cumulus clouds, <lora:v3_sd15_adapter:0.8>, (pan_right:1.1)",\n"16": "cloud whale breaches into golden sunset beams, bioluminescent fins glow vibrant blue, particle sparkles",\n"32": "whale dives into deep sea of clouds, camera tracks downward, sunset rays fade into twilight"'
          },
          {
            id: 'tp-w33-7',
            rank: 7,
            title: '[T2V • Sora/Veo] Thunder Dragon Emperor Forbidden Palace Ascent',
            tag: 'Next-Gen Sora / Myth',
            category: 'epic-myths',
            mode: 't2v',
            styleId: 'cinematic-historical',
            characterName: 'Dragon Emperor',
            characterAttrs: 'Imperial golden dragon robe, jade crown, imperial aura',
            sceneDesc: 'Ascending towering marble imperial stairs amidst ferocious tempest as a colossal serpentine golden dragon weaves through thunderstorm clouds overhead.',
            moodLighting: 'Apocalyptic thunderstorm flashes illuminating ornate golden palace roof tiles',
            shotType: 'wide',
            cameraMovement: 'drone-orbit',
            platformTarget: 'sora-veo',
            aspectRatio: '16:9',
            motionScale: 9,
            views: '46.7k',
            copies: '14.1k',
            rating: '9.9',
            hotBadge: '🐉 Cinematic Sora',
            modelTag: 'OpenAI Sora / Veo 2',
            weeklyDrop: 'Week 33 (Sept 2026 - Latest)',
            assembledPrompt: 'Epic 360 degree circular drone orbit shot around subject. [CHAR ANCHOR: Dragon Emperor] Imperial golden dragon robe, jade crown, imperial aura, definitive consistent character design. Ascending towering marble imperial stairs amidst ferocious tempest as a colossal serpentine golden dragon weaves through thunderstorm clouds overhead. Cinematic historical film style, photorealistic rain physics.',
            i2vMotionPrompt: '[CAMERA ACTION]: 360 degree orbital camera flight upward. [DYNAMIC MOVEMENT]: Giant eastern serpentine dragon coils through dark stormclouds, cyan lightning arcs between dragon whiskers, torrential rain droplets bounce off golden glazed roof tiles. [PHYSICAL DYNAMICS]: Red silk imperial banners snap fiercely in gale wind, volumetric fog swirls.',
            comfyuiNodeSyntax: '(coiling dragon in thunderstorm:1.3), dynamic lightning flash, flapping flags physics, heavy rain splash, photorealistic fluid dynamics, (cinematic drone ascent:1.2)'
          },
          {
            id: 'tp-w33-8',
            rank: 8,
            title: '[I2V • Gothic] Crimson Queen Blood Goblet Gaze',
            tag: 'I2V Motion / Gothic',
            category: 'suspense-gothic',
            mode: 'i2v',
            styleId: 'dark-gothic-fantasy',
            characterName: 'Vampire Empress Carmilla',
            characterAttrs: 'Black velvet Victorian gown with silver embroidery, pale porcelain skin, mesmerizing crimson eyes',
            sceneDesc: 'Lifting an ornate ruby goblet to her lips, taking a slow sip as ruby wine ripples, then slowly turning piercing gaze directly toward viewer as raven flies past.',
            moodLighting: 'Flickering candelabra flame casting dancing shadows across blood-red stained glass',
            shotType: 'close-up',
            cameraMovement: 'slow-push',
            platformTarget: 'runway-gen3',
            aspectRatio: '16:9',
            motionScale: 6,
            views: '37.8k',
            copies: '10.3k',
            rating: '9.8',
            hotBadge: '🍷 Dark Masterpiece',
            modelTag: 'Runway Gen-3 I2V',
            weeklyDrop: 'Week 33 (Sept 2026 - Latest)',
            assembledPrompt: 'Dramatic close-up shot, cinematic slow push-in camera motion. [CHAR ANCHOR: Vampire Empress Carmilla] Black velvet Victorian gown, pale porcelain skin, crimson eyes. Lifting ornate ruby goblet to lips, taking slow sip as wine ripples, turning piercing gaze toward viewer. Dark gothic fantasy oil painting style, volumetric moonlight.',
            i2vMotionPrompt: '[CAMERA ACTION]: Macro close-up slow zoom onto obsidian goblet. [DYNAMIC MOVEMENT]: Pale regal female hand slowly lifts ornate ruby chalice to lips, takes a slow sip as scarlet liquid ripples; eyes slowly gaze directly into camera lens with mesmerizing crimson glow. [PHYSICAL DYNAMICS]: Candlestick flames flicker in background draught, deep shadows fluctuate across gothic velvet collar.',
            comfyuiNodeSyntax: '(female lifts ruby chalice:1.2), scarlet liquid ripples, direct gaze into camera, crimson eye flare, flickering candlelight, deep gothic shadows, (macro slow push:1.15)'
          },

          // ================= WEEK 32 POPULAR VAULT (AUG 2026 RELEASES) =================
          {
            id: 'tp-1',
            rank: 9,
            title: '[Xianxia] Celestial Sword Immortal Sky Chase',
            tag: 'Xianxia Myth',
            category: 'xianxia-wuxia',
            mode: 't2v',
            styleId: 'chinese-ink-wash',
            characterName: 'Sword Immortal',
            characterAttrs: 'White embroidered silk robes, dark flowing hair, teal glowing sword, resolute gaze',
            sceneDesc: 'Standing on a solitary mountain peak above clouds surrounded by thousands of golden flying swords.',
            moodLighting: 'Poetic oriental morning golden light filtered through swirling mountain mist',
            shotType: 'wide',
            cameraMovement: 'slow-push',
            platformTarget: 'runway-gen3',
            aspectRatio: '16:9',
            motionScale: 7,
            views: '48.2k',
            copies: '12.8k',
            rating: '9.9',
            hotBadge: '🔥 Week 32 Viral',
            modelTag: 'Runway Gen-3 / Sora',
            weeklyDrop: 'Week 32 (Aug 2026)',
            assembledPrompt: 'Wide establishing shot, cinematic slow push-in camera motion. [CHAR ANCHOR: Shushan Sword Immortal] Ethereal young man in white silk robes with silver cloud embroidery, dark hair flowing, holding glowing teal sword, definitive consistent character design, retain identical facial features across frames. Standing on solitary mountain peak above sea of clouds, encircled by thousands of gold spectral flying swords. Traditional Chinese Shan Shui ink wash painting style, gold leaf accents, morning golden light.',
            i2vMotionPrompt: '[CAMERA ACTION]: Smooth cinematic forward zoom into slow crane tilt upward. [DYNAMIC MOVEMENT]: Immortal hero raises glowing teal sword, spiritual energy ripples outwards in golden circular shockwave. [PHYSICAL DYNAMICS]: Silk robes flap in divine wind, cloud mist curls around cliff face.',
            comfyuiNodeSyntax: '(sword immortal:1.1), (thousands of golden flying swords swirling:1.3), morning mist, Chinese ink wash aesthetic, volumetric sunbeams, (camera slow forward zoom:1.15)'
          },
          {
            id: 'tp-2',
            rank: 10,
            title: '[Cyberpunk] Rain Night Hoverbike Racer',
            tag: 'Cyberpunk',
            category: 'cyber-scifi',
            mode: 't2v',
            styleId: 'cyberpunk-neon',
            characterName: 'Cyber Nomad',
            characterAttrs: 'Futuristic illuminated jacket, cybernetic optics, sleek face mask, athletic build',
            sceneDesc: 'Riding a heavy glowing hoverbike through wet rain-soaked neon city streets under police drone pursuit.',
            moodLighting: 'High contrast rainy neon reflection, cyan and magenta glow',
            shotType: 'medium',
            cameraMovement: 'low-angle-tracking',
            platformTarget: 'kling-ai',
            aspectRatio: '16:9',
            motionScale: 8,
            views: '36.9k',
            copies: '9.4k',
            rating: '9.8',
            hotBadge: '⚡ Week 32 Hit',
            modelTag: 'Kling AI / Sora',
            weeklyDrop: 'Week 32 (Aug 2026)',
            assembledPrompt: 'Low angle tracking camera movement, ultra fast motion blur. [CHAR ANCHOR: Cyber Nomad] Futuristic silver lit jacket, glowing cybernetic eye, sleek mask. Riding heavy custom futuristic hoverbike at high speed through rain-soaked cyberpunk metropolis, wet asphalt reflecting vivid cyan and magenta neon signs.',
            i2vMotionPrompt: '[CAMERA ACTION]: Low-angle tracking shot accelerating forward with realistic motion blur. [DYNAMIC MOVEMENT]: Hoverbike turns sharply, rear thruster flames igniting with blue fire, water spray droplets on wet asphalt.',
            comfyuiNodeSyntax: '(hoverbike racing in rain:1.2), neon puddles reflections, cyan booster trail, (camera low angle forward:1.15), (motion_bucket:120)'
          },
          {
            id: 'tp-3',
            rank: 11,
            title: '[Pixar 3D] Clockwork Teddy Forest Explorer',
            tag: '3D Animation',
            category: 'healing-anime',
            mode: 't2v',
            styleId: 'pixar-3d',
            characterName: 'Clockwork Teddy',
            characterAttrs: 'Brass winding key on back, expressive amber gem eyes, realistic soft fluffy fur texture',
            sceneDesc: 'Navigating glowing bioluminescent mushroom forest holding an old parchment treasure map.',
            moodLighting: 'Soft ray-traced ambient lighting with warm fairy-tale glow',
            shotType: 'close-up',
            cameraMovement: 'handheld-subtle',
            platformTarget: 'luma-dream',
            aspectRatio: '9:16',
            motionScale: 5,
            views: '29.1k',
            copies: '8.1k',
            rating: '9.7',
            hotBadge: '🧸 Top Cute',
            modelTag: 'Luma Dream / Pika',
            weeklyDrop: 'Week 32 (Aug 2026)',
            assembledPrompt: 'Close-up shot, subtle handheld camera movement. [CHAR ANCHOR: Clockwork Teddy] Brass gear winding key on back, large expressive amber gem eyes, realistic fluffy fur render. Exploring magical glowing mushroom forest, holding ancient parchment map, translucent floating spores drifting gently.',
            i2vMotionPrompt: '[CAMERA ACTION]: Close-up handheld subtle camera drift. [DYNAMIC MOVEMENT]: Teddy turns head and smiles warmly, winding key spins slowly on back. [PHYSICAL DYNAMICS]: Fur flutters gently in night breeze, glowing spores float softly.',
            comfyuiNodeSyntax: '(fluffy teddy bear explorer:1.2), brass winding key, bioluminescent mushrooms, floating spores, Pixar 3D subsurface scattering, (subtle handheld:1.05)'
          },
          {
            id: 'tp-4',
            rank: 12,
            title: '[Gothic] Dark Lord Castle Throne Descent',
            tag: 'Gothic Dark',
            category: 'suspense-gothic',
            mode: 't2v',
            styleId: 'dark-gothic-fantasy',
            characterName: 'Shadow Lord',
            characterAttrs: 'High collar velvet coat with silver thread, pale sculpted features, ruby signet ring',
            sceneDesc: 'Seated on an obsidian throne inside a gothic cathedral as ravens fly past stained glass windows.',
            moodLighting: 'Volumetric moonlight beams breaking through stained glass, deep shadows',
            shotType: 'wide',
            cameraMovement: 'slow-push',
            platformTarget: 'runway-gen3',
            aspectRatio: '16:9',
            motionScale: 6,
            views: '24.5k',
            copies: '6.7k',
            rating: '9.6',
            hotBadge: '🍷 Cinematic',
            modelTag: 'Runway Gen-3',
            weeklyDrop: 'Week 31 (Aug 2026)',
            assembledPrompt: 'Wide establishing shot, smooth push-in glide. [CHAR ANCHOR: Shadow Lord] Dark velvet embroidered coat, pale angular features, ruby ring. Seated on ornate obsidian throne inside massive cathedral, flocks of ravens fluttering across moonlight filtering through stained glass.',
            i2vMotionPrompt: '[CAMERA ACTION]: Slow glide forward toward obsidian throne. [DYNAMIC MOVEMENT]: Shadow Lord leans forward resting chin on knuckles, black ravens take flight across hall.',
            comfyuiNodeSyntax: '(obsidian throne in gothic cathedral:1.2), dark lord in velvet coat, ravens flying across volumetric moonlight beams, deep chiaroscuro shadows, (slow push in:1.15)'
          },
          {
            id: 'tp-6',
            rank: 13,
            title: '[Mythic] Monkey King Sky Arena Battle',
            tag: 'Epic Myth',
            category: 'epic-myths',
            mode: 't2v',
            styleId: 'cinematic-historical',
            characterName: 'Sun Wukong',
            characterAttrs: 'Golden chainmail armor, phoenix feather cap, billowing red cape, flaming golden eyes',
            sceneDesc: 'Standing amidst celestial flames on a heavenly palace arena brandishing his golden staff.',
            moodLighting: 'Blazing divine fire glow with deep volumetric cloud shadows',
            shotType: 'wide',
            cameraMovement: 'drone-orbit',
            platformTarget: 'runway-gen3',
            aspectRatio: '16:9',
            motionScale: 9,
            views: '41.3k',
            copies: '11.2k',
            rating: '9.9',
            hotBadge: '🔥 Epic Blockbuster',
            modelTag: 'Runway / Sora',
            weeklyDrop: 'Week 32 (Aug 2026)',
            assembledPrompt: 'Drone orbit camera action. [CHAR ANCHOR: Monkey King Wukong] Golden chainmail armor, red cape billowing violently, flaming golden eyes. Standing amidst divine flames on Heavenly Palace platform, holding golden staff, dramatic cinematic lighting.',
            i2vMotionPrompt: '[CAMERA ACTION]: Fast 360 circular orbit around Monkey King. [DYNAMIC MOVEMENT]: Spins golden staff into a blinding golden disc, sparks and celestial flames blast outward.',
            comfyuiNodeSyntax: '(Sun Wukong spinning golden staff:1.3), divine flames aura, red cape billowing, heavenly palace clouds, (360 degree orbit shot:1.2)'
          }
        ];

        let filtered = allPrompts;

        // Filter by category
        if (category !== 'all') {
          filtered = filtered.filter(p => p.category === category);
        }

        // Filter by mode ('t2v', 'i2v', 'comfyui')
        if (mode !== 'all') {
          filtered = filtered.filter(p => p.mode === mode);
        }

        // Filter by drop
        if (drop !== 'all') {
          if (drop === 'week-33') {
            filtered = filtered.filter(p => p.weeklyDrop && p.weeklyDrop.includes('Week 33'));
          } else if (drop === 'week-32') {
            filtered = filtered.filter(p => p.weeklyDrop && p.weeklyDrop.includes('Week 32'));
          } else if (drop === 'week-31') {
            filtered = filtered.filter(p => p.weeklyDrop && p.weeklyDrop.includes('Week 31'));
          }
        }

        // Fallback to all if category has no match
        const resultPrompts = filtered.length > 0 ? filtered : allPrompts;

        return res.json({
          success: true,
          source: 'curated-feed',
          updatedAt: new Date().toISOString(),
          dropStats: {
            currentDrop: 'Week 33 (Sept 2026)',
            totalCurated: allPrompts.length,
            i2vCount: allPrompts.filter(p => p.mode === 'i2v').length,
            comfyuiCount: allPrompts.filter(p => p.mode === 'comfyui').length,
            t2vCount: allPrompts.filter(p => p.mode === 't2v').length
          },
          prompts: resultPrompts
        });
      }

      // If Gemini Key is present, dynamically discover and synthesize trending prompts
      const ai = new GoogleGenAI({ apiKey });
      const promptText = `Generate 6 trending, high-converting AI video prompts for tools like Runway Gen-3, Sora, and Kling AI in English.
Category filter requested: ${category}.
Return JSON object with key "prompts" containing array of 6 objects.
Each object must have:
"id": string
"rank": number (1 to 6)
"title": English title e.g. "[Cyberpunk] Night Racer Pursuit"
"tag": short category tag e.g. "Cyberpunk / Xianxia / 3D"
"category": string key (xianxia-wuxia, cyber-scifi, healing-anime, suspense-gothic, epic-myths)
"styleId": string key (chinese-ink-wash, cyberpunk-neon, pixar-3d, makoto-shinkai, dark-gothic-fantasy, cinematic-historical)
"characterName": English character name
"characterAttrs": English character attributes description
"sceneDesc": English scene action description
"moodLighting": English lighting description
"shotType": wide/medium/close-up
"cameraMovement": slow-push/pan-right/drone-orbit/low-angle-tracking/handheld-subtle/static-cinematic
"platformTarget": runway-gen3/kling-ai/luma-dream/pika-2/sora-veo/comfyui-wan21
"mode": "t2v" or "i2v" or "comfyui"
"aspectRatio": "16:9" or "9:16"
"motionScale": number 1-10
"views": string like "35.2k"
"copies": string like "10.1k"
"rating": string like "9.8"
"hotBadge": string like "🔥 #1 Viral"
"modelTag": string like "Runway Gen-3 / Sora"
"weeklyDrop": "Week 33 (Sept 2026 - Latest)"
"assembledPrompt": full compiled English prompt with [CHAR ANCHOR: ...] tag and camera motion detail
"i2vMotionPrompt": concise motion & camera prompt specifically for image-to-video
"comfyuiNodeSyntax": ComfyUI prompt format with CLIP text and motion tags`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
        config: { responseMimeType: 'application/json' }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        success: true,
        source: 'gemini-2.5-flash',
        updatedAt: new Date().toISOString(),
        prompts: parsed.prompts || []
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trends';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  });
  app.get('/api/download-file', (req, res) => {
    const fileName = req.query.filename as string;
    const allowedFiles = [
      'StoryCraft_Pro_Prompt_Vault.json',
      'StoryCraft_800_Master_Prompts.csv',
      'StoryCraft_Master_Workflow_Guide.md',
      'prompt-forge.html'
    ];

    if (!fileName || !allowedFiles.includes(fileName)) {
      return res.status(400).send('Invalid file requested');
    }

    const filePath = path.join(process.cwd(), 'public', fileName);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    return res.sendFile(filePath);
  });

  // Storyboard generator endpoint
  app.post('/api/generate-storyboard', async (req, res) => {
    try {
      const { title, characterName, styleName, sceneDesc } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback rule-based storyboard sequence
        return res.json({
          success: true,
          source: 'rule-engine',
          shots: [
            {
              shotIndex: 1,
              shotTitle: 'Opening Establishing Shot',
              shotType: 'wide',
              movement: 'slow-push',
              sceneAction: `Wide establishing view of the realm. ${sceneDesc || 'The environment opens up with majestic atmospheric lighting.'}`
            },
            {
              shotIndex: 2,
              shotTitle: 'Climax & Character Focus',
              shotType: 'medium',
              movement: 'handheld-subtle',
              sceneAction: `${characterName || 'The main character'} takes center stage, carrying out the key dramatic action in high detail.`
            },
            {
              shotIndex: 3,
              shotTitle: 'Emotional Close-up & Resolution',
              shotType: 'close-up',
              movement: 'slow-push',
              sceneAction: `Dramatic close-up on ${characterName || 'the hero\'s'} eyes as lighting flares and atmospheric particles drift.`
            }
          ]
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const promptText = `Generate a 3-shot short video storyboard sequence for:
Title: ${title}
Character: ${characterName}
Art Style: ${styleName}
Base Story: ${sceneDesc}

Return JSON array of 3 objects under key "shots":
Each object must have:
"shotIndex": 1/2/3
"shotTitle": string
"shotType": wide/medium/close-up
"movement": camera movement key
"sceneAction": action description`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        success: true,
        source: 'gemini-2.5-flash',
        shots: parsed.shots || []
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Storyboard failed';
      return res.status(500).json({ success: false, error: errorMessage });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StoryCraft AI server running on http://localhost:${PORT}`);
  });
}

startServer();
