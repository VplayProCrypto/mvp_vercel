import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';

export const metadata = {
  title: 'VPLAY',
  description: 'VPLAY'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense></Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
