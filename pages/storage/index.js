import Head from 'next/head'
import axios from 'axios'
import Cloud from 'components/Cloud'

export default function Home ({ content }) {
  return (
    <>
      <Head>
        <title>Home Cloud ☁</title>
        <meta name="description" content="Cloud for storage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Cloud content={content}/>
    </>
  )
}

export async function getServerSideProps () {
  const content = await axios.get('http://192.168.1.51:3000/api/storage/')

  return {
    props: {
      content: content.data
    }
  }
}
