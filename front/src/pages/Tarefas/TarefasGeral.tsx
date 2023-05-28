import { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonItem } from '@ionic/react';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';
import { Tarefa } from '../../util/Tarefa';
import Tasks from '../../components/tarefas/Tasks';
import Avatar from '../Perfil/Avatar';
import './TarefasGeral.css'
import './Tarefas.css'


function TarefasGeral() {

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event: CustomEvent) => {
    setSelectedDate(new Date(event.detail.value));
  };

  const [taskList, setTaskList] = useState<Record<number, Tarefa>>({})
  const [editingTaskId, setEditingTaskId] = useState(-1)
  const isEditing = useMemo(() => editingTaskId !== -1, [editingTaskId])
  const [inputText, setInputText] = useState('')
  
  useEffect(() => {
    Tarefa.fetchAll().then(tarefas => {
      const obj = Object.fromEntries(tarefas.map(tarefa => [tarefa.id, tarefa]))
      setTaskList(obj)
    })
  }, [])

  // adiciona uma tarefa na lista
  const handleAddTask = () => {
    Tarefa.criar(inputText, selectedDate).then(tarefa => {
      setTaskList({
        ...taskList,
        [tarefa.id]: tarefa
      })
    });
  }

  // se o usuario apertar enter, adiciona ou salva a tarefa
  const handleKeyUp = (e: KeyboardEvent) => {
    if (!inputText) return;
    if (e.code === 'Enter') {
      if (isEditing)
        handleSaveTask()
      else
        handleAddTask()
      setInputText('')
    }
  }


  // marca a tarefa como concluida ou não concluida
  const handleTaskChange = (id: number, done: boolean) => {
    taskList[id].concluida = done
    taskList[id].data = selectedDate
    
    setTaskList({ ...taskList })

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
    tarefa.data = selectedDate

    setTaskList({ ...taskList })

    tarefa.atualizar()

    setEditingTaskId(-1)
  }

  // edita a tarefa
  const handleEditTask = (tarefa: Tarefa) => {
    setInputText(tarefa.nome)
    setEditingTaskId(tarefa.id)
    setSelectedDate(tarefa.data)
  }

  const handleEnviarButton = () => {
    if (!inputText) return;
    if (isEditing)
      handleSaveTask()
    else
      handleAddTask()
    setInputText('')
  }

  return (
   <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Minhas Tarefas</IonTitle>
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
            <header className='tituloMenu'>LISTA DE TAREFAS</header>

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

              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <IonInput
                  labelPlacement="floating" 
                  fill="outline" 
                  label={isEditing ? 'Editando...' : 'O que você vai fazer?'}
                  value={inputText}
                  onIonChange={e => setInputText(e.target.value as string)}
                  onKeyUp={handleKeyUp}
                  color="success"
                  slot="end"
                ></IonInput>
                <br/>
               <IonButton onClick={handleEnviarButton} color="success">{isEditing ? 'Salvar' : 'Enviar'}</IonButton>
              </div>

              <div className='data-tarefas'>
                <h2>Escolha uma data para esta tarefa</h2>
                <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                <IonModal keepContentsMounted={true}>
                  <IonDatetime
                  id="datetime" onIonChange={handleDateChange} value={selectedDate.toISOString()}
                 ></IonDatetime>
                </IonModal>
              </div>

             
            </footer>
          </div>
        </div>
      </IonContent>
    </IonPage>
   </>
  );
}

export default TarefasGeral;
