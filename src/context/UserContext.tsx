import React, { createContext, useContext, useState, ReactNode } from "react";

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
  promote: (to: UserRole) => void;
  reports: ReportStatus[];
  submitReport: (title: string) => void;
  updateReport: (id: string, status: ReportStatus["status"]) => void;
}

const UserContext = createContext<UserState | null>(null);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>("visitor");
  const [reports, setReports] = useState<ReportStatus[]>([]);

  const promote = (to: UserRole) => setRole(to);

  const submitReport = (title: string) => {
    const report: ReportStatus = {
      id: crypto.randomUUID(),
      title,
      status: "pending",
      submittedAt: new Date(),
    };
    setReports((prev) => [...prev, report]);
    // Simulate review after 5 seconds
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) =>
          r.id === report.id
            ? { ...r, status: Math.random() > 0.3 ? "approved" : "revision" }
            : r
        )
      );
    }, 5000);
  };

  const updateReport = (id: string, status: ReportStatus["status"]) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <UserContext.Provider
      value={{ role, name: "Candidate", promote, reports, submitReport, updateReport }}
    >
      {children}
    </UserContext.Provider>
  );
};
