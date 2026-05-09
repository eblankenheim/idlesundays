import type { Metadata } from "next";
import Header from "@/components/Header";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Idle Sundays - Car Meet Events",
  description: "Join us for scenic cruises and car meet-ups in Wisconsin",
  keywords: "cars, events, cruises, meet-up, Wisconsin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-primary text-gray-400 py-2 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>Evan Blankenheim</p>
            <p>&copy; 2026 Idle Sundays. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
