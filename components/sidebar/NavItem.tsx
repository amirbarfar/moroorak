"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  variant: "desktop" | "mobile";
  protected?: boolean;
  isAuthenticated: boolean;
  onAuthRequired: () => void;
  onMobileNavigate?: (href: string, isProtected: boolean) => void;
}

export default function NavItem({
  href,
  label,
  icon: Icon,
  isActive,
  variant,
  protected: isProtected,
  isAuthenticated,
  onAuthRequired,
  onMobileNavigate,
}: NavItemProps) {
  
  if (variant === "desktop") {
    return (
      <Link
        href={isProtected && !isAuthenticated ? "#" : href}
        onClick={isProtected && !isAuthenticated ? (e) => { e.preventDefault(); onAuthRequired(); } : undefined}
        className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
          isActive ? "text-primary" : "text-muted-foreground"
        }`}
        title={label}
      >
        <div className={`p-2 rounded-xl transition-all duration-200 ${
          isActive ? "bg-primary/10" : ""
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-medium">{label}</span>
        {isActive && (
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full" />
        )}
      </Link>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onMobileNavigate) {
      e.preventDefault();
      onMobileNavigate(href, isProtected || false);
    } 
    else if (isProtected && !isAuthenticated) {
      e.preventDefault();
      onAuthRequired();
    }
  };

  return (
    <Link
      href={isProtected && !isAuthenticated && !onMobileNavigate ? "#" : href}
      onClick={handleClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 mx-2 ${
        isActive
          ? "text-primary bg-primary/10 font-semibold"
          : "text-muted-foreground hover:bg-accent/50"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="text-sm font-medium whitespace-nowrap">{label}</span>
      {isActive && (
        <div className="mr-auto w-1.5 h-1.5 rounded-full bg-primary" />
      )}
    </Link>
  );
}