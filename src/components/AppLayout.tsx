import { Outlet, Link, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import {
  Globe,
  Briefcase,
  Database,
  LayoutDashboard,
  GraduationCap,
  Leaf,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Globe, roles: ["visitor", "trainee", "junior-analyst"] },
  { path: "/academy", label: "Academy", icon: GraduationCap, roles: ["visitor", "trainee", "junior-analyst"] },
  { path: "/internship", label: "Internship", icon: Briefcase, roles: ["visitor", "trainee"] },
  { path: "/vault", label: "Data Vault", icon: Database, roles: ["trainee", "junior-analyst"] },
  { path: "/hub", label: "Work Hub", icon: LayoutDashboard, roles: ["junior-analyst"] },
];

export default function AppLayout() {
  const { role, name, signOut } = useUser();
  const location = useLocation();

  const visible = navItems.filter((n) => n.roles.includes(role));

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — Glassmorphism */}
      <aside className="w-64 shrink-0 glass-sidebar border-r border-border/40 flex flex-col">
        <div className="p-5 border-b border-border/30">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <span className="font-bold text-sm tracking-widest text-foreground">QUERY&CO</span>
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              clearance:
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
              {role}
            </span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {visible.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-all duration-200 ${
                  active
                    ? "bg-primary/10 text-primary font-medium shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <item.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <span>{item.label}</span>
                {active && <ChevronRight className="h-3 w-3 ml-auto" strokeWidth={1.5} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/30 space-y-3">
          <div className="text-[10px] font-mono text-muted-foreground">
            Signed in as <span className="text-foreground">{name}</span>
          </div>
          <button
            onClick={signOut}
            className="w-full text-left text-xs font-mono text-muted-foreground hover:text-destructive transition-colors"
          >
            ▸ Sign Out
          </button>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Q&C BioLab Terminal v3.0
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
