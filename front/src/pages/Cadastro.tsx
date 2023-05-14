import {IonContent, IonPage} from '@ionic/react';
import React, { useState } from "react";
import MensagemInvalida from '../components/MensagemInvalida';
import { validaEmail, validaSenha } from "../util/Validacao";
import Cabecalho from '../components/Cabecalho';
import Botao from '../components/Botao';
import Input from '../components/Input';
import './Cadastro.css';

const Cadastro: React.FC = () => {
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

    return !invalidityEmail || !invalidityPassword ? true : false;
  };

  const submit = () => {
    if (validateForm()) {
      // o que?
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
            <h2>Antes do ToDolist, minhas listas de tarefa estavam espalhadas por todos os lugares! Agora tudo está organizado em um só lugar. – Naiara M.</h2>
          </div>  
        </div>

        <div className='content'>
          <div className='forms'>
            <h1>CADASTRE-SE</h1>
            <Input label="Nome" labelPlacement="floating" fill="outline" color="medium" type='text'/>
            <MensagemInvalida />
            <Input label="Sobrenome" labelPlacement="floating" fill="outline" color="medium" type='text'/>
            <MensagemInvalida />
            <Input onChange={changeEmail} value={email.value}  label="Email" labelPlacement="floating" fill="outline" color="medium" type='email'/>
            <MensagemInvalida msg={email.invalidity}/>
            <Input onChange={changePassword} value={password.value} label="Senha" labelPlacement="floating" fill="outline" color="medium" type='password'/>
            <MensagemInvalida msg={password.invalidity}/>
            <Input label="Confirme sua senha" labelPlacement="floating" fill="outline" color="medium" type='password'/>
            <MensagemInvalida />
            <Botao expand="full" fill="solid" color="success" onClick={submit}>Entrar</Botao>
            <p>Já tem cadastro? volte para <a href="/login">login</a></p>

          </div>
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
