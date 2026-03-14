const GEMINI_TTS_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent";

/**
 * Convert raw L16 PCM (16-bit, mono, 24 kHz) → WAV Blob URL
 */
function pcmToWavBlobUrl(pcmBase64: string, sampleRate = 24000): string {
  const raw = atob(pcmBase64);
  const pcmBytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) pcmBytes[i] = raw.charCodeAt(i);

  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcmBytes.length;
  const headerSize = 44;

  const buffer = new ArrayBuffer(headerSize + dataSize);
  const view = new DataView(buffer);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeStr(0, "RIFF");
  view.setUint32(4, headerSize - 8 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true); // PCM chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);

  new Uint8Array(buffer, headerSize).set(pcmBytes);

  const blob = new Blob([buffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
}

/**
 * Calculate audio duration in seconds from PCM data size
 */
function pcmDurationSec(pcmBase64Length: number, sampleRate = 24000): number {
  // base64 → raw bytes: ratio ~0.75
  const rawBytes = pcmBase64Length * 0.75;
  const bytesPerSample = 2; // 16-bit
  return rawBytes / (sampleRate * bytesPerSample);
}

export interface TTSResult {
  audioUrl: string;
  durationSec: number;
}

/**
 * Generate TTS audio for a text using Gemini 2.5 Flash TTS
 */
export async function generateTTS(text: string, voiceName = "Kore"): Promise<TTSResult> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) throw new Error("VITE_GOOGLE_API_KEY não configurada");

  const response = await fetch(`${GEMINI_TTS_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Gemini TTS error:", err);
    throw new Error(`Erro na API TTS: ${response.status}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts?.length) throw new Error("Resposta TTS vazia");

  const audioPart = parts.find((p: any) => p.inlineData);
  if (!audioPart?.inlineData?.data) throw new Error("Áudio não encontrado na resposta");

  const pcmBase64 = audioPart.inlineData.data;
  const audioUrl = pcmToWavBlobUrl(pcmBase64);
  const durationSec = pcmDurationSec(pcmBase64.length);

  return { audioUrl, durationSec };
}

/**
 * Generate TTS for all slides, returning audio URLs and durations
 */
export async function generateAllSlideTTS(
  slides: { title: string; body: string; narrationText?: string }[],
  voiceName = "Kore",
  onProgress?: (done: number, total: number) => void
): Promise<TTSResult[]> {
  const results: TTSResult[] = [];

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const text = slide.narrationText || `${slide.title}. ${slide.body}`;
    const result = await generateTTS(text, voiceName);
    results.push(result);
    onProgress?.(i + 1, slides.length);
  }

  return results;
}
