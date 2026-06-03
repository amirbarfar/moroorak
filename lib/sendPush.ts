import webpush from 'web-push';
import { prisma } from './prisma';

webpush.setVapidDetails(
  'mailto:moroorak@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

interface NotificationPayload {
  title: string;
  body: string;
  url: string;
}

export async function sendNotificationToUser(userId: string, payload: NotificationPayload) {
  try {
    const subscriptions = await prisma.pushSubscription.findMany({ 
      where: { userId } 
    });

    const stringifiedPayload = JSON.stringify(payload);
    const results = await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
            stringifiedPayload
          );
          return true;
        } catch (err: any) {
          if (err.statusCode === 404 || err.statusCode === 410) {
            await prisma.pushSubscription.delete({ where: { id: sub.id } });
          } else {
            console.error(`خطای ارسال push [${sub.id}]: statusCode=${err.statusCode} body=${err.body} endpoint=${sub.endpoint}`);
          }
          return false;
        }
      })
    );

    const ok = results.filter(Boolean).length;
    console.log(`push: ${ok}/${results.length} ارسال شد`);
    return { success: ok > 0 };
 
  } catch (error) {
    console.error('خطا در ارسال نوتیفیکیشن:', error);
    return { success: false, error };
  }
}