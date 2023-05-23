import { IonCheckbox } from '@ionic/react';
import "./Tasks.css"
import { Item } from '../../util/Item';
import { useState } from 'react';

type Props = {
    item: Item;
    onChange: (id: number, done: boolean) => void
    deleteTask: (id: number) => void
}

const Tasks = ({ item, onChange, deleteTask }: Props) => {

    return (
        <>
            <div className="check-list">
                <ul className="list">
                    <li id={item.done ? "marcado" : "nada"}>
                        <div className="check">
                            <IonCheckbox 
                            checked={item.done}
                            onIonChange={e => onChange(item.id, e.target.checked)}
                            />
                        </div>
                        <label className="task">{item.nome}</label>
                        <button className="remove" onClick={() => deleteTask(item.id -1)}></button>
                        <span className='data-task'>{item.data}</span>
                    </li>
                </ul>
            </div>
        </>
    )
  };
  
  export default Tasks;