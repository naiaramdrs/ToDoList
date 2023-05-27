import React, { useState } from "react";
import { IonContent, IonPage} from '@ionic/react';
import { validaEmail, validaSenha } from "../../util/Validacao";
import { APIError } from '../../util/request';
import { useHistory } from 'react-router-dom';
import { Usuario } from '../../util/Usuario';
import MensagemInvalida from '../../components/mensagem/MensagemInvalida';
import Cabecalho from '../../components/cabecalho/Cabecalho';
import Botao from '../../components/botao/Botao';
import Input from '../../components/uteis/Input';
import './Login.css';


const Login: React.FC = () => {
  
  const [email, setEmail] = useState({ value: "", invalidity: "" });
  const [password, setPassword] = useState({ value: "", invalidity: "" });

  const history = useHistory();

  // Valida o formulário e retorna true se for válido
  const validateForm = () => {
    const invalidityEmail = validaEmail(email.value);
    const invalidityPassword = validaSenha(password.value);

    setEmail({ ...email, invalidity: invalidityEmail });
    setPassword({ ...password, invalidity: invalidityPassword });

    return !invalidityEmail && !invalidityPassword;
  };

  // Faz o login
  const submit = () => {
   if (validateForm()){
    Usuario.login(email.value, password.value).then(_ => {
      history.push('/tarefas')
    }).catch(err => {
      if (err instanceof APIError) {
        if (err.response.errors) {
          for (let msg of err.response.errors) {
            if (msg.message.startsWith('E_INVALID_AUTH_UID')) {
              setEmail({ ...email, invalidity: 'Usuário não cadastrado' })
            }
            if (msg.message.startsWith('E_INVALID_AUTH_PASSWORD')) {
              setPassword({ ...password, invalidity: 'Senha incorreta' })
            }
          }
        }
      }
    })
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
