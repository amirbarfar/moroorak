import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from "next-intl";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import ServiceWorker from "@/components/ServiceWorker";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "مروارک",
  description: "اپ بهره‌وری شخصی",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "مروارک",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className="scroll-smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
          <Sidebar />
          <Toaster position="top-left" reverseOrder={false} />
          <ServiceWorker />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
