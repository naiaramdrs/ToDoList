import { IonInput } from '@ionic/react';

const Input = (props:any) => {
  return (
    <>
      <IonInput onChange={props.onChange} value={props.value} label={props.label} labelPlacement= {props.labelPlacement} fill={props.fill} color={props.color} type={props.type}></IonInput>
    </>
    );
};

export default Input;