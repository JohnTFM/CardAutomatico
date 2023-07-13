import {useState} from "react";


function  Input (props){

    const [ocultarComponente, setOcultarComponente] = useState(false);

    const handleComponenteClick = () => {
        setOcultarComponente(!ocultarComponente);
    };


    return (<>
        <input type={props.type} onChange={props.onChange} onClick={handleComponenteClick}/>



        </>)
}
export default Input