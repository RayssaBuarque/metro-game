import styles from './Header.module.css';

// ICONS
import Info from '../../assets/infoSquare.svg';

const Header = () => {
    return (
        <div className={styles.container}>
            <h1>metro</h1>
            {/* <Info style={{ fill: 'red' }} /> */}
            <div className={styles.icon}></div>
        </div>
    );
   };
   
export default Header;
   