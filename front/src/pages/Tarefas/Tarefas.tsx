import { IonButtons, IonContent, IonHeader, IonInput, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { getUsuario } from '../../api/auth';
import { IonAvatar, IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import Tasks from '../../components/tarefas/Tasks';
import "./Tarefas.css"


function Tarefas() {
  return (
   <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tarefas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ul className='list-tarefas'>
            <li><a href='/tarefas'>🌞 Meu Dia</a></li>
            <li><a href='/tarefas'>⭐ Importante</a></li>
            <li><a href='/tarefas'>📅 Planejado</a></li>
            <li><a href='/tarefas'>🎭 Atribuido a mim</a></li>
            <li><a href='/tarefas'></a></li>
        </ul>
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <div className='tolbar-task'>
            <IonTitle>ToDolist</IonTitle>
            <IonItem>
              <IonAvatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonLabel><a>Perfil</a></IonLabel>
            </IonItem>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className='container-todo'>
          <div className='todoList'>
            <div className='avatar'>
              <IonAvatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar>
            </div>
            <header>Bem-vindo { getUsuario()?.nome ?? 'NÃO LOGADO' }</header>
            <p className='frase'>Não esqueça que deixar suas tarefas organizadas é o mais importante.</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
   </>
  );
}
export default Tarefas;