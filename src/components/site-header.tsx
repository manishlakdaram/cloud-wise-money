import { Link } from "@tanstack/react-router";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg">SmartBudget<span className="gradient-text"> AI</span></span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="/#features" className="text-muted-foreground transition hover:text-foreground">Features</a>
            <a href="/#pricing" className="text-muted-foreground transition hover:text-foreground">Pricing</a>
            <a href="/#testimonials" className="text-muted-foreground transition hover:text-foreground">Testimonials</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            {user ? (
              <Button asChild className="gradient-primary text-white shadow-glow">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild className="gradient-primary text-white shadow-glow">
                  <Link to="/signup">Get started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
