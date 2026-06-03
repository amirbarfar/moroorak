import cron, { ScheduledTask } from 'node-cron';
import { prisma } from './prisma';
import { sendNotificationToUser } from './sendPush';

const TZ = 'Asia/Tehran';

const g = global as typeof globalThis & { _cronTasks?: ScheduledTask[] };
if (g._cronTasks) {
  g._cronTasks.forEach((t) => t.stop());
}
g._cronTasks = [];

function nowHHMM(): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

function today(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ──── یادآورها — هر دقیقه ────────────────────────────────────────────────────
g._cronTasks.push(cron.schedule('* * * * *', async () => {
  const time = nowHHMM();
  const date = today();

  const reminders = await prisma.reminder.findMany({
    where: {
      enabled: true,
      time,
      OR: [
        { lastNotifiedDate: null },
        { NOT: { lastNotifiedDate: date } },
      ],
    },
  });

  const intros = [
    'میدونستی که',
    'یادته باید',
    'وقتشه برای',
    'فراموش نکن:',
  ];

  for (const r of reminders) {
    if (!r.userId) continue;

    await sendNotificationToUser(r.userId, {
      title: '⏰ یادآور',
      body: `${pickRandom(intros)} "${r.title}" ؟ 💪`,
      url: '/reminders',
    });

    await prisma.reminder.update({
      where: { id: r.id },
      data: {
        lastNotifiedDate: date,
        ...(r.repeat === 'یکبار' ? { enabled: false } : {}),
      },
    });
  }
}));

// ──── برنامه‌ریزی — هر دقیقه ─────────────────────────────────────────────────
g._cronTasks.push(cron.schedule('* * * * *', async () => {
  const time = nowHHMM();
  const date = today();

  const tasks = await prisma.task.findMany({
    where: { date, time, completed: false },
  });

  const phrases = [
    'وقتشه که انجامش بدی',
    'بزن بریم سراغش',
    'منتظرته',
    'برنامه‌ات میگه الان نوبتشه',
  ];

  for (const t of tasks) {
    await sendNotificationToUser(t.userId, {
      title: '📋 وقت برنامه‌ریزی!',
      body: `"${t.title}" — ${pickRandom(phrases)} 🎯`,
      url: '/planning',
    });
  }
}));

// ──── روزمره — هر شب ساعت ۲۱ ────────────────────────────────────────────────
g._cronTasks.push(cron.schedule('0 21 * * *', async () => {
  const date = today();

  const subs = await prisma.pushSubscription.findMany({
    where: { userId: { not: null } },
    select: { userId: true },
    distinct: ['userId'],
  });

  const messages = [
    'امروز هنوز ننوشتی! چند خط از روزت بنویس 🌙',
    'روزت چطور بود؟ بیا یه یادداشت کوچیک بنویس ✍️',
    'قبل از خواب، یه چیزی بنویس که فراموش نشه 📝',
  ];

  for (const { userId } of subs) {
    if (!userId) continue;
    const entry = await prisma.journalEntry.findUnique({
      where: { userId_date: { userId, date } },
    });
    if (!entry) {
      await sendNotificationToUser(userId, {
        title: '📝 روزمره',
        body: pickRandom(messages),
        url: '/journal',
      });
    }
  }
}, { timezone: TZ }));

// ──── یادگیری — هر صبح ساعت ۹ ───────────────────────────────────────────────
g._cronTasks.push(cron.schedule('0 12 * * *', async () => {
  const subs = await prisma.pushSubscription.findMany({
    where: { userId: { not: null } },
    select: { userId: true },
    distinct: ['userId'],
  });

  const prefixes = [
    'میدونستی که',
    'یادته یاد گرفتی',
    'امروز مرورش کن:',
    'یه قدم جلوتری با',
    'نکته طلایی:',
  ];

  for (const { userId } of subs) {
    if (!userId) continue;
    const count = await prisma.learningItem.count({ where: { userId } });
    if (count === 0) continue;

    const item = await prisma.learningItem.findFirst({
      where: { userId },
      skip: Math.floor(Math.random() * count),
    });
    if (!item) continue;

    await sendNotificationToUser(userId, {
      title: '🧠 یادگیری روزانه',
      body: `${pickRandom(prefixes)} "${item.title}" 💡`,
      url: '/learnings',
    });
  }
}, { timezone: TZ }));
