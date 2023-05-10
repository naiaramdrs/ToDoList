import {IonContent, IonPage} from '@ionic/react';
import Botao from '../components/Botao';
import Input from '../components/Input';
import MensagemInvalida from '../components/MensagemInvalida';
import './Cadastro.css';

const Cadastro: React.FC = () => {
  return (
    <IonPage>
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
            <Input label="Email" labelPlacement="floating" fill="outline" color="medium" type='email'/>
            <MensagemInvalida />
            <Input label="Senha" labelPlacement="floating" fill="outline" color="medium" type='password'/>
            <MensagemInvalida />
            <Input label="Confirme sua senha" labelPlacement="floating" fill="outline" color="medium" type='password'/>
            <MensagemInvalida />
            <Botao expand="full" fill="solid" color="success">Entrar</Botao>
            <p>Já tem cadastro? volte para <a href="/">login</a></p>

          </div>
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
