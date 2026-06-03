import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const subscription = await request.json();

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        { error: 'اطلاعات اشتراک ناقص است.' },
        { status: 400 }
      );
    }

    const userId = await getUserId();

    const savedSub = await prisma.pushSubscription.upsert({
      where: {
        endpoint: subscription.endpoint,
      },
      update: {
        userId: userId || null,
      },
      create: {
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        userId: userId || null,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'اشتراک با موفقیت ثبت شد.' 
    });

  } catch (error) {
    console.error('خطا در کار با پریسما:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}