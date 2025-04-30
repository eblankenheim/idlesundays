import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
} from "@ionic/react";
import "./eventDetails.css";
import { useCalendarEvents } from "../../utils/useCalendarEvents";
import { useIonRouter } from "@ionic/react";

const EventDetails = (props) => {
  const { id } = props.match.params;
  const { events, loading } = useCalendarEvents();
  const router = useIonRouter();

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Loading...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>Loading event details...</p>
        </IonContent>
      </IonPage>
    );
  }

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Event Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>Sorry, we couldn't find this event.</p>
        </IonContent>
      </IonPage>
    );
  }

  const handleAddToCalendar = () => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:${event.id}
DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15)}Z
DTSTART:${new Date(event.start)
      .toISOString()
      .replace(/[-:.]/g, "")
      .slice(0, 15)}Z
DTEND:${new Date(event.end).toISOString().replace(/[-:.]/g, "").slice(0, 15)}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
URL:${event.url}
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {/* Event banner image */}
        {event.imageUrl ? (
          <IonImg
            src={
              event.imageUrl ||
              "https://source.unsplash.com/random/800x400?event"
            }
            alt={event.title}
            style={{ borderRadius: "12px", marginBottom: "1rem" }}
          />
        ) : (
          <></>
        )}

        {/* ✅ New Event Details Section */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle align="center" style={{ fontSize: "1.3rem" }}>
              Event Details
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {event.locationImageUrl && (
              <IonImg
                src={event.locationImageUrl}
                alt="Location"
                style={{ borderRadius: "10px", marginBottom: "1rem" }}
              />
            )}
            <IonLabel>
              <p>
                <strong>Date:</strong> 📅{" "}
                {new Date(event.start).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> 🕒{" "}
                {new Date(event.start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <strong>Location:</strong> 📍 {event.location}
              </p>
            </IonLabel>
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" color="success" onClick={handleAddToCalendar}>
          + Add to Calendar
        </IonButton>

        {/* Description section */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{event.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>📋 {event.description}</IonCardContent>
        </IonCard>

        <IonButton
          expand="block"
          color="primary"
          onClick={() => router.push("/calendar", "back")}
        >
          ← Back to Calendar
        </IonButton>

        {/* Famous Birthdays */}
        {event.famousBirthdays?.length > 0 && (
          <IonCard style={{ marginTop: "1rem" }}>
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: "1.2rem" }}>
                Famous Birthdays
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {event.famousBirthdays.map((person, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <IonLabel>
                      🎉 {person.name}
                      <br></br>
                      {" - "}
                      {person.dead
                        ? `would have turned ${person.age}`
                        : `${person.age} years old`}
                    </IonLabel>
                  </li>
                ))}
              </ul>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default EventDetails;
