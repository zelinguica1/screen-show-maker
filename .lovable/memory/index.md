Preferences and decisions for TutorialKids project.

## Audio
- Uses Gemini 2.5 Flash TTS (gemini-2.5-flash-preview-tts) for narration
- Voice: "Kore" (default)
- Audio format: L16 PCM 24kHz converted to WAV client-side
- Slide duration calculated from audio length + 1s padding (min 3s)
- User can toggle audio on/off via Switch in Create page

## Visuals
- NO emojis anywhere in slides or video
- Scene-based rendering: each slide has a SceneConfig with SceneActors
- 25+ SVG actor components in src/components/visuals/actors/index.tsx
- Actors: dinosauro, peixe, pássaro, gato, cachorro, borboleta, coelho, sol, lua, nuvem, árvore, flor, estrela, montanha, chuva, casa, carro, foguete, balão, livro, lápis, bola, maçã, banana, bolo, criança, professora, coração, globo, música, número, abc
- Animations: idle, bounce, float, walk, spin, pulse, wave, grow, sway
- SceneRenderer positions actors absolutely by x/y percentage
- Actors have staggered spring entrance + continuous animation
- FallbackActor renders a generic pulsing circle for unknown actor types
- Gemini prompt outputs scene configs with actor placements

## Architecture
- SceneConfig: { backgroundGradient, actors[] }
- SceneActor: { type, x, y, scale, animation, color, flipX }
- Old SlideVisuals system still exists as fallback (items/visualType)
- Text overlay has backdrop blur when scene is active

## Design
- Color palettes assigned from predefined list
- Items in slides must be text-only, no emoji characters
