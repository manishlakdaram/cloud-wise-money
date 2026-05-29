import { createFileRoute, Outlet, useNavigate, Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, CreditCard, Receipt, Bell, Settings, LogOut,
  Sparkles, Search, Moon, Sun, Shield, Bot,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/subscriptions", label: "Subscriptions", icon: CreditCard },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/admin", label: "Admin", icon: Shield },
  { to: "/settings", label: "Settings", icon: Settings },
];

function AppLayout() {
  const { user, loading, signOut } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login", replace: true });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center mesh-bg">
        <div className="h-10 w-10 animate-pulse-glow rounded-full gradient-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-bg flex">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r glass md:flex md:flex-col">
        <Link to="/dashboard" className="flex items-center gap-2 px-6 py-5 font-semibold">
          <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          SmartBudget
        </Link>
        <nav className="flex-1 space-y-1 px-3 py-2">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active ? "gradient-primary text-white shadow-glow" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={async () => {
              await signOut();
              toast.success("Signed out");
              navigate({ to: "/", replace: true });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 glass border-b">
          <div className="flex h-16 items-center gap-3 px-4 md:px-8">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search transactions, subscriptions…" className="pl-9 glass" />
            </div>
            <Button variant="ghost" size="icon" onClick={toggle}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link to="/notifications" className="relative inline-flex">
              <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
            </Link>
            <Link to="/settings" className="ml-1 inline-flex">
              <div className="gradient-primary h-9 w-9 rounded-full text-sm flex items-center justify-center text-white font-semibold">
                {(user.email?.[0] ?? "U").toUpperCase()}
              </div>
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
