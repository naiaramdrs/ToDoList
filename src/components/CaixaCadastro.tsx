import './CaixaCadastro.css';
import { IonInput } from '@ionic/react';
import { IonButton } from '@ionic/react';

interface ContainerProps { }

const CaixaCadastro: React.FC<ContainerProps> = () => {
  return (
    <div className="container">

      <div className='content'>
        <div className='logo'>
          <img src="./public/todo.png" alt="logo"  />
        </div>  
      </div>

      <div className='box'>
        <div className='forms'>
          <h1>LOGIN</h1>
          <IonInput label="Email" labelPlacement="floating" fill="outline" placeholder="Email" color="medium"  required type='email'></IonInput>
          <br />
          <IonInput label="Senha" labelPlacement="floating" fill="outline" placeholder="Senha" color="medium" type='password' required></IonInput>
          <br />
          <IonButton expand="full" fill="solid" color="success">Enviar</IonButton>
           <br />
          <a href="#">Esqueceu a senha?</a>
          <p>Não tem uma conta? <a href='#'>Cadastre-se</a></p>

        </div>
      </div>
    </div>
  );
};

export default CaixaCadastro;
