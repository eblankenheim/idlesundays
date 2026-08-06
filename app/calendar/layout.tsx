import type { Metadata } from "next";
import { fetchEvents } from "@/lib/api";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

const title = "Event Calendar";
const description =
  "Upcoming IdleSundays car meets and scenic backroads cruises across Wisconsin. Browse dates, meet-up spots, and route details for every ride.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/calendar" },
  openGraph: {
    type: "website",
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/calendar"),
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default async function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const events = await fetchEvents();

  // Lets Google see the full event list from the calendar page itself, not
  // just from each individual event page.
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Events`,
    itemListElement: events.map((event, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: absoluteUrl(`/events/${event.id}`),
      name: event.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      {children}
    </>
  );
}
