import { IonAvatar, IonLabel } from "@ionic/react";
import "./Avatar.css"

function Avatar(proprs: any) {

    return (
      <>
        <IonAvatar slot="start">
            <img alt="Silhouette of a person's head" src= {proprs.imagemAvatar} />
        </IonAvatar>
        <IonLabel><a href= {proprs.linkPerfil}>{proprs.label}</a></IonLabel>
      </>
    );
  }
  export default Avatar;