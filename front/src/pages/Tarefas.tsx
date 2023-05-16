import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import "./Tarefas.css"

function Tarefas() {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Card Title</IonCardTitle>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>

                <IonButton fill="clear">Action 1</IonButton>
                <IonButton fill="clear">Action 2</IonButton>
            </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
}
export default Tarefas;