import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

const title = "Facebook Community";
const description =
  "Join the IdleSundays Facebook group for event announcements, route details, and photos from every Wisconsin cruise.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/facebook" },
  openGraph: {
    type: "website",
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/facebook"),
    siteName: SITE_NAME,
    images: [{ url: "/images/fb_banner.png", alt: `${SITE_NAME} on Facebook` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
    images: ["/images/fb_banner.png"],
  },
};

export default function FacebookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
