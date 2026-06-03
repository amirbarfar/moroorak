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
    const promises = subscriptions.map((sub) => {
      return webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth      
          }
        }, 
        stringifiedPayload
      ).catch(async (err) => {
        if (err.statusCode === 404 || err.statusCode === 410) {
          await prisma.pushSubscription.delete({ 
            where: { id: sub.id } 
          });
        } else {
          console.error(`خطای ارسال به دستگاه ${sub.id}:`, err);
        }
      });
    });
    await Promise.all(promises);
    return { success: true };
 
  } catch (error) {
    console.error('خطا در ارسال نوتیفیکیشن:', error);
    return { success: false, error };
  }
}