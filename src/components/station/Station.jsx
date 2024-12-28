import styles from './Station.module.css';

const Station = ({name}) => {
    return (
        <div className={styles.container}>
            <div className={styles.dot}></div>
            <label> {name} </label>
        </div>
    );
   };
   
export default Station;
   