import styles from './Header.module.css';
import { useState, useEffect } from 'react';

// ICONS
import Info from '../../assets/infoSquare.svg?react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const Header = ({ mode, setMode }) => {    
      const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
      };

    return (
        <div className={styles.container}>
            {/* Título do jogo */}
            <h1>metro</h1>
            
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

                {/* Botão informativo*/}
                <button>
                    <Info style={{ color: 'var(--delicate_icon)', width: '25px', height: '25px' }} />
                </button>
            </div>
        </div>
    );
   };
   
export default Header;
   