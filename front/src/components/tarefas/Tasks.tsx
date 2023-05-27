import { IonCheckbox } from '@ionic/react';
import { Tarefa } from '../../util/Tarefa';
import "./Tasks.css"

type Props = {
    item: Tarefa;
    onChange: (id: number, done: boolean) => void
    deleteTask: (id: number) => void
    editTask: (item: Tarefa) => void
}

const Tasks = ({ item, onChange, deleteTask, editTask }: Props) => {

    return (
        <>
            <div className="check-list">
                <ul className="list">
                    <li id={item.concluida ? "marcado" : "nada"}>
                        <div className="check">
                            <IonCheckbox 
                            checked={item.concluida}
                            onIonChange={e => onChange(item.id, e.target.checked)}
                            color = 'success'
                            />
                        </div>

                        <label className="task">{item.nome}</label>
                        
                        <div>
                            <button className="remove" onClick={() => deleteTask(item.id)}>🗑️</button>
                            <button className='pincel' onClick={() => editTask(item)}>✏️</button>
                        </div>
                        
                        <span className='data-task'>{item.dataFormatada()}</span>
                    </li>
                </ul>
            </div>
        </>
    )
  };
  
  export default Tasks;