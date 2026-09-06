import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'LBProduction - Sự kiện & Media',
  description:
    'LBProduction cung cấp dịch vụ media, 3D visual và tổ chức sự kiện chuyên nghiệp.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
