"use client";

import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  tag?: string;
}

let sharedUser: User | null = null;
let sharedLoading = true;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

async function fetchUser() {
  sharedLoading = true;
  notify();
  const res = await fetch("/api/auth/me");
  const data = await res.json();
  sharedUser = data.user ?? null;
  sharedLoading = false;
  notify();
}

export function useAuth() {
  const [, rerender] = useState(0);

  useEffect(() => {
    const fn = () => rerender((n) => n + 1);
    listeners.add(fn);
    if (sharedLoading && listeners.size === 1) {
      fetchUser();
    }
    return () => { listeners.delete(fn); };
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    sharedUser = null;
    notify();
  };

  return {
    user: sharedUser,
    isAuthenticated: !!sharedUser,
    loading: sharedLoading,
    refetch: fetchUser,
    logout,
  };
}