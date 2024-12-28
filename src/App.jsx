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
                                                  .replace(/-\s/g, "") === lowercase )
  }

  // Função para manipular o envio do nome da estação
  const checkInput = (stationName) => {
    const res = checkStationExistence(stationName)
    if (res)
      setPrevStations((prev) => [...prev, res])
  }

  return (
    <div className={`container ${mode === 'dark' ? 'dark' : 'light'}`}>
      <Header mode={mode} setMode={setMode}></Header>

       <div className='canvas'>
        {/* Renderiza as estações já listadas */}
        {prevStations.map((station, index) => (
          <Station
            key={index}
            name={station.name}
            line={station.lines[0]}
            left={station.left}
            right={station.right}/>
        ))}
      </div>

      <InsertionBar checkInput={checkInput}></InsertionBar>
    </div>
  )
}

export default App
