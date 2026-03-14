import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Briefcase } from "lucide-react";
import ProficiencyTest from "@/components/gateway/ProficiencyTest";
import PromotionSuccess from "@/components/gateway/PromotionSuccess";

export default function Gateway() {
  const { role, promote } = useUser();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"test" | "success">("test");

  if (role === "junior-analyst") {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-foreground mb-2">Access Granted</h2>
          <p className="text-muted-foreground mb-6">You've already passed the Internship assessment.</p>
          <button onClick={() => navigate("/hub")} className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition">
            Go to Work Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase className="h-5 w-5 text-primary" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-foreground">Internship Assessment</h1>
          <span className="ml-auto text-xs font-mono text-muted-foreground uppercase tracking-wider">
            proficiency gateway
          </span>
        </div>

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
