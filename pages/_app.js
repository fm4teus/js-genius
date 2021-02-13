import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'

const GlobalStyle = createGlobalStyle`
   * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

const theme = {
  colors: {
    background: '#1C2B2D',
    primary: '#1F6F8B',
    textPrimary: '#E6D5B8',
    textSecondary: '#99A8B2',
  },
  borderRadius: '0.625rem'
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>            
        <title>JS G3N1U5</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="title" content="JS G3N1U5 - Você é bom de memória?"/>
        <meta name="description" content="Venha enfrentar esse desafio, conquiste seu lugar entre os primeiros no Ranking!"/>
        <meta name="theme-color" content="#1F6F8B"/>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://js-genius.vercel.app/"/>
        <meta property="og:title" content="JS G3N1U5 - Você é bom de memória?"/>
        <meta property="og:description" content="Venha enfrentar esse desafio, conquiste seu lugar entre os primeiros no Ranking!"/>
        <meta property="og:image" content="/favicon.ico"/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://js-genius.vercel.app/"/>
        <meta property="twitter:title" content="JS G3N1U5 - Você é bom de memória?"/>
        <meta property="twitter:description" content="Venha enfrentar esse desafio, conquiste seu lugar entre os primeiros no Ranking!"/>
        <meta property="twitter:image" content="/favicon.ico"/>

        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
