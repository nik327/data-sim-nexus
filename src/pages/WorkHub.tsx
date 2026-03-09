import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Lock, LayoutDashboard, Clock, Users, Send, CheckCircle2, AlertCircle,
  Loader2, ChevronRight, Circle,
} from "lucide-react";

const tasks = [
  { id: "D01", title: "Audit Carbon Logs", status: "in-progress", day: 1 },
  { id: "D02", title: "Validate Supplier Compliance Data", status: "todo", day: 2 },
  { id: "D03", title: "Build Latency Distribution Chart", status: "todo", day: 3 },
  { id: "D04", title: "Regression Analysis: Yield vs. Temperature", status: "todo", day: 4 },
  { id: "D05", title: "Executive Summary Memo", status: "todo", day: 5 },
];

const hierarchy = [
  { role: "Analyst", name: "You", active: true },
  { role: "Senior Supervisor", name: "Dr. K. Mbeki", active: false },
  { role: "Executive Stakeholder", name: "C. Harada, VP", active: false },
];

const statusColors: Record<string, string> = {
  "pending": "text-warning",
  "approved": "text-accent",
  "revision": "text-destructive",
  "draft": "text-muted-foreground",
};

const statusIcons: Record<string, typeof CheckCircle2> = {
  "pending": Loader2,
  "approved": CheckCircle2,
  "revision": AlertCircle,
  "draft": Circle,
};

export default function WorkHub() {
  const { role, reports, submitReport } = useUser();
  const navigate = useNavigate();
  const [sprintTime, setSprintTime] = useState(8 * 60 * 60); // 8 hours in seconds
  const [reportTitle, setReportTitle] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setSprintTime((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  if (role !== "junior-analyst") {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Clearance Required</h2>
          <p className="text-muted-foreground mb-6">Pass the Proficiency Gateway to access the Work Hub.</p>
          <button onClick={() => navigate("/gateway")} className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold">
            Go to Gateway
          </button>
        </div>
      </div>
    );
  }

  const hours = Math.floor(sprintTime / 3600);
  const mins = Math.floor((sprintTime % 3600) / 60);
  const secs = sprintTime % 60;

  const handleSubmit = () => {
    if (!reportTitle.trim()) return;
    submitReport(reportTitle.trim());
    setReportTitle("");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">The Bullpen</h1>
          <span className="ml-auto text-xs font-mono text-muted-foreground uppercase tracking-wider">work hub</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Task Board */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sprint Clock */}
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Sprint Clock</span>
              </div>
              <div className="font-mono text-4xl font-bold text-primary tabular-nums">
                {String(hours).padStart(2, "0")}:{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Current EDA Sprint Deadline</p>
            </div>

            {/* Kanban */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Daily Objectives
              </h2>
              <div className="space-y-2">
                {tasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-md border ${
                      task.status === "in-progress"
                        ? "border-primary/30 bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <span className="text-xs font-mono text-muted-foreground w-8">{task.id}</span>
                    <span className={`text-sm ${task.status === "in-progress" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {task.title}
                    </span>
                    <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      Day {task.day}
                    </span>
                    {task.status === "in-progress" && (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Submit Report */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">Submit Report</h2>
              <div className="flex gap-3">
                <input
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="Report title (e.g., Carbon Audit Q1)"
                  className="flex-1 bg-background border border-border rounded-md px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!reportTitle.trim()}
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md font-semibold text-sm disabled:opacity-40 flex items-center gap-2"
                >
                  <Send className="h-4 w-4" /> Submit
                </button>
              </div>

              {reports.length > 0 && (
                <div className="mt-4 space-y-2">
                  {reports.map((r) => {
                    const Icon = statusIcons[r.status] || Circle;
                    return (
                      <div key={r.id} className="flex items-center gap-3 p-3 rounded-md border border-border">
                        <Icon className={`h-4 w-4 ${statusColors[r.status]} ${r.status === "pending" ? "animate-spin" : ""}`} />
                        <span className="text-sm font-mono text-foreground">{r.title}</span>
                        <span className={`ml-auto text-xs font-mono uppercase tracking-wider ${statusColors[r.status]}`}>
                          {r.status === "revision" ? "Revision Requested" : r.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reporting Chain */}
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Reporting Chain
                </span>
              </div>
              <div className="space-y-3">
                {hierarchy.map((h, i) => (
                  <div key={h.role} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold ${
                      h.active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      {h.name[0]}
                    </div>
                    <div>
                      <p className={`text-sm ${h.active ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {h.name}
                      </p>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase">{h.role}</p>
                    </div>
                    {i < hierarchy.length - 1 && (
                      <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Status card */}
            <div className="bg-card border border-accent/20 rounded-lg p-5 glow-emerald">
              <p className="text-xs font-mono uppercase tracking-wider text-accent mb-2">Your Status</p>
              <p className="text-lg font-bold text-foreground">Junior Analyst</p>
              <p className="text-xs text-muted-foreground mt-1">Active Sprint • Day 1/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
