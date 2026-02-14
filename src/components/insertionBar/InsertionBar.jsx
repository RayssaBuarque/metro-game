import { useState } from 'react';
import styles from './InsertionBar.module.css';

const InsertionBar = ({checkInput, gameState, gameMode}) => {
    const [stationInput, setStationInput] = useState(""); // Armazena a estação digitada
    
    const handleInput = (e) => {
        if (e.key === "Enter" && stationInput.trim() !== ""){
            checkInput(stationInput.trim()); // Adiciona a estação à lista
            setStationInput('')
        }
    }

    return (
        <div className={styles.container}>
            <input 
                type="text"
                value={stationInput}
                onChange={(e) => setStationInput(e.target.value)}
                placeholder="Nomeie uma estação..."
                onKeyDown={handleInput}
                disabled={(!gameState && gameMode != "Expansão")} // Desativa o input se o jogo não estiver ativo ou se estiver no modo "Expansão"
                />
        </div>
    );
   };
   
export default InsertionBar;
   