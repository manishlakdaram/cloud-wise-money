import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              SmartBudget AI
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              AI-powered finance for the next generation.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="hover:text-foreground transition">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 SmartBudget AI. All rights reserved.</p>
          <p>Built with ❤︎ on Lovable Cloud</p>
        </div>
      </div>
    </footer>
  );
}
