import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Mail, Github, Sparkles } from "lucide-react";

const techBadges = ["React", "Angular", "Node.js", "TypeScript", "PostgreSQL", "Tailwind"];

const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Animated background */}
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-muted-foreground">Available for opportunities</span>
          </div>

          {/* Greeting */}
          <p className="font-mono text-sm md:text-base text-primary">
            <Sparkles className="inline h-4 w-4 mr-2" />
            Hello World, I'm
          </p>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]">
            <span className="block">Naldwin</span>
            <span className="block gradient-text bg-[length:200%_auto] animate-gradient-shift">
              Cuengco
            </span>
          </h1>

          {/* Title */}
          <div className="space-y-4">
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground/90">
              Junior Full Stack Developer
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Building scalable web apps, dashboards, and secure systems with modern technologies.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={() => scrollTo("projects")}
              className="bg-gradient-primary hover:opacity-90 shadow-glow text-primary-foreground border-0 group"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass border-primary/30 hover:border-primary/60 hover:bg-primary/10"
              asChild
            >
              <a href="/Naldwin_Cuengco_CV.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollTo("contact")}
              className="hover:bg-muted"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </div>

          {/* Tech badges */}
          <div className="pt-8">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Tech Stack
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {techBadges.map((tech, i) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 text-sm font-mono rounded-full glass border-primary/20 hover:border-primary/50 hover:scale-105 transition-all cursor-default"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-float">
          <span className="text-xs font-mono text-muted-foreground">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
