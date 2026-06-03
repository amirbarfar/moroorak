"use client";

import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PersianTimePicker } from "@/components/ui/persian-time-picker";
import { Task } from "./types";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingTask: Task | null;
  title: string;
  description: string;
  time: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onSave: () => void;
}

export default function TaskDialog({
  open,
  onOpenChange,
  editingTask,
  title,
  description,
  time,
  onTitleChange,
  onDescriptionChange,
  onTimeChange,
  onSave,
}: TaskDialogProps) {
  const t = useTranslations("planning.dialog");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-100 p-5">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-bold">
            {editingTask ? t("editTitle") : t("addTitle")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">{t("titleLabel")}</Label>
            <Input
              placeholder={t("titlePlaceholder")}
              className="h-9 rounded-lg text-sm"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">{t("descriptionLabel")}</Label>
            <Textarea
              placeholder={t("descriptionPlaceholder")}
              className="min-h-17.5 rounded-lg text-sm resize-none"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">{t("timeLabel")}</Label>
            <PersianTimePicker value={time || "09:00"} onChange={onTimeChange} />
          </div>

          <Button
            onClick={onSave}
            className="h-9 w-full rounded-lg text-sm font-medium mt-2"
          >
            {editingTask ? t("save") : t("add")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
