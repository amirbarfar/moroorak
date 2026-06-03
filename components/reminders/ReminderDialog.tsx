"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PersianTimePicker } from "@/components/ui/persian-time-picker";
import { RepeatType, Priority, PRIORITY_STYLES } from "./types";

export interface ReminderForm {
  title: string;
  note: string;
  time: string;
  repeat: RepeatType;
  priority: Priority;
}

interface ReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingReminder: boolean;
  form: ReminderForm;
  onChange: <K extends keyof ReminderForm>(key: K, value: ReminderForm[K]) => void;
  onSave: () => void;
}

export default function ReminderDialog({ open, onOpenChange, editingReminder, form, onChange, onSave }: ReminderDialogProps) {
  const t = useTranslations("reminders.dialog");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[28px] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            {editingReminder ? t("editTitle") : t("addTitle")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <Input
            placeholder={t("titlePlaceholder")}
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
            className="h-12 rounded-2xl"
            autoFocus
          />

          <Textarea
            placeholder={t("notePlaceholder")}
            value={form.note}
            onChange={(e) => onChange("note", e.target.value)}
            className="min-h-24 rounded-2xl resize-none"
          />

          <div className="space-y-2">
            <Label className="text-sm font-medium">{t("timeLabel")}</Label>
            <PersianTimePicker value={form.time} onChange={(v) => onChange("time", v)} />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{t("repeatLabel")}</Label>
            <div className="flex gap-2">
              {(["روزانه", "یکبار"] as RepeatType[]).map((r) => (
                <button
                  key={r}
                  onClick={() => onChange("repeat", r)}
                  className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all ${
                    form.repeat === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{t("priorityLabel")}</Label>
            <div className="flex gap-2">
              {(["high", "medium", "low"] as Priority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => onChange("priority", p)}
                  className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all ${
                    form.priority === p ? `${PRIORITY_STYLES[p].badge} ring-2 ring-current/30` : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {PRIORITY_STYLES[p].label}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={onSave} className="h-12 w-full rounded-2xl font-bold">
            {editingReminder ? t("save") : t("add")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
