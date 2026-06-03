import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="text-8xl font-black text-primary/20 select-none">۴۰۴</div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">صفحه‌ای پیدا نشد</h1>
        <p className="text-muted-foreground text-sm">
          آدرسی که دنبالش بودی وجود نداره یا حذف شده.
        </p>
      </div>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        برگشت به خانه
      </Link>
    </main>
  );
}
