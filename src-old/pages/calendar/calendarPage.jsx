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
  IonItemDivider,
} from "@ionic/react";
import { useCalendarEvents } from "../../utils/useCalendarEvents";
import z06 from "../../media/images/z06_faded.png";
import z06Black from "../../media/images/z06_black.png";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationPinIcon from "@mui/icons-material/LocationPin";

import { playAudio } from "../../utils/audioPlayer"; // adjust path as needed
import Z06_Sound from "../../media/audio/Z06_Sound.mp3";
import "react-calendar/dist/Calendar.css";
import "./calendar.css"; // we'll create this for custom styling

const CalendarPage = () => {
  const { events, loading } = useCalendarEvents();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format event date as "Month Day(ordinal) - M/D/YYYY"
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    const ordinal = (n) => {
      const j = n % 10;
      const k = n % 100;
      if (j === 1 && k !== 11) return "st";
      if (j === 2 && k !== 12) return "nd";
      if (j === 3 && k !== 13) return "rd";
      return "th";
    };

    return `${month} ${day}${ordinal(day)}`;
  };

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

  // Past events
  const pastEvents = events
    .filter((e) => new Date(e.start) < new Date())
    .sort((a, b) => new Date(b.start) - new Date(a.start))
    .slice(0, 2);

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500); // Delay just to show refresh UI
  };

  return (
    <IonPage>
      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={handleRefresh}
          style={{ top: "60px" }}>
          <IonRefresherContent />
        </IonRefresher>
        <motion.div
          className="calendar-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <Calendar
            onChange={handleDateClick}
            value={selectedDate}
            locale="en-US"
            tileClassName={({ date, view }) => {
              const isEventDate = events.some(
                (event) =>
                  new Date(event.start).toDateString() === date.toDateString(),
              );
              return isEventDate ? "event-day" : null;
            }}
          />
        </motion.div>
        <div
          className="car-container bottom"
          onClick={() => playAudio(Z06_Sound)}>
          <img src={z06Black} alt="Z06 Shadow" className="car-shadow" />
          <motion.img
            src={z06}
            alt="Yellow Car"
            className="hero-car"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </div>
        <IonItemDivider></IonItemDivider>
        <IonTitle className="event-list-title">Upcoming Events</IonTitle>
        <IonList className="event-list">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{event.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ flex: 2 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "flex-start",
                        }}>
                        <DateRangeIcon
                          style={{ fontSize: "1.2rem", flexShrink: 0 }}
                        />
                        <p style={{ margin: 0 }}>
                          {formatEventDate(event.start)}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "flex-start",
                        }}>
                        <AccessTimeIcon
                          style={{ fontSize: "1.2rem", flexShrink: 0 }}
                        />
                        <p style={{ margin: 0 }}>
                          {new Date(event.start).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div style={{ flex: 3 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "flex-start",
                        }}>
                        <LocationPinIcon
                          style={{ fontSize: "1.2rem", flexShrink: 0 }}
                        />
                        <p style={{ margin: 0 }}>
                          {event.location.split(",")[0]}
                        </p>
                      </div>
                    </div>
                  </IonLabel>
                  <IonButton
                    expand="block"
                    color="primary"
                    onClick={() => history.push(`/event/${event.id}`)}>
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

        <IonItemDivider></IonItemDivider>
        <IonTitle className="event-list-title">Past Events</IonTitle>
        <IonList className="event-list">
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{event.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ flex: 2 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "flex-start",
                        }}>
                        <DateRangeIcon
                          style={{ fontSize: "1.2rem", flexShrink: 0 }}
                        />
                        <p style={{ margin: 0 }}>
                          {formatEventDate(event.start)}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "flex-start",
                        }}>
                        <AccessTimeIcon
                          style={{ fontSize: "1.2rem", flexShrink: 0 }}
                        />
                        <p style={{ margin: 0 }}>
                          {new Date(event.start).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div style={{ flex: 3 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "flex-start",
                        }}>
                        <LocationPinIcon
                          style={{ fontSize: "1.2rem", flexShrink: 0 }}
                        />
                        <p style={{ margin: 0 }}>
                          {event.location.split(",")[0]}
                        </p>
                      </div>
                    </div>
                  </IonLabel>
                  <IonButton
                    expand="block"
                    color="primary"
                    onClick={() => history.push(`/event/${event.id}`)}>
                    View Details
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </motion.div>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
