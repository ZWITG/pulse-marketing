import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Pulse — Marketing Dashboard",
  description: "Automate and manage all your social media marketing in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="antialiased" style={{ background: "var(--ground)", color: "var(--text)", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="min-w-0 flex-1 overflow-x-hidden max-md:pt-12">{children}</main>
        </div>
      </body>
    </html>
  );
}
