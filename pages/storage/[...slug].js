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

  const url = slug.join('/')

  const content = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/storage/` + url)

  return {
    props: {
      slug,
      content: content.data
    }
  }
}
