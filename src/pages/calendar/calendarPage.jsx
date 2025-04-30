import React, { useState } from "react";
import Calendar from "react-calendar";
import { motion } from "framer-motion";
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
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { useCalendarEvents } from "../../utils/useCalendarEvents";
import logo from "../../media/images/logo_640.png";
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

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500); // Delay just to show refresh UI
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonToolbar className="toolbar-custom" align="center">
            <img src={logo} alt="Idle Sundays Logo" className="logo" />
          </IonToolbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <motion.div
          className="calendar-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <IonToolbar>
            <IonTitle align="center">
              <h3>Upcoming Events</h3>
            </IonTitle>
          </IonToolbar>
        </motion.div>
        <IonList>
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
            >
              <IonCard>
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
            </motion.div>
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
