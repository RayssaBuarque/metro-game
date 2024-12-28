import styles from './InfoCard.module.css';

// IMAGEM
import devPhoto from '../../assets/rayssa.jpg' 

const InfoCard = ({setInfoState}) => {    
    return (
        <div className={styles.container}>
            <button 
                className={styles.closeCard}
                onClick={() => setInfoState(false)}>X</button>

            <div className={styles.left}>
                <p><b>Já parou pra pensar em quantas horas do seu dia são passadas dentro de um vagão?</b></p>

                <div className={styles.funInfo}>
                    <p>O tempo médio de deslocamento dos paulistanos para todas as atividades   diárias em transporte público é de <a target='_blank' href='https://www.  nossasaopaulo.org.br/2024/09/19/  tempo-de-deslocamento-por-transporte-publico-aumenta-em-sao-paulo-e-chega-a-2h47- por-dia/'>2h47</a>.</p>
                    <p>Uma das maneiras mais rápidas de se deslocar pela cidade é por meio das  linhas da rede metropolitana de transporte ferroviário de São Paulo, que por sinal, também é a maior de toda a América Latina.</p>
                </div>
            </div>

            <div className={styles.right}>
                
                <div className={styles.devInfo}>
                    <img src={devPhoto}/>
                    <h2>Olá Mundo! 👋</h2>

                    <p>O <b>metro</b> foi um jogo criado por mim, <a target='_blank' href='https://www. linkedin.com/in/rayssabuarque/'>Rayssa Buarque</a>, em dezembro de 2024 e tem como   único objetivo testar seus conhecimentos:</p>
                </div>
                
                <p><b>Quantas das 184 estações do trem e do metrô de São Paulo você é capaz de nomear com apenas a sua memória?</b></p>
            </div>        
        </div>
    );
   };
   
export default InfoCard;
   