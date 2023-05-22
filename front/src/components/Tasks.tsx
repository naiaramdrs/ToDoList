import { IonCheckbox } from '@ionic/react';
import "./Tasks.css"

const Tasks = (props:any) => {

    return (
        <>
            <section className="check-list">
                <ul className="list">
                    <li>
                        <div className="check">
                            <IonCheckbox />
                        </div>
                        <label className="task">{props.tarefa}</label>
                        <button className="remove"></button>
                    </li>
                </ul>
            </section>
        </>
    )
  };
  
  export default Tasks;