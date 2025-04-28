import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import poster001 from "../../media/images/poster001.png";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <img src={poster001} alt="poster001" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
