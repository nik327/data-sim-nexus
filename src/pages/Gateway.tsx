import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Briefcase } from "lucide-react";
import MCQuiz from "@/components/gateway/MCQuiz";
import SQLSandbox from "@/components/gateway/SQLSandbox";
import PromotionSuccess from "@/components/gateway/PromotionSuccess";

export default function Gateway() {
  const { role, promote } = useUser();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"mc" | "sql" | "success">("mc");

  if (role === "junior-analyst") {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Access Granted</h2>
          <p className="text-muted-foreground mb-6">You've already passed the Internship assessment.</p>
          <button onClick={() => navigate("/hub")} className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold">
            Go to Work Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase className="h-5 w-5 text-accent" />
          <h1 className="text-2xl font-bold text-foreground">Internship Assessment</h1>
          <span className="ml-auto text-xs font-mono text-muted-foreground uppercase tracking-wider">
            fast-track vetting
          </span>
        </div>

        {/* Progress */}
        {phase !== "success" && (
          <div className="flex gap-2 mb-8">
            {["Multiple Choice", "Technical Sandbox"].map((label, i) => (
              <div key={label} className="flex-1">
                <div className={`h-1 rounded-full transition-colors ${
                  (phase === "mc" && i === 0) || (phase === "sql" && i <= 1)
                    ? "bg-primary"
                    : "bg-border"
                }`} />
                <span className="text-[10px] font-mono text-muted-foreground mt-1 block">{label}</span>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {phase === "mc" && (
            <MCQuiz onPass={() => setPhase("sql")} />
          )}
          {phase === "sql" && (
            <SQLSandbox onPass={() => {
              promote("junior-analyst");
              setPhase("success");
            }} />
          )}
          {phase === "success" && <PromotionSuccess />}
        </AnimatePresence>
      </div>
    </div>
  );
}
