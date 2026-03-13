import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "./UserContext";

export type Sector = "eco" | "finance" | "medical";

interface SectorState {
  sector: Sector;
  setSector: (s: Sector) => void;
  sectorLoaded: boolean;
}

const SectorContext = createContext<SectorState | null>(null);

export const useSector = () => {
  const ctx = useContext(SectorContext);
  if (!ctx) throw new Error("useSector must be inside SectorProvider");
  return ctx;
};

export const SectorProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [sector, setSectorState] = useState<Sector>("eco");
  const [sectorLoaded, setSectorLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      setSectorState("eco");
      setSectorLoaded(true);
      return;
    }
    supabase
      .from("user_progress")
      .select("sector")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.sector) setSectorState(data.sector as Sector);
        setSectorLoaded(true);
      });
  }, [user]);

  // Apply data-sector attribute on body for CSS theming
  useEffect(() => {
    document.body.setAttribute("data-sector", sector);
    return () => document.body.removeAttribute("data-sector");
  }, [sector]);

  const setSector = async (s: Sector) => {
    setSectorState(s);
    if (user) {
      await supabase
        .from("user_progress")
        .update({ sector: s } as any)
        .eq("user_id", user.id);
    }
  };

  return (
    <SectorContext.Provider value={{ sector, setSector, sectorLoaded }}>
      {children}
    </SectorContext.Provider>
  );
};
