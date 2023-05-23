import { IonCheckbox } from '@ionic/react';
import "./Tasks.css"
import { Item } from '../../util/Item';
import { useState } from 'react';

type Props = {
    item: Item;
}


const Tasks = ({item}: Props) => {

    const [isChecked, setIsChecked] = useState(item.done)

    return (
        <>
            <section className="check-list">
                <ul className="list">
                    <li>
                        <div className="check">
                            <IonCheckbox 
                            checked={isChecked}
                            onChange={e => setIsChecked((e.target as HTMLInputElement).checked)}
                            />
                        </div>
                        <label className="task" id={item.done ? "marcado" : "nada"}>{item.nome}</label>
                        <button className="remove"></button>
                    </li>
                </ul>
            </section>
        </>
    )
  };
  
  export default Tasks;