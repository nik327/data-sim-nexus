import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { liveLogsBySector } from "@/lib/crisisData";
import type { Sector } from "@/context/SectorContext";

interface Props {
  sector: Sector;
}

export default function LiveLog({ sector }: Props) {
  const logs = liveLogsBySector[sector];
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (visibleCount >= logs.length) return;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 1200 + Math.random() * 800);
    return () => clearTimeout(timer);
  }, [visibleCount, logs.length]);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-card/80 rounded-2xl p-3 border border-border/30 max-h-32 overflow-y-auto"
    >
      <div className="flex items-center gap-2 mb-2">
        <Radio className="h-3 w-3 text-accent animate-pulse" strokeWidth={1.5} />
        <span className="text-[10px] font-mono uppercase tracking-wider text-accent">Live Sensor Feed</span>
      </div>
      <div className="space-y-0.5">
        {logs.slice(0, visibleCount).map((log, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-[10px] font-mono leading-relaxed ${
              log.includes("⚠") ? "text-accent" : "text-muted-foreground"
            }`}
          >
            {log}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
