import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { passingThreshold } from "./GatewayData";

interface ScoreEntry {
  category: string;
  label: string;
  correct: number;
  total: number;
  passed: boolean;
}

interface ResultsBreakdownProps {
  scores: ScoreEntry[];
  allPassed: boolean;
  onContinue?: () => void;
}

export default function ResultsBreakdown({ scores, allPassed, onContinue }: ResultsBreakdownProps) {
  const totalCorrect = scores.reduce((s, e) => s + e.correct, 0);
  const totalQuestions = scores.reduce((s, e) => s + e.total, 0);
  const overallPct = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      {/* Hero */}
      <div className="text-center mb-8">
        {allPassed ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Trophy className="h-16 w-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
          </motion.div>
        ) : (
          <XCircle className="h-16 w-16 text-accent mx-auto mb-4" strokeWidth={1.5} />
        )}
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {allPassed ? "Assessment Passed" : "Assessment Incomplete"}
        </h2>
        <p className="text-muted-foreground text-sm font-mono">
          Overall Score: {totalCorrect}/{totalQuestions} ({overallPct}%)
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Threshold: {Math.round(passingThreshold * 100)}% required in each category
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-3 mb-8">
        {scores.map((s, i) => {
          const pct = Math.round((s.correct / s.total) * 100);
          return (
            <motion.div
              key={s.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-card rounded-2xl p-4 border border-border/20"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {s.passed ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  ) : (
                    <XCircle className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  )}
                  <span className="text-sm font-medium text-foreground">{s.label}</span>
                </div>
                <span className={`text-xs font-mono ${s.passed ? "text-primary" : "text-accent"}`}>
                  {s.correct}/{s.total} ({pct}%)
                </span>
              </div>
              <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${s.passed ? "bg-primary" : "bg-accent"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: 0.15 * i }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        {allPassed && onContinue ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={onContinue}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            Continue to Work Hub →
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-card text-foreground rounded-2xl font-semibold text-sm hover:bg-card/80 transition-all border border-border/20"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} /> Retry Assessment
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
