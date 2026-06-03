import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ALL_TAGS, LearningItem, Tag } from "./types";

interface LearningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: LearningItem | null;
  title: string;
  description: string;
  tag: Tag;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTagChange: (tag: Tag) => void;
  onSave: () => void;
  isLoading?: boolean;
}

export default function LearningDialog({
  open,
  onOpenChange,
  editingItem,
  title,
  description,
  tag,
  onTitleChange,
  onDescriptionChange,
  onTagChange,
  onSave,
  isLoading = false,
}: LearningDialogProps) {
  const t = useTranslations("learning.dialog");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[28px] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            {editingItem ? t("editTitle") : t("addTitle")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <Input
            placeholder={t("titlePlaceholder")}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="h-12 rounded-2xl"
            autoFocus
          />

          <Textarea
            placeholder={t("descriptionPlaceholder")}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="min-h-28 rounded-2xl resize-none"
          />

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{t("category")}</p>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tagItem) => (
                <button
                  key={tagItem}
                  onClick={() => onTagChange(tagItem)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    tag === tagItem
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tagItem}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={onSave} disabled={isLoading} className="h-12 w-full rounded-2xl font-bold">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : editingItem ? t("save") : t("add")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}