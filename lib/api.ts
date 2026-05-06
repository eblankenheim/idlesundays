import { Event } from "@/types";
import { events as staticEvents } from "@/data/eventData";

// This layer allows easy switching to API calls in the future
// For now, it returns static data

export async function fetchEvents(): Promise<Event[]> {
  // TODO: Replace with actual API call when backend is ready
  // return fetch('/api/events').then(r => r.json());
  return Promise.resolve(staticEvents);
}

export async function fetchEventById(id: string): Promise<Event | null> {
  // TODO: Replace with actual API call when backend is ready
  // return fetch(`/api/events/${id}`).then(r => r.json());
  const event = staticEvents.find((e) => e.id === id);
  return Promise.resolve(event || null);
}
