import { GetStaticProps } from 'next';
import Head from 'next/head';

import BtcChart from '../components/BtcChart';
import Layout from '../components/layout';
import { TAllChartData } from '../types/btcChart';

type Props = { data: TAllChartData }

function Home({ data }: Props) {
    return (
        <Layout home>
            <Head>
                <title>BTC Address Balances Over Time</title>
            </Head>
            <section>
                <BtcChart data={data} />
            </section>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch('http://localhost:3000/api/btc-addresses');

    const data = await res.json();
    return {
        props: { data },
    };
};

export default Home;
