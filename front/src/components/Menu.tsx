import { IonButtons, IonContent, IonHeader, IonInput, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { getUsuario } from '../api/auth';
import React, {useState, useRef} from 'react';
import Tasks from './Tasks';
import "./Menu.css"

const Menu = (props:any) => {

  const [listaTarefas, setListaTarefas] = useState(() => {return []})
  const [tarefa, setTarefa] = useState(() => {return ''})

  const idTarefa = useRef(0)

  function adicionarTarefa (){
    setListaTarefas(old => { return [...old]})
    idTarefa.current++
  }


  return (
    <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.tituloDentro}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ul className='list-tarefas'>
            <li><a href='/tarefas'>🌞 Meu Dia</a></li>
            <li><a href='/tarefas'>⭐ Importante</a></li>
            <li><a href='/tarefas'>📅 Planejado</a></li>
            <li><a href='/tarefas'>🎭 Atribuido a mim</a></li>
        </ul>
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{props.tituloFora}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className='container-todo'>
          <div className='todoList'>
            <header>Bem-vindo { getUsuario()?.nome ?? 'NÃO LOGADO' }</header>
            <Tasks tarefa = "Tarefa 1"/>
            <Tasks tarefa = "Tarefa 2"/>
            <Tasks tarefa = "Tarefa 3"/>
            <br/>
            <footer>
              <IonInput labelPlacement="floating" fill="outline" label='O que você vai fazer?'></IonInput>
            </footer>
          </div>
        </div>
        
        
      </IonContent>
    </IonPage>
  </>
  )
};

export default Menu;
