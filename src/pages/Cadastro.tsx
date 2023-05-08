import { IonContent, IonPage} from '@ionic/react';
import './Cadastro.css';
import CaixaCadastro from '../components/CaixaCadastro';

const Cadastro: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <CaixaCadastro />
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
