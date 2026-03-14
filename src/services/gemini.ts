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
- "items": lista de itens visuais representando OBJETOS CONCRETOS relacionados ao conteúdo

REGRAS PARA ITEMS:
- Use palavras de OBJETOS CONCRETOS que a criança reconhece: "maçã", "estrela", "flor", "peixe", "sol", "lua", "árvore", "pássaro", "coração", "gota", "nuvem", "bola"
- Para equações: separe cada parte em itens diferentes. Ex: para "2+3=5", use ["2", "+", "3", "=", "5"]. Os números serão representados como grupos de objetos visuais.
- Para contagem: use o nome do objeto sendo contado. Ex: ["maçã", "maçã", "maçã"] para contar 3 maçãs
- NÃO use emojis em nenhum campo
- NÃO use frases longas nos items, use 1-3 palavras por item
- Use linguagem MUITO simples e divertida
- O narrationText deve soar natural como uma professora falando

Responda APENAS com um array JSON válido de objetos, sem markdown, sem explicação.`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Gemini API error:", err);
    throw new Error(`Erro na API Gemini: ${response.status}`);
  }

  const data = await response.json();

  const candidate = data.candidates?.[0];
  if (!candidate) throw new Error("Resposta vazia da API");

  if (candidate.finishReason === "MAX_TOKENS") {
    throw new Error("A resposta da IA foi cortada por limite de tokens. Tente novamente.");
  }

  const parts = candidate.content?.parts;
  if (!parts || parts.length === 0) throw new Error("Resposta vazia da API");

  const textPart = [...parts].reverse().find((p: any) => p.text && !p.thought);
  const text = textPart?.text;

  if (!text) throw new Error("Resposta vazia da API");

  console.log("Gemini raw text:", text);

  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("JSON não encontrado na resposta");

  const removeTrailingCommas = (value: string) => value.replace(/,\s*([}\]])/g, "$1");

  const repairUnescapedQuotesInStrings = (value: string) => {
    let result = "";
    let inString = false;
    let isEscaped = false;
    let stringMode: "key" | "value" | null = null;

    const getPrevNonWhitespace = (index: number) => {
      for (let i = index - 1; i >= 0; i--) {
        if (!/\s/.test(value[i])) return value[i];
      }
      return "";
    };

    const getNextNonWhitespace = (index: number) => {
      for (let i = index + 1; i < value.length; i++) {
        if (!/\s/.test(value[i])) return value[i];
      }
      return "";
    };

    for (let i = 0; i < value.length; i++) {
      const char = value[i];

      if (!inString) {
        if (char === '"') {
          inString = true;
          isEscaped = false;
          const prev = getPrevNonWhitespace(i);
          stringMode = prev === ":" ? "value" : "key";
        }
        result += char;
        continue;
      }

      if (isEscaped) {
        result += char;
        isEscaped = false;
        continue;
      }

      if (char === "\\") {
        result += char;
        isEscaped = true;
        continue;
      }

      if (char === '"') {
        const next = getNextNonWhitespace(i);
        const isClosingQuote =
          stringMode === "key"
            ? next === ":"
            : next === "," || next === "}" || next === "]";

        if (isClosingQuote) {
          inString = false;
          stringMode = null;
          result += char;
        } else {
          result += '\\"';
        }
        continue;
      }

      result += char;
    }

    return result;
  };

  let slides: any[];
  let jsonStr = removeTrailingCommas(jsonMatch[0]);

  try {
    slides = JSON.parse(jsonStr);
  } catch (e) {
    console.error("JSON parse failed, attempting repair:", jsonStr);
    jsonStr = repairUnescapedQuotesInStrings(jsonStr).replace(/[\x00-\x1F\x7F]/g, " ");
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
