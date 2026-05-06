"use client";

import { useState, useEffect } from "react";
import { events } from "@/data/eventData";
import { Event } from "@/types";

export const useCalendarEvents = () => {
  const [eventList, setEventList] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from the data file
    setTimeout(() => {
      setEventList(events);
      setLoading(false);
    }, 500);
  }, []);

  return { events: eventList, loading };
};
