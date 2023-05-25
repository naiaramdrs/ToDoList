import { IonButtons, IonContent, IonHeader, IonInput, IonList, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import { Usuario } from '../../util/Usuario';
import Botao from '../../components/botao/Botao';
import "./Perfil.css"
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


function Perfil() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");

  useEffect(() => {
    Usuario.getLocal()?.atualizar().then(usuario => {
      console.log('info', usuario);
      setNome(usuario.nome);
      setSobrenome(usuario.sobrenome);
    });
  }, []);

  const history = useHistory();

  const submit = () => {
    Usuario.getLocal()?.editar({
      nome, sobrenome
    });
  };

  const deslogar = () => {
    Usuario.getLocal()?.logout();
    // voltar para pagina de login mesmo se o logout deu errado
    history.push('/login');
  };

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
                <IonLabel>{ Usuario.getLocal()?.nome ?? 'NÃO LOGADO' }</IonLabel>
            </IonItem>
            <br />
            <div className='botao-perfil'>
                <Botao color="success" children="selecionar imagem" />
            </div>      
        </div>

        <IonList>
            <IonItem>
                <IonInput label="Nome:" type="text" value={nome} onIonChange={e => setNome(e.target.value as string)}></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Sobrenome:" type="text" value={sobrenome} onIonChange={e => setSobrenome(e.target.value as string)}></IonInput>
            </IonItem>
        </IonList>

        <div className='botao-perfil'>
            <Botao color="success" onClick={submit}>Salvar</Botao>
            <Botao color="danger" onClick={deslogar}>Sair</Botao>
        </div>  
      </IonContent>
    </IonPage>
   </>
  );
}
export default Perfil;