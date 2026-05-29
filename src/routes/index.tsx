import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Brain, CloudCog, LineChart, Bell, ShieldCheck, Wand2,
  Check, Sparkles, ArrowRight, TrendingUp, Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartBudget AI — AI-powered personal finance" },
      { name: "description", content: "Track expenses, manage subscriptions, predict spending, and grow savings with an AI financial assistant built for millennials and students." },
      { property: "og:title", content: "SmartBudget AI" },
      { property: "og:description", content: "Your AI-powered finance copilot in the cloud." },
    ],
  }),
  component: LandingPage,
});

const features = [
  { icon: Brain, title: "AI Financial Assistant", body: "Chat with an AI that knows your finances and gives clear, friendly advice." },
  { icon: LineChart, title: "Expense Prediction", body: "Forecasts next month's spending across every category in real time." },
  { icon: Wand2, title: "Smart Savings", body: "Personalized tips to save $200+/mo without lifestyle changes." },
  { icon: Bell, title: "Bill & Subscription Tracker", body: "Never miss a renewal. Auto-detects subscriptions you forgot." },
  { icon: CloudCog, title: "Cloud Sync", body: "Encrypted multi-device sync with automatic cloud backup." },
  { icon: ShieldCheck, title: "Bank-grade Security", body: "256-bit encryption and zero-knowledge architecture." },
];

const tiers = [
  { name: "Student", price: "$0", desc: "Free forever for verified students.", features: ["AI insights (10/mo)", "5 connected accounts", "Subscription tracker", "Mobile + web"], cta: "Start free" },
  { name: "Pro", price: "$8", desc: "Most popular for individuals.", features: ["Unlimited AI insights", "Unlimited accounts", "Bill reminders", "Expense forecasting", "Export reports"], cta: "Start 14-day trial", featured: true },
  { name: "Family", price: "$16", desc: "Shared budgets for up to 6 people.", features: ["Everything in Pro", "Shared budgets", "Family insights", "Priority support"], cta: "Choose Family" },
];

const testimonials = [
  { name: "Maya R.", role: "Grad student", body: "SmartBudget told me I was paying for three streaming services I forgot. Saved $42/mo on day one." },
  { name: "Jordan K.", role: "Junior dev", body: "The AI chat feels like a friend who's actually good with money. The forecasts are scary accurate." },
  { name: "Priya S.", role: "Designer", body: "Finally a finance app that doesn't look like a tax form. The dashboard is genuinely beautiful." },
];

function LandingPage() {
  return (
    <div className="min-h-screen mesh-bg">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Powered by AI · Built on Lovable Cloud
          </div>
          <h1 className="animate-fade-up mt-6 text-balance text-5xl font-bold tracking-tight md:text-7xl" style={{ animationDelay: "0.05s" }}>
            Your money,<br />
            <span className="gradient-text">on autopilot.</span>
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl" style={{ animationDelay: "0.1s" }}>
            SmartBudget AI tracks every expense, predicts next month's spending, and tells you exactly how to save — all from the cloud.
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.15s" }}>
            <Button size="lg" className="gradient-primary text-white shadow-glow" asChild>
              <Link to="/signup">Start free <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="glass" asChild>
              <Link to="/dashboard">Live demo</Link>
            </Button>
          </div>

          {/* Hero preview card */}
          <div className="animate-fade-up relative mx-auto mt-16 max-w-5xl" style={{ animationDelay: "0.25s" }}>
            <div className="absolute -inset-4 gradient-primary opacity-30 blur-3xl rounded-full" />
            <Card className="relative glass overflow-hidden p-2 shadow-soft">
              <div className="grid gap-3 rounded-xl bg-background/40 p-6 md:grid-cols-3">
                {[
                  { label: "Total balance", value: "$12,486", trend: "+8.2%" },
                  { label: "This month", value: "$1,742", trend: "−4.1%" },
                  { label: "Saved", value: "$810", trend: "+18%" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl glass p-5 text-left">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
                    <p className="mt-2 text-3xl font-semibold">{s.value}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-accent">
                      <TrendingUp className="h-3 w-3" />{s.trend}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Everything you need.<br /><span className="gradient-text">Nothing you don't.</span></h2>
          <p className="mt-4 text-muted-foreground">Six powerful features. Zero spreadsheets.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="glass group p-6 transition hover:shadow-glow hover:-translate-y-1">
              <div className="gradient-primary mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl shadow-glow">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Loved by <span className="gradient-text">10,000+</span> users</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="glass p-6">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}</div>
              <p className="mt-4 text-sm">{t.body}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="gradient-primary h-9 w-9 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Simple, fair <span className="gradient-text">pricing</span></h2>
          <p className="mt-4 text-muted-foreground">Free for students. Cheap for everyone else.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <Card
              key={t.name}
              className={`relative p-7 transition ${t.featured ? "gradient-primary text-white shadow-glow scale-[1.02]" : "glass"}`}
            >
              {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">Most popular</div>}
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className={`mt-1 text-sm ${t.featured ? "text-white/80" : "text-muted-foreground"}`}>{t.desc}</p>
              <p className="mt-5 text-4xl font-bold">{t.price}<span className={`text-base font-normal ${t.featured ? "text-white/80" : "text-muted-foreground"}`}>/mo</span></p>
              <ul className="mt-6 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4" />{f}</li>
                ))}
              </ul>
              <Button className={`mt-7 w-full ${t.featured ? "bg-white text-primary hover:bg-white/90" : "gradient-primary text-white"}`} asChild>
                <Link to="/signup">{t.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Card className="gradient-primary relative overflow-hidden p-12 text-center text-white shadow-glow">
          <div className="absolute inset-0 opacity-30 mesh-bg" />
          <div className="relative">
            <h2 className="text-4xl font-bold md:text-5xl">Take control of your money today.</h2>
            <p className="mt-4 text-white/85">Join 10,000+ users saving smarter with AI.</p>
            <Button size="lg" className="mt-8 bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/signup">Start free <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </Card>
      </section>

      <SiteFooter />
    </div>
  );
}
