import type { Metadata } from "next";
import Header from "@/components/Header";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Idle Sundays - Car Meet Events & Scenic Cruises in Wisconsin",
  description:
    "Join Idle Sundays for scenic backroads cruises and car meet-ups through Wisconsin. Connect with automotive enthusiasts and enjoy thrilling community-driven events.",
  keywords:
    "cars, events, cruises, meet-up, Wisconsin, car meet, automotive community",
  authors: [{ name: "Evan Blankenheim" }],
  creator: "Evan Blankenheim",
  metadataBase: new URL("https://idlesundays.com"),

  // Open Graph for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://idlesundays.com",
    title: "Idle Sundays - Car Meet Events & Scenic Cruises",
    description:
      "Join us for scenic backroads cruises through Wisconsin with a community of car enthusiasts.",
    siteName: "Idle Sundays",
    images: [
      {
        url: "/images/logo_640.png",
        width: 640,
        height: 640,
        alt: "Idle Sundays Logo",
        type: "image/png",
      },
      {
        url: "/images/logo_512.png",
        width: 512,
        height: 512,
        alt: "Idle Sundays Logo",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Idle Sundays - Car Meet Events & Scenic Cruises",
    description: "Join us for scenic backroads cruises through Wisconsin.",
    images: ["/images/logo_512.png"],
  },

  // Favicon and icons
  icons: {
    icon: "/images/logo.ico",
    apple: "/images/logo_192.png",
  },

  // Web App Manifest
  manifest: "/manifest.json",

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },

  // Verification
  verification: {
    google: "your-google-site-verification", // Replace with your verification code
  },
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
          <div className="text-xs max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>Evan Blankenheim</p>
            <p>&copy; 2026 Idle Sundays. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
