import React from "react";
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
  IonButton,
  IonLabel,
} from "@ionic/react";
import { motion } from "framer-motion";
import "./facebookGroupPage.css";

// Image imports
import FBEventBanner from "../../media/images/facebookgrouppage_001_event_banner.PNG";
import FBBanner from "../../media/images/fb_banner.PNG";
import FBPageScreenshot from "../../media/images/facebookgrouppage.PNG";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

const FacebookGroupPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Join Our Facebook Group</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Banner */}
        <motion.img
          src={FBBanner}
          alt="Facebook Group Banner"
          className="fb-banner"
          {...fadeInUp}
        />

        {/* Why Join Section */}
        <motion.div {...fadeInUp}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Why Join the Group?</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonLabel>
                <p>
                  🌟 Stay in the loop with all our latest events and updates.
                </p>
                <p>
                  💬 Connect with other members, share photos, and get involved.
                </p>
                <p>
                  🔒 The group is private, so you'll need to request to join.
                </p>
              </IonLabel>
            </IonCardContent>
          </IonCard>
        </motion.div>

        {/* CTA Button */}
        <motion.div {...fadeInUp}>
          <IonButton
            expand="block"
            color="primary"
            href="https://www.facebook.com/groups/980513540774540"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 Visit & Join the Facebook Group
          </IonButton>
        </motion.div>

        {/* Event Banner */}
        <motion.div {...fadeInUp}>
          <IonCard style={{ marginTop: "1.5rem" }}>
            <IonCardHeader>
              <IonCardTitle>Upcoming Events Preview</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <motion.img
                src={FBEventBanner}
                alt="Event Preview"
                className="fb-image"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <p>
                A sneak peek of what's coming up this season. Join the group to
                get full details and RSVP!
              </p>
            </IonCardContent>
          </IonCard>
        </motion.div>

        {/* Group Page Screenshot */}
        <motion.div {...fadeInUp}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>What It Looks Like Inside</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <motion.img
                src={FBPageScreenshot}
                alt="Full Facebook Group Page"
                className="fb-image tall"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              />
              <p style={{ fontSize: "0.9rem" }}>
                This is a preview of our full group page. New members are always
                welcome!
              </p>
            </IonCardContent>
          </IonCard>
        </motion.div>
      </IonContent>
    </IonPage>
  );
};

export default FacebookGroupPage;
