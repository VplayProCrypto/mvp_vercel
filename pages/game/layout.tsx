import '../../app/globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from '../../app/nav';
import { Suspense } from 'react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
