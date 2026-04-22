import { Briefcase, Calendar, CheckCircle2, GraduationCap } from "lucide-react";

const experiences = [
  {
    role: "Junior Full Stack Developer",
    company: "Home Health Resource Group Services Inc.",
    location: "Angeles City, Pampanga",
    period: "Aug 2025 – Present",
    icon: Briefcase,
    achievements: [
      "Developed full-stack apps with Node.js (Angular, React, Express) — scalable UI and maintainable backend",
      "Worked in Agile teams using Git/GitHub, contributing to features, bug fixes, and CI/CD workflows",
      "Built RESTful APIs and JWT/session-based authentication for secure system integrations",
      "Optimized CRUD operations and SQL/ORM queries for data integrity and performance",
      "Applied clean architecture (DRY) and built reusable components to improve code quality",
      "Handled sensitive healthcare data with security and reliability considerations",
    ],
    stack: ["Angular", "React", "Node.js", "Express", "PostgreSQL", "MSSQL", "Drizzle ORM", "TypeScript"],
  },
  {
    role: "Software Engineer Intern",
    company: "QStrike Innovations Phils., OPC",
    location: "San Fernando, Pampanga",
    period: "Feb 2025 – May 2025",
    icon: Briefcase,
    achievements: [
      "Built an interactive dashboard with Vue.js for dynamic visualization of key metrics",
      "Created frontend components and managed application state and routing",
      "Integrated APIs and async data handling for real-time dashboard updates",
      "Applied modular component design improving code maintainability and reusability",
      "Collaborated with the team using Git/GitHub version control workflows",
    ],
    stack: ["Vue.js", "Pinia", "Chart.js", "Axios", "JavaScript", "UIKit"],
  },
  {
    role: "BS Computer Science",
    company: "City College of Angeles",
    location: "Angeles City, Pampanga",
    period: "Graduated May 2025",
    icon: GraduationCap,
    achievements: [
      "Thesis: GrammarLeap — A Web-Based Grammar Practice Tool Integrating Gamification",
      "Built end-to-end gamified learning platform with NLP-powered grammar checking",
    ],
    stack: ["Laravel", "MySQL", "JavaScript", "NLP"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16 text-center space-y-3">
          <p className="font-mono text-sm text-primary tracking-widest uppercase">
            04 — Experience
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Professional <span className="gradient-text">journey</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative md:grid md:grid-cols-2 md:gap-8 items-start">
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div className="h-4 w-4 rounded-full bg-gradient-primary shadow-glow ring-4 ring-background" />
                  </div>

                  {/* Card */}
                  <div className={`pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                    <div className="glass-card rounded-2xl p-6 md:p-8 hover-lift">
                      <div className={`flex items-center gap-3 mb-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow shrink-0">
                          <exp.icon className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div className={isLeft ? "md:text-right" : ""}>
                          <h3 className="font-bold text-lg leading-tight">{exp.role}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-xs text-muted-foreground/70 mt-0.5">{exp.location}</p>
                        </div>
                      </div>

                      <div className={`flex items-center gap-2 mb-4 text-xs font-mono text-primary ${isLeft ? "md:justify-end" : ""}`}>
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{exp.period}</span>
                      </div>

                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {exp.achievements.map((a, ai) => (
                          <li key={ai} className={`flex gap-2 ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}>
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={`flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-border ${isLeft ? "md:justify-end" : ""}`}>
                        {exp.stack.map((s) => (
                          <span key={s} className="px-2.5 py-1 text-xs font-mono rounded-md bg-muted text-muted-foreground border border-border">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
