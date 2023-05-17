import { IonInput } from '@ionic/react';

export interface FormValue {
  value: string,
  invalidity: string
};

export interface InputProps {
  value: FormValue,
  setValue: (x: FormValue) => void,
  label: string,
  labelPlacement?: string,
  fill?: string,
  color?: string,
  type?: string
};

const Input = (props: InputProps) => {
  return (
    <>
      <IonInput
        onIonChange={e => props.setValue({ ...props.value, value: e.target.value as string })}
        value={props.value.value}
        label={props.label}
        labelPlacement={props.labelPlacement as any ?? 'floating'}
        fill={props.fill as any ?? 'outline'}
        color={props.color ?? 'medium'}
        type={props.type as any ?? 'text'}
      ></IonInput>
    </>
    );
};

export default Input;