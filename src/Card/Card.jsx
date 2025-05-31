import './styles.css';

function Card(props) {

    const cardClass = props?.theme?.cardClass ?? "card-primary";

    const insideDivClass = props?.theme?.divtextAreaClass ?? "textArea-primary";

    const estiloCard = {
        backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : undefined,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className={cardClass} style={estiloCard}>
            <div className={insideDivClass}>
                {props.titulo}
            </div>
        </div>
    );
}

export default Card;
