import { StoryCategoryConfig } from '../types';

export const STORY_CATEGORIES: StoryCategoryConfig[] = [
  {
    id: 'xianxia-wuxia',
    title: 'Xianxia & Wuxia Fantasy',
    subtitle: 'Immortal swordplay, martial art heroes & ink wash legends',
    description: 'Flying sword masters, bamboo duels, nine-tailed fox spirits, and ancient terracotta generals.',
    iconName: 'Sparkles',
    presets: [
      {
        id: 'shushan-sword-master',
        title: 'Shushan Flying Sword Duel',
        description: 'A white-robed sword immortal standing atop a blade, riding through cloud peaks and slashing open celestial heavens.',
        recommendedStyle: 'chinese-ink-wash',
        characterName: 'Shushan Sword Immortal',
        characterAttrs: 'Ethereal young man in white silk robes with silver cloud embroidery, dark hair flowing, holding a glowing teal sword',
        sceneDesc: 'Standing on a solitary mountain peak above a sea of clouds, encircled by thousands of gold spectral flying swords',
        moodLighting: 'Poetic oriental morning golden light filtered through swirling mountain mist',
        shotType: 'wide',
        cameraMovement: 'slow-push'
      },
      {
        id: 'bamboo-ink-duel',
        title: 'Bamboo Forest Ink Duel',
        description: 'Raindrops falling through a dense bamboo grove as a hooded assassin draws a black steel blade amid ink splashes.',
        recommendedStyle: 'chinese-ink-wash',
        characterName: 'Bamboo Shadow Swordsman',
        characterAttrs: 'Cold assassin in black linen robes wearing a bamboo conical hat, sharp eagle gaze, holding an obsidian katana',
        sceneDesc: 'Standing atop water puddles in a misty bamboo forest, surrounded by swirling bamboo leaves sliced by sword energy',
        moodLighting: 'High-contrast ink wash lighting with subtle gold leaf highlights and rain sheen',
        shotType: 'medium',
        cameraMovement: 'low-angle-tracking'
      },
      {
        id: 'fox-spirit-maiden',
        title: 'Nine-Tailed Fox Fairy',
        description: 'A ethereal fox spirit with nine glowing white tails resting beside a misty mountain waterfall under starlight.',
        recommendedStyle: 'makoto-shinkai',
        characterName: 'Qingqiu Nine-Tailed Fox Fairy',
        characterAttrs: 'Enchanting fox maiden with subtle cinnabar forehead mark, white fox ears, wearing crimson and white flowing silk dress',
        sceneDesc: 'Seated on a cliffside water spring, nine fiery white tails fanned out under a starry sky with glowing spirit butterflies',
        moodLighting: 'Radiant Makoto Shinkai starlight, moonbeams, and golden ethereal particle bloom',
        shotType: 'close-up',
        cameraMovement: 'pan-right'
      },
      {
        id: 'qin-terracotta-pit',
        title: 'Qin Terracotta Army Pit',
        description: 'Thousands of painted terracotta warriors awakening inside dusty subterranean vaults lit by flickering oil torches.',
        recommendedStyle: 'chinese-ink-wash',
        characterName: 'Terracotta Army General',
        characterAttrs: 'Commanding bronze general statue with tall topknot, detailed fish-scale armor plate chest, glowing golden eyes',
        sceneDesc: 'Rows of life-sized terracotta soldiers with ancient painted pigments, standing in earthen trenches with dust motes floating in torchlight',
        moodLighting: 'Dramatic torchlight casting deep warm shadows against dark subterranean brick walls',
        shotType: 'wide',
        cameraMovement: 'slow-push'
      }
    ]
  },
  {
    id: 'suspense-gothic',
    title: 'Suspense & Dark Gothic',
    subtitle: 'Dark tales, sorcery, vampire noble & eerie mysteries',
    description: 'Rainy dark alleys, castle sorceresses, blood moons, and Rembrandt chiaroscuro vampires.',
    iconName: 'Wand2',
    presets: [
      {
        id: 'dark-castle-witch',
        title: 'Gothic Castle Sorceress',
        description: 'Inside a spooky castle tower, a dark witch brews mystical spells over a glowing green cauldron.',
        recommendedStyle: 'dark-gothic-fantasy',
        characterName: 'Gothic Castle Sorceress',
        characterAttrs: 'Elegant dark-haired sorceress in a black velvet pointed hat and lace high-collar gown, holding a crystal orb',
        sceneDesc: 'In an ancient stone laboratory with gothic arched windows, a massive iron cauldron emitting fluorescent green mist',
        moodLighting: 'Tim Burton style eerie blue moonlight mixed with glowing green chemical cauldron luminescence',
        shotType: 'medium',
        cameraMovement: 'slow-push'
      },
      {
        id: 'hyakki-yagyo-monsters',
        title: 'Night Parade of 100 Yokai Spirits',
        description: 'A mystical Japanese spirit procession marching down foggy ancient streets under floating red paper lanterns.',
        recommendedStyle: 'dark-gothic-fantasy',
        characterName: 'Hannya Spirit Maiden',
        characterAttrs: 'Mysterious maiden in a black and crimson gold-trimmed kimono, wearing a half-face Hannya demon mask with glowing eyes',
        sceneDesc: 'Leading a nocturnal parade of floating paper lanterns and shadow demons along mist-shrouded bamboo forest path under a blood moon',
        moodLighting: 'Eerie moonlight halo mixed with floating crimson lantern embers',
        shotType: 'wide',
        cameraMovement: 'slow-push'
      },
      {
        id: 'vampire-oil-portrait',
        title: 'Dark Vampire Duke Portrait',
        description: 'Rembrandt dark chiaroscuro style oil painting of a silver-haired vampire duke holding a crystal wine goblet on a black throne.',
        recommendedStyle: 'dark-fantasy-oil',
        characterName: 'Duke Karl the Vampire',
        characterAttrs: 'Pale handsome young man with silver hair, crimson red eyes, wearing a black gothic noble suit with a subtle smirk',
        sceneDesc: 'Seated on a carved black wooden throne in front of tall gothic stained glass windows illuminated by silver lightning',
        moodLighting: 'Classic Rembrandt chiaroscuro side lighting with sudden lightning flashes',
        shotType: 'close-up',
        cameraMovement: 'handheld-subtle'
      },
      {
        id: 'subterranean-oracle',
        title: 'Oracle at Delphi Sanctuary',
        description: 'Inside an ancient Greek marble temple, a priestess gazes into sacred water above a steaming bronze tripod.',
        recommendedStyle: 'byzantine-icon',
        characterName: 'Pythia the Delphi Oracle',
        characterAttrs: 'Mystical priestess draped in sheer white silk, dark wavy hair, golden blindfold, holding a glowing bronze water bowl',
        sceneDesc: 'Seated on a tall tripod over a chasm emitting sweet vapor, reflecting starlight patterns in sacred water',
        moodLighting: 'Byzantine gold leaf texture blended with flickering olive oil torchlight',
        shotType: 'medium',
        cameraMovement: 'slow-push'
      }
    ]
  },
  {
    id: 'cyber-scifi',
    title: 'Cyberpunk & Sci-Fi',
    subtitle: 'Neon rain, mecha runners, wasteland ships & LEGO sci-fi',
    description: 'Cyberpunk rain alleys, wasteland spaceports, LEGO micro-castles, and high-speed hovercar chases.',
    iconName: 'Zap',
    presets: [
      {
        id: 'cyberpunk-rain-alley',
        title: 'Cyberpunk Rain Alley & Mecha Maiden',
        description: 'Rainy futuristic city backstreet with a cybernetic runner leaning against a hoverbike beneath pink holographic ads.',
        recommendedStyle: 'cyberpunk-neon',
        characterName: 'Cyber Courier Kaelen',
        characterAttrs: 'Edgy young runner with glowing cyan optical monocle, chrome cybernetic arm, black leather coat with LED collar',
        sceneDesc: 'Leaning against a rain-slicked hoverbike in a dark futuristic alleyway as massive pink and cyan holographic ads shimmer overhead',
        moodLighting: 'High-contrast magenta and cyan neon glow reflecting on wet asphalt streets',
        shotType: 'wide',
        cameraMovement: 'low-angle-tracking'
      },
      {
        id: 'wasteland-spaceship',
        title: 'Wasteland Spaceship Harbor',
        description: 'A colossal sci-fi starship landing in a dusty desert canyon base surrounded by rust towers.',
        recommendedStyle: 'cinematic-historical',
        characterName: 'Wasteland Ranger Titan',
        characterAttrs: 'Battle-hardened warrior in retro dust mask, exoskeleton tactical armor, carrying a heavy mechanical cannon',
        sceneDesc: 'Standing on a rusty steel observation tower overlooking a massive starship descending through golden dust clouds',
        moodLighting: 'Sunset golden dust haze with heavy industrial volumetric lighting',
        shotType: 'wide',
        cameraMovement: 'drone-orbit'
      },
      {
        id: 'lego-mecha-siege',
        title: 'LEGO Sci-Fi Fortress Siege',
        description: 'Plastic minifigure space rangers defending a brick castle against a translucent red mechanical dragon.',
        recommendedStyle: 'lego-animation',
        characterName: 'LEGO Space Captain Nova',
        characterAttrs: 'Classic yellow minifigure with printed silver space armor, clear blue plastic helmet, holding a gold laser blaster',
        sceneDesc: 'Standing atop gray LEGO castle ramparts, raising plastic blaster as red brick dragon breathes translucent orange flame pieces',
        moodLighting: 'Macro tilt-shift studio lighting with realistic plastic stud reflections',
        shotType: 'wide',
        cameraMovement: 'drone-orbit'
      },
      {
        id: 'hovercar-chase-night',
        title: 'High-Speed Cyber Hovercar Chase',
        description: 'A sleek red hovercar diving through a neon tube highway leaving vibrant light trails.',
        recommendedStyle: 'cyberpunk-neon',
        characterName: 'Ace Racer Zero',
        characterAttrs: 'Racer in full carbon fiber helmet, glowing circuit racing suit, sharp eyes visible through dark red visor',
        sceneDesc: 'Piloting a aerodynamic red hovercar inside a high-speed glass tunnel, passing holographic road signs at warp speed',
        moodLighting: 'Motion blur light streaks with intense cyan and magenta neon trails',
        shotType: 'medium',
        cameraMovement: 'pan-right'
      }
    ]
  },
  {
    id: 'healing-anime',
    title: 'Healing Anime & Fairytale',
    subtitle: 'Makoto Shinkai clouds, Ghibli towns & claymation tales',
    description: 'Golden hour sunset trains, magical forest towns, fairy glades, and stop-motion claymation towers.',
    iconName: 'BookOpen',
    presets: [
      {
        id: 'shinkai-sunset-train',
        title: 'Shinkai Sunset Railway Crossing',
        description: 'A high school girl standing by a rural train crossing under a dazzling orange sunset sky filled with cumulus clouds.',
        recommendedStyle: 'makoto-shinkai',
        characterName: 'Hina the Weather Girl',
        characterAttrs: 'Pure anime schoolgirl with dark twin-tails, blue and white sailor uniform, wearing a red neck ribbon',
        sceneDesc: 'Standing at a sunlit railway crossing with cherry blossoms, looking at distant golden clouds and ocean reflections',
        moodLighting: 'Signature Makoto Shinkai golden hour bloom, lens flares, and crystal-clear water highlights',
        shotType: 'medium',
        cameraMovement: 'slow-push'
      },
      {
        id: 'ghibli-magical-forest',
        title: 'Ghibli Magical Forest Town',
        description: 'A young girl exploring an ancient mossy forest and discovering transparent forest spirits by a clear stream.',
        recommendedStyle: 'studio-ghibli',
        characterName: 'Mei the Forest Explorer',
        characterAttrs: 'Cheerful 7-year-old girl in a yellow straw hat, red pinafore dress, carrying a small woven straw bag',
        sceneDesc: 'Squatting near giant ancient tree roots, watching tiny transparent forest spirits hop across mossy stepping stones',
        moodLighting: 'Warm Miyazaki sunlight filtering through green foliage with soft watercolor pastel tones',
        shotType: 'medium',
        cameraMovement: 'pan-right'
      },
      {
        id: 'fairy-mushroom-glade',
        title: 'Enchanted Glowing Mushroom Glade',
        description: 'A tiny fairy maiden touching a bioluminescent blue mushroom surrounded by dancing fireflies.',
        recommendedStyle: 'storybook-gouache',
        characterName: 'Fairy Princess Lily',
        characterAttrs: 'Tiny palm-sized fairy with translucent dragonfly wings, golden flower crown, wearing a gown of woven green leaves',
        sceneDesc: 'Reaching out her finger to light up a giant glowing blue mushroom cap in a night forest filled with golden fireflies',
        moodLighting: 'Soft storybook gouache glow with magical blue and gold bioluminescence',
        shotType: 'close-up',
        cameraMovement: 'slow-push'
      },
      {
        id: 'claymation-owl-clockwork',
        title: 'Claymation Clockwork Owl Tower',
        description: 'A stop-motion clay owl scholar turning brass gears inside a cozy observatory tower.',
        recommendedStyle: 'claymation',
        characterName: 'Owl Scholar Barnaby',
        characterAttrs: 'Charming anthropomorphic barn owl scholar with round wire-rim spectacles, wearing a blue velvet wizard robe',
        sceneDesc: 'Inside a stone observatory tower filled with brass gears and astrolabes, adjusting a giant mechanical celestial globe with tiny claws',
        moodLighting: 'Cozy warm oil lamp light contrasting with deep blue starlit night outside the window',
        shotType: 'medium',
        cameraMovement: 'slow-push'
      }
    ]
  },
  {
    id: 'epic-myths',
    title: 'Epic Myths & Ancient History',
    subtitle: 'Biblical miracles, Mount Olympus, Egyptian Pharaohs & Asgard',
    description: 'Moses parting the sea, Zeus on his marble throne, Pharaoh Ramses in Luxor, and Thor summoning lightning.',
    iconName: 'Landmark',
    presets: [
      {
        id: 'moses-red-sea',
        title: 'Moses Splitting the Red Sea',
        description: 'An ancient prophet raising his wooden staff as a hundred-foot ocean wave splits open under a stormy sunset.',
        recommendedStyle: 'cinematic-historical',
        characterName: 'Moses the Prophet',
        characterAttrs: 'Venerable patriarch with silver beard, weather-beaten face, wearing a dark brown linen robe, holding a wooden staff',
        sceneDesc: 'Standing on a windswept cliff at twilight as ocean waters roar and part into giant water walls revealing dry seabed',
        moodLighting: 'Dramatic stormy twilight with a divine golden beam breaking through dark storm clouds',
        shotType: 'wide',
        cameraMovement: 'slow-push'
      },
      {
        id: 'zeus-olympus-throne',
        title: 'Zeus on Olympus Marble Throne',
        description: 'King of Gods seated on a white marble throne above a sea of clouds holding crackling thunderbolts.',
        recommendedStyle: 'dark-fantasy-oil',
        characterName: 'Zeus King of Gods',
        characterAttrs: 'Majestic god with thick golden beard, wearing a white toga with embroidered gold trim, holding crackling lightning bolts in his right hand',
        sceneDesc: 'Seated on a towering marble throne atop Mount Olympus, golden eagle perched on his shoulder, sunset cloudscapes behind column arcades',
        moodLighting: 'Radiant golden sunset skylight contrasting with intense blue electric arcs',
        shotType: 'wide',
        cameraMovement: 'slow-push'
      },
      {
        id: 'pharaoh-luxor-temple',
        title: 'Pharaoh Ramses at Luxor Temple',
        description: 'Egyptian Pharaoh in blue-and-gold Nemes crown walking through giant lotus pillars filled with incense smoke.',
        recommendedStyle: 'byzantine-icon',
        characterName: 'Pharaoh Ramses II',
        characterAttrs: 'Commanding young Pharaoh with black kohl eyeliner, wearing blue and gold Nemes crown, gold lapis lazuli collar necklace',
        sceneDesc: 'Walking through a grand colonnade of 50-foot stone pillars covered in hieroglyphs, sunbeams cutting through fragrant incense haze',
        moodLighting: 'Brilliant Egyptian noon sunlight illuminating gold leaf mural accents',
        shotType: 'medium',
        cameraMovement: 'slow-push'
      },
      {
        id: 'thor-bifrost-lightning',
        title: 'Thor Summoning Lightning on Bifrost',
        description: 'Norse God Thor raising Mjolnir hammer high as rainbow bridge crackles with electric storm energy.',
        recommendedStyle: 'pixar-3d',
        characterName: 'Thor Odinson',
        characterAttrs: 'Blond warrior god with braided beard, wearing carved silver chest armor and billowing red cape, holding Mjolnir hammer',
        sceneDesc: 'Standing on the glowing crystalline Bifrost bridge, pointing hammer upward as a massive blue thunderbolt strikes from stormy clouds',
        moodLighting: 'Vibrant rainbow reflections with intense electric blue lightning contrast',
        shotType: 'wide',
        cameraMovement: 'drone-orbit'
      }
    ]
  }
];
