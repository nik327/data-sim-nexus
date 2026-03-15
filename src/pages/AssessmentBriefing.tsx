import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useSector } from "@/context/SectorContext";
import { sectorLabels } from "@/lib/sectorContent";
import {
  Shield,
  Clock,
  AlertTriangle,
  Cpu,
  ChevronRight,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  BarChart3,
  Leaf,
} from "lucide-react";

const rules = [
  {
    icon: Clock,
    title: "Fixed Duration",
    desc: "You have 45 minutes to complete 45 questions. Time starts when you press BEGIN.",
  },
  {
    icon: AlertTriangle,
    title: "No Retakes",
    desc: "You must wait 24 hours if you fail to reach the 80% threshold in any category.",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "This is an individual assessment of SQL, Excel, and Power BI skills. External aid is prohibited.",
  },
  {
    icon: Cpu,
    title: "Auto-Submit",
    desc: "The system will automatically capture your answers when the timer reaches zero.",
  },
];

const breakdown = [
  { icon: Database, label: "SQL", detail: "20 Questions — 10 Theory · 10 Syntax", color: "text-primary" },
  { icon: FileSpreadsheet, label: "Excel", detail: "15 Questions — Formulas · Power Query · Cleaning", color: "text-primary" },
  { icon: BarChart3, label: "Power BI", detail: "10 Questions — DAX · Star Schema · Performance", color: "text-primary" },
];

export default function AssessmentBriefing() {
  const { role } = useUser();
  const { sector } = useSector();
  const navigate = useNavigate();

  if (role === "junior-analyst") {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-background">
        <div className="text-center">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-foreground mb-2">Certification Complete</h2>
          <p className="text-muted-foreground mb-6">You've already earned Junior Analyst clearance.</p>
          <button
            onClick={() => navigate("/hub")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition"
          >
            Go to Work Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Query and Co
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
            Official Candidate Certification
          </h1>
          <p className="text-xs font-mono text-muted-foreground">
            Division: <span className="text-primary">{sectorLabels[sector]}</span>
          </p>
        </div>

        {/* Rules */}
        <div className="bg-card rounded-2xl border border-border/20 p-6 mb-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-primary mb-4">
            Assessment Rules
          </h2>
          <div className="space-y-4">
            {rules.map((rule, i) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                  <rule.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{rule.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{rule.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Breakdown */}
        <div className="bg-card rounded-2xl border border-border/20 p-6 mb-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-primary mb-4">
            Technical Breakdown
          </h2>
          <div className="space-y-3">
            {breakdown.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + 0.1 * i }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/40"
              >
                <item.icon className={`h-4 w-4 ${item.color}`} strokeWidth={1.5} />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="text-xs font-mono text-muted-foreground ml-auto">{item.detail}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">Total</span>
            <span className="text-xs font-mono text-foreground font-semibold">45 Questions · 45 Minutes</span>
          </div>
        </div>

        {/* Threshold Notice */}
        <div className="text-center mb-6">
          <p className="text-xs text-muted-foreground font-mono">
            Pass threshold: <span className="text-primary font-semibold">≥ 80%</span> in each category
          </p>
        </div>

        {/* Begin Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center"
        >
          <button
            onClick={() => navigate("/assessment")}
            className="group flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm tracking-wide hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            BEGIN ASSESSMENT
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
