import './Mensagem.css'

const MensagemInvalida = (props: any) => {
  return (
    <div className="invalida">
      <span>{props.msg}</span>
    </div>
  );
};

export default MensagemInvalida;