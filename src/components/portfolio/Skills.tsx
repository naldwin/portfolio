import { Code, Server, Database, Wrench, Palette } from "lucide-react";

const skillGroups = [
  {
    icon: Code,
    title: "Frontend",
    color: "from-primary to-primary-glow",
    glow: "shadow-glow",
    skills: [
      { name: "React.js" },
      { name: "Angular.js" },
      { name: "Vue.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "PrimeNG / PrimeFlex" },
      { name: "UIKit" },
      { name: "TanStack" },
      { name: "HTML / CSS" },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "from-secondary to-secondary",
    glow: "shadow-glow-purple",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Laravel PHP" },
      { name: "REST APIs" },
      { name: "JWT / Sessions" },
    ],
  },
  {
    icon: Database,
    title: "Database",
    color: "from-accent to-accent",
    glow: "shadow-glow-teal",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MSSQL" },
      { name: "Drizzle ORM" },
      { name: "SQL" },
    ],
  },
  {
    icon: Wrench,
    title: "Tools & Workflow",
    color: "from-primary to-accent",
    glow: "shadow-glow",
    skills: [
      { name: "Git / GitHub" },
      { name: "CI/CD" },
      { name: "Agile / Scrum" },
      { name: "Vite" },
    ],
  },
  {
    icon: Palette,
    title: "Creative",
    color: "from-secondary to-accent",
    glow: "shadow-glow-purple",
    skills: [
      { name: "Figma" },
      { name: "Adobe Illustrator" },
      { name: "Canva" },
      { name: "Capcut" },
      { name: "CorelDRAW" },
    ],
  },
  {
    icon: Code,
    title: "Languages",
    color: "from-accent to-primary",
    glow: "shadow-glow-teal",
    skills: [{ name: "JavaScript" }, { name: "TypeScript" }, { name: "PHP" }],
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
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${group.color} grid place-items-center ${group.glow} group-hover:scale-110 transition-transform`}
                >
                  <group.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{group.title}</h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    {group.skills.length} technologies
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center mb-1.5 border py-2 px-3 rounded-3xl hover:border-white/20"
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
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
