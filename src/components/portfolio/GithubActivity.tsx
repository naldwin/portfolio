import { useEffect, useMemo, useRef, useState } from "react";
import {
  Github,
  GitCommit,
  GitPullRequest,
  CircleDot,
  Activity,
  ExternalLink,
  Star,
  GitFork,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const USERNAME = "naldwin";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Week = { days: Day[] };
type Contributions = {
  total: number;
  weeks: Week[];
};

type Filter = "7" | "30" | "365";

interface GhEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: any;
}

const fetchContributions = async (): Promise<Contributions> => {
  // Public unauthenticated proxy that returns GitHub contribution calendar data.
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
  if (!res.ok) throw new Error("contrib fetch failed");
  const json = await res.json();
  const contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = json.contributions;

  // Group into weeks starting Sunday
  const weeks: Week[] = [];
  let current: Day[] = [];
  contributions.forEach((c) => {
    const d = new Date(c.date);
    const dow = d.getUTCDay();
    if (dow === 0 && current.length) {
      weeks.push({ days: current });
      current = [];
    }
    current.push(c);
  });
  if (current.length) weeks.push({ days: current });

  const total = contributions.reduce((acc, c) => acc + c.count, 0);
  return { total, weeks };
};

const useCountUp = (target: number, duration = 1200, start = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
};

