import { IonContent, IonPage} from '@ionic/react';
import CaixaLogin from '../components/CaixaLogin';
import './Login.css';


const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <CaixaLogin />
      </IonContent>
    </IonPage>
  );
};

export default Login;
