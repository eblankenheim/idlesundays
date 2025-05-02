import {
  IonCard,
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { motion } from "framer-motion";
import { useIonRouter } from "@ionic/react";
import "./home.css";

import neela from "../../media/images/neela_faded.png";
import will from "../../media/images/will_faded.png";
import nubboi from "../../media/images/nubboi_faded.png";
import neelaBlack from "../../media/images/neela_black.png";
import willBlack from "../../media/images/will_black.png";
import nubboiBlack from "../../media/images/nubboi_black.png";

const Home = () => {
  const router = useIonRouter();

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500); // Delay just to show refresh UI
  };

  return (
    <IonPage>
      <IonContent fullscreen className="home-content">
        <IonRefresher
          slot="fixed"
          onIonRefresh={handleRefresh}
          style={{ top: "60px" }}
        >
          <IonRefresherContent />
        </IonRefresher>

        <section className="hero-section">
          <div className="car-container left">
            <img src={neelaBlack} alt="Neela Shadow" className="car-shadow" />
            <motion.img
              src={neela}
              alt="Blue Car"
              className="hero-car"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
          <div className="car-container right">
            <img src={willBlack} alt="Will Shadow" className="car-shadow" />
            <motion.img
              src={will}
              alt="Green Car"
              className="hero-car"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </section>

        <IonCard className="text-block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1>Join Us This Summer</h1>
            <h2>Idle Sundays – Cars & Bikes Welcome</h2>
            <p>
              Meet-ups in small towns, scenic stops, and wide-open backroads.
              It’s not a race — just good rides and good company.
            </p>
            <p className="link-line">
              View dates on the{" "}
              <a
                href="/calendar"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/calendar", "forward");
                }}
              >
                Calendar
              </a>
            </p>
          </motion.div>
        </IonCard>
        <div className="car-container bottom">
          <img src={nubboiBlack} alt="Nubboi Shadow" className="car-shadow" />
          <motion.img
            src={nubboi}
            alt="White Car"
            className="hero-car"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
