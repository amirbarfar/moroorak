import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <div className="space-y-6">
      <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs">
        مدیریت وقت
      </Badge>
      <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
        برنامه‌ریزی
        <span className="block text-primary">روزانه</span>
      </h1>
      <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
        تسک‌هات رو مدیریت کن، وقتت رو تقسیم کن و با یک تایم‌لاین حرفه‌ای روزت رو بساز.
      </p>
    </div>
  );
}
