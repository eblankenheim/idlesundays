import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const API_KEY = "AIzaSyDLO-xevjfz6ORYRcnvVTT7NW04xF7b11M";
const CALENDAR_ID =
  "4f673ffcbbf337a3185b6a3c17005b392c53210b79cb8701ebde5822b9a9b870@group.calendar.google.com";
const localizer = momentLocalizer(moment);

const PublicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const loadGapiAndFetchEvents = () => {
      if (!window.gapi) {
        console.error("GAPI not loaded");
        return;
      }

      window.gapi.load("client", async () => {
        try {
          await window.gapi.client.init({
            apiKey: API_KEY,
          });

          const response = await window.gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
              CALENDAR_ID
            )}/events`,
            params: {
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              orderBy: "startTime",
              maxResults: 20,
            },
          });

          const items = response.result.items || [];
          const formatted = items.map((event) => ({
            id: event.id,
            title: event.summary,
            start: new Date(event.start.dateTime || event.start.date),
            end: new Date(event.end.dateTime || event.end.date),
            url: event.htmlLink,
          }));

          setEvents(formatted);
        } catch (error) {
          console.error("Error loading calendar events", error);
        }
      });
    };

    // wait a moment for gapi to be available
    const interval = setInterval(() => {
      if (window.gapi) {
        clearInterval(interval);
        loadGapiAndFetchEvents();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSelectEvent = (event) => {
    window.open(event.url, "_blank");
  };

  return (
    <div style={{ height: 600 }}>
      <h2>Upcoming Events</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={setView}
        views={["month", "week", "day"]}
        date={date}
        onNavigate={setDate}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default PublicCalendar;
