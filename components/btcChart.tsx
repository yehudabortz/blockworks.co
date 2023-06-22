
import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const BtcChart = ({ data }) => {
    function createNewArray(data) {
        const newArray = [];

        data.forEach(obj => {
            const time = new Date(obj["Time"]).getTime();
            Object.keys(obj).forEach(key => {
                if (key !== "Time") {
                    const item = [time, obj[key]];
                    newArray.push(item);
                }
            });
        });

        return filterArrayBySecondAttribute(newArray);
    }

    function filterArrayBySecondAttribute(array) {
        const result = {
            over1k: [],
            over10k: [],
            over100k: [],
            over1M: [],
            over10M: []
        };

        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            const value = item[1];

            if (value > 10000 && value <= 100000) {
                result.over10k.push(item);
            } else if (value > 1000 && value <= 10000) {
                result.over1k.push(item);
            } else if (value > 100000 && value <= 1000000) {
                result.over100k.push(item);
            } else if (value > 1000000 && value <= 10000000) {
                result.over1M.push(item);
            } else if (value > 10000000) {
                result.over10M.push(item);
            }
        }
        return result;
    }


    const chartData = createNewArray(data)
    const options = {
        title: {
            text: 'My stock chart'
        },
        series: [{
            name: "> $1k",
            data: chartData.over1k,
        }, {
            name: "> $10k",
            data: chartData.over10k,

        }, {
            name: "> $100k",
            data: chartData.over100k,

        }, {
            name: "> $1M",
            data: chartData.over1M,

        }, {
            name: "> $10M",
            data: chartData.over10M,
        }]
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            allowChartUpdate={true}
            immutable={false}
            updateArgs={[true, true, true]}
            containerProps={{ className: 'chartContainer' }}
            options={options}

        />
    )


}

export default BtcChart

