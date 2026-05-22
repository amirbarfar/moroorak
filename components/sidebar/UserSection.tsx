"use client";

import { LogOut, UserPlus } from "lucide-react";

interface User {
  id: string;
  email: string;
  name?: string;
  tag?: string;
}

interface UserSectionProps {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  variant: "desktop" | "mobile";
  onLogin: () => void;
  onProfile: () => void;
  onLogout: () => void;
}

export default function UserSection({
  isAuthenticated,
  loading,
  user,
  variant,
  onLogin,
  onProfile,
  onLogout,
}: UserSectionProps) {
  const initial = user?.name?.[0] ?? user?.email?.[0]?.toUpperCase() ?? "م";
  const displayName = user?.name || user?.email?.split("@")[0] || "کاربر";

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <button
        onClick={onLogin}
        className={`cursor-pointer w-full transition-all duration-200 ${
          variant === "mobile"
            ? "flex items-center gap-3 px-3 py-2.5 rounded-xl mx-2 "
            : "flex flex-col items-center gap-1 p-2 rounded-xl "
        }`}
      >
        <UserPlus className="h-5 w-5 text-muted-foreground shrink-0" />
        <span className={variant === "mobile" ? "text-sm font-medium" : "text-[10px] text-muted-foreground"}>
          ورود
        </span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={onProfile}
        className={`cursor-pointer w-full transition-all duration-200 ${
          variant === "mobile"
            ? "flex items-center gap-3 px-3 py-2.5 rounded-xl mx-2 "
            : "flex flex-col items-center gap-1 p-2 rounded-xl "
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">
          {initial}
        </div>
        {variant === "mobile" ? (
          <div className="flex flex-col items-start min-w-0">
            <span className="text-sm font-medium truncate max-w-27.5">{displayName}</span>
            <span className="text-[10px] text-muted-foreground truncate max-w-27.5">{user?.email}</span>
          </div>
        ) : (
          <span className="text-[9px] text-muted-foreground truncate max-w-16">{displayName}</span>
        )}
      </button>

      <button
        onClick={onLogout}
        className={`cursor-pointer w-full transition-all duration-200 ${
          variant === "mobile"
            ? "flex items-center gap-3 px-3 py-2.5 rounded-xl mx-2 text-muted-foreground"
            : "flex flex-col items-center gap-1 p-2 rounded-xl "
        }`}
      >
        <LogOut className="h-5 w-5 text-muted-foreground shrink-0" />
        <span className={variant === "mobile" ? "text-sm font-medium" : "text-[10px] text-muted-foreground"}>
          خروج
        </span>
      </button>
    </>
  );
}
