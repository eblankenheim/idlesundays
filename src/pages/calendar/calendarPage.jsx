import React, { useState } from "react";
import Calendar from "react-calendar";
import { useHistory } from "react-router-dom";
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
  IonButton,
  IonSpinner,
  IonList,
} from "@ionic/react";
import { useCalendarEvents } from "../../utils/useCalendarEvents";
import "react-calendar/dist/Calendar.css";
import "./calendar.css"; // we'll create this for custom styling

const CalendarPage = () => {
  const { events, loading } = useCalendarEvents();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Idle Sundays Calendar</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <IonSpinner name="dots" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const clickedEvents = events.filter((event) => {
      const eventDate = new Date(event.start).toDateString();
      return eventDate === date.toDateString();
    });
    if (clickedEvents.length > 0) {
      history.push(`/event/${clickedEvents[0].id}`);
    }
  };

  // Upcoming events
  const upcomingEvents = events
    .filter((e) => new Date(e.start) >= new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 2);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h2>Idle Sundays Calendar</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="calendar-container">
          <Calendar
            onChange={handleDateClick}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              const isEventDate = events.some(
                (event) =>
                  new Date(event.start).toDateString() === date.toDateString()
              );
              return isEventDate ? "event-day" : null;
            }}
          />
        </div>
        <IonToolbar>
          <IonTitle style={{ marginbottom: "1.5rem" }}>
            <h3>Upcoming Events</h3>
          </IonTitle>
        </IonToolbar>
        <IonList>
          {upcomingEvents.map((event) => (
            <IonCard key={event.id}>
              <IonCardHeader>
                <IonCardTitle>{event.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonLabel>
                  <p>📅 {new Date(event.start).toLocaleDateString()}</p>
                  <p>
                    🕒{" "}
                    {new Date(event.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>📍 {event.location.split(",")[0]}</p>
                </IonLabel>
                <IonButton
                  expand="block"
                  color="primary"
                  onClick={() => history.push(`/event/${event.id}`)}
                >
                  View Details
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))}
          {upcomingEvents.length === 0 && (
            <IonCard>
              <IonCardContent>No upcoming events.</IonCardContent>
            </IonCard>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
