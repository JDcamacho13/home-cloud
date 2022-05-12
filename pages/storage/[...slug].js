import Cloud from 'components/Cloud'
import axios from 'axios'
import Head from 'next/head'

export default function Home ({ slug, content }) {
  return (
    <>
      <Head>
        <title>Home Cloud ☁ | / {slug.join(' / ')} </title>
        <meta name="description" content="Cloud for storage" />
        <link rel="icon" href="/home.ico" />
      </Head>
      <Cloud slug={slug} content={content}/>
    </>
  )
}

export async function getServerSideProps (context) {
  const { params } = context
  const { slug } = params

  const URL_API = process.env.NODE_ENV === 'development' ? `http://${process.env.NEXT_PUBLIC_HOST}` : `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`

  const url = slug.join('/')

  const content = await axios.get(`${URL_API}/api/storage/` + url)

  return {
    props: {
      slug,
      content: content.data
    }
  }
}
