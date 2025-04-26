import React, { useEffect, useState } from "react";
import { App } from "@capacitor/app";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonSpinner,
} from "@ionic/react";

const API_KEY = "AIzaSyDLO-xevjfz6ORYRcnvVTT7NW04xF7b11M";
const CALENDAR_ID =
  "4f673ffcbbf337a3185b6a3c17005b392c53210b79cb8701ebde5822b9a9b870@group.calendar.google.com";

const PublicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
            description: event.description || "",
            location: event.location || "",
          }));

          setEvents(formatted);
        } catch (error) {
          console.error("Error loading calendar events", error);
        } finally {
          setLoading(false);
        }
      });
    };

    const interval = setInterval(() => {
      if (window.gapi) {
        clearInterval(interval);
        loadGapiAndFetchEvents();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSelectEvent = async (info) => {
    try {
      await App.openUrl({ url: info.event.extendedProps.url });
    } catch (error) {
      console.error("Failed to open event URL", error);
    }
  };

  // Get next 3 upcoming events
  const upcomingEvents = events
    .filter((e) => new Date(e.start) >= new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 3);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Idle Sundays Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <IonSpinner name="dots" />
          </div>
        ) : (
          <>
            <div style={{ height: "70vh", marginBottom: "2rem" }}>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleSelectEvent}
                headerToolbar={{
                  start: "prev,next today",
                  center: "title",
                  end: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                height="100%"
              />
            </div>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Upcoming Events</IonCardTitle>
              </IonCardHeader>
              {upcomingEvents.map((event) => (
                <IonCardContent key={event.id}>
                  <IonLabel>
                    <h2>{event.title}</h2>
                    <p>
                      {new Date(event.start).toLocaleDateString()} at{" "}
                      {new Date(event.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {event.location && <p>📍 {event.location}</p>}
                    {event.description && <p>{event.description}</p>}
                  </IonLabel>
                </IonCardContent>
              ))}
              {upcomingEvents.length === 0 && (
                <IonCardContent>
                  <IonLabel>No upcoming events.</IonLabel>
                </IonCardContent>
              )}
            </IonCard>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PublicCalendar;
