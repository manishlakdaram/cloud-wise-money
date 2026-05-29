import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { transactions } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/transactions")({
  head: () => ({ meta: [{ title: "Transactions — SmartBudget AI" }] }),
  component: () => (
    <div className="space-y-6 animate-fade-up">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <Card className="glass p-6">
        <div className="divide-y divide-border">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="glass flex h-10 w-10 items-center justify-center rounded-xl text-lg">{t.icon}</div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.category} · {t.date}</p>
                </div>
              </div>
              <p className={`text-sm font-semibold ${t.amount > 0 ? "text-accent" : ""}`}>
                {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  ),
});
