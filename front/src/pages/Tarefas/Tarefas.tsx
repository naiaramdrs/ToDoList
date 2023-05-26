import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import { Usuario } from '../../util/Usuario';
import "./Tarefas.css"
import Avatar from '../Perfil/Avatar';


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
            <li><a href='/minhasTarefas'>🌞 Minhas Tarefas</a></li>
        </ul>
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="success"></IonMenuButton>
          </IonButtons>
          <div className='tolbar-task'>
            <IonTitle><a href='/tarefas'>ToDolist</a></IonTitle>
            <IonItem>
              <Avatar label = "Perfil" linkPerfil="/perfil" imagemAvatar={ Usuario.getLocal()?.fotoPerfil ?? "https://ionicframework.com/docs/img/demos/avatar.svg"}/>
                <IonLabel><a href='/perfil'>Perfil</a></IonLabel>
            </IonItem>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className='container-todo' id="teste">
          <div className='todoList'>
            <div className='avatar'>
              <Avatar label = "Perfil" linkPerfil="/perfil" imagemAvatar={ Usuario.getLocal()?.fotoPerfil ?? "https://ionicframework.com/docs/img/demos/avatar.svg"}/>
            </div>
            <header>Bem-vindo { Usuario.getLocal()?.nome ?? 'NÃO LOGADO' }</header>
            <p className='frase'>Não esqueça que deixar suas tarefas organizadas é o mais importante.</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
   </>
  );
}
export default Tarefas;