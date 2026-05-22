import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from "next-intl";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

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
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
