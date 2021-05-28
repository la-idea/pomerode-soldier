import { useState, useEffect, useContext } from 'react';
import {CountdownContext} from '../context/CountdownContext'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    const {minutos, seconds, hasFinished, active, startCountdown, resetCountdown} = useContext(CountdownContext);

    const [minuteLeft,minuteRight] = String(minutos).padStart(2,'0').split('');
    const [secondLeft,secondRight] = String(seconds).padStart(2,'0').split('');

    

    return(
        <div>
            <div className = {styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span><span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span><span>{secondRight}</span>
                </div>
            </div>
            {hasFinished? 
                (<button disabled type="button" className={styles.countdownButton}>
                    Ciclo Finalizado
                </button>): 
                (<>
                     {active ? ( <button onClick={resetCountdown} type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                        Abandonar Ciclo
                        </button>) :
                        (<button onClick={startCountdown} type="button" className={styles.countdownButton}>
                        Iniciar o ciclo
                        </button>)
                }</>)           
            }           
        </div>        
    );
}

