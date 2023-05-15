import { IonContent, IonPage} from '@ionic/react';
import Cabecalho from '../components/Cabecalho';
import Titulo from '../components/Titulo';
import Content from '../components/Content';
import "./Inicio.css"
import Card from '../components/Card';

const Inicio: React.FC = () => {

    return (
        <IonPage>
            <Cabecalho title = "ToDolist" args = "Entre"/>
            <IonContent fullscreen>
                <Titulo />

               <Content h2 = "Inscreva-se e melhore o seu jeito de organizar" src = "./terefasok.png"/>

                <div className='container-cards'>
                    <Card 
                    src = "./organizar.png" 
                    alt = "organizar" 
                    h4 = "Organização"
                    p = "Um gerenciador de tarefas permite que você organize suas tarefas em listas, categorias, ou em ordem de prioridade, para que você possa visualizar suas atividades de maneira clara e organizada."/>

                    <Card 
                    src = "./priorizar.png" 
                    alt = "priorizar" 
                    h4 = "Priorização"
                    p = "Com um gerenciador de tarefas, você pode facilmente priorizar suas tarefas com base em sua importância ou urgência, o que ajuda a garantir que as atividades mais importantes sejam concluídas primeiro."/>

                    <Card 
                    src = "./facilidade.png" 
                    alt = "facilitar" 
                    h4 = "Aumento da produtividade"
                    p = "Um gerenciador de tarefas ajuda a aumentar a produtividade, permitindo que você se concentre nas tarefas mais importantes e reduza o tempo gasto em atividades menos relevantes."/>


                </div>

               <Content h2 = "Não perca tempo se está  tentando ser mais organizado" src = "./todook.png"/>
            </IonContent>
        </IonPage>
    )
}


export default Inicio;