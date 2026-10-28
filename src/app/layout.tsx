import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const notoSans = localFont({
  variable: "--font-noto-sans",
  src: [
    {
      path: "./fonts/NotoSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NotoSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/NotoSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Testimonial Card",
  description: "A responsive testimonial card component.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased ${notoSans.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
