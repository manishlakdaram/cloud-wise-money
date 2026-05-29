import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Counter } from "@/components/counter";
import { Users, DollarSign, Activity, HardDrive } from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

const userGrowth = [
  { day: "M", users: 1240 }, { day: "T", users: 1580 }, { day: "W", users: 1820 },
  { day: "T", users: 2100 }, { day: "F", users: 2480 }, { day: "S", users: 2240 }, { day: "S", users: 2670 },
];

export const Route = createFileRoute("/_app/admin")({
  head: () => ({ meta: [{ title: "Admin — SmartBudget AI" }] }),
  component: () => (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">System overview · last updated just now</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total users", value: 24876, icon: Users, prefix: "" },
          { label: "MRR", value: 48230, icon: DollarSign, prefix: "$" },
          { label: "Active today", value: 6420, icon: Activity, prefix: "" },
          { label: "Cloud storage", value: 1284, icon: HardDrive, prefix: "", suffix: " GB" },
        ].map((s) => (
          <Card key={s.label} className="glass p-5 hover:shadow-glow transition">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-3xl font-bold"><Counter value={s.value} prefix={s.prefix} suffix={s.suffix ?? ""} /></p>
          </Card>
        ))}
      </div>

      <Card className="glass p-6">
        <h3 className="font-semibold">User growth — this week</h3>
        <ResponsiveContainer width="100%" height={280} className="mt-4">
          <BarChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0 0 / 0.15)" />
            <XAxis dataKey="day" stroke="currentColor" fontSize={12} />
            <YAxis stroke="currentColor" fontSize={12} />
            <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
            <Bar dataKey="users" fill="oklch(0.6 0.22 275)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass p-6">
          <h3 className="font-semibold">System monitoring</h3>
          <div className="mt-4 space-y-3 text-sm">
            {[
              { name: "API uptime", value: "99.98%", color: "text-accent" },
              { name: "Avg response", value: "84 ms", color: "text-accent" },
              { name: "Error rate", value: "0.02%", color: "text-accent" },
              { name: "Active sessions", value: "6,420", color: "text-foreground" },
            ].map((r) => (
              <div key={r.name} className="flex justify-between">
                <span className="text-muted-foreground">{r.name}</span>
                <span className={`font-semibold ${r.color}`}>{r.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass p-6">
          <h3 className="font-semibold">Cloud storage</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Used</span>
              <span className="font-semibold">1,284 GB / 5,000 GB</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div className="h-full gradient-primary" style={{ width: "25.7%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-3">Auto-scales as you grow. Encrypted at rest with AES-256.</p>
          </div>
        </Card>
      </div>
    </div>
  ),
});
