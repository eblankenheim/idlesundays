import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
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

import CalendarPage from "./pages/calendar/calendarPage";
import Home from "./pages/home/home";
import EventDetails from "./pages/eventDetails/eventDetails";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={Home} exact />
          <Route path="/calendar" component={CalendarPage} exact />
          <Route path="/event/:id" component={EventDetails} exact />
          <Redirect to="/" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
