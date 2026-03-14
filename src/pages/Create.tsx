import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, GraduationCap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateEducationalContent } from "@/services/gemini";
import type { TopicFormData } from "@/types/education";
import { useToast } from "@/hooks/use-toast";

const LANGUAGES = [
  { value: "português-BR", label: "🇧🇷 Português (BR)" },
  { value: "english", label: "🇺🇸 English" },
  { value: "español", label: "🇪🇸 Español" },
];

const PRESETS = [
  { topic: "Como fazer uma soma?", emoji: "➕" },
  { topic: "As cores do arco-íris", emoji: "🌈" },
  { topic: "Animais da fazenda", emoji: "🐄" },
  { topic: "Os números de 1 a 10", emoji: "🔢" },
  { topic: "As vogais", emoji: "🔤" },
  { topic: "Os planetas do sistema solar", emoji: "🪐" },
];

export default function Create() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<TopicFormData>({
    topic: "",
    ageMin: 4,
    ageMax: 6,
    language: "português-BR",
  });

  const handleGenerate = async () => {
    if (!form.topic.trim()) {
      toast({ title: "Digite um tema", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const slides = await generateEducationalContent(form);
      // Store in sessionStorage and navigate
      sessionStorage.setItem("educationSlides", JSON.stringify(slides));
      sessionStorage.setItem("educationTopic", form.topic);
      navigate("/editor");
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Erro ao gerar conteúdo",
        description: err.message || "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Tutorial<span className="text-primary">Kids</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Crie vídeos educativos para crianças com IA ✨
          </p>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          {/* Topic */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
              Tema da aula
            </Label>
            <Input
              value={form.topic}
              onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
              placeholder='Ex: "Como fazer uma soma?"'
              className="bg-secondary border-border"
              disabled={loading}
            />
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.topic}
                onClick={() => setForm((f) => ({ ...f, topic: p.topic }))}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors border border-border"
              >
                {p.emoji} {p.topic}
              </button>
            ))}
          </div>

          {/* Age Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                Idade mínima
              </Label>
              <Input
                type="number"
                value={form.ageMin}
                onChange={(e) => setForm((f) => ({ ...f, ageMin: +e.target.value }))}
                min={2}
                max={12}
                className="bg-secondary border-border"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                Idade máxima
              </Label>
              <Input
                type="number"
                value={form.ageMax}
                onChange={(e) => setForm((f) => ({ ...f, ageMax: +e.target.value }))}
                min={2}
                max={12}
                className="bg-secondary border-border"
                disabled={loading}
              />
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">
              Idioma
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setForm((f) => ({ ...f, language: lang.value }))}
                  disabled={loading}
                  className={`text-xs py-2 px-3 rounded-lg border transition-all ${
                    form.language === lang.value
                      ? "bg-primary/20 border-primary/30 text-primary"
                      : "bg-secondary border-border text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={loading || !form.topic.trim()}
            className="w-full h-12 text-base gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Gerando conteúdo...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Gerar Vídeo Educativo
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-[10px] text-muted-foreground">
          Powered by Gemini 2.5 Flash · Conteúdo gerado por IA
        </p>
      </div>
    </div>
  );
}
