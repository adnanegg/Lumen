import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Book an Appointment — Lumen',
  description: 'Easily book appointments and manage your reservations with Lumen.',
};

const fontUrl =
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontUrl} rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
