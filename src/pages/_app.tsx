import '../styles/global.css'


// Esse component serve para deixar estático componentes globais como sidebars, headers, etc.

function MyApp({ Component, pageProps }) {
  return(          
    <Component {...pageProps} />
  );  
}

export default MyApp
