import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Send, Loader2, Image as ImageIcon, Download, Sparkles, BookOpen, MessageSquare, Code2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string; image?: string };
type Mode = "chat" | "book" | "code" | "image";

export default function AIAssistant() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const placeholder = {
    chat: "Posez n'importe quelle question…",
    book: "Décrivez le livre à écrire (sujet, style, longueur)…",
    code: "Décrivez le code dont vous avez besoin…",
    image: "Décrivez l'image à générer…",
  }[mode];

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((p) => [...p, userMsg]);
    setLoading(true);

    try {
      if (mode === "image") {
        const { data, error } = await supabase.functions.invoke("ai-image", { body: { prompt: text } });
        if (error || data?.error) throw new Error(data?.error || error?.message || "Erreur");
        setMessages((p) => [...p, { role: "assistant", content: "Voici votre image :", image: data.imageUrl }]);
        setLoading(false);
        return;
      }

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
          mode,
        }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Limite atteinte, réessayez bientôt.");
        else if (resp.status === 402) toast.error("Crédits IA épuisés.");
        else toast.error("Erreur du service IA");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      setMessages((p) => [...p, { role: "assistant", content: "" }]);

      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) {
              acc += c;
              setMessages((p) => {
                const copy = [...p];
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const downloadText = () => {
    const last = [...messages].reverse().find((m) => m.role === "assistant" && m.content);
    if (!last) return;
    const blob = new Blob([last.content], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${mode === "book" ? "livre" : "reponse"}.md`;
    a.click();
  };

  const modes: { id: Mode; label: string; icon: any }[] = [
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "book", label: "Livre", icon: BookOpen },
    { id: "code", label: "Code", icon: Code2 },
    { id: "image", label: "Image", icon: ImageIcon },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col px-4 py-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="text-accent" />
          <h1 className="text-2xl font-bold font-display">Assistant IA</h1>
        </div>

        <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-4">
          <TabsList className="grid w-full grid-cols-4 max-w-xl">
            {modes.map((m) => (
              <TabsTrigger key={m.id} value={m.id} className="gap-1">
                <m.icon size={14} /> {m.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Card className="flex flex-1 flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[60vh]">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                <div>
                  <Sparkles className="mx-auto mb-2 opacity-50" size={32} />
                  <p>Posez votre question, demandez un livre, du code ou générez une image.</p>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content || "…"}</ReactMarkdown>
                      {m.image && (
                        <div className="mt-2">
                          <img src={m.image} alt="Image générée" className="rounded-lg max-w-full" />
                          <a href={m.image} download="image.png" className="mt-2 inline-flex items-center gap-1 text-sm underline">
                            <Download size={14} /> Télécharger
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-3">
            {messages.some((m) => m.role === "assistant" && m.content) && mode !== "image" && (
              <Button variant="ghost" size="sm" onClick={downloadText} className="mb-2">
                <Download size={14} className="mr-1" /> Télécharger la dernière réponse
              </Button>
            )}
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={placeholder}
                rows={2}
                className="resize-none"
                disabled={loading}
              />
              <Button onClick={send} disabled={loading || !input.trim()} size="lg">
                {loading ? <Loader2 className="animate-spin" /> : <Send />}
              </Button>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
