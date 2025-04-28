import { useState } from "react";
import "@ionic/react/css/core.css";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

/* Ionic CSS */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import PublicCalendar from "./pages/calendar";
import Home from "./pages/home";
import EventDetails from "./pages/eventDetails";

function App() {
  const [events, setEvents] = useState([]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Use the element prop to render components */}
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails events={events} />} />
          <Route
            path="/calendar"
            element={<PublicCalendar events={events} setEvents={setEvents} />}
          />
          <Redirect to="/" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
