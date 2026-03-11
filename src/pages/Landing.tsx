import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import {
  ArrowRight,
  BarChart3,
  FileSpreadsheet,
  Database,
  Globe2,
  Leaf,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Shield,
  Zap,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";

const stats = [
  { value: "2.4M+", label: "Data Points Processed", icon: Database },
  { value: "147", label: "Climate Partners", icon: Users },
  { value: "32", label: "Countries Served", icon: Globe2 },
  { value: "98.7%", label: "Accuracy Rate", icon: Award },
];

const tracks = [
  {
    icon: Database,
    title: "SQL Mastery",
    desc: "Complex joins, CTEs, window functions on real climate logistics datasets",
    level: "Beginner → Advanced",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel Analytics",
    desc: "XLOOKUP, Pivot Tables, data modeling for supply chain optimization",
    level: "Beginner → Advanced",
  },
  {
    icon: BarChart3,
    title: "Power BI",
    desc: "DAX measures, filter context, interactive executive dashboards",
    level: "Intermediate → Advanced",
  },
];

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.1, duration: 0.6 },
});

export default function Landing() {
  const { role } = useUser();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 scanline pointer-events-none" />
        {/* Ambient glow orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
                Sustainable Supply Chain & Climate Logistics
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6"
          >
            <span className="text-foreground">QUERY</span>
            <span className="text-gradient-blue text-6xl md:text-9xl">&</span>
            <span className="text-foreground">CO</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-3 leading-relaxed"
          >
            Virtual Data Residency & Internship Simulation. We train and vet elite
            analysts through real-world climate logistics scenarios.
          </motion.p>

          <motion.div {...fadeUp(3)} className="flex items-center gap-2 mb-12">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm text-accent font-semibold tracking-wide">
              Simulation-as-a-Service
            </span>
          </motion.div>

          {/* Two Paths: CTA cards */}
          <motion.div {...fadeUp(4)} className="grid md:grid-cols-2 gap-5 max-w-3xl">
            {/* Academy */}
            <Link
              to="/academy"
              className="group relative p-7 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_40px_hsl(190_100%_50%/0.08)] text-left"
            >
              <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-primary/60 to-neon-purple/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Academy</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Guided Learning Path
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Start with structured modules in SQL, Excel & Power BI. Build skills
                step-by-step with real climate logistics data and earn your credentials.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-mono text-primary font-semibold group-hover:gap-3 transition-all">
                Begin Training <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            {/* Internship */}
            <Link
              to="/internship"
              className="group relative p-7 rounded-xl bg-card border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_40px_hsl(325_90%_55%/0.08)] text-left"
            >
              <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-accent/60 to-neon-pink/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Internship</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Fast-Track Assessment
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Already skilled? Prove your proficiency in Excel, SQL & Power BI.
                Pass the vetting test to unlock Junior Analyst access immediately.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-mono text-accent font-semibold group-hover:gap-3 transition-all">
                Take Assessment <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.div>

          {/* Existing access */}
          {role !== "visitor" && (
            <motion.div variants={fadeUp} custom={5} className="mt-6">
              <Link
                to="/hub"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-medium rounded-md text-sm hover:bg-secondary transition"
              >
                <TrendingUp className="h-4 w-4" /> Continue to Work Hub
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-12 py-16 border-t border-border bg-card/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <s.icon className="h-5 w-5 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold font-mono text-foreground">{s.value}</div>
              <div className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider font-mono">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learning Tracks */}
      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Technical Tracks
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg">
            Master the tools used by real data analysts in climate-focused supply chains.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {tracks.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <t.icon className="h-9 w-9 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-foreground mb-1.5">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.desc}</p>
                <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                  {t.level}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to prove your skills?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Whether you choose to learn or test, your journey at Query & Co starts here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/academy"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition glow-blue"
              >
                <GraduationCap className="h-4 w-4" /> Start Academy
              </Link>
              <Link
                to="/internship"
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent/40 text-accent font-semibold rounded-md hover:bg-accent/5 transition"
              >
                <Briefcase className="h-4 w-4" /> Take Internship Test
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-[10px] font-mono text-muted-foreground">
            © 2026 QUERY AND CO. All rights reserved.
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            CLASSIFIED // INTERNAL USE ONLY
          </span>
        </div>
      </footer>
    </div>
  );
}
