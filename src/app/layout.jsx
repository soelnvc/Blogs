import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import ScrollWrapper from '../components/ScrollWrapper';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'SIDDHESH GOEL // Curated Archive & Systems Engineering',
  description: 'Personal blog and digital garden of Siddhesh Goel exploring systems, software architectures, and brutalist digital aesthetics.',
  keywords: ['Software Architecture', 'AI Agents', 'Swiss Design', 'Engineering', 'Blog'],
  authors: [{ name: 'Siddhesh Goel' }],
  openGraph: {
    title: 'SIDDHESH GOEL // Curated Archive & Systems Engineering',
    description: 'Personal blog and digital garden exploring systems, software architectures, and brutalist digital aesthetics.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <ThemeProvider>
          {/* Fixed 15px Left & Right Black Sidebars */}
          <div className="site-frame-left" />
          <div className="site-frame-right" />

          {/* Outer Canvas & Page Sheet Frame */}
          <div className="site-canvas">
            <div className="site-sheet">
              <ScrollWrapper>
                <Navbar />
                {children}
              </ScrollWrapper>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
