import type { TopicFormData, EducationSlide, SceneConfig, VisualEffect, VisualEffectType } from "@/types/education";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const AVAILABLE_EFFECTS: VisualEffectType[] = [
  "particles", "bubbles", "stars", "confetti", "waves",
  "sparkles", "geometric", "rain", "snow", "hearts",
  "leaves", "fireflies", "rings", "dots",
];

export async function generateEducationalContent(
  form: TopicFormData
): Promise<EducationSlide[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) throw new Error("VITE_GOOGLE_API_KEY não configurada");

  const prompt = `Você é um educador infantil experiente criando um vídeo educativo completo para crianças de ${form.ageMin} a ${form.ageMax} anos.

Tema: "${form.topic}"
Idioma: ${form.language}

CRIE O NÚMERO DE SLIDES NECESSÁRIO para explicar o tema COMPLETAMENTE para crianças desta faixa etária. Não limite a 6 slides - use quantos forem necessários (normalmente 8-15 slides). Lembre-se: crianças precisam de explicações detalhadas, com repetição e exemplos.

ESTRUTURA SUGERIDA:
1. Slide de abertura (apresentando o tema de forma divertida)
2-3. Slides introdutórios (contexto simples)
4+. Slides de conteúdo (explicações com exemplos concretos)
- Slides de prática/exercício (se aplicável)
- Slide de resumo/revisão
- Slide de encerramento (despedida motivacional)

Cada slide deve ter:
- "title": título curto e divertido (máx 6 palavras)
- "body": explicação RICA e DETALHADA para a idade (3-6 frases). Não economize no conteúdo! Cada slide deve explorar o subtópico com profundidade, usando exemplos concretos, comparações do dia-a-dia da criança, e linguagem envolvente. O body é o coração do slide - deve ensinar de verdade, não apenas introduzir o assunto.
- "narrationText": texto para narração em áudio, ainda mais detalhado e natural (como uma professora carinhosa falando com a criança), 4-8 frases. Deve expandir o body com explicações adicionais, perguntas retóricas ("Você sabia que...?"), e incentivos ("Muito bem!").
- "scene": configuração visual do slide (OBRIGATÓRIO)

FORMATO DA CENA (scene):
{
  "backgroundGradient": "linear-gradient(135deg, #cor1, #cor2, #cor3)" // gradiente CSS rico
  "effects": [  // 1-3 efeitos visuais por cena
    {
      "type": "tipo_do_efeito",
      "color": "#hexcolor",     // cor do efeito (opcional)
      "density": 5,             // 1-10, quantidade de elementos
      "speed": 1,               // 0.5-3, velocidade da animação
      "size": 1                 // 0.5-2, tamanho dos elementos
    }
  ]
}

EFEITOS DISPONÍVEIS (use EXATAMENTE estes nomes):
- particles: partículas flutuantes (bom para slides suaves e mágicos)
- bubbles: bolhas subindo (bom para temas aquáticos, ciência)
- stars: estrelas cintilantes (bom para noite, espaço, celebração)
- confetti: confete colorido caindo (bom para celebração, abertura, encerramento)
- waves: ondas animadas na parte inferior (bom para oceano, natureza, calma)
- sparkles: brilhos pulsantes (bom para magia, destaque, números)
- geometric: formas geométricas flutuantes (bom para matemática, formas)
- rain: chuva caindo (bom para clima, água, natureza)
- snow: neve caindo suavemente (bom para inverno, clima frio)
- hearts: corações subindo (bom para emoções, família, amor)
- leaves: folhas caindo (bom para natureza, outono, árvores)
- fireflies: vagalumes brilhantes (bom para noite, floresta, magia)
- rings: anéis concêntricos expandindo (bom para som, ciência, energia)
- dots: grade de pontos pulsantes (bom para tecnologia, padrões, ritmo)

REGRAS IMPORTANTES:
- Use entre 1 e 3 efeitos por cena (não mais que 3)
- Escolha efeitos que COMBINEM com o conteúdo do slide
- Use gradientes bonitos e vibrantes (3 cores no gradiente)
- Varie os gradientes entre slides para criar diversidade visual
- O texto aparece NO CENTRO da tela, então os efeitos são um FUNDO decorativo
- NÃO use emojis em nenhum campo
- Use linguagem MUITO simples e divertida
- O narrationText deve soar natural como uma professora carinhosa falando
- Para temas de matemática: detalhe cada passo com exemplos concretos
- Cada slide deve trazer uma informação nova ou exemplo diferente

Responda APENAS com um array JSON válido de objetos, sem markdown, sem explicação.`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 16384,
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

  // Predefined palette for fallback gradients
  const gradients = [
    "linear-gradient(135deg, #667eea, #764ba2, #f093fb)",
    "linear-gradient(135deg, #f093fb, #f5576c, #ffd400)",
    "linear-gradient(135deg, #4facfe, #00f2fe, #43e97b)",
    "linear-gradient(135deg, #fa709a, #fee140, #fa709a)",
    "linear-gradient(135deg, #a18cd1, #fbc2eb, #a6c1ee)",
    "linear-gradient(135deg, #ffecd2, #fcb69f, #ff9a9e)",
    "linear-gradient(135deg, #89f7fe, #66a6ff, #667eea)",
    "linear-gradient(135deg, #fdcbf1, #e6dee9, #a1c4fd)",
    "linear-gradient(135deg, #f6d365, #fda085, #f093fb)",
    "linear-gradient(135deg, #96fbc4, #f9f586, #67b26f)",
    "linear-gradient(135deg, #c471f5, #fa71cd, #fbc2eb)",
    "linear-gradient(135deg, #48c6ef, #6f86d6, #764ba2)",
  ];

  const textColors = [
    "#FFFFFF", "#FFFFFF", "#FFFFFF", "#1E1B4B",
    "#1E1B4B", "#1E1B4B", "#FFFFFF", "#1E1B4B",
    "#1E1B4B", "#1E1B4B", "#FFFFFF", "#FFFFFF",
  ];

  return slides.map((slide, i): EducationSlide => {
    // Parse scene
    let scene: SceneConfig | undefined;
    if (slide.scene && slide.scene.effects && Array.isArray(slide.scene.effects)) {
      scene = {
        backgroundGradient: slide.scene.backgroundGradient || gradients[i % gradients.length],
        effects: slide.scene.effects
          .filter((e: any) => AVAILABLE_EFFECTS.includes(e.type))
          .slice(0, 3)
          .map((e: any): VisualEffect => ({
            type: e.type as VisualEffectType,
            color: e.color || undefined,
            density: Math.min(10, Math.max(1, Number(e.density) || 5)),
            speed: Math.min(3, Math.max(0.5, Number(e.speed) || 1)),
            size: Math.min(2, Math.max(0.5, Number(e.size) || 1)),
          })),
      };
    }

    // Fallback scene if none provided
    if (!scene) {
      scene = {
        backgroundGradient: gradients[i % gradients.length],
        effects: [{ type: "particles" as VisualEffectType, density: 4, speed: 0.8 }],
      };
    }

    return {
      title: slide.title || "Slide",
      body: slide.body || "",
      narrationText: slide.narrationText || `${slide.title}. ${slide.body}`,
      scene,
      bgColor: "#000",
      textColor: textColors[i % textColors.length],
    };
  });
}
