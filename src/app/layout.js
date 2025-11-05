import { LanguageProvider } from '@/contexts/LanguageContext';
import './globals.css';

// Add to layout.js - Missing critical meta tags
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}