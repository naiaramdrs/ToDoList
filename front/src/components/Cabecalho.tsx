import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './Cabecalho.css'

const Cabecalho = (props:any) => {

  return (
    <>
       <IonHeader collapse="fade">
        <IonToolbar>
          <IonTitle >
            <div className='container'>
              <div className='primeira-caixa'>
                <img src="/check.png" alt="check" className="logo-tipo"/>
                <a href="/" className='titulo'>{props.title}</a>
              </div>

              <div className='segunda-caixa'>
                <a href={props.link} className='botao'>{props.args}</a>
              </div>
              
            </div>
            </IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
}
export default Cabecalho;