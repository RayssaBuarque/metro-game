import styles from './Header.module.css';
import { useState, useEffect } from 'react';

// ICONS
import Info from '../../assets/infoSquare.svg?react';
import Question from '../../assets/infoCircle.svg?react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const Header = ({
  pontuacao,
  mode,
  setMode,
  gameMode,
  setGameModePage,
  gameState,
  setGameState,
  setInfoState,
  setDescobertas,
  setInstructionState }) => {    
  
  /* 
    TEMPORIZADOR
        Ativa o timer apenas quando:
        1. O modo é "Pense rápido"
        2. O jogo está ativo (gameState = true)
        3. Ainda há tempo restante

        Quando o tempo acabar, para o timer e pausa o jogo
  */
  const periodoTimerSegundos = 180; 
  const [tempo, setTempo] = useState(periodoTimerSegundos);  
  const [timerActive, setTimerActive] = useState(false)
  const min = Math.floor(tempo / 60);
  const sec = tempo % 60;

  useEffect(() => {
    let interval = null;

    if (gameMode === 'Pense rápido' && gameState && (tempo > 0)) {
      setTimerActive(true);
      interval = setInterval(() => {
        setTempo(prevTempo => {

          // Fim de Jogo
          if (prevTempo <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            setGameState(false); 
            return 0;
          }

          return prevTempo - 1;
        });
      }, 1000);
    } else {
      setTimerActive(false);
    }

    // Cleanup do intervalo
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameMode, gameState, tempo, setGameState]);

  // Reseta o timer quando muda o modo de jogo
  useEffect(() => {
    setTempo(periodoTimerSegundos);
    setTimerActive(false);
  }, [gameMode, gameState]);

  // Função pra lidar com o modo escuro/claro
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const handleModeChange = (mode) => {
    setDescobertas([])
    setGameModePage(mode);
    setGameState(false); // Reseta o estado do jogo ao mudar o modo
  }

  return (
    <div className={styles.container}>
      {/* Botões de Modos de Jogo */}
      <div className={styles.gameModes}>
        {/* Botão de modo PENSE RAPIDO */}
        <div className={`${styles.modeButton}`} onClick={() => handleModeChange('Pense rápido')}>
          <h3 className={`${gameMode === 'Pense rápido' ? styles.modeSelected : styles.modeUnselected}`}>pense rápido</h3>
        </div>

        {/* Botão de modo EXPANSAO */}
        <div className={`${styles.modeButton}`} onClick={() => handleModeChange('Expansão')}>
          <h3 className={`${gameMode === 'Expansão' ? styles.modeSelected : styles.modeUnselected}`}>expansão</h3>
        </div>

        {/* Botão de modo CHEGANDO LA */}
        <div className={`${styles.modeButton}`} onClick={() => handleModeChange('Chegando lá')}>
          <h3 className={`${gameMode === 'Chegando lá' ? styles.modeSelected : styles.modeUnselected}`}>chegando lá</h3>
        </div>
      </div>
      
        {/* Título do jogo */}
        <div>
          <h1>metro</h1>
          <div className={styles.placar}>
            <h3 className={styles.tempo}>{(gameMode === 'Pense rápido') ? `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}` : ''}</h3>
            <h3 className={styles.pontuacao}>{pontuacao.toString().padStart(3, '0')}/174</h3>
          </div>
        </div>
        
        <div className={styles.extra}>
            {/* Botão de dark/light mode */}
            <div className={`${styles.toggleButton} ${mode === 'dark' ? styles.dark : styles.light}`}
                  onClick={toggleMode} >
                <div className={styles.circle}>
                    {mode === 'light' ? (
                      <MdOutlineDarkMode size={18} color="#DBA159" />
                    ) : (
                      <MdOutlineLightMode size={18} color="#494949" />
                    )}
                </div>
            </div>

            {/* Botão de Instruções */}
            <button
              onClick={() => setInstructionState(true)}>
                <Question style={{ color: 'var(--delicate_icon)', width: '25px', height: '25px' }} />
            </button>

            {/* Botão informativo*/}
            <button
              onClick={() => setInfoState(true)}>
                <Info style={{ color: 'var(--delicate_icon)', width: '25px', height: '25px' }} />
            </button>
        </div>
    </div>
  );
};
   
export default Header;