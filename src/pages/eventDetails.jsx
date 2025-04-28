import React from "react";
import { useParams } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import { useCalendarEvents } from "../utils/useCalendarEvents";

const EventDetails = () => {
  const { id } = useParams();
  const { events, loading } = useCalendarEvents();

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>{event.title}</h1>
        <p>
          {new Date(event.start).toLocaleDateString()}{" "}
          {new Date(event.start).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {event.location && <p>📍 {event.location}</p>}
        {event.description && <p>{event.description}</p>}

        <IonButton onClick={() => console.log("ICO Download")}>
          Add to Calendar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EventDetails;
