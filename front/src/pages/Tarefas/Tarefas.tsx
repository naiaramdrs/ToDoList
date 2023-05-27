import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonItem } from '@ionic/react';
import { Usuario } from '../../util/Usuario';
import Avatar from '../Perfil/Avatar';
import Botao from '../../components/botao/Botao';
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
              <Avatar label="Perfil"/>
            </IonItem>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className='container-todo' id="teste">
          <div className='todoList'>
            <div className='avatar'>
              <Avatar />
            </div>
            <header>Bem-vindo { Usuario.getLocal()?.nome ?? 'NÃO LOGADO' }</header>
            <div className='box-botao-Tarefas'>
              <p className='frase'>Não esqueça que deixar suas tarefas organizadas é o mais importante.</p>
              <Botao color="success"><a href="/minhasTarefas">Ver tarefas</a></Botao>
            </div> 
          </div>
        </div>
      </IonContent>
    </IonPage>
   </>
  );
}
export default Tarefas;