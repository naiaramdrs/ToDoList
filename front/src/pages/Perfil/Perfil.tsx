import { IonButtons, IonContent, IonHeader, IonInput, IonList, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import { getUsuario } from '../../api/auth';
import Botao from '../../components/botao/Botao';
import "./Perfil.css"


function Perfil() {
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
            <li><a href='/meudia'>🌞 Meu Dia</a></li>
            <li><a href='/importante'>⭐ Importante</a></li>
            <li><a href='/planejado'>📅 Planejado</a></li>
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
              <IonAvatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonLabel><a href='/perfil'>Perfil</a></IonLabel>
            </IonItem>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
            <IonItem>
                <IonAvatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonLabel>{ getUsuario()?.nome ?? 'NÃO LOGADO' }</IonLabel>
            </IonItem>
            <br />
            <div className='botao-perfil'>
                <Botao color="success" children="selecionar imagem" />
            </div>     
        </div>

        <IonList>
            <IonItem>
                <IonInput label="Nome:" type="text" ></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Sobrenome:" type="text"></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Email:" type="email"></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Senha:" type="password"></IonInput>
            </IonItem>
        </IonList>

        <div className='botao-perfil'>
            <Botao color="success" children="Salvar" />
            <Botao color="success" children="Editar" />
        </div>  
      </IonContent>
    </IonPage>
   </>
  );
}
export default Perfil;