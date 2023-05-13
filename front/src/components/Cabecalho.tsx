import {IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './Cabecalho.css'

const Cabecalho = (props:any) => {

  return (
    <>
       <IonHeader collapse="fade">
        <IonToolbar>
          <IonTitle ><a href="/" className='titulo'>{props.title}</a></IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
}
export default Cabecalho;