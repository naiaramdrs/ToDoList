import { IonContent, IonPage} from '@ionic/react';
import './Login.css';
import Botao from '../components/Botao';
import Input from '../components/Input';


const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">

          <div className='box'>
            <div className='logo'>
              <img src="./public/todook.png" alt="logo"  />
              <h1>BEM-VINDO</h1>
              <h2>Mantenha suas tarefas em dia com ToDolist!</h2>
            </div>  
          </div>

          <div className='content'>
            <div className='forms'>
              <h1>LOGIN</h1>
              <Input  label="Email" labelPlacement="floating" fill="outline" color="medium" type='email'/>
              <Input label="Senha" labelPlacement="floating" fill="outline" color="medium" type='password'/>
              <Botao expand="full" fill="solid" color="success"> Entrar</Botao>
            
              <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
            
            </div>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Login;
