
import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const BtcChart = ({ data }) => {
    function createDataPoints(data) {
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

        return newArray;
    }

    const chartData = createDataPoints(data)
    const options = {
        series: [{
            name: "> $1k",
            data: chartData.filter(item => item[1] >= 1000),
        }, {
            name: "> $10k",
            data: chartData.filter(item => item[1] >= 10000),

        }, {
            name: "> $100k",
            data: chartData.filter(item => item[1] >= 100000),

        }, {
            name: "> $1M",
            data: chartData.filter(item => item[1] >= 100000),

        }, {
            name: "> $10M",
            data: chartData.filter(item => item[1] >= 1000000),
        }],
    }

    return (
        <div className='container m-auto'>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                allowChartUpdate={true}
                containerProps={{ className: 'chart-container' }}
                options={options}
            />
        </div>
    )


}

export default BtcChart


