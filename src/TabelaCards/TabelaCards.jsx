import Card from "../Card/Card";
import { useState } from "react";
import Input from "../Input/Input";
import "./TabelaCards.css";

class TextoError extends Error {}

function TabelaCards() {
    const [touples, setTouples] = useState([['', '']]);
    const [modoEntrada, setModoEntrada] = useState('arquivo');
    const [textoLivre, setTextoLivre] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [temaSelecionado, setTemaSelecionado] = useState("primary");
    const [itensPorLinha, setItensPorLinha] = useState(2); // default

    const temasDisponiveis = ["primary", "arquidiocese"];

    const temaToClasses = (tema) => ({
        cardClass: `card-${tema}`,
        divtextAreaClass: `textArea-${tema}`,
    });

    const handleArquivoChange = (event) => {
        const arquivoSelecionado = event.target.files[0];
        if (!arquivoSelecionado) return alert("Nenhum arquivo selecionado!");

        const extensao = arquivoSelecionado.name.split('.').pop().toLowerCase();
        if ((extensao !== arquivoSelecionado.name) && extensao !== "txt")
            return alert("Somente arquivos .txt são permitidos!");

        const leitor = new FileReader();
        leitor.onload = (e) => {
            const conteudo = e.target.result;
            const ilegiveis = conteudo.match(/[^\x20-\x7E\n\r\u00A0-\uFFFF]/g);
            if (ilegiveis) return alert("O arquivo contém caracteres ilegíveis.");

            setTouples([['', '']]);
            textoParaTuplas(conteudo);
        };
        leitor.onerror = () => alert("Erro ao ler o arquivo!");
        leitor.readAsText(arquivoSelecionado);
    };

    const textoParaTuplas = (txtBruto) => {
        let texto = txtBruto;
        if (!texto) throw new TextoError("O texto está vazio!");

        let palavras = texto.split('\n');
        let pares = palavras
            .map((_, i) => i % 2 === 0 ? [palavras[i], palavras[i + 1]] : null)
            .filter(e => e != null);

        setTouples(pares);
    };

    const handleRenderTextoLivre = () => {
        try {
            textoParaTuplas(textoLivre);
        } catch (e) {
            alert(e.message);
        }
    };

    const handleImagemChange = (e) => {
        const arquivo = e.target.files[0];
        if (!arquivo) return;

        const url = URL.createObjectURL(arquivo);
        setBackgroundImage(url);
    };

    const dividirEmLinhas = (array, tamanho) => {
        const linhas = [];
        for (let i = 0; i < array.length; i += tamanho) {
            linhas.push(array.slice(i, i + tamanho));
        }
        return linhas;
    };

    return (
        <>
            <div className="no-print" style={{ marginBottom: '1rem' }}>
                <label>Modo de entrada:&nbsp;</label>
                <select value={modoEntrada} onChange={(e) => setModoEntrada(e.target.value)}>
                    <option value="arquivo">Arquivo</option>
                    <option value="texto">Texto Livre</option>
                </select>
            </div>

            {modoEntrada === 'arquivo' ? (
                <div className="no-print">
                    <Input type="file" onChange={handleArquivoChange} />
                </div>
            ) : (
                <div className="no-print" style={{ marginBottom: '1rem' }}>
                    <textarea
                        rows={10}
                        cols={60}
                        value={textoLivre}
                        onChange={(e) => setTextoLivre(e.target.value)}
                        placeholder="Cole o conteúdo aqui..."
                    />
                    <br />
                    <button onClick={handleRenderTextoLivre}>Renderizar</button>
                </div>
            )}

            <div className="no-print" style={{ marginBottom: '1rem' }}>
                <label>Imagem de fundo dos Cards:&nbsp;</label>
                <input type="file" accept="image/*" onChange={handleImagemChange} />
            </div>

            <div className="no-print" style={{ marginBottom: '1rem' }}>
                <label>Tema visual:&nbsp;</label>
                <select value={temaSelecionado} onChange={(e) => setTemaSelecionado(e.target.value)}>
                    {temasDisponiveis.map((tema) => (
                        <option key={tema} value={tema}>{tema}</option>
                    ))}
                </select>
            </div>

            <div className="no-print" style={{ marginBottom: '1rem' }}>
                <label>Itens por linha:&nbsp;</label>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={itensPorLinha}
                    onChange={(e) => setItensPorLinha(parseInt(e.target.value))}
                />
            </div>

            {/* Renderização dinâmica */}
            <table style={{ width: '210mm', borderCollapse: 'collapse', marginLeft: 0 }}>
                <tbody>
                {dividirEmLinhas(touples, itensPorLinha).map((linha, i) => (
                    <tr key={i}>
                        {linha.map((tupla, index) => (
                            <td key={index} style={{ padding: '10px', verticalAlign: 'top' }}>
                                {tupla[0] && (
                                    <div style={{ marginBottom: '10px' }}>
                                        <Card
                                            titulo={tupla[0]}
                                            backgroundImage={backgroundImage}
                                            theme={temaToClasses(temaSelecionado)}
                                        />
                                    </div>
                                )}
                                {tupla[1] && (
                                    <div>
                                        <Card
                                            titulo={tupla[1]}
                                            backgroundImage={backgroundImage}
                                            theme={temaToClasses(temaSelecionado)}
                                        />
                                    </div>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default TabelaCards;
