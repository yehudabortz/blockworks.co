import Head from 'next/head'
import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import BtcChart from '../components/btcChart'
import { IBitcoinBalanceChunk } from '../types/bitcoinData'

type Props = { data: IBitcoinBalanceChunk[] }

export default function Home({ data }: Props) {
    return (
        <Layout home>
            <Head>
                <title>BTC Address Balances over Time</title>
            </Head>
            <section>
                <BtcChart data={data} />
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('http://localhost:3000/api/btc-addresses');
    const data = await res.json()
    return {
        props: { data: data }
    }
}