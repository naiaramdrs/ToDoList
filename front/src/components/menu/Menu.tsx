import { IonButtons, IonContent, IonHeader, IonInput, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import {KeyboardEvent, useEffect, useState} from 'react';
import Tasks from '../tarefas/Tasks';
import { Item } from '../../util/Item';
import "../../pages/Tarefas/Tarefas.css"
import "./Menu.css"
import { fetchAPI } from '../../api/request';

function Menu(props:any) {

  const [taskList, setTaskList] = useState<Record<number, Item>>({})
  const [editTask, setEditTask] = useState("")
  const [saveTask, setSaveTask] = useState(false)

  useEffect(() => {
    fetchAPI('/tarefas', {}, 'GET').then(data => {
      setTaskList(Object.fromEntries(data.map((x: any) => {
        return [
          x.id, {
            id: x.id,
            nome: x.nome,
            done: x.concluida,
            data: '1999-01-01'
          }
        ]
      })))
    });
  }, [])

  const [inputText, setInputText] = useState('')
  const myDate = new Date(Date.now()).toLocaleString().split(',')[0];

  const handleAddTask = (taskName: string) => {
    fetchAPI('/tarefas', {
      nome: taskName,
      descricao: 'nada..'
    }, 'POST').then(data => {
      setTaskList({ ...taskList, [data.id]: {
        id: data.id,
        nome: data.nome,
        done: data.concluida,
        data: '1999-01-01'
      }});
    });
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Enter' && inputText != ''){
      handleAddTask(inputText);
      setInputText('');
    }
  }

  const handleKeyUpSave = (e: KeyboardEvent) => {
    if (e.code === 'Enter' && inputText != ''){
      handleSaveTask();
      setInputText('');
    }
  }

  const handleTaskChange = (id: number, done: boolean) => {
    taskList[id].done = done;
    
    setTaskList({ ...taskList });

    const tarefa = taskList[id];
    fetchAPI(`/tarefas/${id}`, {
      nome: tarefa.nome,
      descricao: "... nada ainda",
      concluida: done
    }, 'PUT').then(_ => {
      console.log("tarefa atualizada!");
    })

  }

  const deleteTask = (id: number) => {
    delete taskList[id]

    setTaskList({ ...taskList })

    fetchAPI(`/tarefas/${id}`, {}, 'DELETE').then(_ => {
      console.log("tarefa deletada!");
    })
  }

  const handleSaveTask = () => {
    const tarefa = taskList[editTask as unknown as number]
    tarefa.nome = inputText;
    setEditTask(tarefa.id as unknown as string)
    setInputText(tarefa.nome as string)
    setSaveTask(false)
  }

  const handleEditTask = (id: number, nome: String) => {
    const tarefa = taskList[id]
    tarefa.nome = nome
    setInputText(nome as string)
    setEditTask(tarefa.id as unknown as string)
    setSaveTask(true)
  }  


  return (
   <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.dentro}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ul className='list-tarefas'>
            <li><a href='/meudia'>🌞 Meu Dia</a></li>
            <li><a href='/importante'>⭐ Importante</a></li>
            <li><a href='/planejado'>📅 Planejado</a></li>
        </ul>
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="success"></IonMenuButton>
          </IonButtons>
          <div className='tolbar-task'>
            <IonTitle><a href='/tarefas'>ToDolist</a></IonTitle>
            <IonItem>
              <IonAvatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonLabel><a href='/perfil'>Perfil</a></IonLabel>
            </IonItem>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className='container-todo'>
          <div className='todoList'>
            <header className='tituloMenu'>{props.principal}</header>

            {Object.values(taskList).map(item => (
              <Tasks
              key={item.id}
              item={item} 
              onChange={handleTaskChange}
              deleteTask={deleteTask}
              editTask = {handleEditTask}
              />
            ))}

            <br/>
            <footer>

              {saveTask ? (
                <IonInput
                labelPlacement="floating" 
                fill="outline" 
                label='Editando...'
                value={inputText}
                onIonChange={e => setInputText(e.target.value as string)}
                onKeyUp={handleKeyUpSave}
                color="success"
                ></IonInput>
              ) : (

                <IonInput
                labelPlacement="floating" 
                fill="outline" 
                label='O que você vai fazer?'
                value={inputText}
                onIonChange={e => setInputText(e.target.value as string)}
                onKeyUp={handleKeyUp}
                color="success"
                ></IonInput>
              )}

             
            </footer>
          </div>
        </div>
      </IonContent>
    </IonPage>
   </>
  );
}

export default Menu;
