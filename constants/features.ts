import { Clock, Calendar, Pencil, BookOpen, Bell } from "lucide-react";

import PomodoroMock from "@/components/home/mocks/PomodoroMock";
import PlanningMock from "@/components/home/mocks/PlanningMock";
import JournalMock from "@/components/home/mocks/JournalMock";
import LearningMock from "@/components/home/mocks/LearningMock";
import RemindersMock from "@/components/home/mocks/RemindersMock";

export const features = [
  {
    id: "pomodoro",
    href: "/pomodoro",
    icon: Clock,
    badge: "پومودورو",
    title: "تمرکز عمیق با پومودورو",
    description: "با تقسیم زمان به بازه‌های ۲۵ دقیقه‌ای، مغزت خسته نمی‌شه و تمرکزت در طول روز ثابت می‌مونه. یکی از ثابت‌شده‌ترین تکنیک‌های مدیریت وقت. تایمر اختصاصی، آمار جلسات متمرکز، و گزارش عملکرد روزانه بهت کمک می‌کنه عادت تمرکز عمیق رو توی زندگیت نهادینه کنی. هرچقدر بیشتر استفاده کنی، مغزت راحت‌تر وارد حالت فوکوس می‌شه.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    Mock: PomodoroMock,
  },
  {
    id: "planning",
    href: "/planning",
    icon: Calendar,
    badge: "برنامه‌ریزی",
    title: "تایم‌لاین روزانه‌ات رو بساز",
    description: "تسک‌هات رو با ساعت مشخص بچین، یکی یکی تیک بزن و پیشرفت روزانه‌ات رو ببین. هیچ کاری جا نمی‌مونه. می‌تونی اول صبح یا شب قبل، روزت رو نقشه بکشی. کشیدن و رها کردن تسک‌ها، تنظیم بازه زمانی و اولویت‌بندی، کارهای مهم رو از کم‌اهمیت جدا می‌کنه. در پایان روز می‌بینی چقدر از برنامه‌ات رو انجام دادی و حس رضایت از کنترل روی زمان رو تجربه می‌کنی.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    Mock: PlanningMock,
  },
  {
    id: "journal",
    href: "/journal",
    icon: Pencil,
    badge: "دفترچه",
    title: "هر روز بنویس، رشد کن",
    description: "نوشتن روزانه یکی از قوی‌ترین ابزارهای خودشناسیه. افکارت رو بریز روی کاغذ، احساساتت رو ثبت کن و با گذر زمان رشدت رو ببین. می‌تونی هر روز به چند سوال ساده پاسخ بدی: امروز چه چیزی خوب بود؟ چه چیزی می‌تونست بهتر باشه؟ بابت چه چیزی شکرگزارم؟ بعد از چند هفته به عقب برمی‌گردی و می‌بینی چه تغییر کردی، چه چیزهایی تکرار شدن و چطور داری بهتر می‌شوی.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    Mock: JournalMock,
  },
  {
    id: "learnings",
    href: "/learnings",
    icon: BookOpen,
    badge: "یادگیری",
    title: "آرشیو دانشت رو بساز",
    description: "هر چیزی که یاد می‌گیری — برنامه‌نویسی، طراحی، کتاب، ایده — ثبت کن. با گذر زمان می‌بینی چقدر رشد کردی. یه کتابخونه شخصی از تمام چیزهایی که یاد گرفتی بساز. می‌تونی برچسب بزنی، دسته‌بندی کنی، و سریع هر چیزی رو که قبلاً یاد گرفتی پیدا کنی. دیگه لازم نیست دوباره و سه بار یه چیز رو از اول یاد بگیری. هر ایده، هر نکته، هر یادداشت کوچیک، توی آرشیوت موندگار می‌شه.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    Mock: LearningMock,
  },
  {
    id: "reminders",
    href: "/reminders",
    icon: Bell,
    badge: "یادآور",
    title: "هیچ چیزی فراموش نشه",
    description: "یادآورهای شخصی بساز و یادگیری‌هات رو با الگوریتم هوشمند مرور کن. مغزت رو آزاد کن، بذار مرورک یادت بیاره. الگوریتم تکرار فاصله‌دار (Spaced Repetition) بهت کمک می‌کنه دقیقاً وقتی نزدیکه چیزی رو فراموش کنی، یادآوری بشی. برای درس خوندن، حفظ لغات جدید، مرور نکات مهم شغلی یا هر چیز دیگه‌ای که نباید از یادت بره. کافیه یه بار ثبت کنی، سیستم خودش یادت میاره کی باید برگردی و مرور کنی.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    Mock: RemindersMock,
  },
];