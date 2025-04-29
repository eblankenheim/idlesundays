import { useState, useEffect } from "react";
import { events } from "../data/eventData"; // Notice: events is now a named import

export const useCalendarEvents = () => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from the JS file
    setTimeout(() => {
      setEventList(events); // Use the imported events array
      setLoading(false);
    }, 1000); // Simulating a delay for loading
  }, []);

  return { events: eventList, loading };
};
