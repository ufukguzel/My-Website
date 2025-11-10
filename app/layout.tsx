import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Suspense } from 'react';
import { LoadingProvider } from '@/components/loading-provider';
import { OkAsciiArt } from '@/components/ok-ascii-art';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PlayAIWidget } from '@/components/playai-widget';
import { GetMetada } from '@/lib/page-metadata';
import { MouseGradientBackground } from '@/components/mouse-gradient-background';
import { LanguageProvider } from '@/components/language-provider';
import { LanguageSelect } from '@/components/language-select';
// Removed next-seo usage; App Router metadata API is used instead

export const metadata = GetMetada('default');

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ufuk Güzel",
              "url": "https://ufukguzel.com.tr",
              "sameAs": [
                "https://www.linkedin.com/in/ufukguzel/",
                "https://github.com/ufukguzel"
              ],
              "jobTitle": "Software Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Valde"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
          <OkAsciiArt />
          <Suspense>
            <MouseGradientBackground />
          </Suspense>
          <Suspense>
            <LoadingProvider />
          </Suspense>
          <div className="flex min-h-screen">
            <Suspense>
              <Sidebar />
            </Suspense>
            <div className="flex-1 pl-0 md:pl-64">
              <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
                <div className="flex items-center justify-end gap-3 mb-16">
                  <LanguageSelect />
                  <ThemeToggle />
                </div>
                <main>{children}</main>
              </div>
            </div>
          </div>
          <PlayAIWidget />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
