import type { Metadata } from "next";
import Link from "next/link";
import { fetchEventById, fetchEvents } from "@/lib/api";
import type { Event } from "@/types";
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  toMetaDescription,
} from "@/lib/seo";
import { EventContent } from "./event-content";

export async function generateStaticParams() {
  const events = await fetchEvents();
  return events.map((event) => ({
    id: event.id,
  }));
}

/** Falls back to the location when an event has no description written yet. */
function describeEvent(event: Event): string {
  const written = event.description.trim();
  const isPlaceholder = /^description\s+(pending|comming|coming)/i.test(written);

  if (written && !isPlaceholder) return toMetaDescription(written);

  return toMetaDescription(
    `Join ${SITE_NAME} for a scenic backroads cruise meeting at ${event.location}. Cars and bikes welcome.`
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await fetchEventById(id);

  if (!event) {
    return {
      title: "Event Not Found",
      robots: { index: false, follow: true },
    };
  }

  const description = describeEvent(event);
  const url = absoluteUrl(`/events/${event.id}`);

  return {
    title: event.title,
    description,
    alternates: { canonical: `/events/${event.id}` },
    openGraph: {
      type: "article",
      title: `${event.title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: event.locationImageUrl, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | ${SITE_NAME}`,
      description,
      images: [event.locationImageUrl],
    },
  };
}

/**
 * schema.org/Event markup — this is what makes a cruise eligible for Google's
 * event rich results and the events carousel.
 */
function eventSchema(event: Event) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: describeEvent(event),
    startDate: event.start,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: absoluteUrl(`/events/${event.id}`),
    image: [`${SITE_URL}${event.locationImageUrl}`],
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressRegion: "WI",
        addressCountry: "US",
      },
      hasMap: event.url,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    isAccessibleForFree: true,
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchEventById(id);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-6">This event does not exist</p>
          <Link
            href="/calendar"
            className="inline-block px-6 py-3 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300">
            Back to Calendar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(event)) }}
      />
      <EventContent event={event} />
    </>
  );
}
