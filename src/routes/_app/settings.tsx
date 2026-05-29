import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — SmartBudget AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle().then(({ data }) => {
      setFullName(data?.full_name ?? "");
    });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("profiles").update({ full_name: fullName, updated_at: new Date().toISOString() }).eq("id", user.id);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Profile saved");
  };

  return (
    <div className="space-y-6 animate-fade-up max-w-3xl">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card className="glass p-6 space-y-4">
        <h2 className="font-semibold">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="gradient-primary h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {(user?.email?.[0] ?? "U").toUpperCase()}
          </div>
          <div className="text-sm text-muted-foreground">{user?.email}</div>
        </div>
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <Button onClick={save} disabled={loading} className="gradient-primary text-white shadow-glow">
          {loading ? "Saving…" : "Save changes"}
        </Button>
      </Card>

      <Card className="glass p-6 space-y-4">
        <h2 className="font-semibold">Preferences</h2>
        {[
          { label: "Email notifications", desc: "Bill reminders, weekly insights, alerts" },
          { label: "Push notifications", desc: "Real-time spending alerts" },
          { label: "Cloud backup", desc: "Encrypted multi-device sync" },
        ].map((p, i) => (
          <div key={p.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{p.label}</p>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </div>
            <Switch defaultChecked={i !== 1} />
          </div>
        ))}
      </Card>

      <Card className="glass p-6 space-y-4">
        <h2 className="font-semibold">Export</h2>
        <p className="text-sm text-muted-foreground">Download your data as CSV or PDF.</p>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button variant="outline">Export PDF</Button>
        </div>
      </Card>
    </div>
  );
}
