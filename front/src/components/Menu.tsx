import { IonButtons, IonContent, IonHeader, IonInput, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import "./Menu.css"

const Menu = (props:any) => {

  return (
    <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.tituloDentro}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ul className='list-tarefas'>
            <li><a href='/tarefas'>🌞 Meu Dia</a></li>
            <li><a href='/tarefas'>⭐ Importante</a></li>
            <li><a href='/tarefas'>📅 Planejado</a></li>
            <li><a href='/tarefas'>🎭 Atribuido a mim</a></li>
        </ul>
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{props.tituloFora}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput labelPlacement="floating" fill="outline" label='O que você vai fazer?'></IonInput>
      </IonContent>
    </IonPage>
  </>
  )
};

export default Menu;
