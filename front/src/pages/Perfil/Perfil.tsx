import { IonButtons, IonContent, IonHeader, IonInput, IonList, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import { Usuario } from '../../util/Usuario';
import Botao from '../../components/botao/Botao';
import "./Perfil.css"
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from './Avatar';


function Perfil() {

  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    setImage(selectedImage ?? null);
  };

  const handleSaveImage = () => {
    if (image) {
      Usuario.getLocal()!.uploadFoto(image);
    }
  };

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");

  useEffect(() => {
    Usuario.getLocal()?.atualizar().then(usuario => {
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
              <Avatar />
            </IonItem>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
            <IonItem>
                <Avatar label={Usuario.getLocal()?.nome ?? 'NÃO LOGADO'} url={image ? URL.createObjectURL(image) : null} />
            </IonItem>
            <br />
            <div className='input-file'>
                <input type='file'  onChange={handleImageChange} />
            </div>      
            <div className='botao-perfil'>
              <Botao color="success" onClick={handleSaveImage}>Salvar Imagem</Botao>
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