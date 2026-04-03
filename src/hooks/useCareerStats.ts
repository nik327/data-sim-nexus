import { useState, useCallback } from "react";

export interface CareerStats {
  integrityScore: number;
  virtualSalary: number;
  crisesResolved: number;
  tasksCompleted: number;
}

const STORAGE_KEY = "qc_career_stats";

function loadStats(): CareerStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { integrityScore: 75, virtualSalary: 42000, crisesResolved: 0, tasksCompleted: 0 };
}

function saveStats(stats: CareerStats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function useCareerStats() {
  const [stats, setStats] = useState<CareerStats>(loadStats);

  const addCrisisWin = useCallback(() => {
    setStats((prev) => {
      const next = {
        ...prev,
        integrityScore: Math.min(100, prev.integrityScore + 5),
        virtualSalary: prev.virtualSalary + 2500,
        crisesResolved: prev.crisesResolved + 1,
      };
      saveStats(next);
      return next;
    });
  }, []);

  const addCrisisLoss = useCallback(() => {
    setStats((prev) => {
      const next = {
        ...prev,
        integrityScore: Math.max(0, prev.integrityScore - 3),
      };
      saveStats(next);
      return next;
    });
  }, []);

  const addTaskComplete = useCallback(() => {
    setStats((prev) => {
      const next = {
        ...prev,
        virtualSalary: prev.virtualSalary + 500,
        tasksCompleted: prev.tasksCompleted + 1,
      };
      saveStats(next);
      return next;
    });
  }, []);

  return { stats, addCrisisWin, addCrisisLoss, addTaskComplete };
}
