import { IonContent, IonPage} from '@ionic/react';
import { IonInput } from '@ionic/react';
import { IonButton } from '@ionic/react';
import './Cadastro.css';

const Cadastro: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
      <div className="container">

        <div className='box'>
          <div className='logo'>
            <img src="./public/todo.png" alt="logo"  />
            <h1>BEM-VINDO</h1>
            <h2>Mantenha suas tarefas em dia com ToDolist!</h2>
          </div>  
        </div>

        <div className='content'>
          <div className='forms'>
            <h1>CADASTRE-SE</h1>
            <IonInput label="Nome" labelPlacement="floating" fill="outline" color="medium"  required type='text'></IonInput>
            <br />
            <IonInput label="Sobrenome" labelPlacement="floating" fill="outline" color="medium"  required type='text'></IonInput>
            <br />
            <IonInput label="Email" labelPlacement="floating" fill="outline" color="medium"  required type='email'></IonInput>
            <br />
            <IonInput label="Senha" labelPlacement="floating" fill="outline" color="medium" type='password' required></IonInput>
            <br />
            <IonButton expand="full" fill="solid" color="success">Entrar</IonButton>
            <br />

          </div>
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
