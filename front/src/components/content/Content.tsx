import './Content.css'

const Content = (props:any) => {

    return (
        <>
         <div className='caixa-inicio'>
                    <div className='box-conteudo'>
                        <div className='box-texto'>
                            <h2>{props.h2}</h2>
                            <a href='/cadastro'><button>Inscreva-se</button></a>
                        </div>
                    </div>
                    <div className='box-inicio'>
                        <img src={props.src} alt="tarefas" />
                    </div>    
                </div>
        </>
    )
  };
  
  export default Content;