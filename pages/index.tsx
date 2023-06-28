import { GetStaticProps } from 'next';
import Head from 'next/head';

import BtcChart from '../components/BtcChart';
import Layout from '../components/layout';
import { TAllChartData } from '../types/btcChart';
import fetcher from '../utils/fetcher';

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
    const data = await fetcher(`${process.env.NEXT_PUBLIC_BASE}/api/btc-addresses`);

    return {
        props: { data },
    };
};

export default Home;
