import styles from './gameTab.module.css';

const gameTab = ({setInstructionState, gameMode}) => {    
    
    return (
        <div className={styles.container}>
            <button 
                className={styles.closeCard}
                onClick={() => setInstructionState(false)}>Iniciar partida</button>

            <div className={styles.titulo}>
                <h2>{gameMode}</h2>
            </div>

            {/* Instruções variam de acordo com o modo de jogo selecionado: */}
            {(gameMode == "Pense rápido") && <div>
                <p>Dentro de 3 (três) minutos, você deve nomear</p>
                <p>o maior número de estações que puder.</p>
                <p>Sua memória é o seu único recurso.</p>
            </div>}

            {(gameMode == "Expansão") && <div>
                <p>Nomeie o maior número de estações do mapa que puder, sem consultar a internet.</p>
                <p>Leve o tempo que precisar.</p>
                <p>Sua memória é o seu único recurso.</p>
            </div>}

            {(gameMode == "Chegando lá") && <div>
                <p>Descubra um caminho que contecte duas estações.</p>
                <p>Leve o tempo que precisar.</p>
                <p>Sua memória é o seu único recurso.</p>
            </div>}

        </div>
    );
   };
   
export default gameTab;
   