import { IonCheckbox } from '@ionic/react';
import "./Tasks.css"
import { Item } from '../../util/Item';
import { useState } from 'react';
import { Style } from '@capacitor/status-bar';

type Props = {
    item: Item;
    onChange: (id: number, done: boolean) => void
}

const Tasks = ({ item, onChange }: Props) => {

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
                        <button className="remove"></button>
                    </li>
                </ul>
            </div>
        </>
    )
  };
  
  export default Tasks;