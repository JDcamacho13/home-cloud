import Head from 'next/head'
import axios from 'axios'
import Cloud from 'components/Cloud'

export default function Home ({ content }) {
  return (
    <>
      <Head>
        <title>Home Cloud ☁ | /</title>
        <meta name="description" content="Cloud for storage" />
        <link rel="icon" href="/home.ico" />
      </Head>

      <Cloud content={content}/>
    </>
  )
}

export async function getServerSideProps () {
  const URL_API = process.env.NODE_ENV === 'development' ? `http://${process.env.NEXT_PUBLIC_HOST}` : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`

  const content = await axios.get(`${URL_API}/api/storage/`)

  return {
    props: {
      content: content.data
    }
  }
}
