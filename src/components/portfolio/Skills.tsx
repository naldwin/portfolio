import { Code, Server, Database, Wrench, Palette } from "lucide-react";

const skillGroups = [
  {
    icon: Code,
    title: "Frontend",
    color: "from-primary to-primary-glow",
    glow: "shadow-glow",
    skills: [
      { name: "React.js", level: 88 },
      { name: "Angular.js", level: 90 },
      { name: "Vue.js", level: 78 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "PrimeNG / PrimeFlex", level: 85 },
      { name: "UIKit", level: 70 },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "from-secondary to-secondary",
    glow: "shadow-glow-purple",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "Laravel PHP", level: 75 },
      { name: "REST APIs", level: 90 },
      { name: "JWT / Sessions", level: 85 },
    ],
  },
  {
    icon: Database,
    title: "Database",
    color: "from-accent to-accent",
    glow: "shadow-glow-teal",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MySQL", level: 88 },
      { name: "MSSQL", level: 82 },
      { name: "Drizzle ORM", level: 80 },
      { name: "SQL", level: 88 },
    ],
  },
  {
    icon: Wrench,
    title: "Tools & Workflow",
    color: "from-primary to-accent",
    glow: "shadow-glow",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "CI/CD", level: 75 },
      { name: "Agile / Scrum", level: 82 },
      { name: "TanStack", level: 80 },
      { name: "Vite", level: 85 },
    ],
  },
  {
    icon: Palette,
    title: "Creative",
    color: "from-secondary to-accent",
    glow: "shadow-glow-purple",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Adobe Illustrator", level: 80 },
      { name: "Canva", level: 90 },
      { name: "Capcut", level: 75 },
    ],
  },
  {
    icon: Code,
    title: "Languages",
    color: "from-accent to-primary",
    glow: "shadow-glow-teal",
    skills: [
      { name: "JavaScript", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "PHP", level: 75 },
      { name: "HTML / CSS", level: 95 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center space-y-3">
          <p className="font-mono text-sm text-primary tracking-widest uppercase">
            02 — Skills
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            My <span className="gradient-text">technical</span> toolkit
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A curated stack I use daily to ship reliable, scalable products.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <div
              key={group.title}
              className="glass-card rounded-3xl p-6 hover-lift group"
              style={{ animationDelay: `${gi * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${group.color} grid place-items-center ${group.glow} group-hover:scale-110 transition-transform`}>
                  <group.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{group.title}</h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    {group.skills.length} technologies
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${group.color} transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
