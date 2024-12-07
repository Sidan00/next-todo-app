import Header from './components/layout/Header';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="pl-4 sm:pl-6 lg:pl-[10%] xl:pl-[15%] pr-4 sm:pr-6 lg:pr-[10%] xl:pr-[15%]">
          {children}
        </main>
      </body>
    </html>
  );
}