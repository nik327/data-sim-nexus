import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Database, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PromotionSuccess() {
  const navigate = useNavigate();

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <CheckCircle2 className="h-20 w-20 text-accent mx-auto mb-6" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-black text-foreground mb-2"
      >
        PROMOTED
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg text-accent font-mono mb-2"
      >
        Junior Analyst
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-muted-foreground mb-4"
      >
        You've cleared the Proficiency Gateway. Welcome to Q&C.
      </motion.p>

      {/* Unlocked sections */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex justify-center gap-4 mb-8"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded border border-accent/30 bg-accent/5 text-accent text-xs font-mono">
          <Database className="h-3.5 w-3.5" /> Data Vault Unlocked
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded border border-primary/30 bg-primary/5 text-primary text-xs font-mono">
          <LayoutDashboard className="h-3.5 w-3.5" /> Active Tickets Unlocked
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="flex justify-center gap-4"
      >
        <button
          onClick={() => navigate("/vault")}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground rounded-md font-medium hover:bg-secondary transition"
        >
          <Database className="h-4 w-4" /> Data Vault
        </button>
        <button
          onClick={() => navigate("/hub")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary-foreground rounded-md font-semibold glow-emerald"
        >
          Enter Work Hub <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}
