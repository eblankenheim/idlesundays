import { IonHeader, IonToolbar } from "@ionic/react";
import logo from "../media/images/logo_640.png";

const Header = () => (
  <IonHeader translucent>
    <IonToolbar className="toolbar-custom" align="center">
      <img src={logo} alt="Idle Sundays Logo" className="logo" />
    </IonToolbar>
  </IonHeader>
);

export default Header;
