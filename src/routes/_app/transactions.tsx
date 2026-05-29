import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transactions as seed } from "@/lib/demo-data";
import { Plus } from "lucide-react";
import { toast } from "sonner";

type Txn = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  icon: string;
};

const CATEGORIES: Record<string, string> = {
  Food: "🍔",
  Shopping: "🛍️",
  Travel: "✈️",
  Transport: "🚗",
  Subscriptions: "📺",
  Bills: "💡",
  Entertainment: "🎬",
  Health: "💊",
  Income: "💼",
  Other: "💳",
};

export const Route = createFileRoute("/_app/transactions")({
  head: () => ({ meta: [{ title: "Transactions — SmartBudget AI" }] }),
  component: TransactionsPage,
});

function TransactionsPage() {
  const [items, setItems] = useState<Txn[]>(seed as Txn[]);
  const [open, setOpen] = useState(false);
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Expense" | "Income">("Expense");
  const [category, setCategory] = useState<string>("Food");

  const reset = () => {
    setMerchant("");
    setAmount("");
    setType("Expense");
    setCategory("Food");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = merchant.trim();
    const amt = parseFloat(amount);
    if (!name || name.length > 80) return toast.error("Enter a valid merchant name");
    if (!isFinite(amt) || amt <= 0) return toast.error("Enter a valid amount");

    const finalCategory = type === "Income" ? "Income" : category;
    const signed = type === "Income" ? amt : -amt;
    const next: Txn = {
      id: Date.now(),
      name,
      category: finalCategory,
      amount: signed,
      date: "Just now",
      icon: CATEGORIES[finalCategory] ?? "💳",
    };
    setItems((prev) => [next, ...prev]);
    toast.success(`${type} added`);
    reset();
    setOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground text-sm">Track your income and expenses</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add transaction</DialogTitle>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="merchant">Merchant</Label>
                <Input
                  id="merchant"
                  placeholder="e.g. Whole Foods"
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  maxLength={80}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={type} onValueChange={(v) => setType(v as "Expense" | "Income")}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Expense">Expense</SelectItem>
                      <SelectItem value="Income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={type === "Income" ? "Income" : category}
                    onValueChange={setCategory}
                    disabled={type === "Income"}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(CATEGORIES)
                        .filter((c) => c !== "Income")
                        .map((c) => (
                          <SelectItem key={c} value={c}>
                            {CATEGORIES[c]} {c}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass p-6">
        <div className="divide-y divide-border">
          {items.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="glass flex h-10 w-10 items-center justify-center rounded-xl text-lg">
                  {t.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.category} · {t.date}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-semibold ${t.amount > 0 ? "text-accent" : ""}`}>
                {t.amount > 0 ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
