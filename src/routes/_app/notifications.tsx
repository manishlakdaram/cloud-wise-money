import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle2, CloudUpload } from "lucide-react";

const notifs = [
  { icon: AlertTriangle, title: "Netflix renews in 3 days", body: "$15.99 will be charged on Dec 12.", time: "2h ago", color: "text-accent" },
  { icon: CheckCircle2, title: "Savings goal milestone", body: "You've reached 50% of your $5,000 goal!", time: "5h ago", color: "text-accent" },
  { icon: CloudUpload, title: "Cloud backup complete", body: "All data synced across 3 devices.", time: "1d ago", color: "text-primary" },
  { icon: Bell, title: "Unusual spend detected", body: "$89 at Amazon is higher than your weekly average.", time: "2d ago", color: "text-destructive" },
];

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — SmartBudget AI" }] }),
  component: () => (
    <div className="space-y-6 animate-fade-up max-w-3xl">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <div className="space-y-3">
        {notifs.map((n, i) => (
          <Card key={i} className="glass p-4 flex gap-4">
            <div className={`glass flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${n.color}`}>
              <n.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold">{n.title}</p>
                <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{n.body}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),
});
