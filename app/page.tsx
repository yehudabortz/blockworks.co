import 'server-only';

import BtcChart from '../components/btcChart';

async function getData() {
    const res = await fetch(
        `http://localhost:3000/api/btcAddresses`
    );
    return res.json()
}

const Index = async (): Promise<JSX.Element> => {
    const data = await getData()
    return (
        <main className="min-h-screen">
            <section>
                <BtcChart data={data} />
            </section>
        </main>
    );
};


export default Index;

