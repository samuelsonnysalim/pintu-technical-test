import './globals.css';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import Menu from './component/menu';
import ClientProvider from './client-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pintu Technical Test',
  description:
    'This is an assignment for Pintu, created by Samuel Sonny Salim.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro"
          rel="stylesheet"
        />
      </head>
      <body className={classNames(inter.className, 'bg-white')}>
        <div className="w-page m-auto">
          <header className="py-8 px-6 mb-4">
            <a href="/" className="block w-[75px] h-4 bg-logo float-left" />
            <Menu />
          </header>
          <main className="pt-4 px-4 pb-10">
            <ClientProvider>{children}</ClientProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
