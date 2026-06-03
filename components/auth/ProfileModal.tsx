"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, User, Mail, Tag, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import NotificationButton from "@/components/NotificationButton";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, refetch } = useAuth();
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setTag(user.tag || "");
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, tag }),
    });

    if (res.ok) {
      refetch();
      onClose();
    }

    setLoading(false);
  };

  const t = useTranslations("profile");
  const tags = ["برنامه‌نویس", "طراح", "نویسنده", "دانشجو", "کارآفرین", "مدرس"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 pt-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">{t("title")}</h2>
              <p className="text-sm text-muted-foreground">
                {t("description")}
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                {t("nameLabel")}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4" />
                {t("emailLabel")}
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-2 rounded-xl border border-border bg-muted/50 text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Tag className="h-4 w-4" />
                {t("tagLabel")}
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(t)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      tag === t
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? t("saving") : t("save")}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              {t("browserNotifications")}
            </p>
            <NotificationButton />
          </div>
        </div>
      </div>
    </div>
  );
}