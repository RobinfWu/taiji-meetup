"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { UpcomingClassSessionItem } from "../../functions/types/schema";

type State = { sessions: UpcomingClassSessionItem[]; loading: boolean; error: string };
const Context = createContext<(State & { refresh: () => Promise<void> }) | null>(null);

export function PublicClassesProvider({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const enabled = ["/", "/classes", "/start"].includes(path);
  const [state, setState] = useState<State>({ sessions: [], loading: true, error: "" });
  const reload = useRef<() => Promise<void>>(async () => {});
  const refresh = useCallback(() => reload.current(), []);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    let pending: Promise<void> | null = null;
    let controller: AbortController | undefined;
    const load = () => {
      if (pending) return pending;
      controller = new AbortController();
      const signal = controller.signal;
      pending = (async () => {
        try {
          const response = await fetch("/api/classes", { cache: "no-store", signal });
          if (!response.ok) throw new Error("Unable to load upcoming classes right now.");
          const data: unknown = await response.json();
          if (!Array.isArray(data) || !data.every(s => s && typeof s.id === "string" && typeof s.template?.title === "string" && Number.isFinite(Date.parse(s.start_at)) && Number.isFinite(Date.parse(s.end_at)) && typeof s.available_spots === "number")) throw new Error("Unexpected class schedule response.");
          const sessions = (data as UpcomingClassSessionItem[]).filter(s => Date.parse(s.start_at) > Date.now()).sort((a,b) => a.start_at.localeCompare(b.start_at));
          if (alive) setState({ sessions, loading: false, error: "" });
        } catch (error) {
          if (alive && !signal.aborted) setState({ sessions: [], loading: false, error: error instanceof Error ? error.message : "Unable to load classes." });
        }
      })().finally(() => { pending = null; });
      return pending;
    };
    reload.current = load;
    const visibleRefresh = () => { if (document.visibilityState === "visible") void load(); };
    void load();
    const timer = window.setInterval(visibleRefresh, 60_000);
    window.addEventListener("focus", visibleRefresh);
    document.addEventListener("visibilitychange", visibleRefresh);
    return () => { alive = false; controller?.abort(); window.clearInterval(timer); window.removeEventListener("focus", visibleRefresh); document.removeEventListener("visibilitychange", visibleRefresh); };
  }, [enabled, path]);
  return <Context.Provider value={{ ...state, refresh }}>{children}</Context.Provider>;
}

export function usePublicClasses() {
  const value = useContext(Context);
  if (!value) throw new Error("PublicClassesProvider is required.");
  return value;
}