const levelClass = (level: number) => {
  switch (level) {
    case 0:
      return "bg-muted/40";
    case 1:
      return "bg-primary/25";
    case 2:
      return "bg-primary/50";
    case 3:
      return "bg-secondary/70";
    case 4:
      return "bg-gradient-to-br from-primary to-secondary shadow-glow";
    default:
      return "bg-muted/40";
  }
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

const timeAgo = (iso: string) => {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 2592000)}mo ago`;
};

const eventMeta = (e: GhEvent): { label: string; icon: JSX.Element; tone: string } => {
  switch (e.type) {
    case "PushEvent":
      return {
        label: `pushed ${e.payload?.commits?.length ?? 1} commit${
          (e.payload?.commits?.length ?? 1) > 1 ? "s" : ""
        }`,
        icon: <GitCommit className="h-4 w-4" />,
        tone: "text-primary",
      };
    case "PullRequestEvent":
      return {
        label: `${e.payload?.action ?? "updated"} a pull request`,
        icon: <GitPullRequest className="h-4 w-4" />,
        tone: "text-secondary",
      };
    case "IssuesEvent":
      return {
        label: `${e.payload?.action ?? "updated"} an issue`,
        icon: <CircleDot className="h-4 w-4" />,
        tone: "text-accent",
      };
    case "CreateEvent":
      return {
        label: `created ${e.payload?.ref_type ?? "ref"}`,
        icon: <GitFork className="h-4 w-4" />,
        tone: "text-accent",
      };
    case "WatchEvent":
      return { label: `starred`, icon: <Star className="h-4 w-4" />, tone: "text-primary" };
    case "ForkEvent":
      return { label: `forked`, icon: <GitFork className="h-4 w-4" />, tone: "text-secondary" };
    default:
      return {
        label: e.type.replace("Event", "").toLowerCase(),
        icon: <Activity className="h-4 w-4" />,
        tone: "text-muted-foreground",
      };
  }
};

const StatCard = ({
  icon,
  label,
  value,
  visible,
  accent,
}: {
  icon: JSX.Element;
  label: string;
  value: number;
  visible: boolean;
  accent: string;
}) => {
  const v = useCountUp(value, 1200, visible);
  return (
    <div className="glass-card rounded-2xl p-5 hover-lift group">
      <div className="flex items-center justify-between mb-3">
        <div
          className={cn(
            "h-10 w-10 rounded-xl grid place-items-center group-hover:scale-110 transition-transform",
            accent
          )}
        >
          {icon}
        </div>
        <span className="text-xs font-mono text-muted-foreground">last year</span>
      </div>
      <div className="text-3xl font-bold gradient-text font-mono">{v.toLocaleString()}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

const GithubActivity = () => {
  const [contrib, setContrib] = useState<Contributions | null>(null);
  const [events, setEvents] = useState<GhEvent[] | null>(null);
  const [repos, setRepos] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("365");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [c, e, r] = await Promise.all([
          fetchContributions(),
          fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=30`).then((r) => r.json()),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=10`).then((r) => r.json()),
        ]);
        if (cancelled) return;
        setContrib(c);
        setEvents(Array.isArray(e) ? e : []);
        setRepos(Array.isArray(r) ? r : []);
      } catch (err) {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredWeeks = useMemo(() => {
    if (!contrib) return [];
    if (filter === "365") return contrib.weeks;
    const days = filter === "7" ? 7 : 30;
    const cutoff = Date.now() - days * 86400000;
    return contrib.weeks
      .map((w) => ({ days: w.days.filter((d) => new Date(d.date).getTime() >= cutoff) }))
      .filter((w) => w.days.length > 0);
  }, [contrib, filter]);

  const filteredTotal = useMemo(
    () => filteredWeeks.reduce((acc, w) => acc + w.days.reduce((a, d) => a + d.count, 0), 0),
    [filteredWeeks]
  );

  const stats = useMemo(() => {
    const list = events ?? [];
    return {
      commits: list
        .filter((e) => e.type === "PushEvent")
        .reduce((acc, e) => acc + (e.payload?.commits?.length ?? 0), 0),
      prs: list.filter((e) => e.type === "PullRequestEvent").length,
      issues: list.filter((e) => e.type === "IssuesEvent").length,
    };
  }, [events]);

  const monthLabels = useMemo(() => {
    if (!filteredWeeks.length) return [];
    const labels: { idx: number; label: string }[] = [];
    let lastMonth = -1;
    filteredWeeks.forEach((w, i) => {
      const first = w.days[0];
      if (!first) return;
      const m = new Date(first.date).getUTCMonth();
      if (m !== lastMonth) {
        labels.push({ idx: i, label: new Date(first.date).toLocaleString(undefined, { month: "short" }) });
        lastMonth = m;
      }
    });
    return labels;
  }, [filteredWeeks]);

  return (
    <section ref={sectionRef} id="github" className="section-padding relative">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
            <Github className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">live data</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            GitHub <span className="gradient-text">Activity</span> & Contributions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time snapshot of my coding activity, pulled directly from GitHub.
          </p>
        </div>

        {/* Profile + Stats */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Profile card */}
          <div className="glass-card rounded-2xl p-6 lg:col-span-1 flex flex-col items-center text-center hover-lift">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-primary blur-2xl opacity-50 rounded-full" />
              <img
                src={`https://avatars.githubusercontent.com/${USERNAME}`}
                alt={`${USERNAME} GitHub avatar`}
                loading="lazy"
                className="relative h-24 w-24 rounded-full ring-2 ring-primary/40"
              />
            </div>
            <h3 className="text-xl font-bold font-mono">@{USERNAME}</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
              Full Stack Developer building scalable applications
            </p>
            <Button
              asChild
              className="bg-gradient-primary hover:opacity-90 shadow-glow w-full"
            >
              <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View GitHub Profile
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>

          {/* Stats grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            <StatCard
              icon={<Activity className="h-5 w-5 text-primary-foreground" />}
              label="Total Contributions"
              value={contrib?.total ?? 0}
              visible={visible && !loading}
              accent="bg-gradient-primary"
            />
            <StatCard
              icon={<GitCommit className="h-5 w-5 text-primary-foreground" />}
              label="Recent Commits"
              value={stats.commits}
              visible={visible && !loading}
              accent="bg-gradient-to-br from-primary to-accent"
            />
            <StatCard
              icon={<GitPullRequest className="h-5 w-5 text-primary-foreground" />}
              label="Pull Requests"
              value={stats.prs}
              visible={visible && !loading}
              accent="bg-gradient-to-br from-secondary to-primary"
            />
            <StatCard
              icon={<CircleDot className="h-5 w-5 text-primary-foreground" />}
              label="Issues"
              value={stats.issues}
              visible={visible && !loading}
              accent="bg-gradient-to-br from-accent to-secondary"
            />
          </div>
        </div>

        {/* Heatmap */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Contribution Calendar
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-mono text-foreground">{filteredTotal.toLocaleString()}</span>{" "}
                contributions in the selected range
              </p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg glass">
              {([
                { v: "7", l: "7d" },
                { v: "30", l: "30d" },
                { v: "365", l: "1y" },
              ] as { v: Filter; l: string }[]).map((f) => (
                <button
                  key={f.v}
                  onClick={() => setFilter(f.v)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                    filter === f.v
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f.l}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-1">
                {Array.from({ length: 53 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <Skeleton key={j} className="h-3 w-3 rounded-sm" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : error || !contrib ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Couldn't load contribution data. View live on{" "}
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
              .
            </div>
          ) : (
            <TooltipProvider delayDuration={50}>
              <div className="overflow-x-auto pb-2">
                <div className="inline-block min-w-full">
                  {/* Month labels */}
                  <div className="flex gap-1 mb-1 pl-7 text-[10px] font-mono text-muted-foreground">
                    {filteredWeeks.map((_, i) => {
                      const lbl = monthLabels.find((m) => m.idx === i);
                      return (
                        <div key={i} className="w-3 shrink-0">
                          {lbl ? <span className="absolute">{lbl.label}</span> : null}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-1">
                    {/* Day labels */}
                    <div className="flex flex-col gap-1 pr-1 text-[10px] font-mono text-muted-foreground">
                      {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                        <div key={i} className="h-3 leading-3">
                          {d}
                        </div>
                      ))}
                    </div>
                    {filteredWeeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-1">
                        {Array.from({ length: 7 }).map((_, di) => {
                          const day = week.days.find((d) => new Date(d.date).getUTCDay() === di);
                          if (!day)
                            return <div key={di} className="h-3 w-3 rounded-sm opacity-0" />;
                          return (
                            <Tooltip key={di}>
                              <TooltipTrigger asChild>
                                <div
                                  className={cn(
                                    "h-3 w-3 rounded-sm transition-all duration-200 hover:scale-150 hover:ring-2 hover:ring-primary/50 cursor-pointer",
                                    levelClass(day.level)
                                  )}
                                  style={{
                                    animationDelay: `${(wi * 7 + di) * 2}ms`,
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs">
                                <div className="font-semibold">
                                  {day.count} contribution{day.count !== 1 ? "s" : ""}
                                </div>
                                <div className="text-muted-foreground">{formatDate(day.date)}</div>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((l) => (
                  <div key={l} className={cn("h-3 w-3 rounded-sm", levelClass(l))} />
                ))}
                <span>More</span>
              </div>
            </TooltipProvider>
          )}
        </div>

        {/* Recent activity + repos */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </h3>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            ) : !events?.length ? (
              <p className="text-sm text-muted-foreground py-8 text-center">No recent public activity.</p>
            ) : (
              <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {events.slice(0, 8).map((e, i) => {
                  const m = eventMeta(e);
                  return (
                    <li
                      key={e.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors group animate-fade-in"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <div className={cn("mt-0.5 shrink-0", m.tone)}>{m.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm">
                          <span className="text-muted-foreground">{m.label} in </span>
                          <a
                            href={`https://github.com/${e.repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-foreground hover:text-primary transition-colors truncate"
                          >
                            {e.repo.name}
                          </a>
                        </div>
                        <div className="text-xs text-muted-foreground font-mono mt-0.5">
                          {timeAgo(e.created_at)}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <GitFork className="h-5 w-5 text-secondary" />
              Recently Updated Repos
            </h3>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            ) : !repos?.length ? (
              <p className="text-sm text-muted-foreground py-8 text-center">No public repos yet.</p>
            ) : (
              <ul className="space-y-3">
                {repos.slice(0, 5).map((r, i) => (
                  <li
                    key={r.id}
                    className="p-3 rounded-lg hover:bg-muted/40 transition-colors animate-fade-in"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <a
                      href={r.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between gap-3 group"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-sm font-semibold group-hover:text-primary transition-colors truncate">
                          {r.name}
                        </div>
                        {r.description && (
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {r.description}
                          </div>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground font-mono">
                          {r.language && (
                            <span className="flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-gradient-primary" />
                              {r.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" /> {r.stargazers_count}
                          </span>
                          <span>updated {timeAgo(r.updated_at)}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
