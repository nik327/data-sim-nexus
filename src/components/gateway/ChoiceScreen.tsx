import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";

interface ChoiceScreenProps {
  onFastTrack: () => void;
  onTraining: () => void;
}

export default function ChoiceScreen({ onFastTrack }: ChoiceScreenProps) {
  return (
    <motion.div key="choose" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-10">
        <p className="text-muted-foreground max-w-lg mx-auto">
          You've chosen the Internship fast-track. Prove your proficiency in Excel, SQL & Power BI to unlock Junior Analyst access.
        </p>
      </div>
      <div className="max-w-md mx-auto">
        <button
          onClick={onFastTrack}
          className="group w-full p-8 rounded-3xl bg-card shadow-lg shadow-accent/5 hover:shadow-accent/10 transition-all text-left"
        >
          <Briefcase className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          <h3 className="text-lg font-bold text-foreground mb-2">Begin Proficiency Test</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Complete the multiple-choice assessment and SQL technical sandbox to earn your Junior Analyst clearance.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-mono text-accent">
            Start Test <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </span>
        </button>
      </div>
    </motion.div>
  );
}
