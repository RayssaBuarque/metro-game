import { useState, useEffect } from 'react'
import './App.css'

// COMPONENTES
import Header from './components/header/Header'
import InsertionBar from './components/insertionBar/InsertionBar'
import Station from './components/station/Station'

// DADOS
import { validStations } from './data/validStations'

function App() {
  
  const [prevStations, setPrevStations] = useState([]); // Estações já listadas
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light'); // modo light/dark

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  // Função para verificar se a estação existe
  // (SIM: retorna seu nome - NÃO: retorna undefined)
  const checkStationExistence = (name) => { 
    const lowercase = name.toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/-\s/g, "")

    return validStations.find( station => station.name.toLowerCase()
                                                  .normalize("NFD")
                                                  .replace(/[\u0300-\u036f]/g, "")
                                                  .replace(/-\s/g, "") === lowercase)
  }

  // Função para manipular o envio do nome da estação
  const checkInput = (stationName) => {
    const res = checkStationExistence(stationName)
    if (res){
      setPrevStations((prev) =>{
        const updatedStations = [...prev];

        // Verifica se já existe uma linha correspondente
        const lineIndex = updatedStations.findIndex(
          (lineArray) => lineArray.length > 0 && lineArray[0].line === res.line
        );

        // Caso não exista, cria um novo array para essa linha
        if (lineIndex === -1) {
          updatedStations.push([res]);
        } else { // Ou add nova estação na linha, mantendo a ordem crescente
          updatedStations[lineIndex] = [...updatedStations[lineIndex], res,].sort((a, b) => a.pos - b.pos);
        }

        return updatedStations;
      })

    }
  }

  return (
    <div className={`container ${mode === 'dark' ? 'dark' : 'light'}`}>
      <Header mode={mode} setMode={setMode}></Header>

       <div className='canvas'>
        {/* Renderiza as estações já listadas */}
        {prevStations.map((line, index) => (
          <div key={index} className={`linha_${line[0].line}`}>
            {line.map((station, stationIndex) => (
            <Station
              key={stationIndex}
              name={station.name}
              line={station.line}
              left={station.left}
              right={station.right}/>
            ))}

          </div>
        ))}
      </div>

      <InsertionBar checkInput={checkInput}></InsertionBar>
    </div>
  )
}

export default App
