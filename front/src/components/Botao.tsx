import { IonButton } from '@ionic/react';

const Botao = (props:any) => {

  return <IonButton onClick={props.onClick} expand={props.expand} fill={props.fill} color={props.color}>Entrar</IonButton>;
};

export default Botao;
