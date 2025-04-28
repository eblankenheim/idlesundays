import React from "react";
import { useHistory } from "react-router-dom";
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
import { useCalendarEvents } from "../utils/useCalendarEvents"; // Import the useCalendarEvents hook

const PublicCalendar = () => {
  const { events, loading } = useCalendarEvents();
  const isMobile = window.innerWidth < 600;
  const history = useHistory();

  const handleSelectEvent = (info) => {
    const eventId = info.event.id;
    history.push(`/event/${eventId}`);
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
                  start: isMobile ? "prev today next" : "prev,next today",
                  center: "title",
                  end: isMobile ? "" : "dayGridMonth,dayGridWeek,dayGridDay",
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
