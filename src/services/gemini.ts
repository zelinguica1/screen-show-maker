import type { TopicFormData, EducationSlide, SceneConfig, SceneActor, ActorAnimation } from "@/types/education";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const AVAILABLE_ACTORS = [
  "dinosauro", "peixe", "pássaro", "gato", "cachorro", "borboleta", "coelho",
  "sol", "lua", "nuvem", "árvore", "flor", "estrela", "montanha", "chuva",
  "casa", "carro", "foguete", "balão", "livro", "lápis", "bola",
  "maçã", "banana", "bolo",
  "criança", "menino", "menina", "professora",
  "coração", "globo", "música", "número", "abc",
];

const AVAILABLE_ANIMATIONS: ActorAnimation[] = [
  "idle", "bounce", "float", "walk", "spin", "pulse", "wave", "grow", "sway",
];

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
- "scene": objeto de cena com atores animados (OBRIGATÓRIO, detalhes abaixo)

FORMATO DA CENA (scene):
{
  "backgroundGradient": "linear-gradient(180deg, #cor1, #cor2)" // gradiente CSS do fundo
  "actors": [  // 2-6 atores por cena
    {
      "type": "nome_do_ator",  // DEVE ser um dos atores disponíveis abaixo
      "x": 50,     // posição horizontal 0-100 (porcentagem)
      "y": 70,     // posição vertical 0-100 (porcentagem)
      "scale": 1.2, // tamanho (0.5 a 2.0)
      "animation": "bounce", // tipo de animação
      "flipX": false // espelhar horizontalmente (opcional)
    }
  ]
}

ATORES DISPONÍVEIS (use EXATAMENTE estes nomes):
${AVAILABLE_ACTORS.join(", ")}

ANIMAÇÕES DISPONÍVEIS:
${AVAILABLE_ANIMATIONS.join(", ")}
- idle: flutuação suave (padrão)
- bounce: pula para cima e para baixo
- float: flutua suavemente em círculo
- walk: anda para os lados
- spin: gira continuamente
- pulse: pulsa de tamanho
- wave: balança
- grow: cresce ao aparecer
- sway: balança suavemente

REGRAS IMPORTANTES:
- Cada cena deve ter entre 2 e 6 atores
- Distribua os atores pela tela (x: 10-90, y: 20-85)
- O título e corpo do slide aparecem no centro superior, então coloque atores mais na parte inferior (y: 50-85)
- Use scales variados para criar profundidade (objetos menores atrás, maiores na frente)
- Escolha animações que façam sentido para o ator (pássaro: float, bola: bounce, árvore: sway)
- Para temas de MATEMÁTICA: use atores concretos para representar números (ex: 3 maçãs para o número 3)
- Para SOMA/SUBTRAÇÃO: agrupe atores em lados diferentes da tela
- NÃO use emojis em nenhum campo
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
        maxOutputTokens: 8192,
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

  return slides.map((slide, i): EducationSlide => {
    const palette = colorPalettes[i % colorPalettes.length];
    
    // Parse scene if provided
    let scene: SceneConfig | undefined;
    if (slide.scene && slide.scene.actors && Array.isArray(slide.scene.actors)) {
      scene = {
        backgroundGradient: slide.scene.backgroundGradient || `linear-gradient(180deg, ${palette.bg}, ${palette.bg}dd)`,
        actors: slide.scene.actors.map((a: any): SceneActor => ({
          type: String(a.type || "estrela"),
          x: Number(a.x) || 50,
          y: Number(a.y) || 60,
          scale: Number(a.scale) || 1,
          animation: (AVAILABLE_ANIMATIONS.includes(a.animation) ? a.animation : "idle") as ActorAnimation,
          flipX: Boolean(a.flipX),
          color: a.color || undefined,
        })),
      };
    }

    return {
      title: slide.title || "Slide",
      body: slide.body || "",
      narrationText: slide.narrationText || `${slide.title}. ${slide.body}`,
      visualType: slide.visualType || "text",
      items: slide.items || [],
      scene,
      bgColor: palette.bg,
      textColor: palette.text,
    };
  });
}
