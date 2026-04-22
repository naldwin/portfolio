import { useState } from "react";
import { Github, ExternalLink, Stethoscope, BarChart3, LineChart, GraduationCap, HeartPulse, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  subtitle: string;
  desc: string;
  icon: any;
  tags: string[];
  category: string;
  gradient: string;
  github?: string;
  demo?: string;
  preview: React.ReactNode;
};

const projects: Project[] = [
  {
    title: "Home Health Compliance System",
    subtitle: "HHRG Services · Ongoing",
    desc: "Healthcare compliance platform reducing paper documentation, streamlining patient admissions and employee data management.",
    icon: Stethoscope,
    tags: ["React", "TanStack", "Drizzle ORM", "PostgreSQL", "TypeScript", "Tailwind"],
    category: "Healthcare",
    gradient: "from-primary/30 via-secondary/20 to-accent/30",
    preview: (
      <div className="grid grid-cols-3 gap-2 p-4">
        {[78, 92, 65].map((v, i) => (
          <div key={i} className="bg-background/40 rounded-lg p-3 backdrop-blur">
            <div className="text-2xl font-bold gradient-text">{v}%</div>
            <div className="h-1 bg-muted mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-primary" style={{ width: `${v}%` }} />
            </div>
          </div>
        ))}
        <div className="col-span-3 bg-background/40 rounded-lg p-3 backdrop-blur space-y-1.5">
          {[60, 80, 45, 90].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <div className="h-1.5 bg-muted flex-1 rounded">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded" style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Health Connect Pro",
    subtitle: "HHRG Services",
    desc: "Full-stack platform for nurse patient visits, payslip management, patient data handling and interactive dashboards. Implemented RQAT and reporting tools.",
    icon: HeartPulse,
    tags: ["Angular", "TypeScript", "PrimeNG", "Node.js", "MSSQL", "Express"],
    category: "Healthcare",
    gradient: "from-accent/30 via-primary/20 to-secondary/30",
    preview: (
      <div className="p-4 space-y-2">
        <div className="bg-background/40 rounded-lg p-3 backdrop-blur flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Heart Rate</div>
            <div className="text-2xl font-bold text-accent">72 <span className="text-xs">bpm</span></div>
          </div>
          <HeartPulse className="h-8 w-8 text-accent animate-pulse" />
        </div>
        <svg viewBox="0 0 200 50" className="w-full h-12 bg-background/40 rounded-lg p-2 backdrop-blur">
          <polyline
            points="0,25 20,25 30,10 40,40 50,25 80,25 90,5 100,45 110,25 200,25"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
          />
        </svg>
      </div>
    ),
  },
  {
    title: "Health Connect Analytics",
    subtitle: "HHRG Services",
    desc: "Analytics dashboards and reporting tools for home health operations — tracking patient care, billing, and resource KPIs to drive decision-making.",
    icon: BarChart3,
    tags: ["Angular", "TypeScript", "PrimeNG", "Node.js", "MSSQL", "Express"],
    category: "Healthcare",
    gradient: "from-secondary/30 via-primary/20 to-accent/30",
    preview: (
      <div className="p-4">
        <div className="flex items-end gap-1.5 h-24 bg-background/40 rounded-lg p-3 backdrop-blur">
          {[40, 65, 35, 80, 55, 90, 70, 100, 60, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "ProLook Dashboard",
    subtitle: "QStrike Internship",
    desc: "Interactive dashboard with responsive layouts, animated transitions, sound effects and real-time data viz. Implemented secure auth and external API integration.",
    icon: LineChart,
    tags: ["Vue.js", "Pinia", "Vue Router", "Axios", "Chart.js", "UIKit"],
    category: "Dashboard",
    gradient: "from-primary/30 via-accent/20 to-secondary/30",
    github: "https://github.com/naldwin/Dashboard-Qstrike",
    preview: (
      <div className="p-4 space-y-2">
        <svg viewBox="0 0 200 80" className="w-full h-20 bg-background/40 rounded-lg p-2 backdrop-blur">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,60 Q40,30 80,40 T160,20 L200,30 L200,80 L0,80 Z" fill="url(#g1)" />
          <path d="M0,60 Q40,30 80,40 T160,20 L200,30" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
    ),
  },
  {
    title: "GrammarLeap",
    subtitle: "Thesis Project",
    desc: "Gamified grammar learning platform with games, leveling, quizzes, and progressive exams. NLP-powered automated grammar checking and feedback.",
    icon: GraduationCap,
    tags: ["Laravel PHP", "Vite", "Node.js", "MySQL", "NLP", "JavaScript"],
    category: "Learning",
    gradient: "from-accent/30 via-secondary/20 to-primary/30",
    github: "https://github.com/naldwin/GrammarLeap-Defended",
    preview: (
      <div className="p-4 space-y-2">
        <div className="bg-background/40 rounded-lg p-3 backdrop-blur">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted-foreground">Level 12</span>
            <span className="text-accent font-mono">🔥 24-day streak</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-4 rounded",
                  i % 3 === 0 ? "bg-accent" : i % 2 === 0 ? "bg-primary/60" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Simply Notes",
    subtitle: "HHRG Skill-Building",
    desc: "Single-page notes app focused on CRUD and clean UI. Built to deepen Angular fundamentals: app structure, components, and TypeScript modules.",
    icon: FileText,
    tags: ["Angular", "TypeScript", "PrimeNG", "PrimeFlex", "Node.js"],
    category: "Learning",
    gradient: "from-primary/30 via-secondary/20 to-accent/30",
    github: "https://github.com/naldwin/simply-notes",
    preview: (
      <div className="p-4 space-y-1.5">
        {[
          { t: "Meeting notes", c: "primary" },
          { t: "Project ideas", c: "secondary" },
          { t: "Daily standup", c: "accent" },
          { t: "Bug log", c: "primary" },
        ].map((n, i) => (
          <div key={i} className="bg-background/40 rounded-md p-2 backdrop-blur flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full bg-${n.c}`} />
            <div className="text-xs text-muted-foreground flex-1">{n.t}</div>
            <div className="h-1 w-12 bg-muted rounded" />
          </div>
        ))}
      </div>
    ),
  },
];

const filters = ["All", "Healthcare", "Dashboard", "Learning"];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 text-center space-y-3">
          <p className="font-mono text-sm text-primary tracking-widest uppercase">
            03 — Projects
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Real-world <span className="gradient-text">systems</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Production apps powering healthcare workflows, analytics, and learning experiences.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                filter === f
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "glass text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <article
              key={p.title}
              className="group relative glass-card rounded-3xl overflow-hidden hover-lift animate-fade-in flex flex-col"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Preview */}
              <div className={cn("relative h-44 bg-gradient-to-br overflow-hidden border-b border-border/50", p.gradient)}>
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="relative z-10 h-full">{p.preview}</div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full glass text-xs font-mono">
                  {p.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shrink-0 shadow-glow group-hover:scale-110 transition-transform">
                    <p.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg leading-tight">{p.title}</h3>
                    <p className="text-xs font-mono text-primary mt-0.5">{p.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-muted text-muted-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  {p.github ? (
                    <Button size="sm" variant="outline" className="flex-1 glass border-primary/30" asChild>
                      <a href={p.github} target="_blank" rel="noreferrer">
                        <Github className="h-3.5 w-3.5 mr-1.5" />
                        Code
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled className="flex-1 glass border-primary/20 opacity-60">
                      <Github className="h-3.5 w-3.5 mr-1.5" />
                      Private
                    </Button>
                  )}
                  {p.demo && (
                    <Button size="sm" className="flex-1 bg-gradient-primary text-primary-foreground border-0" asChild>
                      <a href={p.demo} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        Live
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
