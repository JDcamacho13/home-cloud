import 'styles/globals.css'
import { ContextProvider } from 'context/CloudContext'

function MyApp ({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
