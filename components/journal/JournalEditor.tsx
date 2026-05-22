"use client";

import { Save, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface JournalEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSave: () => void;
  onDelete?: () => void;
  hasEntry: boolean;
  saving?: boolean;
  loading?: boolean;
}

export default function JournalEditor({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSave,
  onDelete,
  hasEntry,
  saving = false,
  loading = false,
}: JournalEditorProps) {
  const t = useTranslations("journal.editor");
  return (
    <Card className="w-full max-w-md rounded-[32px] border-border/60 bg-background/90 shadow-2xl backdrop-blur-xl">
      <CardContent className="space-y-5 p-5 sm:space-y-6 sm:p-8">
        <div className="space-y-2">
          <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs">
            {hasEntry ? t("editEntry") : t("newEntry")}
          </Badge>

          <input
            type="text"
            placeholder={t("titlePlaceholder")}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-xl font-bold tracking-tight placeholder:text-muted-foreground/40 text-foreground"
          />
        </div>

        <div className="h-px bg-border" />

        <textarea
          placeholder={t("contentPlaceholder")}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full min-h-80 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none text-sm text-foreground placeholder:text-muted-foreground/40 leading-8"
        />

        <div className="flex gap-3 pt-2">
          <Button
            onClick={onSave}
            disabled={saving || loading}
            className="h-11 flex-1 rounded-2xl text-sm font-bold"
          >
            <Save className="h-4 w-4 ml-2" />
            {saving ? t("saving") : hasEntry ? t("update") : t("save")}
          </Button>

          {hasEntry && onDelete && (
            <Button
              onClick={onDelete}
              disabled={saving || loading}
              variant="secondary"
              className="h-11 rounded-2xl text-sm font-bold"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
