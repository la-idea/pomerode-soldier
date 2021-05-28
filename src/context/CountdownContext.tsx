import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengeContext";

interface CountdownContextData{
    minutos: number;
    seconds: number;
    hasFinished: boolean;
    active: boolean;
    startCountdown: ()=> void;
    resetCountdown: ()=>void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownContextProvider({children}: CountdownProviderProps){
    const{startNewChallenge} = useContext(ChallengesContext);

    const[time, setTime] = useState(25 * 60);
    const[active, setActive] = useState(false);
    const[hasFinished, setFinished] = useState(false);
 
    const minutos = Math.floor(time/60);
    const seconds = time%60;

    let countdownTimeout: NodeJS.Timeout;

    function startCountdown(){
        setActive(true);
    }

    function resetCountdown(){
        setActive(false);
        clearTimeout(countdownTimeout);
        setTime(0.1 * 60);
        setFinished(false);
    }

    // Biblioteca do react para disparar ação caso algo mude, recebe a ação como parâmetro e a variável que ela monitora
    //Neste caso muda quando eu clico no botão e mudo a variável active, e a cada mudança que a variável active provoca (auto dispara até chegar a 0)
    useEffect(()=>{
        if(active && time>0){
            countdownTimeout=setTimeout(()=>{
                setTime(time-1);
            }, 1000)
        } else if (time===0 && active){
            console.log("Finalizou Contagem")
            startNewChallenge();
            setActive(false);
            setFinished(true);
        }
    }, [active, time])
    
    return(
        <CountdownContext.Provider value = {
            {minutos, seconds, hasFinished, active, startCountdown, resetCountdown}
        }>
            {children}
        </CountdownContext.Provider>
    )
}