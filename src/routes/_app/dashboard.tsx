import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Counter } from "@/components/counter";
import { monthlySpending, categories, transactions, aiInsights } from "@/lib/demo-data";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, Wallet, PiggyBank, TrendingUp, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SmartBudget AI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { label: "Total balance", value: 12486, prefix: "$", trend: "+8.2%", up: true, icon: Wallet },
    { label: "Monthly expenses", value: 1742, prefix: "$", trend: "−4.1%", up: false, icon: ArrowDownRight },
    { label: "Saved this month", value: 810, prefix: "$", trend: "+18%", up: true, icon: PiggyBank },
    { label: "Predicted next month", value: 1890, prefix: "$", trend: "AI", up: true, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Good evening 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your money today.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass p-5 hover:shadow-glow transition">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-3xl font-bold"><Counter value={s.value} prefix={s.prefix} /></p>
            <p className={`mt-1 inline-flex items-center gap-1 text-xs ${s.up ? "text-accent" : "text-destructive"}`}>
              {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {s.trend}
            </p>
          </Card>
        ))}
      </div>

      {/* Chart + AI */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Spending vs Savings</h3>
              <p className="text-xs text-muted-foreground">Last 8 months</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlySpending}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.6 0.22 275)" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="oklch(0.6 0.22 275)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.18 210)" stopOpacity={0.5}/>
                  <stop offset="100%" stopColor="oklch(0.7 0.18 210)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0 0 / 0.15)" />
              <XAxis dataKey="month" stroke="currentColor" fontSize={12} />
              <YAxis stroke="currentColor" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="spent" stroke="oklch(0.6 0.22 275)" fill="url(#g1)" strokeWidth={2} />
              <Area type="monotone" dataKey="saved" stroke="oklch(0.7 0.18 210)" fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="glass p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold">AI Insights</h3>
          </div>
          <div className="space-y-3">
            {aiInsights.map((i) => (
              <div key={i.title} className="rounded-xl glass p-4 hover:shadow-soft transition">
                <p className="text-sm font-semibold">{i.icon} {i.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{i.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Categories + Budget */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass p-6">
          <h3 className="font-semibold">Spending by category</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categories} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {categories.map((c) => <Cell key={c.name} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 self-center">
              {categories.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                    {c.name}
                  </div>
                  <span className="font-medium">${c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="glass p-6">
          <h3 className="font-semibold">Budget progress</h3>
          <div className="mt-5 space-y-5">
            {[
              { name: "Food", used: 540, max: 650 },
              { name: "Transport", used: 230, max: 300 },
              { name: "Shopping", used: 420, max: 400 },
              { name: "Subscriptions", used: 180, max: 220 },
            ].map((b) => {
              const pct = Math.min(100, (b.used / b.max) * 100);
              const over = b.used > b.max;
              return (
                <div key={b.name}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-medium">{b.name}</span>
                    <span className={over ? "text-destructive" : "text-muted-foreground"}>${b.used} / ${b.max}</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Transactions */}
      <Card className="glass p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Recent transactions</h3>
          <a href="/transactions" className="text-xs text-primary hover:underline">View all</a>
        </div>
        <div className="divide-y divide-border">
          {transactions.slice(0, 6).map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="glass flex h-10 w-10 items-center justify-center rounded-xl text-lg">{t.icon}</div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.category} · {t.date}</p>
                </div>
              </div>
              <p className={`text-sm font-semibold ${t.amount > 0 ? "text-accent" : "text-foreground"}`}>
                {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
