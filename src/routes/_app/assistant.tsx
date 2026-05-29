import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Send } from "lucide-react";

export const Route = createFileRoute("/_app/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant — SmartBudget AI" }] }),
  component: AssistantPage,
});

const suggested = [
  "How much did I spend on food last month?",
  "What can I cut to save $200/mo?",
  "Will I hit my savings goal this year?",
];

function AssistantPage() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your AI finance assistant. Ask me anything about your spending, savings, or budget." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, {
        role: "ai",
        text: "Based on your last 30 days, you spent $1,742 with food being your largest category ($540). I recommend setting a $500 food cap — that alone saves $40/mo. Want me to set it up?",
      }]);
    }, 700);
  };

  return (
    <div className="space-y-4 animate-fade-up max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-glow">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-sm text-muted-foreground">Your finances, explained.</p>
        </div>
      </div>

      <Card className="glass p-6 h-[55vh] overflow-y-auto space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "gradient-primary text-white" : "glass"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </Card>

      <div className="flex flex-wrap gap-2">
        {suggested.map((s) => (
          <Button key={s} variant="outline" size="sm" className="glass" onClick={() => send(s)}>{s}</Button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" className="glass" />
        <Button type="submit" className="gradient-primary text-white shadow-glow"><Send className="h-4 w-4" /></Button>
      </form>
    </div>
  );
}
