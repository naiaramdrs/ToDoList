import { IonContent, IonPage} from '@ionic/react';
import React, { useState } from "react";
import Botao from '../components/Botao';
import Input from '../components/Input';
import MensagemInvalida from '../components/MensagemInvalida';
import { validaEmail, validaSenha } from "../util/Validacao";
import './Login.css';


const Login: React.FC = () => {
  
  const [email, setEmail] = useState({ value: "", invalidity: "" });
  const [password, setPassword] = useState({ value: "", invalidity: "" });
  
  const changeEmail = (e:any) => {
    const value = e.target.value;
    setEmail({ ...email, value });
  }

  const changePassword = (e:any) => {
    const value = e.target.value;

    setPassword({ ...password, value });
  };

  const validateForm = () => {
    const invalidityEmail = validaEmail(email.value);
    const invalidityPassword = validaSenha(password.value);

    setEmail({ ...email, invalidity: invalidityEmail });
    setPassword({ ...password, invalidity: invalidityPassword });

    return !invalidityEmail && !invalidityPassword ? true : false;
  };

  const submit = () => {
    if (validateForm()) {
      // o que?
    }
  };
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">

          <div className='box'>
            <div className='logo'>
              <img src="/todook.png" alt="logo"  />
              <h1>BEM-VINDO</h1>
              <h2>Mantenha suas tarefas em dia com ToDolist!</h2>
            </div>  
          </div>

          <div className='content'>
            <div className='forms'>
              <h1>LOGIN</h1>
              <Input onChange={changeEmail} value={email.value} label="Email" labelPlacement="floating" fill="outline" color="medium" type='email'/>
              <MensagemInvalida msg={email.invalidity} />
             
              <Input onChange={changePassword} value={password.value} label="Senha" labelPlacement="floating" fill="outline" color="medium" type='password'/>
              <MensagemInvalida msg={password.invalidity} />
        
              <Botao onClick={submit} expand="full" fill="solid" color="success"> Entrar</Botao>
              <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
            
            </div>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Login;
