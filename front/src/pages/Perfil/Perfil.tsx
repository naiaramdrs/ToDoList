import { IonButtons, IonContent, IonHeader, IonInput, IonList, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import { getUsuario, salvarUsuario } from '../../api/auth';
import Botao from '../../components/botao/Botao';
import "./Perfil.css"
import { useEffect, useState } from 'react';
import { fetchAPI } from '../../api/request';


function Perfil() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    fetchAPI('/usuario/info', {}, 'GET').then(data => {
      setNome(data.usuario.nome);
      setSobrenome(data.usuario.sobrenome);
      setEmail(data.usuario.email);
      // TODO: data nascimento
    });
  }, []);

  const submit = () => {
    fetchAPI('/usuario/editar', {
      nome,
      sobrenome,
    }, 'POST').then(data => {
      console.log(data);
      
      salvarUsuario(data.usuario);
    });
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
                <IonInput label="Nome:" type="text" value={nome} onIonChange={e => setNome(e.target.value as string)}></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Sobrenome:" type="text" value={sobrenome} onIonChange={e => setSobrenome(e.target.value as string)}></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Email:" type="email" value={email} disabled></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Senha:" type="password" value={senha} onIonChange={e => setSenha(e.target.value as string)} disabled></IonInput>
            </IonItem>
        </IonList>

        <div className='botao-perfil'>
            <Botao color="success" children="Salvar" onClick={submit} />
        </div>  
      </IonContent>
    </IonPage>
   </>
  );
}
export default Perfil;