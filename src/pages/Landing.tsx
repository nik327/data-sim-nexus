import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { ArrowRight, BarChart3, FileSpreadsheet, Database, Globe2, Leaf, TrendingUp } from "lucide-react";

const pillars = [
  { icon: FileSpreadsheet, title: "Excel Modeling", desc: "XLOOKUP, Data Validation, Pivot Tables for supply chain analytics" },
  { icon: Database, title: "SQL Querying", desc: "Complex joins, CTEs, window functions on climate logistics data" },
  { icon: BarChart3, title: "Power BI", desc: "DAX measures, filter context, interactive dashboards" },
];

const stats = [
  { value: "2.4M+", label: "Data Points Processed" },
  { value: "147", label: "Climate Partners" },
  { value: "32", label: "Countries Served" },
  { value: "98.7%", label: "Accuracy Rate" },
];

export default function Landing() {
  const { role } = useUser();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-8 py-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 scanline pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <Globe2 className="h-4 w-4 text-primary" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Sustainable Supply Chain & Climate Logistics
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
            <span className="text-foreground">QUERY</span>
            <span className="text-gradient-blue">&</span>
            <span className="text-foreground">CO</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
            Virtual Data Residency & Internship Simulation. We train and vet elite Data Analysts 
            through real-world climate logistics scenarios.
          </p>

          <div className="flex items-center gap-2 mb-10">
            <Leaf className="h-4 w-4 text-accent" />
            <span className="text-sm text-accent font-medium">Simulation-as-a-Service</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/gateway"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition glow-blue"
            >
              Enter Gateway <ArrowRight className="h-4 w-4" />
            </Link>
            {role !== "visitor" && (
              <Link
                to="/hub"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-secondary transition"
              >
                <TrendingUp className="h-4 w-4" /> Work Hub
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-8 py-12 border-t border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold font-mono text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="px-8 py-20 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground mb-10">
            Technical Pillars
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <p.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground">© 2026 QUERY AND CO. All rights reserved.</span>
          <span className="text-xs font-mono text-muted-foreground">CLASSIFIED // INTERNAL USE ONLY</span>
        </div>
      </footer>
    </div>
  );
}
