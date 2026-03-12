import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Database, LayoutDashboard, Leaf } from "lucide-react";
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
        <CheckCircle2 className="h-20 w-20 text-primary mx-auto mb-6" strokeWidth={1.5} />
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
        className="text-lg text-primary font-mono mb-2"
      >
        Junior Analyst
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-muted-foreground mb-4"
      >
        You've cleared the Proficiency Assessment. Welcome to Q&C.
      </motion.p>

      {/* Unlocked sections */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex justify-center gap-4 mb-8"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-primary/10 text-primary text-xs font-mono">
          <Database className="h-3.5 w-3.5" strokeWidth={1.5} /> Data Vault Unlocked
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-accent/10 text-accent text-xs font-mono">
          <LayoutDashboard className="h-3.5 w-3.5" strokeWidth={1.5} /> Active Tickets Unlocked
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
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary/60 text-foreground rounded-2xl font-medium hover:bg-secondary transition"
        >
          <Database className="h-4 w-4 text-primary" strokeWidth={1.5} /> Data Vault
        </button>
        <button
          onClick={() => navigate("/hub")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold glow-sage hover:opacity-90 transition"
        >
          Enter Work Hub <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </motion.div>
    </motion.div>
  );
}
