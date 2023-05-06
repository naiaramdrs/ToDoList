import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CaixaLogin from '../components/CaixaLogin';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <CaixaLogin />
      </IonContent>
    </IonPage>
  );
};

export default Home;
