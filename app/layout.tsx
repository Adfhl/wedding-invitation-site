import type { Metadata } from "next";
import "./globals.css";
import "./redesign.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding-invitation-site-phi.vercel.app"),
  title: "دعوة حفل ملكة فيصل وابتسام",
  description: "بكل الحب ندعوكم لمشاركتنا فرحة حفل ملكة فيصل وابتسام.",
  openGraph: {
    title: "دعوة حفل ملكة فيصل وابتسام",
    description: "بكل الحب ندعوكم لمشاركتنا فرحة حفل ملكة فيصل وابتسام.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "دعوة حفل ملكة فيصل وابتسام",
    description: "بكل الحب ندعوكم لمشاركتنا فرحة حفل ملكة فيصل وابتسام.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
