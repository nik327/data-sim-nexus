import { Outlet, Link, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import {
  Globe,
  Shield,
  Database,
  LayoutDashboard,
  GraduationCap,
  Terminal,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Portal", icon: Globe, roles: ["visitor", "trainee", "junior-analyst"] },
  { path: "/gateway", label: "Gateway", icon: Shield, roles: ["visitor", "trainee"] },
  { path: "/vault", label: "Data Vault", icon: Database, roles: ["trainee", "junior-analyst"] },
  { path: "/hub", label: "Work Hub", icon: LayoutDashboard, roles: ["junior-analyst"] },
  { path: "/academy", label: "Academy", icon: GraduationCap, roles: ["trainee", "junior-analyst"] },
];

export default function AppLayout() {
  const { role, name, signOut } = useUser();
  const location = useLocation();

  const visible = navItems.filter((n) => n.roles.includes(role));

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {active && <ChevronRight className="h-3 w-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
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
            Q&C Secure Terminal v2.4
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
