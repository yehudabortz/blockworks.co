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
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE}/api/btc-addresses`);

    // const data = await res.json();
    const data = {
        '> $1k': [
            [1279411200000, 18], [1279497600000, 19], [1279584000000, 17]]
    };
    // console.log(data)
    return {
        props: { data },
    };
};

export default Home;
