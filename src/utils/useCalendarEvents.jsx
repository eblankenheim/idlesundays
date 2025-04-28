import { useState, useEffect } from "react";
import eventsData from "../data/eventData.json"; // Assuming events.json is in the same directory

export const useCalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from the JSON file
    setTimeout(() => {
      setEvents(eventsData);
      setLoading(false);
    }, 1000); // Simulating a delay for loading
  }, []);

  return { events, loading };
};
