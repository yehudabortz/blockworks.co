import "server-only"

import BtcChart from '../components/BtcChart';

const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE}/api/btc-addresses`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Index = async () => {
    const data = await getData()
    return (
        <div>
            <section>
                <BtcChart data={data} />
            </section>
        </div>
    );
}

export default Index;
