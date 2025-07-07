import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToasterProvider } from "@/providers/toast-provider";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "EduPlan AI - Learning Dashboard",
  description: "Personalized learning plans and daily study recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className="font-sans">
          <ToasterProvider />
          <Navbar />
          <div className="relative">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
