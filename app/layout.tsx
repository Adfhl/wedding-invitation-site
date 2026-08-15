import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "دعوة حفل ملكة فيصل وابتسام",
  description: "بكل الحب ندعوكم لمشاركتنا فرحة حفل ملكة فيصل وابتسام.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
