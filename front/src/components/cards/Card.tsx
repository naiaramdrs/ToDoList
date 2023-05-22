import "./Card.css"

const Card = (props:any) => {

    return (
        <>
            <div className='card-one'>
                <div className='card-image'>
                    <img src={props.src} alt={props.alt} />    
                </div>
                <div className='card-body'>
                    <h4>{props.h4}</h4>
                    <p>{props.p}</p>
                </div>
            </div>
        </>
    )
  };
  
  export default Card;