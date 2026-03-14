Preferences and decisions for TutorialKids project.

## Audio
- Uses Gemini 2.5 Flash TTS (gemini-2.5-flash-preview-tts) for narration
- Voice: "Kore" (default)
- Audio format: L16 PCM 24kHz converted to WAV client-side
- Slide duration calculated from audio length + 1s padding (min 3s)
- User can toggle audio on/off via Switch in Create page

## Visuals
- NO emojis anywhere in slides or video
- Uses React components (SlideVisuals) for visual representations based on visualType
- visualType options: text, equation, counting, comparison, example
- EducationIcons.tsx has 12 SVG icons: apple, star, heart, circle, fish, flower, sun, tree, moon, bird, cloud, drop
- Icons matched to items via keyword search in getIconForItem()
- Remotion spring animations: staggered entrance + idle bounce per item
- Gemini prompt instructs to use concrete object names matching icon keywords

## Design
- Color palettes assigned from predefined list
- Items in slides must be text-only, no emoji characters
