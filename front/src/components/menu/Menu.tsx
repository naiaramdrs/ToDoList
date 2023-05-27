import {KeyboardEvent, useEffect, useState} from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonItem } from '@ionic/react';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';
import { Tarefa } from '../../util/Tarefa';
import Tasks from '../tarefas/Tasks';
import Avatar from '../../pages/Perfil/Avatar';
import "./Menu.css"
import "../../pages/Tarefas/Tarefas.css"


function Menu(props: any) {

  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (event: CustomEvent) => {
    const seleteValue = event.detail.value;
    setSelectedDate(seleteValue);
  };

  const ButtonClick = () => {
    setData(selectedDate);
  };


  const [taskList, setTaskList] = useState<Record<number, Tarefa>>({})
  const [editingTaskId, setEditingTaskId] = useState(-1)
  const [inputText, setInputText] = useState('')
  const [data, setData] = useState(new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'}))
  
  useEffect(() => {
    Tarefa.fetchAll().then(tarefas => {
      const obj = Object.fromEntries(tarefas.map(tarefa => [tarefa.id, tarefa]))
      setTaskList(obj)
    })
  }, [])

  // adiciona uma tarefa na lista
  const handleAddTask = (taskName: string) => {
    Tarefa.criar(taskName, 'FALTA A DATA!!!').then(tarefa => {
      setTaskList({
        ...taskList,
        [tarefa.id]: tarefa
      })
    });
  }

  // se o usuario apertar enter, adiciona a tarefa
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Enter' && inputText != ''){
      handleAddTask(inputText)
      setInputText('')
    }
  }

  // se o usuario apertar enter, salva a tarefa
  const handleKeyUpSave = (e: KeyboardEvent) => {
    if (e.code === 'Enter' && inputText != ''){
      handleSaveTask()
      setInputText('')
    }
  }

  // ainda não está funcionando
  const onClickSaveDate = () => {
      data;
  }

  // marca a tarefa como concluida ou não concluida
  const handleTaskChange = (id: number, done: boolean) => {
    taskList[id].concluida = done
    
    setTaskList({ ...taskList })
    taskList[id].data = data
    setData(data)
    taskList[id].atualizar()
  }

  // deleta a tarefa da lista
  const deleteTask = (id: number) => {
    taskList[id].deletar()

    // se o usuario está editando a tarefa no momento tem que resetar o input
    if (id == editingTaskId) {
      setEditingTaskId(-1)
      setInputText('')
    }

    delete taskList[id]

    setTaskList({ ...taskList })
  }

  // salva a tarefa editada
  const handleSaveTask = () => {
    const tarefa = taskList[editingTaskId]
    tarefa.nome = inputText

    setTaskList({ ...taskList })
    setData(tarefa.data)

    tarefa.atualizar()

    setEditingTaskId(-1)
  }

  // edita a tarefa
  const handleEditTask = (tarefa: Tarefa) => {
    setInputText(tarefa.nome)
    setData(tarefa.data)
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
              datas={data}
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

              <div className='data-tarefas'>
                <h2>Escolha uma data para sua tarefa</h2>
                <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime" onIonChange={handleDateChange}></IonDatetime>
                </IonModal>
                <br/>
                <IonButton onClick={ButtonClick} color="success">Obter Data</IonButton>
              </div>

             
            </footer>
          </div>
        </div>
      </IonContent>
    </IonPage>
   </>
  );
}

export default Menu;
