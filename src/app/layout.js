import { LanguageProvider } from '@/contexts/LanguageContext';
import './globals.css';

export const metadata = {
  title: 'Ten Percent Academy - Master Trading | Join Elite 10%',
  description: 'Transform from beginner to elite trader. Live sessions, group coaching, proven strategies. 90% success rate. Join 500+ successful traders.',
  keywords: 'trading academy, forex trading, stock trading, trading education, trading signals',
  openGraph: {
    title: 'Ten Percent Academy - Master Trading',
    description: 'Join the elite 10% of profitable traders',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  // CRITICAL: Add viewport meta for proper mobile rendering
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Additional mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className="overflow-x-hidden">
        <LanguageProvider>
          <div className="overflow-x-hidden w-full">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}