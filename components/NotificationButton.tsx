'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Bell, BellOff, Check } from 'lucide-react';
import { api } from "@/lib/api";
import toast from "react-hot-toast";

type Status = 'checking' | 'idle' | 'subscribing' | 'unsubscribing' | 'done';

export default function NotificationButton() {
  const t = useTranslations('notifications');
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    async function checkSubscription() {
      if (!('serviceWorker' in navigator && 'PushManager' in window)) {
        setStatus('idle');
        return;
      }
      try {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.getSubscription();
        setStatus(sub ? 'done' : 'idle');
      } catch {
        setStatus('idle');
      }
    }
    checkSubscription();
  }, []);

  async function subscribeUser() {
    if (!('serviceWorker' in navigator && 'PushManager' in window)) {
      toast.error(t('notSupported'));
      return;
    }

    setStatus('subscribing');
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        toast.error(t('permissionDenied'));
        setStatus('idle');
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      await api('/api/save-subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
      });

      setStatus('done');
      toast.success(t('activated'));
    } catch {
      toast.error(t('error'));
      setStatus('idle');
    }
  }

  async function unsubscribeUser() {
    setStatus('unsubscribing');
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      if (sub) {
        await api('/api/save-subscription', {
          method: 'DELETE',
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setStatus('idle');
      toast.success('اعلان‌ها غیرفعال شدن');
    } catch {
      toast.error(t('error'));
      setStatus('done');
    }
  }

  if (status === 'checking') return null;

  const isLoading = status === 'subscribing' || status === 'unsubscribing';

  return (
    <button
      onClick={status === 'done' ? unsubscribeUser : subscribeUser}
      disabled={isLoading}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
        ${status === 'done'
          ? 'bg-primary/10 text-primary hover:bg-destructive/10 hover:text-destructive'
          : 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-sm hover:shadow-md'
        }
        disabled:opacity-70`}
    >
      <span className={`flex items-center justify-center w-8 h-8 rounded-lg
        ${status === 'done' ? 'bg-primary/15' : 'bg-white/15'}`}>
        {status === 'done'
          ? <Check className="w-4 h-4" />
          : <Bell className={`w-4 h-4 ${isLoading ? 'animate-pulse' : ''}`} />
        }
      </span>
      <span className="flex-1 text-right">
        {status === 'done'
          ? t('active')
          : status === 'subscribing'
            ? t('activating')
            : t('activate')
        }
      </span>
      {status === 'idle' && <BellOff className="w-4 h-4 opacity-60" />}
    </button>
  );
}
