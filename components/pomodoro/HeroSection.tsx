import TimerCard from "./TimerCard";

export default function HeroSection() {
  return (
    <div>
      <section className="relative bg-linear-to-b from-muted/50 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--ring)/0.08),transparent_30%)]" />
        <div className="container relative mx-auto px-6 py-16 md:py-24">
          <div className="grid items-center gap-8 lg:gap-14 lg:grid-cols-2">
            <div className="space-y-5">
              <div className="space-y-4">
                <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  تمرکز عمیق
                  <span className="block text-primary">
                    با تکنیک پومودورو
                  </span>
                </h1>

                <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  پومودورو یک سیستم ساده ولی فوق‌العاده مؤثر برای مدیریت تمرکز،
                  کاهش اهمال‌کاری و حفظ انرژی ذهنیه.
                </p>
              </div>
            </div>
            <div className="relative flex justify-center">
              <TimerCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
