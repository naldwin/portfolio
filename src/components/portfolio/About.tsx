import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  Briefcase,
  GraduationCap,
  Rocket,
  Phone,
  User,
  Brain,
  PencilRuler,
} from "lucide-react";

const journey = [
  {
    icon: Rocket,
    title: "Always Learning",
    period: "Next",
    desc: "Learning about scalable cloud architectures & advanced systems.",
  },
  {
    icon: Briefcase,
    title: "Junior Full Stack Developer",
    period: "Aug 2025 – Present",
    desc: "Develops healthcare and compliance systems at HHRG Services.",
  },
  {
    icon: GraduationCap,
    title: "Software Engineer Intern",
    period: "Feb – May 2025",
    desc: "Built dashboards & data viz at QStrike Innovations using Vue.js.",
  },
  {
    icon: PencilRuler,
    title: "Graphic Artist",
    period: "2024",
    desc: "Created logos, apparel, and marketing visuals for local clients.",
  },
];

const About = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center space-y-3">
          <p className="font-mono text-sm text-primary tracking-widest uppercase">
            01 — About
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Building things that <span className="gradient-text">matter</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Profile card */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-primary blur-2xl opacity-30" />
                <div className="relative h-32 w-32 mx-auto rounded-full bg-gradient-primary grid place-items-center text-5xl font-bold text-primary-foreground shadow-glow">
                  <User className="w-14 h-14"></User>
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Naldwin Cuengco</h3>
                <p className="text-muted-foreground font-mono text-sm">
                  Full Stack Developer
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">
                    Angeles City, Pampanga, Philippines
                  </span>
                </div>
                <a
                  href="mailto:naldwincuengco@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Mail className="h-4 w-4 text-secondary shrink-0" />
                  <span className="text-muted-foreground truncate">
                    naldwincuengco@gmail.com
                  </span>
                </a>
                <a
                  href="tel:+639931003811"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-muted-foreground">
                    +63 993 100 3811
                  </span>
                </a>
                <a
                  href="https://github.com/naldwin"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Github className="h-4 w-4 text-foreground shrink-0" />
                  <span className="text-muted-foreground">
                    github.com/naldwin
                  </span>
                </a>
                <a
                  href="https://linkedin.com/in/naldwincuengco"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-muted-foreground">
                    linkedin.com/in/naldwincuengco
                  </span>
                </a>
                <a
                  href="https://www.codewars.com/users/naldwin"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Brain className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-muted-foreground">
                    codewars.com/users/naldwin
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bio + journey */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card rounded-3xl p-8 space-y-4">
              <p className="text-base md:text-md leading-relaxed text-foreground/90">
                I'm a{" "}
                <span className="text-primary font-semibold">
                  Junior Full Stack Developer
                </span>{" "}
                at HHRG Services, building scalable web applications with
                Node.js, Angular, React and Express. I hold a Bachelor's Degree
                in Computer Science from City College of Angeles.
              </p>
              <p className="text-base md:text-md leading-relaxed text-foreground/80">
                My focus is on{" "}
                <span className="text-secondary font-semibold">
                  healthcare data handling and compliance systems
                </span>{" "}
                — products where data integrity, JWT/session-based auth, and
                audit trails are non-negotiable. I care deeply about{" "}
                <span className="text-accent font-semibold">
                  clean architecture (DRY), reusable components,
                </span>{" "}
                and optimizing CRUD operations and SQL/ORM queries for
                performance.
              </p>
            </div>

            {/* Journey timeline */}
            <div className="glass-card rounded-3xl p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
                Mini Journey
              </p>
              <div className="relative space-y-6">
                <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-accent" />
                {journey.map((j, i) => (
                  <div
                    key={i}
                    className="relative flex gap-4 animate-fade-in"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="relative z-10 h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shrink-0 shadow-glow">
                      <j.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-semibold">{j.title}</h4>
                        <span className="text-xs font-mono text-primary">
                          {j.period}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {j.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
