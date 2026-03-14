import type { TopicFormData, EducationSlide } from "@/types/education";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function generateEducationalContent(
  form: TopicFormData
): Promise<EducationSlide[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) throw new Error("VITE_GOOGLE_API_KEY não configurada");

  const colorPalettes = [
    { bg: "#FBBF24", text: "#1E1B4B" },   // yellow / dark indigo
    { bg: "#34D399", text: "#1E1B4B" },   // green / dark
    { bg: "#60A5FA", text: "#FFFFFF" },   // blue / white
    { bg: "#F472B6", text: "#FFFFFF" },   // pink / white
    { bg: "#A78BFA", text: "#FFFFFF" },   // purple / white
    { bg: "#FB923C", text: "#1E1B4B" },   // orange / dark
    { bg: "#2DD4BF", text: "#1E1B4B" },   // teal / dark
    { bg: "#F87171", text: "#FFFFFF" },   // red / white
  ];

  const prompt = `Você é um educador infantil criando conteúdo para crianças de ${form.ageMin} a ${form.ageMax} anos.

Tema: "${form.topic}"
Idioma: ${form.language}

Crie exatamente 6 slides educativos. Cada slide deve ter:
- "title": título curto e divertido (máx 5 palavras)
- "body": explicação simples para a idade (máx 2 frases curtas)
- "visualType": um de ["text", "equation", "counting", "comparison", "example"]
- "emoji": um emoji relevante para o slide
- "items": lista de itens visuais (ex: ["🍎","🍎","🍎"] para contar 3, ou ["2 + 3 = 5"] para equação). Use emojis grandes e divertidos.

IMPORTANTE: Use linguagem MUITO simples, divertida, com emojis. Pense que está falando com crianças pequenas.

Responda APENAS com um array JSON válido de objetos, sem markdown, sem explicação.`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Gemini API error:", err);
    throw new Error(`Erro na API Gemini: ${response.status}`);
  }

  const data = await response.json();
  
  // Gemini 2.5 Flash may return multiple parts (thinking + text)
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts || parts.length === 0) throw new Error("Resposta vazia da API");
  
  // Find the last text part (skip thinking parts)
  const textPart = [...parts].reverse().find((p: any) => p.text && !p.thought);
  const text = textPart?.text;
  
  if (!text) throw new Error("Resposta vazia da API");

  console.log("Gemini raw text:", text);

  // Clean markdown code blocks if present
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  
  // Extract JSON array from response
  const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("JSON não encontrado na resposta");
  
  const slides: any[] = JSON.parse(jsonMatch[0]);

  // Assign colors from palette
  return slides.map((slide, i): EducationSlide => ({
    title: slide.title || "Slide",
    body: slide.body || "",
    visualType: slide.visualType || "text",
    emoji: slide.emoji || "📚",
    items: slide.items || [],
    bgColor: colorPalettes[i % colorPalettes.length].bg,
    textColor: colorPalettes[i % colorPalettes.length].text,
  }));
}
