import { IonButtons, IonContent, IonHeader, IonInput, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import "../Tarefas.css"
import Tasks from '../../../components/tarefas/Tasks';


function MeuDia() {
  return (
   <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meu Dia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ul className='list-tarefas'>
            <li><a href='/meudia'>🌞 Meu Dia</a></li>
            <li><a href='/tarefas'>⭐ Importante</a></li>
            <li><a href='/tarefas'>📅 Planejado</a></li>
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
            <IonTitle><a href='/tarefas'>ToDolist</a></IonTitle>
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
            <header>Tarefas do dia</header>
            <Tasks tarefa = "Tarefa 1"/>
            <Tasks tarefa = "Tarefa 2"/>
            <Tasks tarefa = "Tarefa 3"/>
            <br/>
            <footer>
              <IonInput labelPlacement="floating" fill="outline" label='O que você vai fazer?'></IonInput>
            </footer>
          </div>
        </div>
      </IonContent>
    </IonPage>
   </>
  );
}
export default MeuDia;