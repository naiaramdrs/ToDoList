import {IonContent, IonPage} from '@ionic/react';
import React, { useState } from "react";
import MensagemInvalida from '../components/MensagemInvalida';
import { validaEmail, validaSenha } from "../util/Validacao";
import Cabecalho from '../components/Cabecalho';
import Botao from '../components/Botao';
import Input from '../components/Input';
import './Cadastro.css';
<<<<<<< HEAD

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
=======
import { APIError, fetchAPI } from '../api/request';
import { useState } from 'react';

const Cadastro: React.FC = () => {
  function createFormValue() {
    return useState({ value: "", invalidity: "" });
  }
  
  const [nome, setNome] = createFormValue();
  const [sobrenome, setSobrenome] = createFormValue();
  const [email, setEmail] = createFormValue();
  const [senha, setSenha] = createFormValue();
  const [senhaConf, setSenhaConf] = createFormValue();

  const submit = async () => {
    try {
      const data = await fetchAPI('/cadastro', {
        nome: nome.value,
        sobrenome: sobrenome.value,
        email: email.value,
        senha: senha.value,
        senha_confirmation: senhaConf.value
      }, 'POST');
      console.log(data);
    } catch (err) {
      if (err instanceof APIError) {
        console.log("teve erro:", err.response);
      }
>>>>>>> 4c3873cbe0b01af977ae627ebd03b835abe83dc9
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
            <Input onChange={(e: any) => setNome({...nome, value: e.target.value})} value={nome.value} label="Nome" labelPlacement="floating" fill="outline" color="medium" type='text'/>
            <MensagemInvalida />

            <Input onChange={(e: any) => setSobrenome({...sobrenome, value: e.target.value})} value={sobrenome.value} label="Sobrenome" labelPlacement="floating" fill="outline" color="medium" type='text'/>
            <MensagemInvalida />
<<<<<<< HEAD
            <Input onChange={changeEmail} value={email.value}  label="Email" labelPlacement="floating" fill="outline" color="medium" type='email'/>
            <MensagemInvalida msg={email.invalidity}/>
            <Input onChange={changePassword} value={password.value} label="Senha" labelPlacement="floating" fill="outline" color="medium" type='password'/>
            <MensagemInvalida msg={password.invalidity}/>
            <Input label="Confirme sua senha" labelPlacement="floating" fill="outline" color="medium" type='password'/>
=======

            <Input onChange={(e: any) => setEmail({...email, value: e.target.value})} value={email.value} label="Email" labelPlacement="floating" fill="outline" color="medium" type='email'/>
            <MensagemInvalida />

            <Input onChange={(e: any) => setSenha({...senha, value: e.target.value})} value={senha.value} label="Senha" labelPlacement="floating" fill="outline" color="medium" type='password'/>
            <MensagemInvalida />

            <Input onChange={(e: any) => setSenhaConf({...senhaConf, value: e.target.value})} value={senhaConf.value} label="Confirme sua senha" labelPlacement="floating" fill="outline" color="medium" type='password'/>
>>>>>>> 4c3873cbe0b01af977ae627ebd03b835abe83dc9
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
