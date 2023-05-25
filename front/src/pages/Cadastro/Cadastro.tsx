import {IonContent, IonPage} from '@ionic/react';
import Botao from '../../components/botao/Botao';
import Input from '../../components/uteis/Input';
import MensagemInvalida from '../../components/mensagem/MensagemInvalida';
import Cabecalho from '../../components/cabecalho/Cabecalho';
import './Cadastro.css';
import { APIError, fetchAPI } from '../../api/request';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { salvarUsuario } from '../../api/auth';

const Cadastro: React.FC = () => {
  function createFormValue() {
    return useState({ value: "", invalidity: "" });
  }
  
  const [nome, setNome] = createFormValue();
  const [sobrenome, setSobrenome] = createFormValue();
  const [email, setEmail] = createFormValue();
  const [genero, setGenero] = createFormValue();
  const [nascimento, setNascimento] = createFormValue();
  const [senha, setSenha] = createFormValue();
  const [senhaConf, setSenhaConf] = createFormValue();

  const history = useHistory();

  const submit = async () => {
    try {
      const data = await fetchAPI('/usuario/cadastro', {
        nome: nome.value,
        sobrenome: sobrenome.value,
        email: email.value,
        genero: genero.value,
        dataNascimento: nascimento.value,
        senha: senha.value,
        senha_confirmation: senhaConf.value
      }, 'POST');
      console.log(data);

      salvarUsuario(data);

      history.push('/tarefas');
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
            <h2>Antes do ToDolist, minhas listas de tarefa estavam espalhadas por todos os lugares! Agora tudo está organizado em um só lugar. – Naiara M.</h2>
          </div>  
        </div>

        <div className='content'>
          <div className='forms'>
            <h1>CADASTRE-SE</h1>
            <Input setValue={setNome} value={nome} label="Nome" type='text'/>
            <MensagemInvalida msg={nome.invalidity} />

            <Input setValue={setSobrenome} value={sobrenome} label="Sobrenome" type='text'/>
            <MensagemInvalida msg={sobrenome.invalidity} />

            <Input setValue={setEmail} value={email} label="Email" type='email'/>
            <MensagemInvalida msg={email.invalidity} />

            <Input setValue={setGenero} value={genero} label="Gênero" type='text'/>
            <MensagemInvalida msg={genero.invalidity} />

            <Input setValue={setNascimento} value={nascimento} label="Data de nascimento" type='date'/>
            <MensagemInvalida msg={nascimento.invalidity} />

            <Input setValue={setSenha} value={senha} label="Senha" type='password'/>
            <MensagemInvalida msg={senha.invalidity} />

            <Input setValue={setSenhaConf} value={senhaConf} label="Confirme sua senha" type='password'/>
            <MensagemInvalida msg={senhaConf.invalidity} />

            <Botao expand="full" fill="solid" color="success" onClick={submit}>Cadastrar</Botao>
            <p>Já tem cadastro? volte para <a href="/login">login</a></p>

          </div>
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
