import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { GraduationCap, Database, FileSpreadsheet, BarChart3, ChevronRight, CheckCircle2 } from "lucide-react";

interface Module {
  id: string;
  track: string;
  title: string;
  progress: number;
  lessons: number;
  completed: number;
}

const initialModules: Module[] = [
  { id: "sql-1", track: "SQL", title: "Foundations: SELECT, WHERE, ORDER BY", progress: 100, lessons: 5, completed: 5 },
  { id: "sql-2", track: "SQL", title: "JOINs & Subqueries", progress: 60, lessons: 6, completed: 4 },
  { id: "sql-3", track: "SQL", title: "Window Functions & CTEs", progress: 0, lessons: 8, completed: 0 },
  { id: "xl-1", track: "Excel", title: "XLOOKUP & INDEX/MATCH", progress: 100, lessons: 4, completed: 4 },
  { id: "xl-2", track: "Excel", title: "Pivot Tables & Data Modeling", progress: 30, lessons: 6, completed: 2 },
  { id: "xl-3", track: "Excel", title: "Advanced Formulas & Macros", progress: 0, lessons: 7, completed: 0 },
  { id: "pbi-1", track: "Power BI", title: "Data Import & Relationships", progress: 100, lessons: 4, completed: 4 },
  { id: "pbi-2", track: "Power BI", title: "DAX Fundamentals", progress: 45, lessons: 8, completed: 4 },
  { id: "pbi-3", track: "Power BI", title: "Advanced Visualizations", progress: 0, lessons: 6, completed: 0 },
];

const trackIcons: Record<string, typeof Database> = {
  SQL: Database,
  Excel: FileSpreadsheet,
  "Power BI": BarChart3,
};

const tracks = ["SQL", "Excel", "Power BI"];

export default function Academy() {
  const [activeTrack, setActiveTrack] = useState("SQL");

  const filtered = initialModules.filter((m) => m.track === activeTrack);
  const trackProgress = Math.round(
    filtered.reduce((sum, m) => sum + m.progress, 0) / filtered.length
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <GraduationCap className="h-5 w-5 text-primary" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-foreground">Q&C Academy</h1>
          <span className="ml-auto text-xs font-mono text-muted-foreground uppercase tracking-wider">LMS</span>
        </div>

        {/* Track selector */}
        <div className="flex gap-2 mb-8">
          {tracks.map((track) => {
            const Icon = trackIcons[track];
            const active = activeTrack === track;
            return (
              <button
                key={track}
                onClick={() => setActiveTrack(track)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <Icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                {track}
              </button>
            );
          })}
        </div>

        {/* Overall progress */}
        <div className="bg-card rounded-3xl p-5 mb-6 shadow-lg shadow-primary/3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              {activeTrack} Track Progress
            </span>
            <span className="text-sm font-mono text-primary font-semibold">{trackProgress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${trackProgress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-3">
          {filtered.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-5 shadow-md shadow-primary/2 hover:shadow-primary/5 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {mod.progress === 100 ? (
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" strokeWidth={1.5} />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-border/60 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{mod.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {mod.completed}/{mod.lessons} lessons
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${mod.progress}%` }} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground w-8 text-right">{mod.progress}%</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
