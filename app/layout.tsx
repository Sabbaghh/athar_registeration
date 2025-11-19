import type { Metadata } from 'next';
import './globals.css';

import { Cairo } from 'next/font/google';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });
export const metadata: Metadata = {
  title: 'Athar - Shaping tommorrow',
  description: 'Register',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.className} antialiased`}>{children}</body>
    </html>
  );
}
