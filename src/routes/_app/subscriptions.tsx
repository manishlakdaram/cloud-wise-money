import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { subscriptions } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/subscriptions")({
  head: () => ({ meta: [{ title: "Subscriptions — SmartBudget AI" }] }),
  component: () => {
    const total = subscriptions.reduce((a, s) => a + s.price, 0);
    return (
      <div className="space-y-6 animate-fade-up">
        <div>
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">Total monthly: <span className="font-semibold text-foreground">${total.toFixed(2)}</span></p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((s) => (
            <Card key={s.name} className="glass p-5">
              <div className="flex items-center gap-3">
                <div className="glass flex h-12 w-12 items-center justify-center rounded-xl text-2xl">{s.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs text-muted-foreground">Renews {s.renews}</p>
                </div>
                <p className="font-bold">${s.price}</p>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">Manage</Button>
            </Card>
          ))}
        </div>
      </div>
    );
  },
});
