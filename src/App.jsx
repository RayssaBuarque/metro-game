import { useState, useEffect } from 'react'
import './App.css'

// COMPONENTES
import Header from './components/header/Header'
import InsertionBar from './components/insertionBar/InsertionBar'
import InfoCard from './components/infoCard/InfoCard'
import { Canvas } from "./components/canvas/canvas";

// DADOS
import { coord_estacoes, coord_linhas } from './data/estacoes'

function App() {
  
  const [descobertas, setDescobertas] = useState([]);                           // Estações descobertas
  const [infoState, setInfoState] = useState(false);                            // Estado do card de informações (aberto/fechado)
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');   // modo light/dark

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  /*
    FUNÇÕES DE VALIDAÇÃO DE INPUTS DE ESTAÇÃO
      1. Normaliza o objeto das estações - tira acentos e usa lowercase
      2. Verifica se a estação existe (SIM: retorna nome - NÃO: retorna undefined)
      3. Atualiza a lista de estações descobertas
  */
  const coord_estacoes_normalized = Object.keys(coord_estacoes).reduce((acc, key) => {
    const normalizedKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-\s/g, "");
    acc[normalizedKey] = {
      nomeOriginal: key,
      dados: coord_estacoes[key]
    };
    return acc;
  }, {});

  const checkStationExistence = (name) => { 
    const normalized = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-\s/g, "");
    return (normalized in coord_estacoes_normalized) ? coord_estacoes_normalized[normalized]?.nomeOriginal : undefined;
  }

  const checkInput = (stationName) => {
    const estacao = checkStationExistence(stationName)
    if (estacao && !descobertas.includes(estacao)) {
      setDescobertas([...descobertas, estacao]);
    }
  }

  return (
    <div className={`container ${mode === 'dark' ? 'dark' : 'light'}`}>

      {/* Card Informativo sobre o jogo */}
      {infoState && <div className='backdrop' style={{ position: 'relative', zIndex: 0 }}></div>}
      {infoState && <InfoCard style={{ position: 'relative', zIndex: 2 }} setInfoState={setInfoState}/>}

      <Header pontuacao={descobertas.length} style={{position: "relative", zIndex: 1}} mode={mode} setMode={setMode} setInfoState={setInfoState}></Header>
      <Canvas estacoesDescobertas={descobertas} />
      <InsertionBar checkInput={checkInput}></InsertionBar>
    </div>
  )
}

export default App
