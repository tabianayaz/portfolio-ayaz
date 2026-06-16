import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from './context/AppContext';
import SmoothScroll from './components/SmoothScroll';
import ThreeBackground from './components/ThreeBackground';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'アヤズ タビアン イスラム | Portfolio',
  description: '文教大学情報学部情報システム学科のソフトウェアエンジニア学生、アヤズ タビアン イスラムのポートフォリオサイトです。Unityゲーム開発、Androidアプリ、AI画像認識、Next.js Webアプリケーションの制作実績を掲載しています。',
  keywords: [
    'アヤズタビアンイスラム', 'Ayaz Tabian Islam', 'ポートフォリオ', 
    'ソフトウェアエンジニア', 'Unity', 'Android', 'Web開発', 'AI', '文教大学'
  ],
  authors: [{ name: 'Ayaz Tabian Islam' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="ja" 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col antialiased selection:bg-primary/30 selection:text-white">
        <AppProvider>
          <ThreeBackground />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </AppProvider>
      </body>
    </html>
  );
}
