import "server-only"

// import BtcChart from "../../components/BtcChart"
import BtcChart from "../chart"

const getData = async () => {
    const res = await fetch('http://localhost:3000/api/btc-addresses')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors

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
                yehuda
                <BtcChart data={data} />
            </section>
        </div>
    );
}

export default Index;
