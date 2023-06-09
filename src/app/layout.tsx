import './globals.css';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import Menu from '@pintu/technical-test/app/component/menu';
import ClientProvider from '@pintu/technical-test/app/client-provider';

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
        <link rel="preconnect" href="https://s3.ap-southeast-1.amazonaws.com" />
        <link rel="preconnect" href="https://s3-ap-southeast-1.amazonaws.com" />
        <link rel="icon" href="/icon.png" />
        <link
          href="https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro"
          rel="stylesheet"
        />
      </head>
      <body className={classNames(inter.className, 'bg-white')}>
        <div className="w-full xl:w-page m-auto overflow-x-hidden xl:overflow-x-visible">
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
