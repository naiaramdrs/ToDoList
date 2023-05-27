import { useState } from 'react';
import {IonContent, IonPage} from '@ionic/react';
import { validaEmail, validaSenha } from '../../util/Validacao';
import { useHistory } from "react-router-dom";
import { APIError } from '../../util/request';
import { Usuario } from '../../util/Usuario';
import MensagemInvalida from '../../components/mensagem/MensagemInvalida';
import Botao from '../../components/botao/Botao';
import Input from '../../components/uteis/Input';
import Cabecalho from '../../components/cabecalho/Cabecalho';
import './Cadastro.css';

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

  // Valida o formulário e retorna true se for válido
  const validarForm = () => {
    let invalid = false;

    const msgEmail = validaEmail(email.value);
    const msgSenha = validaSenha(senha.value);

    if (msgEmail || msgSenha)
      invalid = true;

    setEmail({ ...email, invalidity: msgEmail });
    setSenha({ ...senha, invalidity: msgSenha });

    if (senha.value !== senhaConf.value) {
      invalid = true;
      setSenha({ ...senha, invalidity: 'Senhas não estão iguais' })
    }

    function invalidIfEmpty(value: any, setValue: (a: any) => void) {
      if (!value.value) {
        invalid = true;
        setValue({ ...value, invalidity: value.invalidity = 'Não pode ser vazio' });
      }
    }

    invalidIfEmpty(nome, setNome);
    invalidIfEmpty(sobrenome, setSobrenome);
    invalidIfEmpty(genero, setGenero);
    invalidIfEmpty(nascimento, setNascimento);

    return !invalid;
  };

  // Envia o formulário para o servidor
  const submit = () => {
    if (!validarForm()) return;

    Usuario.cadastrar({
      nome: nome.value,
      sobrenome: sobrenome.value,
      email: email.value,
      genero: genero.value,
      dataNascimento: nascimento.value,
      senha: senha.value,
    }).then(_ => {
      history.push('/tarefas');
    }).catch(err => {
      if (err instanceof APIError) {
        if (err.response.code === 'E_EMAIL_EXISTE') {
          setEmail({ ...email, invalidity: 'Email já cadastrado' });
        }
      }
    });
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
