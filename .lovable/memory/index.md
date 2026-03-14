Preferences and decisions for TutorialKids project.

## Audio
- Uses Gemini 2.5 Flash TTS (gemini-2.5-flash-preview-tts) for narration
- Voice: "Kore" (default)
- Audio format: L16 PCM 24kHz converted to WAV client-side
- Slide duration calculated from audio length + 1s padding (min 3s)
- User can toggle audio on/off via Switch in Create page

## Visuals
- NO emojis anywhere in slides or video
- NO SVG actor icons (user rejected them)
- NO Lottie (requires API key, not viable without LottieFiles account)
- Uses Remotion visual EFFECTS system: particles, bubbles, stars, confetti, waves, sparkles, geometric, rain, snow, hearts, leaves, fireflies, rings, dots
- Effects are rendered as animated CSS/SVG elements using Remotion's useCurrentFrame
- Each slide has a SceneConfig with backgroundGradient + 1-3 effects
- Deterministic pseudo-random positioning (seeded) for Remotion compatibility
- Text overlays have backdrop blur when scene is active

## Slides
- NO fixed slide limit — Gemini decides count based on topic (typically 8-15)
- maxOutputTokens set to 16384 to support longer content
- Prompt instructs detailed, child-friendly explanations with examples
- Suggested structure: opening → intro → content → practice → summary → closing

## Architecture
- SceneConfig: { backgroundGradient, effects[] }
- VisualEffect: { type, color, density, speed, size }
- Effects in src/components/visuals/effects/index.tsx
- SceneRenderer in src/components/visuals/SceneRenderer.tsx
- Fallback: particles effect if Gemini doesn't provide scene
- 12 predefined gradient palettes for variety
