import { LanguageProvider } from '@/contexts/LanguageContext';
import './globals.css';

export const metadata = {
  title: 'Ten Percent Academy - Master Trading',
  description: 'Join the elite 10% of traders through proven education and expert mentorship',
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