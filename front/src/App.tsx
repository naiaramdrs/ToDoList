import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Cadastro from './pages/Cadastro/Cadastro';
import Inicio from './pages/Inicial/Inicio';
import Tarefas from './pages/Tarefas/Tarefas';
import MeuDia from './pages/Tarefas/meuDia/MeuDia';
import Importante from './pages/Tarefas/importante/Importante';
import Planejado from './pages/Tarefas/planejado/Planejado';
import Perfil from './pages/Perfil/Perfil';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route exact path="/tarefas">
          <Tarefas />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/cadastro">
          <Cadastro />
        </Route>
        <Route exact path="/meudia">
          <MeuDia />
        </Route>
        <Route exact path="/importante">
          <Importante />
        </Route>
        <Route exact path="/planejado">
          <Planejado />
        </Route>
        <Route exact path="/perfil">
          <Perfil />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
