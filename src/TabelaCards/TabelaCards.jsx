import Card from "../Card/Card";
import { useState} from "react";
import Input from "../Input/Input"

function TabelaCards(){
    let texto;
    const [touples, setTouples] = useState([
        ['','']
    ])
    const handleArquivoChange = (event) => {
        const arquivoSelecionado = event.target.files[0];
        const leitor = new FileReader();

        leitor.onload = (e)=>textoParaTuplas(e.target.result);


        leitor.readAsText(arquivoSelecionado)
    };

    function textoParaTuplas(bruto){
        texto = bruto.toUpperCase();
        let palavras = texto.split('\n')

        let pares = palavras.map(
            (palavra,index)=>{
                if(index%2!=0) return null;
                return [palavras[index],palavras[index+1]];
            }).filter( e=> e!=null);


        setTouples(pares)
    }




    return(
        <>
        <Input type={"file"} onChange={handleArquivoChange}/>
        <table>
            <tbody>
        {
            touples.map((tupla,index)=>{

               return (
                   <tr>
                   <td >
                       <Card titulo={touples[index][0]}/>
                   </td>
                   <td>
                       <Card titulo={touples[index][1]}/>
                   </td>
               </tr>
               )
            })

        }
            </tbody>
        </table>
        </>

    )
}

export default TabelaCards;