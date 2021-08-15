import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>eCasino</title>
        <meta name="description" content="Created by Levi Hicks" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <header>
        <h1 className='py-4 text-4xl'>eCASINO</h1>
        <div>[Menu]</div>
      </header>
    </Layout>
  )
}

export default Home
