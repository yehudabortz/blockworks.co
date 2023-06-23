import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import BtcChart from '../components/BtcChart'
import { TBitcoinBalanceChunk } from '../types/bitcoinData'

type Props = { data: TBitcoinBalanceChunk[] }

const Home = ({ data }: Props) => {
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
    let res = await fetch('http://localhost:3000/api/btc-addresses');


    const data = await res.json()
    return {
        props: { data }
    }
}

export default Home