import { IonContent, IonPage} from '@ionic/react';
import React, { useState } from "react";
import Botao from '../components/Botao';
import Input from '../components/Input';
import MensagemInvalida from '../components/MensagemInvalida';
import { validaEmail, validaSenha } from "../util/Validacao";
import Cabecalho from '../components/Cabecalho';
import './Login.css';
import { APIError, fetchAPI } from '../api/request';


const Login: React.FC = () => {
  
  const [email, setEmail] = useState({ value: "", invalidity: "" });
  const [password, setPassword] = useState({ value: "", invalidity: "" });

  const submit = async () => {
    try {
      const data = await fetchAPI('/login', {
        email: email.value,
        senha: password.value,
      }, 'POST');
      console.log(data);
    } catch (err) {
      if (err instanceof APIError) {
        console.log("teve erro:", err.response);
      }
    }
  };
  
  return (
    <IonPage>
      <Cabecalho title = "ToDolist"/>
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
              <Input setValue={setEmail} value={email} label="Email" type='email'/>
              <MensagemInvalida msg={email.invalidity} />
             
              <Input setValue={setPassword} value={password} label="Senha" type='password'/>
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
