import './globals.css';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import Menu from './menu';

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
      <body className={classNames(inter.className, 'bg-white')}>
        <div className="w-page m-auto">
          <header className="py-8 px-6">
            <a href="/" className="block w-[75px] h-4 bg-logo float-left" />
            <Menu />
          </header>
          <main className="pt-4 px-4 pb-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
