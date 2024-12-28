import styles from './Station.module.css';

const Station = ({name, line, left, right}) => {
    return (
        <div className={styles.container}>
            <div className={styles.station}>
            { (left == null) &&
                <div
                    style={{ backgroundColor: `var(--linha_${line})` }} 
                    className={styles.lineTag}>
                    <label>{line}</label>
                </div>        
            }
            
                <div 
                    className={styles.left}
                    style={{ backgroundColor: `var(--linha_${(left != null)? line : "transparent"})` }} ></div>
                <div
                    className={styles.dot}
                    style={{ backgroundColor: `var(--linha_${line})` }} ></div>

                <div
                    className={styles.right}
                    style={{ backgroundColor: `var(--linha_${(right != null)? line : "transparent"})` }} ></div>
            </div>

            <label> {name} </label>
        </div>
    );
   };
   
export default Station;
   