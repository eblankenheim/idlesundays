import type { Metadata } from "next";
import Header from "@/components/Header";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SOCIAL_LINKS,
  absoluteUrl,
} from "@/lib/seo";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Car Meet Events & Scenic Cruises in Wisconsin`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "IdleSundays",
    "Idle Sundays",
    "Wisconsin car meet",
    "Wisconsin car club",
    "car meet near me",
    "scenic cruise Wisconsin",
    "Oconomowoc car meet",
    "backroads cruise",
    "motorcycle ride Wisconsin",
    "automotive community",
  ],
  authors: [{ name: "Evan Blankenheim" }],
  creator: "Evan Blankenheim",
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  category: "Automotive",

  // Open Graph for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    title: `${SITE_NAME} - Car Meet Events & Scenic Cruises`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/logo_640.png",
        width: 640,
        height: 640,
        alt: `${SITE_NAME} Logo`,
        type: "image/png",
      },
      {
        url: "/images/logo_512.png",
        width: 512,
        height: 512,
        alt: `${SITE_NAME} Logo`,
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Car Meet Events & Scenic Cruises`,
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Tells Google who the site belongs to and ties it to the social profiles, so
// the Facebook/Instagram pages are recognised as the same entity.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Idle Sundays",
  url: absoluteUrl("/"),
  logo: `${SITE_URL}/images/logo_640.png`,
  image: `${SITE_URL}/images/logo_640.png`,
  description: SITE_DESCRIPTION,
  founder: { "@type": "Person", name: "Evan Blankenheim" },
  areaServed: {
    "@type": "State",
    name: "Wisconsin",
  },
  sameAs: SOCIAL_LINKS,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: absoluteUrl("/"),
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-primary text-gray-400 py-2 mt-12">
          <div className="text-xs max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>Evan Blankenheim</p>
            <p>&copy; 2026 {SITE_NAME}. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
