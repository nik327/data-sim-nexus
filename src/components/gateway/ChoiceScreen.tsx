import { motion } from "framer-motion";
import { Shield, GraduationCap, ArrowRight } from "lucide-react";

interface ChoiceScreenProps {
  onFastTrack: () => void;
  onTraining: () => void;
}

export default function ChoiceScreen({ onFastTrack, onTraining }: ChoiceScreenProps) {
  return (
    <motion.div key="choose" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-10">
        <p className="text-muted-foreground max-w-lg mx-auto">
          Choose your path into Query & Co. Prove your skills now or build them through guided training.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={onFastTrack}
          className="group p-8 rounded-lg bg-card border border-border hover:border-primary/60 transition-all text-left hover-scale"
        >
          <Shield className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-foreground mb-2">Fast-Track Test</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Already skilled in Excel, SQL & Power BI? Pass the proficiency test to unlock Junior Analyst access immediately.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-mono text-primary">
            Start Test <ArrowRight className="h-3 w-3" />
          </span>
        </button>

        <button
          onClick={onTraining}
          className="group p-8 rounded-lg bg-card border border-border hover:border-accent/60 transition-all text-left hover-scale"
        >
          <GraduationCap className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-foreground mb-2">Training Journey</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Start with guided modules on SQL, Excel & Power BI. Build your skills step-by-step with real climate logistics data.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-mono text-accent">
            Begin Training <ArrowRight className="h-3 w-3" />
          </span>
        </button>
      </div>
    </motion.div>
  );
}
