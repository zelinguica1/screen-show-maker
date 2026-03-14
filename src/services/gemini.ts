import type { TopicFormData, EducationSlide } from "@/types/education";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function generateEducationalContent(
  form: TopicFormData
): Promise<EducationSlide[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) throw new Error("VITE_GOOGLE_API_KEY não configurada");

  const colorPalettes = [
    { bg: "#FBBF24", text: "#1E1B4B" },
    { bg: "#34D399", text: "#1E1B4B" },
    { bg: "#60A5FA", text: "#FFFFFF" },
    { bg: "#F472B6", text: "#FFFFFF" },
    { bg: "#A78BFA", text: "#FFFFFF" },
    { bg: "#FB923C", text: "#1E1B4B" },
    { bg: "#2DD4BF", text: "#1E1B4B" },
    { bg: "#F87171", text: "#FFFFFF" },
  ];

  const prompt = `Você é um educador infantil criando conteúdo para crianças de ${form.ageMin} a ${form.ageMax} anos.

Tema: "${form.topic}"
Idioma: ${form.language}

Crie exatamente 6 slides educativos. Cada slide deve ter:
- "title": título curto e divertido (máx 5 palavras)
- "body": explicação simples para a idade (máx 2 frases curtas)
- "narrationText": texto para narração em áudio, mais detalhado e natural (como se estivesse falando com a criança), máx 3 frases
- "visualType": um de ["text", "equation", "counting", "comparison", "example"]
- "items": lista de itens visuais usando SOMENTE TEXTO, sem emojis. Para contagem use números ("1", "2", "3"). Para equações use expressões ("2 + 3 = 5"). Para exemplos use palavras descritivas.

IMPORTANTE: 
- NÃO use emojis em nenhum campo
- Use linguagem MUITO simples e divertida
- Os items devem ser texto puro para representações visuais
- O narrationText deve soar natural como uma professora falando

Responda APENAS com um array JSON válido de objetos, sem markdown, sem explicação.`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Gemini API error:", err);
    throw new Error(`Erro na API Gemini: ${response.status}`);
  }

  const data = await response.json();
  
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts || parts.length === 0) throw new Error("Resposta vazia da API");
  
  const textPart = [...parts].reverse().find((p: any) => p.text && !p.thought);
  const text = textPart?.text;
  
  if (!text) throw new Error("Resposta vazia da API");

  console.log("Gemini raw text:", text);

  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("JSON não encontrado na resposta");
  
  // Fix common JSON issues from Gemini: trailing commas, unescaped quotes
  let jsonStr = jsonMatch[0]
    .replace(/,\s*([}\]])/g, "$1")           // trailing commas
    .replace(/(['"])?(\w+)(['"])?\s*:/g, '"$2":') // unquoted keys
    .replace(/:\s*'([^']*)'/g, ': "$1"');     // single-quoted values
  
  let slides: any[];
  try {
    slides = JSON.parse(jsonStr);
  } catch (e) {
    console.error("JSON parse failed, attempting repair:", jsonStr);
    // Last resort: try to eval-safe parse by replacing problematic chars
    jsonStr = jsonStr.replace(/[\x00-\x1F\x7F]/g, " ");
    slides = JSON.parse(jsonStr);
  }

  return slides.map((slide, i): EducationSlide => ({
    title: slide.title || "Slide",
    body: slide.body || "",
    narrationText: slide.narrationText || `${slide.title}. ${slide.body}`,
    visualType: slide.visualType || "text",
    items: slide.items || [],
    bgColor: colorPalettes[i % colorPalettes.length].bg,
    textColor: colorPalettes[i % colorPalettes.length].text,
  }));
}
