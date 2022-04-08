import Cloud from 'components/Cloud'
import axios from 'axios'
import Head from 'next/head'

export default function Home ({ slug, content }) {
  return (
    <>
      <Head>
        <title>Home Cloud ☁</title>
        <meta name="description" content="Cloud for storage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cloud slug={slug} content={content}/>
    </>
  )
}

export async function getServerSideProps (context) {
  const { params } = context
  const { slug } = params

  const url = slug.join('/')

  const content = await axios.get('http://localhost:3000/api/storage/' + url)
  console.log(content.data)

  return {
    props: {
      slug,
      content: content.data
    }
  }
}
