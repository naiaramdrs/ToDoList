import { IonInput } from '@ionic/react';

const Input = (props:any) => {
  return (
    <>
      <IonInput label={props.label} labelPlacement= {props.labelPlacement} fill={props.fill} color={props.color} type={props.type}></IonInput>
      <br />
    </>
    );
};

export default Input;