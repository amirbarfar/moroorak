"use client";

import { LogOut } from "lucide-react";

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ onConfirm, onCancel }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5 border border-border">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-3">
            <LogOut className="h-5 w-5 text-destructive" />
          </div>
          <h3 className="text-lg font-bold text-foreground">خروج از حساب</h3>
          <p className="text-sm text-muted-foreground mt-1">مطمئنی می‌خوای خارج بشی؟</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-destructive text-white text-sm font-medium hover:bg-destructive/90 transition-colors cursor-pointer"
          >
            خارج شو
          </button>
        </div>
      </div>
    </div>
  );
}
