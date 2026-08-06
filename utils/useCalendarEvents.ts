"use client";

import { events } from "@/data/eventData";
import { Event } from "@/types";

/**
 * Events live in a static data file that is bundled at build time, so they are
 * already available on the very first render. Returning them synchronously lets
 * the calendar prerender its real content into the exported HTML — search
 * crawlers index that HTML, and previously they only ever saw a loading spinner.
 *
 * The `{ events, loading }` shape is kept so this can be swapped for a real
 * fetch later (see the TODOs in lib/api.ts) without touching the calendar.
 */
export const useCalendarEvents = (): { events: Event[]; loading: boolean } => {
  return { events, loading: false };
};
