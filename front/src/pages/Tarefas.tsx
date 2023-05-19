import { IonInput, IonPage } from '@ionic/react';
import { IonContent } from "@ionic/react";
import Menu from "../components/Menu";
import "./Tarefas.css"


function Tarefas() {
  return (
   <>
    <Menu tituloDentro = "Tarefas" tituloFora = "ToDolist" />
   </>
  );
}
export default Tarefas;