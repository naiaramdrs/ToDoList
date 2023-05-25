import { IonButtons, IonContent, IonHeader, IonInput, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import {KeyboardEvent, useEffect, useState} from 'react';
import Tasks from '../tarefas/Tasks';
import { Tarefa } from '../../util/Tarefa';
import "../../pages/Tarefas/Tarefas.css"
import "./Menu.css"

function Menu(props: any) {

  const [taskList, setTaskList] = useState<Record<number, Tarefa>>({})
  const [editTask, setEditTask] = useState("")
  const [saveTask, setSaveTask] = useState(false)

  useEffect(() => {
    Tarefa.fetchAll().then(tarefas => {
      const obj = Object.fromEntries(tarefas.map(tarefa => [tarefa.id, tarefa]))
      setTaskList(obj)
    })
  }, [])

  const [inputText, setInputText] = useState('')
  const myDate = new Date(Date.now()).toLocaleString().split(',')[0];

  const handleAddTask = (taskName: string) => {
    Tarefa.criar(taskName, 'FALTA A DATA!!!').then(tarefa => {
      setTaskList({
        ...taskList,
        [tarefa.id]: tarefa
      })
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
    taskList[id].concluida = done;
    
    setTaskList({ ...taskList });

    taskList[id].atualizar();
  }

  const deleteTask = (id: number) => {
    taskList[id].deletar();

    delete taskList[id]

    setTaskList({ ...taskList })
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
            <li><a href='/minhasTarefas'>🌞 Minhas Tarefas</a></li>
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
