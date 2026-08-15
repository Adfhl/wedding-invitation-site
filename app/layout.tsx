import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "دعوة زفاف عمر وعبير",
  description: "بكل الحب ندعوكم لمشاركتنا ليلة العمر والفرح.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
