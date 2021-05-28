// ReactNode para usar components react como props e childrens
import {createContext, useState, ReactNode, useEffect} from 'react';
// Biblioteca em JS que facilita a utilização de cookies
// importei @types/js-cookie em desenvolvimento para conseguir
// ver a tipagem dos objetos dessa bibioteca
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


export const ChallengesContext = createContext({} as ChallengeContextData);

interface ChallengesProviderProps{
    children: ReactNode;
    level : number;
    currentExperience: number;
    challengesCompleted: number;
}

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

// Typescript permite criar objetos tipados
interface ChallengeContextData{
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    completeChallenge: () => void,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    closeModal: () =>void
}

export function ChallengesProvider ({ children, ...rest }: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] =useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState( rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level +1) * 4, 2);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])

    // Quando utilizamos o useEffect com o segundo parâmetro vazio []
    // significa que queremos executar a primeira função somente uma vez quando 
    // o component for carregado
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp(){
        setLevel(level+1);
        setIsLevelUpModalOpen(true);
    }

    function closeModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor( Math.random()* challenges.length );
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio 🎉🎉', {
                body: `Valendo ${challenge.amount} exp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;
        let finalExperience = currentExperience + amount;
        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted+1);
    }

    return (
        <ChallengesContext.Provider value={
                {level, currentExperience, challengesCompleted,activeChallenge, 
                experienceToNextLevel, closeModal, completeChallenge, levelUp, startNewChallenge, resetChallenge}
            }>
            {children}

            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}
// Dois & é uma forma de ter um if sem um else