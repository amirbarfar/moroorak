import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function EmptyState() {
  return (
    <Card className="rounded-[32px] border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-5 rounded-full bg-muted p-5">
          <Calendar className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-black">هنوز برنامه‌ای نداری</h3>
        <p className="mt-3 max-w-md leading-8 text-muted-foreground">
          اولین برنامه روزت رو اضافه کن و تایم‌لاین شخصی خودت رو بساز.
        </p>
      </CardContent>
    </Card>
  );
}