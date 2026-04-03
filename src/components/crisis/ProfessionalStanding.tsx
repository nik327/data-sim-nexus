import { Shield, DollarSign, Zap, CheckSquare } from "lucide-react";
import type { CareerStats } from "@/hooks/useCareerStats";

interface Props {
  stats: CareerStats;
}

export default function ProfessionalStanding({ stats }: Props) {
  const salaryFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(stats.virtualSalary);

  return (
    <div className="bg-card rounded-3xl p-5 shadow-lg shadow-primary/5">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
        Professional Standing
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Shield className="h-4 w-4 text-primary" strokeWidth={1.5} />
          <div className="flex-1">
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Integrity Score</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${stats.integrityScore}%` }}
                />
              </div>
              <span className="text-xs font-mono text-foreground font-bold">{stats.integrityScore}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DollarSign className="h-4 w-4 text-accent" strokeWidth={1.5} />
          <div>
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Virtual Salary</p>
            <p className="text-sm font-bold text-foreground">{salaryFormatted}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Zap className="h-4 w-4 text-accent" strokeWidth={1.5} />
          <div>
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Crises Resolved</p>
            <p className="text-sm font-bold text-foreground">{stats.crisesResolved}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CheckSquare className="h-4 w-4 text-primary" strokeWidth={1.5} />
          <div>
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Tasks Completed</p>
            <p className="text-sm font-bold text-foreground">{stats.tasksCompleted}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
