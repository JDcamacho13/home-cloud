import { useEffect } from 'react'
import Head from 'next/head'
import styles from 'styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()

  useEffect(() => {
    router.replace('/storage')
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Cloud ☁</title>
        <meta name="description" content="Cloud for storage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
