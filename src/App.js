import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
import {
  IonApp,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import { homeOutline, calendarOutline, logoFacebook } from "ionicons/icons";

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

import Home from "./pages/home/home";
import CalendarPage from "./pages/calendar/calendarPage";
import EventDetails from "./pages/eventDetails/eventDetails";
import FacebookGroupPage from "./pages/facebook/facebookGroupPage";
import Header from "./components/header";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <Header />
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact />
            <Route path="/calendar" component={CalendarPage} exact />
            <Route path="/event/:id" component={EventDetails} exact />
            <Route path="/facebook" component={FacebookGroupPage} exact />
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="calendar" href="/calendar">
              <IonIcon icon={calendarOutline} />
              <IonLabel>Calendar</IonLabel>
            </IonTabButton>
            <IonTabButton tab="facebook" href="/facebook">
              <IonIcon icon={logoFacebook} />
              <IonLabel>Facebook</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
