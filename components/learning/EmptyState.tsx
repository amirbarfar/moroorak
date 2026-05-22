import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  hasItems: boolean;
}

export default function EmptyState({ hasItems }: EmptyStateProps) {
  const t = useTranslations("learning.empty");

  return (
    <Card className="rounded-[28px] border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-5 rounded-full bg-muted p-5">
          <BookOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-black">
          {!hasItems ? t("nothing") : t("noResults")}
        </h3>
        <p className="mt-3 max-w-md leading-8 text-muted-foreground">
          {!hasItems ? t("addFirst") : t("changeFilter")}
        </p>
      </CardContent>
    </Card>
  );
}