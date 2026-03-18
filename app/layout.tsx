import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/base';
import { NextProvider } from 'fumadocs-core/framework/next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | AmethystLabs Docs',
    default: 'AmethystLabs Docs',
  },
  description: 'AmethystLabs 官方文档站点',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body>
        <NextProvider>
          <RootProvider>{children}</RootProvider>
        </NextProvider>
      </body>
    </html>
  );
}
