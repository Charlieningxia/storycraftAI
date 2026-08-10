import { ArtStyleConfig } from '../types';

import pixarImg from '../assets/images/pixar_3d_style_1785826481332.jpg';
import ghibliImg from '../assets/images/ghibli_anime_style_1785826495174.jpg';
import cinematicImg from '../assets/images/cinematic_history_1785826513195.jpg';
import legoImg from '../assets/images/lego_block_style_1785826528851.jpg';
import byzantineImg from '../assets/images/byzantine_mural_1785826547386.jpg';
import storybookImg from '../assets/images/storybook_gouache_1785826561473.jpg';
import claymationImg from '../assets/images/claymation_style_1785826576062.jpg';
import darkFantasyImg from '../assets/images/dark_fantasy_oil_1785826591317.jpg';
import chineseInkWashImg from '../assets/images/chinese_ink_wash_1785910740113.jpg';
import makotoShinkaiImg from '../assets/images/makoto_shinkai_1785910752663.jpg';
import cyberpunkNeonImg from '../assets/images/cyberpunk_neon_1785910765429.jpg';
import darkGothicImg from '../assets/images/dark_gothic_1785910775770.jpg';

export const ART_STYLES: ArtStyleConfig[] = [
  {
    id: 'pixar-3d',
    name: 'Pixar 3D Animation',
    tagline: 'Vibrant, expressive 3D feature film style',
    description: 'Disney-Pixar feature animation render with expressive facial anatomy, soft subsurface scattering, vivid color palette, and cinematic studio illumination.',
    baseModifiers: [
      'Pixar 3D feature animation render',
      'Disney character design style',
      'expressive organic facial anatomy',
      'subsurface skin scattering',
      'vivid saturated colors',
      'Octane 3D render perfection',
      'soft volumetric lighting'
    ],
    renderEngine: 'Unreal Engine 5 / Octane Render',
    lightingStyle: 'Warm studio keylight & rim light glow',
    negativePrompts: [
      'photorealistic live action',
      'harsh realistic skin pores',
      'scary realistic eyes',
      'flat 2D vector',
      'muddy textures'
    ],
    cameraHint: 'Smooth 3D camera move, expressive character eye line',
    sampleImage: pixarImg,
    accentColor: 'from-amber-500 to-orange-500'
  },
  {
    id: 'studio-ghibli',
    name: 'Studio Ghibli Hand-Drawn',
    tagline: 'Hayao Miyazaki watercolor aesthetic',
    description: 'Hand-painted anime background by Studio Ghibli, featuring lush natural environments, soft pastel skies, expressive linework, and whimsical nostalgia.',
    baseModifiers: [
      'Studio Ghibli anime hand-drawn aesthetic',
      'Hayao Miyazaki animation style',
      'hand-painted watercolor background',
      'soft pastel color palette',
      'delicate hand-drawn ink linework',
      'nostalgic atmosphere',
      'high dynamic pastel lighting'
    ],
    renderEngine: '2D Hand-Painted Anime',
    lightingStyle: 'Soft ambient daylight, glowing dust motes',
    negativePrompts: [
      '3D CGI render',
      'photorealistic skin',
      'heavy dark shadows',
      'futuristic metallic textures',
      'low quality video'
    ],
    cameraHint: 'Gently floating camera, sweeping landscape reveal',
    sampleImage: ghibliImg,
    accentColor: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'cinematic-historical',
    name: 'Cinematic Historical',
    tagline: '8K live-action epic film realism',
    description: 'Ultra-realistic historical blockbuster film look shot on 35mm ARRI Alexa 65, featuring photorealistic human features, authentic period garments, atmospheric volumetric light, and cinematic depth of field.',
    baseModifiers: [
      '8K photorealistic live-action cinematic film shot',
      'shot on 35mm ARRI Alexa 65 anamorphic lens',
      'dramatic chiaroscuro lighting',
      'volumetric dust and atmosphere',
      'authentic period clothing weave texture',
      'ultra-detailed human skin anatomy',
      'award-winning cinematography'
    ],
    renderEngine: 'Photorealistic Live-Action 35mm',
    lightingStyle: 'God rays through dust, dramatic high-contrast keylight',
    negativePrompts: [
      'cartoon',
      'anime',
      '3D render look',
      'plastic skin',
      'modern clothing items',
      'over-saturated colors'
    ],
    cameraHint: 'Slow cinematic push-in on 85mm prime lens',
    sampleImage: cinematicImg,
    accentColor: 'from-amber-600 to-yellow-600'
  },
  {
    id: 'lego-animation',
    name: 'LEGO Stop-Motion',
    tagline: 'Plastic toy minifigure & brick universe',
    description: 'Detailed LEGO brick environment with glossy plastic textures, micro tilt-shift depth of field, subtle minifigure mold lines and fingerprint smudges, and authentic stop-motion frame rate.',
    baseModifiers: [
      'LEGO brick stop-motion animation',
      'detailed plastic toy scenery',
      'LEGO minifigure proportions',
      'subtle plastic mold seams and fingerprint smudges',
      'tilt-shift macro lens blur',
      'glossy ABS plastic reflection',
      'charming brick-built environment'
    ],
    renderEngine: 'LEGO Macro Stop-Motion Studio',
    lightingStyle: 'Bright table-top softbox studio lights',
    negativePrompts: [
      'organic human flesh',
      'smooth realistic skin',
      'fabric clothes',
      'vector art',
      'photorealistic landscape'
    ],
    cameraHint: 'Macro camera focus tracking minifigure steps',
    sampleImage: legoImg,
    accentColor: 'from-red-500 to-amber-500'
  },
  {
    id: 'byzantine-icon',
    name: 'Byzantine Sacred Icon',
    tagline: 'Ornate gold leaf & lapis mosaic mural',
    description: 'Sacred medieval Byzantine mosaic iconography with shimmering gold leaf background, rich lapis lazuli pigments, halo illumination, and gilded mural tiles.',
    baseModifiers: [
      'Byzantine sacred icon painting',
      'ancient religious mural fresco art style',
      'glittering gold leaf foil background',
      'ornate mosaic tile textures',
      'lapis lazuli blue and gold palette',
      'golden halo luminescence',
      'sacred medieval art detail'
    ],
    renderEngine: 'Mosaic Tile & Gold Leaf Fresco',
    lightingStyle: 'Sacred halo glow, candlelight reflection on gold',
    negativePrompts: [
      'modern digital render',
      '3D animation',
      'anime eyes',
      'photorealistic skin',
      'photographic studio light'
    ],
    cameraHint: 'Slow reverence pan across gilded mosaic wall',
    sampleImage: byzantineImg,
    accentColor: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'storybook-gouache',
    name: 'Storybook Gouache',
    tagline: 'Whimsical textured children\'s illustration',
    description: 'Children\'s storybook artwork created with rich, opaque gouache paint strokes on heavy watercolor canvas paper, warm whimsical lighting, and dreamy fairytale charm.',
    baseModifiers: [
      'Whimsical children\'s storybook gouache painting',
      'textured paint stroke details on coarse canvas',
      'opaque gouache layering',
      'soft warm pastel fairytale aesthetic',
      'delicate character outlines',
      'cozy storybook atmosphere',
      'artistic children\'s book illustration'
    ],
    renderEngine: 'Gouache Paint on Canvas',
    lightingStyle: 'Diffused golden hour storybook glow',
    negativePrompts: [
      'dark horror',
      '3D render',
      'photorealistic live action',
      'sharp metallic edges',
      'neon lights'
    ],
    cameraHint: 'Gentle storybook page camera glide',
    sampleImage: storybookImg,
    accentColor: 'from-pink-500 to-rose-400'
  },
  {
    id: 'claymation',
    name: 'Claymation Stop-Motion',
    tagline: 'Tactile plasticine clay sculpture',
    description: 'Handcrafted plasticine clay stop-motion figure with visible sculptor thumb marks, tactile clay armature movement, physical shadow depth, and cozy stop-motion frame feel.',
    baseModifiers: [
      'Tactile plasticine claymation stop-motion',
      'physical clay mold texture',
      'visible thumbprint smudges on clay figures',
      'stop-motion physical animation aesthetic',
      'warm studio softbox light reflection',
      'handcrafted clay figurine detail',
      'charming physical prop scenery'
    ],
    renderEngine: 'Physical Stop-Motion Clay Studio',
    lightingStyle: 'Soft studio spotlight with warm drop shadows',
    negativePrompts: [
      'smooth 3D CGI render',
      'photorealistic human skin',
      'digital vector art',
      'vector graphics',
      'hyperrealistic CGI'
    ],
    cameraHint: 'Tactile stop-motion lens tracking with micro wobble',
    sampleImage: claymationImg,
    accentColor: 'from-amber-700 to-orange-600'
  },
  {
    id: 'dark-fantasy-oil',
    name: 'Dark Fantasy Oil Painting',
    tagline: 'Flemish master chiaroscuro fantasy art',
    description: 'Gothic dark fantasy master oil painting featuring dramatic chiaroscuro lighting, heavy impasto brush strokes, cracked varnish canvas texture, and ominous atmospheric depth.',
    baseModifiers: [
      'Flemish master dark fantasy oil painting',
      'dramatic Rembrandt chiaroscuro lighting',
      'heavy impasto oil paint texture',
      'cracked antique varnish canvas patina',
      'gothic fantasy atmosphere',
      'deep shadow contrast',
      'rich oil pigment glazes'
    ],
    renderEngine: 'Traditional Oil on Canvas',
    lightingStyle: 'Single flickering torchlight, extreme shadow contrast',
    negativePrompts: [
      'bright cheerful colors',
      '3D Pixar style',
      'clean vector illustration',
      'futuristic sci-fi neon',
      'anime style'
    ],
    cameraHint: 'Moody slow tracking shot in shadowy corridor',
    sampleImage: darkFantasyImg,
    accentColor: 'from-indigo-900 to-purple-900'
  },
  {
    id: 'chinese-ink-wash',
    name: 'Traditional Chinese Ink Wash',
    tagline: 'Oriental Shan Shui ink & gold leaf aesthetic',
    description: 'Traditional oriental Shan Shui ink painting on Xuan paper with expressive brushstrokes, delicate mist layering, subtle gold leaf foil highlights, and poetical atmospheric depth.',
    baseModifiers: [
      'Traditional Chinese Shan Shui ink wash painting',
      'expressive calligraphic ink brushstrokes',
      'Xuan paper texture and subtle ink bleed',
      'mystical mountain mist and water reflections',
      'delicate gold leaf leafing accents',
      'oriental aesthetic harmony',
      'poetic atmosphere'
    ],
    renderEngine: 'Oriental Ink & Xuan Paper Canvas',
    lightingStyle: 'Soft diffused morning mist, ethereal golden light',
    negativePrompts: [
      'western oil painting',
      '3D Pixar CGI',
      'neon lights',
      'photorealistic skin',
      'harsh shadows'
    ],
    cameraHint: 'Slow horizontal scroll pan across mist-shrouded mountain landscape',
    sampleImage: chineseInkWashImg,
    accentColor: 'from-amber-600 to-emerald-700'
  },
  {
    id: 'makoto-shinkai',
    name: 'Makoto Shinkai Anime',
    tagline: 'Vivid golden hour sky & romantic lighting',
    description: 'Hyper-detailed romantic anime style inspired by Makoto Shinkai films, featuring dramatic clouds, golden hour sunset rays, lens flares, and vibrant emotional color schemes.',
    baseModifiers: [
      'Makoto Shinkai anime aesthetic',
      'golden hour sunset illumination',
      'hyper-detailed volumetric clouds and sky',
      'romantic anamorphic lens flare',
      'vivid saturated color palette',
      'crystal clear reflections',
      'emotional cinematic atmosphere'
    ],
    renderEngine: '2D High-Budget Feature Anime',
    lightingStyle: 'Dazzling golden hour sunbeams, lens flare',
    negativePrompts: [
      'dark horror',
      'muddy textures',
      '3D CGI plastic look',
      'monochrome',
      'desaturated colors'
    ],
    cameraHint: 'Sweeping tilt-up shot toward towering cumulus clouds',
    sampleImage: makotoShinkaiImg,
    accentColor: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon Metropolis',
    tagline: 'Futuristic rain-slicked neon reflections',
    description: 'High-tech low-life cyberpunk universe with rain-slicked city streets, vibrant pink and cyan neon sign reflections, holographic ads, and atmospheric rain haze.',
    baseModifiers: [
      'Cyberpunk neon metropolis aesthetic',
      'rain-slicked asphalt pavement reflections',
      'high-contrast magenta and cyan neon glow',
      'holographic advertisements',
      'volumetric rain haze and steam',
      'futuristic sci-fi architecture',
      'Kodak 35mm film grain'
    ],
    renderEngine: 'Unreal Engine 5 Sci-Fi Render',
    lightingStyle: 'Pulsating neon light, reflective wet surfaces',
    negativePrompts: [
      'historical medieval',
      'nature forest',
      'pastel storybook',
      'ancient stone',
      'daylight sunshine'
    ],
    cameraHint: 'Low-angle tracking shot along wet neon alleyway',
    sampleImage: cyberpunkNeonImg,
    accentColor: 'from-fuchsia-600 to-cyan-500'
  },
  {
    id: 'dark-gothic-fantasy',
    name: 'Dark Gothic Fairytale',
    tagline: 'Tim Burton aesthetic & shadowy silhouettes',
    description: 'Mysterious dark fairytale universe inspired by Tim Burton art, featuring twisted shadowy trees, ominous gothic castle spires, moonlight halos, and desaturated eerie atmosphere.',
    baseModifiers: [
      'Dark gothic fairytale aesthetic',
      'Tim Burton dark fantasy style',
      'twisted shadowy silhouettes',
      'full moonlight atmospheric halo',
      'desaturated muted color palette',
      'eerie mist and floating embers',
      'cinematic gothic romance'
    ],
    renderEngine: 'Dark Gothic Clay & Oil Fusion',
    lightingStyle: 'Pale blue moonlight & warm flickering lantern glow',
    negativePrompts: [
      'bright sunshine',
      'cheerful pastel colors',
      'cyberpunk neon',
      '3D Pixar cartoon',
      'modern realistic clothing'
    ],
    cameraHint: 'Slow dolly through misty twisted forest toward gothic castle',
    sampleImage: darkGothicImg,
    accentColor: 'from-purple-900 to-slate-950'
  }
];
