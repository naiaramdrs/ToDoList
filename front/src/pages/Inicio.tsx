import { IonContent, IonPage} from '@ionic/react';
import Cabecalho from '../components/Cabecalho';
import Titulo from '../components/Titulo';
import "./Inicio.css"
import Cards from '../components/Cards';

const Inicio: React.FC = () => {

    return (
        <IonPage>
            <Cabecalho title = "ToDolist" args = "Entre"/>
            <IonContent fullscreen>
                <Titulo />

                <div className='caixa-inicio'>
                    <div className='box-conteudo'>
                        <div className='box-texto'>
                            <h2>Inscreva-se e melhore o seu jeito de organizar</h2>
                            <button><a href='/cadastro'>Inscreva-se</a></button>
                        </div>
                    </div>
                    <div className='box-inicio'>
                        <img src="./terefasok.png" alt="tarefas" />
                    </div>    
                </div>

                <div className='caixa-cards'>
                    <h1>Conheça as vantagens de se ter um gerenciador de tarefas</h1>
                </div>
            </IonContent>
        </IonPage>
    )
}


export default Inicio;