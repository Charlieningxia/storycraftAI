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

  // Forced download endpoint for digital assets
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
