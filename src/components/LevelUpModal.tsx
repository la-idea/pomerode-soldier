import { useContext } from 'react'
import { ChallengesContext } from '../context/ChallengeContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
    const { level, closeModal} = useContext(ChallengesContext);

    return( 
        <div className = {styles.overlay}>        
            <div className = {styles.container}>
                <header>{level}</header>
                <strong>PARABÉNS!!</strong>
                <p>Você alcançou um novo level.</p>
                <button type='button' onClick={closeModal}>
                    <img src="close.svg" alt="Fechar Modal"/>
                </button>
            </div>
        </div>
    )
}