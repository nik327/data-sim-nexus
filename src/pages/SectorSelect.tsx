import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSector, Sector } from "@/context/SectorContext";
import {
  Leaf,
  TrendingUp,
  HeartPulse,
  ArrowRight,
  Globe2,
} from "lucide-react";

const sectors = [
  {
    id: "eco" as Sector,
    title: "Eco-Logistics",
    subtitle: "Sustainable Supply Chain & Climate Data",
    icon: Leaf,
    desc: "Analyze carbon emissions, optimize green logistics, and process climate compliance datasets across 32 countries.",
    tags: ["Carbon Analytics", "Fleet Routing", "Climate Indices"],
    gradient: "from-[hsl(130,18%,58%)] to-[hsl(160,30%,45%)]",
    glowClass: "hover:shadow-[0_0_40px_hsl(130,18%,58%,0.15)]",
    accentColor: "text-[hsl(130,18%,58%)]",
    bgAccent: "bg-[hsl(130,18%,58%,0.1)]",
    borderAccent: "border-[hsl(130,18%,58%,0.2)]",
  },
  {
    id: "finance" as Sector,
    title: "Financial Services",
    subtitle: "Capital Markets & Transaction Intelligence",
    icon: TrendingUp,
    desc: "Audit high-frequency trading data, analyze equity performance, and detect suspicious transaction patterns in real time.",
    tags: ["Equity Trading", "Risk Analysis", "Fraud Detection"],
    gradient: "from-[hsl(45,56%,53%)] to-[hsl(40,70%,40%)]",
    glowClass: "hover:shadow-[0_0_40px_hsl(45,56%,53%,0.15)]",
    accentColor: "text-[hsl(45,56%,53%)]",
    bgAccent: "bg-[hsl(45,56%,53%,0.1)]",
    borderAccent: "border-[hsl(45,56%,53%,0.2)]",
  },
  {
    id: "medical" as Sector,
    title: "Medical Analytics",
    subtitle: "Clinical Intelligence & Patient Outcomes",
    icon: HeartPulse,
    desc: "Process patient readmission rates, analyze clinical trial efficacy, and ensure HIPAA-compliant data operations.",
    tags: ["Patient Outcomes", "Clinical Trials", "HIPAA Compliance"],
    gradient: "from-[hsl(178,33%,52%)] to-[hsl(190,40%,40%)]",
    glowClass: "hover:shadow-[0_0_40px_hsl(178,33%,52%,0.15)]",
    accentColor: "text-[hsl(178,33%,52%)]",
    bgAccent: "bg-[hsl(178,33%,52%,0.1)]",
    borderAccent: "border-[hsl(178,33%,52%,0.2)]",
  },
];

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.12, duration: 0.6 },
});

export default function SectorSelect() {
  const { setSector } = useSector();
  const navigate = useNavigate();

  const handleSelect = (s: Sector) => {
    setSector(s);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute inset-0 organic-grain pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl w-full">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/50 mb-6">
            <Globe2 className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Select Your Division
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-3">
            Choose Your <span className="text-gradient-warm">Sector</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Each division offers specialized datasets, proficiency assessments,
            and task boards tailored to the industry.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {sectors.map((s, i) => (
            <motion.button
              key={s.id}
              {...fadeUp(i + 1)}
              onClick={() => handleSelect(s.id)}
              className={`group relative text-left p-7 rounded-3xl bg-card shadow-lg transition-all duration-300 ${s.glowClass} border border-transparent hover:${s.borderAccent}`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 rounded-t-3xl bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className={`p-3 rounded-2xl ${s.bgAccent} inline-flex mb-5`}>
                <s.icon className={`h-7 w-7 ${s.accentColor}`} strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">{s.title}</h3>
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-4">
                {s.subtitle}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {s.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] font-mono px-2 py-1 rounded-xl ${s.bgAccent} ${s.accentColor}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className={`inline-flex items-center gap-2 text-xs font-mono font-semibold ${s.accentColor} group-hover:gap-3 transition-all`}>
                Enter Division <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
