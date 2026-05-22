"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface VerifyOtpProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSuccess: () => void;
  onEditEmail: () => void;
}

export default function VerifyOtp({ isOpen, onClose, email, onSuccess, onEditEmail }: VerifyOtpProps) {
  const t = useTranslations("auth");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  if (!isOpen) return null;

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    setError("");
    setLoading(true);
    try {
      await api("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });
      toast.success("خوش اومدی! ورودت موفق بود ");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    try {
      await api("/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setTimeLeft(120);
      setOtp("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ارسال مجدد کد");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md mx-4 sm:w-96 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {t("verifyTitle")}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-accent transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {t("verifyTitle")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("verifyDescription")}
              <br />
              <span className="font-medium text-foreground">{email}</span>
              {" "}{t("verifySubDescription")}
            </p>
          </div>

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              dir="ltr"
              className="gap-2"
              autoFocus
            >
              <InputOTPGroup className="gap-2.5" dir="ltr">
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    className="rounded-md w-11 h-11 border-2"
                    index={index}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <button
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
            className="w-11/12 mx-auto bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? t("checking") : t("verify")}
          </button>

          <div className="flex items-center justify-center gap-15">
            <div className="text-center">
              {timeLeft <= 0 ? (
                <button
                  onClick={handleResendOTP}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {t("resendCode")}
                </button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t("timeLeft")}:{" "}
                  <span className="font-mono font-bold text-primary">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              )}
            </div>

            <button
              onClick={onEditEmail}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              ویرایش ایمیل
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
