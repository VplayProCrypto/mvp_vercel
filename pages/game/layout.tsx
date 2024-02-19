import '../../app/globals.css';
import { Suspense } from 'react';
import Nav from '../../app/nav';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <Nav />
      </Suspense>
      {children}
    </div>
  );
}
