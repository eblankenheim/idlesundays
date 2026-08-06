import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

const title = "Instagram";
const description =
  "Follow @idlesundays.wi for photos, reels, and route recaps from every IdleSundays backroads cruise in Wisconsin.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/instagram" },
  openGraph: {
    type: "website",
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/instagram"),
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default function InstagramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
