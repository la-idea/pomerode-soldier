import { ChallengesContext } from '../context/ChallengeContext';
import styles from '../styles/components/ChallengeBox.module.css';
import {useContext} from 'react';
import { CountdownContext } from '../context/CountdownContext';

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const {resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded(){
        resetCountdown();
        completeChallenge();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} exp</header>
                    <main>
                        <img src={`${activeChallenge.type}.svg`} alt="Exercite-se"/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button type="button" onClick={handleChallengeFailed} className={styles.challengeFailedButton}>Falhei</button>
                        <button type="button" onClick={handleChallengeSucceeded} className={styles.challengeSucceededButton}>Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Inicie um ciclo para receber um desafio.</strong>
                    <p>
                        <img src="level-up.svg" alt="Level Up"/>
                        Avance de level completando os desafios.
                    </p>
                </div> 
            )}
            
        </div>
    );
}