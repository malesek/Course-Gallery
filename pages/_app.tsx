import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../components/login'
import { createGlobalStyle } from 'styled-components'
import React from 'react'
import Head from 'next/head'

const GlobalStyle = createGlobalStyle`
*{font-family: 'Open Sans', sans-serif;}
body{
  background-color: #f9f9ee
}
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </React.Fragment>
  )
}
export default MyApp
