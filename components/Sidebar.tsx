"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  BookOpen, Calendar, Bell, Clock,
  Home, Pencil, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import SendOtp from "@/components/auth/SendOtp";
import VerifyOtp from "@/components/auth/VerifyOtp";
import ProfileModal from "@/components/auth/ProfileModal";
import { useAuth } from "@/hooks/useAuth";
import NavItem from "@/components/sidebar/NavItem";
import LogoutModal from "@/components/sidebar/LogoutModal";
import UserSection from "@/components/sidebar/UserSection";

const navItems = [
  { href: "/", labelKey: "home", icon: Home, protected: false },
  { href: "/learnings", labelKey: "learnings", icon: BookOpen, protected: true },
  { href: "/planning", labelKey: "planning", icon: Calendar, protected: true },
  { href: "/reminders", labelKey: "reminders", icon: Bell, protected: true },
  { href: "/journal", labelKey: "journal", icon: Pencil, protected: true },
  { href: "/pomodoro", labelKey: "pomodoro", icon: Clock, protected: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const tNav = useTranslations("sidebar");
  const { isAuthenticated, user, logout, loading, refetch } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [authStep, setAuthStep] = useState<"sendOtp" | "verifyOtp">("sendOtp");
  const [userEmail, setUserEmail] = useState("");
  const [mobileExpanded, setMobileExpanded] = useState(true);

  const handleAuthRequired = () => {
    toast.error("برای دسترسی به این بخش ابتدا وارد شوید", {
      duration: 3000,
      style: { fontFamily: "inherit", direction: "rtl" },
    });
    setShowAuthModal(true);
  };

  const handleSendOtpSuccess = (email: string) => {
    setUserEmail(email);
    setAuthStep("verifyOtp");
  };

  const handleVerifySuccess = () => {
    setShowAuthModal(false);
    setAuthStep("sendOtp");
    setUserEmail("");
    refetch();
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
    setAuthStep("sendOtp");
    setUserEmail("");
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <>
      <aside className="hidden md:block fixed right-0 top-0 h-full z-50">
        <div className="h-full w-24 bg-background/95 backdrop-blur-md border-l border-border flex flex-col items-center pt-8 pb-4 gap-4">
          <div className="mb-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-base">م</span>
            </div>
          </div>

          <nav className="flex-1 flex flex-col gap-1 w-full px-2">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={tNav(item.labelKey)}
                icon={item.icon}
                isActive={pathname === item.href}
                variant="desktop"
                protected={item.protected}
                isAuthenticated={isAuthenticated}
                onAuthRequired={handleAuthRequired}
              />
            ))}
          </nav>

          <div className="border-t border-border pt-3 px-2 w-full flex flex-col items-center gap-1">
            <UserSection
              isAuthenticated={isAuthenticated}
              loading={loading}
              user={user}
              variant="desktop"
              onLogin={() => setShowAuthModal(true)}
              onProfile={() => setShowProfileModal(true)}
              onLogout={() => setShowLogoutConfirm(true)}
            />
          </div>
        </div>
      </aside>

      <aside
        className={`md:hidden fixed right-0 top-0 h-full z-50 transition-all duration-300 ${
          mobileExpanded ? "w-52" : "w-0"
        }`}
      >
        <div
          className={`h-full bg-background/95 backdrop-blur-md border-l border-border flex flex-col py-8 gap-4 relative overflow-hidden transition-all duration-300 ${
            mobileExpanded ? "w-52" : "w-0"
          }`}
        >
          <div className="flex items-center justify-between w-full px-4">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-base">م</span>
            </div>
            <button
              onClick={() => setMobileExpanded(false)}
              className="bg-background border border-border rounded-full p-1.5 hover:bg-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col gap-1 w-full">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={tNav(item.labelKey)}
                icon={item.icon}
                isActive={pathname === item.href}
                variant="mobile"
                protected={item.protected}
                isAuthenticated={isAuthenticated}
                onAuthRequired={handleAuthRequired}
              />
            ))}
          </nav>

          <div className="border-t border-border pt-3 w-full flex flex-col gap-1">
            <UserSection
              isAuthenticated={isAuthenticated}
              loading={loading}
              user={user}
              variant="mobile"
              onLogin={() => setShowAuthModal(true)}
              onProfile={() => setShowProfileModal(true)}
              onLogout={() => setShowLogoutConfirm(true)}
            />
          </div>
        </div>
      </aside>

      <button
        onClick={() => setMobileExpanded(true)}
        className={`md:hidden fixed right-0 top-20 z-50 bg-background border border-r-0 border-border rounded-l-lg p-2 shadow-md transition-all duration-300 ${
          mobileExpanded ? "hidden" : "flex"
        } items-center gap-1 cursor-pointer`}
      >
        <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">منو</span>
      </button>

      {showAuthModal && (
        <>
          {authStep === "sendOtp" && (
            <SendOtp isOpen onClose={handleCloseModal} onSuccess={handleSendOtpSuccess} />
          )}
          {authStep === "verifyOtp" && (
            <VerifyOtp
              isOpen
              onClose={handleCloseModal}
              email={userEmail}
              onSuccess={handleVerifySuccess}
              onEditEmail={() => { setAuthStep("sendOtp"); setUserEmail(""); }}
            />
          )}
        </>
      )}
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      {showLogoutConfirm && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
      <div className="md:mr-20" />
      <div className={`md:hidden transition-all duration-300 ${mobileExpanded ? "mr-52" : "mr-0"}`} />
    </>
  );
}