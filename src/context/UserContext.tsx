import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

type UserRole = "visitor" | "trainee" | "junior-analyst";

interface ReportStatus {
  id: string;
  title: string;
  status: "draft" | "pending" | "approved" | "revision";
  submittedAt?: Date;
}

interface UserState {
  role: UserRole;
  name: string;
  user: User | null;
  loading: boolean;
  promote: (to: UserRole) => void;
  reports: ReportStatus[];
  submitReport: (title: string) => void;
  updateReport: (id: string, status: ReportStatus["status"]) => void;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserState | null>(null);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole>("visitor");
  const [name, setName] = useState("Candidate");
  const [reports, setReports] = useState<ReportStatus[]>([]);

  // Listen to auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          // Defer data loading to avoid Supabase auth deadlock
          setTimeout(() => loadUserData(session.user.id), 0);
        } else {
          setRole("visitor");
          setName("Candidate");
          setReports([]);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId: string) => {
    try {
      // Load profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", userId)
        .single();
      if (profile?.display_name) setName(profile.display_name);

      // Load progress
      const { data: progress } = await supabase
        .from("user_progress")
        .select("role")
        .eq("user_id", userId)
        .single();
      if (progress?.role) {
        setRole(progress.role as UserRole);
        if (progress.role === "junior-analyst") {
          localStorage.setItem("qc_userStatus", "Junior Analyst");
        }
      }

      // Load reports
      const { data: dbReports } = await supabase
        .from("user_reports")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (dbReports) {
        setReports(
          dbReports.map((r: any) => ({
            id: r.id,
            title: r.title,
            status: r.status,
            submittedAt: r.submitted_at ? new Date(r.submitted_at) : undefined,
          }))
        );
      }
    } catch (err) {
      console.error("Error loading user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const promote = async (to: UserRole) => {
    setRole(to);
    // Persist to localStorage for fast session recovery
    if (to === "junior-analyst") {
      localStorage.setItem("qc_userStatus", "Junior Analyst");
    }
    if (user) {
      await supabase
        .from("user_progress")
        .update({ role: to })
        .eq("user_id", user.id);
    }
  };

  const submitReport = async (title: string) => {
    const tempId = crypto.randomUUID();
    const report: ReportStatus = {
      id: tempId,
      title,
      status: "pending",
      submittedAt: new Date(),
    };
    setReports((prev) => [report, ...prev]);

    if (user) {
      const { data } = await supabase
        .from("user_reports")
        .insert({ user_id: user.id, title, status: "pending" })
        .select()
        .single();
      if (data) {
        setReports((prev) =>
          prev.map((r) => (r.id === tempId ? { ...r, id: data.id } : r))
        );
        // Simulate review
        setTimeout(async () => {
          const newStatus = Math.random() > 0.3 ? "approved" : "revision";
          setReports((prev) =>
            prev.map((r) => (r.id === data.id ? { ...r, status: newStatus as any } : r))
          );
          await supabase
            .from("user_reports")
            .update({ status: newStatus })
            .eq("id", data.id);
        }, 5000);
      }
    }
  };

  const updateReport = async (id: string, status: ReportStatus["status"]) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    if (user) {
      await supabase.from("user_reports").update({ status }).eq("id", id);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setRole("visitor");
    setName("Candidate");
    setReports([]);
  };

  return (
    <UserContext.Provider
      value={{ role, name, user, loading, promote, reports, submitReport, updateReport, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
