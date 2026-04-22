import { useEffect, useState } from "react";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: s.id, top: Math.abs(rect.top - 100) };
      });
      const nearest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(nearest.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("light");
    setIsLight(root.classList.contains("light"));
  };

  const handleClick = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <nav
        className={cn(
          "container mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300",
          scrolled ? "glass shadow-card-glass" : "bg-transparent"
        )}
      >
        <button
          onClick={() => handleClick("home")}
          className="flex items-center gap-2 group"
          aria-label="Naldwin Cuengco - Home"
        >
          <div className="relative h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow group-hover:scale-110 transition-transform">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-mono font-bold text-lg hidden sm:block">
            <span className="gradient-text">naldwin</span>
            <span className="text-muted-foreground">.dev</span>
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => handleClick(s.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  active === s.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {s.label}
                {active === s.id && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-gradient-primary rounded-full" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="h-9 w-9 grid place-items-center rounded-lg glass hover:scale-110 transition-transform"
            aria-label="Toggle theme"
          >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden h-9 w-9 grid place-items-center rounded-lg glass"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden container mx-auto mt-2 animate-fade-in">
          <ul className="glass rounded-2xl p-3 flex flex-col gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => handleClick(s.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    active === s.id
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
