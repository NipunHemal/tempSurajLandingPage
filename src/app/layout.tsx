import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', preload: false });

export const metadata: Metadata = {
  title: 'Suraj S Kumara | ICT Academy',
  description: 'Premium ICT Learning Platform for A/L and O/L students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            forcedTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
