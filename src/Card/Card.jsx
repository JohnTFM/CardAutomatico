import './styles.css'
function Card(props){

    return (
        <div className="card">
            <div className="textArea">
                {props.titulo}
            </div>

        </div>
    )

}

export default Card;