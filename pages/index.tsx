import React from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import BtcChart from '../components/btcChart'

const Home = ({ data }) => {
  return (
    <Layout home>
      <Head>
        <title>BTC Address Balances over Time</title>
      </Head>
      <section>
        <div className="max-w-2xl mx-auto p-8 text-center">Chart goes here</div>
        <BtcChart data={data} />
      </section>
    </Layout>
  )


}
export default Home
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/btc-addresses')
  const data = await res.json()
  return { props: { data } }
}



