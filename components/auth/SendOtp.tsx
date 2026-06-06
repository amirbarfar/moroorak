"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X, Mail } from "lucide-react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface SendOtpProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export default function SendOtp({ isOpen, onClose, onSuccess }: SendOtpProps) {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    if (!email) {
      setEmailError("لطفاً ایمیل خود را وارد کنید");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("فرمت ایمیل صحیح نیست");
      return;
    }
    setLoading(true);
    try {
      await api("/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      onSuccess(email);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md mx-4 sm:w-96 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {t("title")}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-accent transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {t("welcome")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("emailDescription")}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t("emailLabel")}
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                placeholder={t("emailPlaceholder")}
                className={`w-full pr-10 pl-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 transition-all ${
                  emailError
                    ? "border-destructive focus:ring-destructive/50"
                    : "border-border focus:ring-primary/50"
                }`}
                autoFocus
              />
            </div>
            {emailError && (
              <p className="text-xs text-destructive mt-1.5 pr-1">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading ? "در حال ارسال..." : t("continue")}
          </button>
        </form>
      </div>
    </div>
  );
}
