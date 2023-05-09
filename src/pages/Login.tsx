import { IonContent, IonPage} from '@ionic/react';
import { IonInput } from '@ionic/react';
import { IonButton } from '@ionic/react';
import CaixaLogin from '../components/CaixaLogin';
import './Login.css';


const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">

          <div className='box'>
            <div className='logo'>
              <img src="/todo.png" alt="logo"  />
              <h1>BEM-VINDO</h1>
              <h2>Mantenha suas tarefas em dia com ToDolist!</h2>
            </div>  
          </div>

          <div className='content'>
            <div className='forms'>
              <h1>LOGIN</h1>
              <IonInput label="Email" labelPlacement="floating" fill="outline" placeholder="Email" color="medium"  required type='email'></IonInput>
              <br />
              <IonInput label="Senha" labelPlacement="floating" fill="outline" placeholder="Senha" color="medium" type='password' required></IonInput>
              <br />
              <IonButton expand="full" fill="solid" color="success">Enviar</IonButton>
              <br />
              
              <a href="#">Esqueceu a senha?</a>
              <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>

            </div>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Login;
