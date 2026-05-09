import Link from "next/link";
import { fetchEventById, fetchEvents } from "@/lib/api";
import { EventContent } from "./event-content";

export async function generateStaticParams() {
  const events = await fetchEvents();
  return events.map((event) => ({
    id: event.id,
  }));
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

  return <EventContent event={event} />;
}
