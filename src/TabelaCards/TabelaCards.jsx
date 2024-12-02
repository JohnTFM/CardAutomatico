import Card from "../Card/Card";
import { useState} from "react";
import Input from "../Input/Input"

class TextoError extends Error {
}

function TabelaCards(){



    console.log("Declaração 'touples'")
    const [touples, setTouples] = useState([
        ['','']
    ])

    const handleArquivoChange = (event) => {
        console.log("NÓ 1")
        console.log("Declaração local 'arquivoSelecionado'");
        const arquivoSelecionado = event.target.files[0];

        if (!arquivoSelecionado) {
            console.log("NÓ 2 - Fim")
            alert("Nenhum arquivo selecionado!");
            return;
        }

        console.log("NÓ 3")

        const extensao = arquivoSelecionado.name.split('.').pop().toLowerCase();
        if (
            (extensao!== arquivoSelecionado.name ) &&
            extensao !== "txt")
        {
            console.log("NÓ 4 - Fim")
            alert("Somente arquivos .txt são permitidos!" + extensao);
            return;
        }
        console.log("NÓ 5")
        console.log("Declaração local 'leitorArquivos'");
        const leitorArquivos = new FileReader();

        leitorArquivos.onload = (e) => {
            const conteudo = e.target.result;

            const caracteresIlegiveis = conteudo.match(/[^\x20-\x7E\n\r\u00A0-\uFFFF]/g);
            if (caracteresIlegiveis && caracteresIlegiveis.length > 0) {
                console.log("NÓ 6 - Fim")
                alert("O arquivo contém caracteres ilegíveis e não é reconhecido como um arquivo de texto.");
                return;
            }else{
                console.log("NÓ 7")
                setTouples(  [
                    ['','']
                ])
            }

            textoParaTuplas(conteudo);
        };

        leitorArquivos.onerror = (e) => {
            console.error(e);
            alert("Um erro desconhecido ocorreu!");
        };

        // Tenta ler o arquivo como texto
        leitorArquivos.readAsText(arquivoSelecionado);
    };



    function textoParaTuplas(txtBruto){

        console.log("Definição local da variável 'texto'")
        let texto = txtBruto.toUpperCase();

        if(!texto){
            console.log("NÓ 8  - Fim")
            throw new TextoError("O texto do arquivo se encontra vazio!")
        }

        console.log("NÓ 9 - Fim")

        console.log("Declaração da variável local 'palavras'")
        let palavras = texto.split('\n')

        console.log("Declaração da variável local 'pares'")
        let pares = palavras.map(

            (palavra,index)=>{

                if(index%2!==0) return null;

                return [palavras[index],palavras[index+1]];

            }).filter( e=> e!=null);

        console.log("Definição da variável global 'touples'")

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
                               <tr key={tupla[0]?.toString()}>
                                       <td >
                                           { touples[index][0] ?
                                               <Card  titulo={touples[index][0]}/>
                                               :
                                               <></>
                                           }
                                       </td>
                                       <td>
                                           { touples[index][1] ?
                                               <Card  titulo={touples[index][1]}/>
                                               :
                                               <></>
                                           }
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