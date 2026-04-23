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
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import "./eventDetails.css";
import { useCalendarEvents } from "../../utils/useCalendarEvents";
import { useIonRouter } from "@ionic/react";

const EventDetails = (props) => {
  const { id } = props.match.params;
  const { events, loading } = useCalendarEvents();
  const router = useIonRouter();

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
    try {
      const startDate = new Date(event.start);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // default +2 hours

      const formatDate = (date) =>
        date.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";

      const icsContent = `
        BEGIN:VCALENDAR
        VERSION:2.0
        BEGIN:VEVENT
        UID:${event.id || Date.now()}
        DTSTAMP:${formatDate(new Date())}
        DTSTART:${formatDate(startDate)}
        DTEND:${formatDate(endDate)}
        SUMMARY:${event.title || ""}
        DESCRIPTION:${event.description || ""}
        LOCATION:${event.location || ""}
        URL:${event.url || ""}
        END:VEVENT
        END:VCALENDAR
    `.trim();

      const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${event.title || "event"}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error creating calendar event:", err);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {/* ✅ New Event Details Section */}
        <IonCard>
          <IonCardContent>
            {event.locationImageUrl && (
              <IonImg
                src={event.locationImageUrl}
                alt="Location"
                style={{ borderRadius: "10px", marginBottom: "1rem" }}
              />
            )}
            <IonLabel>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                }}>
                <DateRangeIcon style={{ fontSize: "1.2rem", flexShrink: 0 }} />
                <p style={{ margin: 0 }}>{formatEventDate(event.start)}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                }}>
                <AccessTimeIcon style={{ fontSize: "1.2rem", flexShrink: 0 }} />
                <p style={{ margin: 0 }}>
                  {new Date(event.start).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "flex-start",
                }}>
                <LocationPinIcon
                  style={{ fontSize: "1.2rem", flexShrink: 0 }}
                />
                <div style={{ margin: 0 }}>
                  <div>{event.location.split(",")[0]},</div>
                  <div>
                    {event.location.split(",").slice(1).join(",").trim()}
                  </div>
                </div>
              </div>
            </IonLabel>
          </IonCardContent>
        </IonCard>
        {/* Description section */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{event.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>{event.description}</IonCardContent>
        </IonCard>

        <IonButton expand="block" color="success" onClick={handleAddToCalendar}>
          Add to Phone Calendar
        </IonButton>
        <IonButton
          expand="block"
          color="primary"
          href={`https://www.facebook.com/events/${event.facebookEventId}`}
          target="_blank">
          View on Facebook
        </IonButton>

        {/* Famous Birthdays
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
        )} */}

        <IonButton
          expand="block"
          color="medium"
          onClick={() => router.push("/calendar", "back")}>
          ← Back to Calendar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EventDetails;
