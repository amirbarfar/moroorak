import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <Card className="rounded-[28px] border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-5 rounded-full bg-muted p-5">
          {icon}
        </div>
        <h3 className="text-2xl font-black">{title}</h3>
        <p className="mt-3 max-w-md leading-8 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}