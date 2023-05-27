import { IonButtons, IonContent, IonHeader, IonInput, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAvatar, IonItem, IonLabel} from '@ionic/react';
import {KeyboardEvent, useEffect, useState} from 'react';
import Tasks from '../tarefas/Tasks';
import { Tarefa } from '../../util/Tarefa';
import "../../pages/Tarefas/Tarefas.css"
import "./Menu.css"
import Avatar from '../../pages/Perfil/Avatar';
import { Usuario } from '../../util/Usuario';

function Menu(props: any) {

  const [taskList, setTaskList] = useState<Record<number, Tarefa>>({})
  const [editingTaskId, setEditingTaskId] = useState(-1)

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

    // se o usuario está editando a tarefa no momento tem que resetar o input
    if (id == editingTaskId) {
      setEditingTaskId(-1);
      setInputText('');
    }

    delete taskList[id]

    setTaskList({ ...taskList })
  }

  const handleSaveTask = () => {
    const tarefa = taskList[editingTaskId]
    tarefa.nome = inputText;

    setTaskList({ ...taskList });

    tarefa.atualizar();

    setEditingTaskId(-1)
  }

  const handleEditTask = (tarefa: Tarefa) => {
    setInputText(tarefa.nome)

    setEditingTaskId(tarefa.id)
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
              <Avatar label = "Perfil"/>
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
              editTask={handleEditTask}
              />
            ))}

            <br/>
            <footer>

              {editingTaskId !== -1 ? (
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
