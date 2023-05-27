import { IonAvatar, IonLabel } from "@ionic/react";
import { Usuario } from "../../util/Usuario";
import "./Avatar.css"

function Avatar(props: any) {
  return (
    <>
      <IonAvatar slot="start">
          <img
            alt="Silhouette of a person's head"
            src={props.url ?? Usuario.getLocal()?.fotoPerfil ?? "https://ionicframework.com/docs/img/demos/avatar.svg"}
          />
      </IonAvatar>
      <IonLabel><a href='/perfil'>{props.label}</a></IonLabel>
    </>
  );
}
export default Avatar;