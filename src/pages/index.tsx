import Head from 'next/head';

import { ChallengesProvider } from '../context/ChallengeContext';
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
 
import styles from "../styles/pages/Home.module.css";
import { CountdownContextProvider } from '../context/CountdownContext';
import { GetServerSideProps } from 'next';

//Aqui itens por página e no _document itens gerais (para todas as páginas)

// Como o countdownContext não é usado por todos os elementos, não preciso ter ele no _app.tsx
// Ele só precisa envelopar os components que o utilizam, nesse caso countdown e challengebox.

interface HomeProps{
  level : number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (    
  // Todos os elementos dentro do provider vão ter acesso aos dados daquele contexto.
  // No value do context posso enviar objetos inteiros, funções e acessar dentro de outro component com useContext(ChallengeContext)
    <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
        <div className={styles.container}>
        <Head>
          <title>Início | Move It</title>
        </Head>
        <ExperienceBar/>
        <CountdownContextProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownContextProvider>
      </div>
    </ChallengesProvider>
  )
}

// O Next é uma interface entre o backend e o frontend, ele renderiza as páginas antes de colocá-las no ar
// Quando declara essa função dentro de uma página do Next você pode manipular quais dados serão repassados
// da camada do Next para o Front-End

// Não se coloca essa função com chamada assíncrona dentro do componente pois ela não seria renderizada serverside
// Por esse motivo, ela é colocada fora da Home() e usada como props do home (Home(props))

export const getServerSideProps : GetServerSideProps = async (ctx) => {  
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: { level: Number(level),
      currentExperience: Number(currentExperience), challengesCompleted: Number(challengesCompleted)}
  }
}
