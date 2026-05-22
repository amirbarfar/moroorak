import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { LearningItem } from "./types";
import LearningCard from "./LearningCard";

interface LearningListProps {
  learnings: LearningItem[];
}

export default function LearningList({ learnings }: LearningListProps) {
  if (learnings.length === 0) {
    return (
      <Card className="rounded-[28px] border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-5 rounded-full bg-muted p-5">
            <BrainCircuit className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-black">هنوز یادگیری‌ای ثبت نکردی</h3>
          <p className="mt-3 max-w-md leading-8 text-muted-foreground">
            از بخش یادگیری‌ها چیزی ثبت کن تا اینجا نمایش داده بشه.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {learnings.map((item, index) => (
        <LearningCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}