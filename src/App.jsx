import { useState, useEffect } from 'react'
import './App.css'

// COMPONENTES
import Header from './components/header/Header'
import InsertionBar from './components/insertionBar/InsertionBar'
import InfoCard from './components/infoCard/InfoCard'
import InstructionCard from './components/instructionCard/InstructionCard'
import { Canvas } from "./components/canvas/canvas";

// DADOS
import { coord_estacoes, coord_linhas } from './data/estacoes'

function App() {
  
  const [descobertas, setDescobertas] = useState([]);                           // Estações descobertas
  const [infoState, setInfoState] = useState(false);                            // Estado do card de informações (aberto/fechado)
  const [instructionState, setInstructionState] = useState(false);              // Estado do card de instruções (aberto/fechado)
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'dark');   // modo light/dark
  const [gameMode, setGameMode] = useState('Expansão');                         // modo de jogo selecionado
  const [gameState, setGameState] = useState(false);                                  // estado do jogo (ativo/inativo)

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
      {(infoState || instructionState) && <div className='backdrop'></div>}
      {infoState && <InfoCard style={{ position: 'relative', zIndex: 1002 }} setInfoState={setInfoState}/>}
      {instructionState && <InstructionCard gameMode={gameMode} style={{ position: 'relative', zIndex: 1002 }} setInstructionState={setInstructionState} />}

      <Header
        style={{position: "relative", zIndex: 1}}
        mode={mode}
        setMode={setMode}
        pontuacao={descobertas.length}
        setInfoState={setInfoState}
        gameMode={gameMode} 
        setGameModePage={setGameMode}
        gameState={gameState}
        setGameState={setGameState}
        setDescobertas={setDescobertas}
        setInstructionState={setInstructionState} />
      <Canvas
        gameMode={gameMode}
        gameState={gameState}
        setGameState={setGameState}
        estacoesDescobertas={descobertas} />
      <InsertionBar
        gameState={gameState}
        gameMode={gameMode}
        checkInput={checkInput}></InsertionBar>
    </div>
  )
}

export default App
