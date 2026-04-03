import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Terminal, CheckCircle2, XCircle, Clock } from "lucide-react";
import type { CrisisScenario } from "@/lib/crisisData";
import { validateCrisisQuery } from "@/lib/crisisData";
import LiveLog from "./LiveLog";
import type { Sector } from "@/context/SectorContext";

interface Props {
  scenario: CrisisScenario;
  sector: Sector;
  onResolved: (success: boolean) => void;
}

const CRISIS_DURATION = 120;

export default function CrisisOverlay({ scenario, sector, onResolved }: Props) {
  const [timeLeft, setTimeLeft] = useState(CRISIS_DURATION);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<"idle" | "success" | "fail">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (result !== "idle") return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setResult("fail");
          setTimeout(() => onResolved(false), 2500);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [result, onResolved]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (result !== "idle") return;
    const valid = validateCrisisQuery(query, scenario);
    setResult(valid ? "success" : "fail");
    setTimeout(() => onResolved(valid), 2500);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Backdrop with terracotta pulse */}
        <div className="absolute inset-0 bg-background/95 animate-pulse-glow"
          style={{ boxShadow: "inset 0 0 120px hsl(var(--accent) / 0.15)" }}
        />

        <div className="relative z-10 w-full max-w-3xl mx-4 space-y-4">
          {/* Alert Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-card rounded-3xl p-5 border border-accent/30 glow-terracotta"
          >
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-5 w-5 text-accent animate-pulse" strokeWidth={1.5} />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                Data Integrity Breach
              </span>
              <div className="ml-auto flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                <span className={`font-mono text-sm tabular-nums ${timeLeft <= 30 ? "text-destructive" : "text-accent"}`}>
                  {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                </span>
              </div>
            </div>
            <p className="text-sm text-foreground font-medium">{scenario.message}</p>
          </motion.div>

          {/* Sample Data Table */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-3xl p-5 border border-border/40"
          >
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
              {scenario.table} — Live Sample
            </p>
            <div className="grid grid-cols-2 gap-1 text-xs font-mono">
              <div className="text-muted-foreground px-2 py-1 bg-secondary/30 rounded-lg">{scenario.sensorLabel}</div>
              <div className="text-muted-foreground px-2 py-1 bg-secondary/30 rounded-lg">{scenario.column}</div>
              {scenario.sampleData.map((row) => {
                const isOutlier = scenario.outlierCondition.includes("<")
                  ? row.value < parseInt(scenario.outlierCondition.replace(/[<>\s]/g, ""))
                  : row.value > parseInt(scenario.outlierCondition.replace(/[<>\s]/g, ""));
                return (
                  <>
                    <div key={row.sensor} className={`px-2 py-1 ${isOutlier ? "text-accent font-bold" : "text-foreground"}`}>
                      {row.sensor}
                    </div>
                    <div className={`px-2 py-1 ${isOutlier ? "text-accent font-bold" : "text-foreground"}`}>
                      {row.value}
                    </div>
                  </>
                );
              })}
            </div>
          </motion.div>

          {/* SQL Terminal */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl p-5 border border-border/40"
          >
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Emergency SQL Terminal
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{scenario.hint}</p>

            {result === "idle" ? (
              <>
                <textarea
                  ref={textareaRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`SELECT ${scenario.sensorLabel} FROM ${scenario.table} WHERE ...`}
                  rows={4}
                  className="w-full bg-background border border-border/50 rounded-2xl px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!query.trim()}
                  className="mt-3 px-6 py-2.5 bg-accent text-accent-foreground rounded-2xl font-semibold text-sm disabled:opacity-40 hover:opacity-90 transition"
                >
                  Execute Query
                </button>
              </>
            ) : result === "success" ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-3 p-4 bg-primary/10 rounded-2xl border border-primary/30"
              >
                <CheckCircle2 className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-foreground">Breach Contained</p>
                  <p className="text-xs text-muted-foreground">Data sequestered for Cyber-Forensics.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-3 p-4 bg-destructive/10 rounded-2xl border border-destructive/30"
              >
                <XCircle className="h-5 w-5 text-destructive" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-foreground">Breach Uncontained</p>
                  <p className="text-xs text-muted-foreground">Data integrity compromised. Review required.</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Live Log */}
          <LiveLog sector={sector} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
