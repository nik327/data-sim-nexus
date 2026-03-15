import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Leaf } from "lucide-react";
import ProficiencyTest from "@/components/gateway/ProficiencyTest";
import PromotionSuccess from "@/components/gateway/PromotionSuccess";

export default function Assessment() {
  const { role, promote } = useUser();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"test" | "success">("test");

  if (role === "junior-analyst") {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-background">
        <div className="text-center">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-foreground mb-2">Access Granted</h2>
          <p className="text-muted-foreground mb-6">You've already passed the certification.</p>
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
    <div className="min-h-screen bg-background">
      {/* Minimal locked header */}
      <div className="border-b border-border/30 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-primary" strokeWidth={1.5} />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Q&C Certification
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Assessment in Progress
        </span>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <AnimatePresence mode="wait">
          {phase === "test" && (
            <ProficiencyTest
              onPass={() => {
                promote("junior-analyst");
                setPhase("success");
              }}
            />
          )}
          {phase === "success" && <PromotionSuccess />}
        </AnimatePresence>
      </div>
    </div>
  );
}
