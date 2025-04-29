import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import { motion } from "framer-motion";
import { useIonRouter } from "@ionic/react";
import "./home.css";

import logo from "../../media/images/logo_640.png";
import neela from "../../media/images/neela_faded.png";
import will from "../../media/images/will_faded.png";

const Home = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className="toolbar-custom" align="center">
          <img src={logo} alt="Idle Sundays Logo" className="logo" />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-content">
        <section className="hero-section">
          <motion.img
            src={neela}
            alt="Blue Car"
            className="hero-car left"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.img
            src={will}
            alt="Green Car"
            className="hero-car right"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </section>

        <motion.div
          className="text-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1>Join Us This Summer</h1>
          <h2>Idle Sundays – Cars & Bikes Welcome</h2>
          <p>
            Meet-ups in small towns, scenic stops, and wide-open backroads. It’s
            not a race — just good rides and good company.
          </p>
          <p className="link-line">
            View dates on the{" "}
            <a onClick={() => router.push("/calendar", "forward")}>Calendar</a>
          </p>
        </motion.div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
