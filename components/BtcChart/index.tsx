import React, { useMemo } from 'react';
import Highcharts, { SeriesOptionsType } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { TBitcoinBalanceChunk } from '../../types/bitcoinData';
import { TChartDataPoint } from '../../types/btcChart';

const LINE_WIDTH = 2;
const SERIES_TYPE = 'line';

const createDataPoints = (data: TBitcoinBalanceChunk[]): TChartDataPoint[] => {
    const newArray: TChartDataPoint[] = [];

    for (let i = 0; i < data.length; i++) {
        for (let j = 1; j < data[i].length; j++) {
            newArray.push([new Date(data[i][0]).getTime(), Number(data[i][j])]);
        }
    }
    return newArray;
}

type Props = {
    data: TBitcoinBalanceChunk[];
}

const BtcChart: React.FC<Props> = ({ data }) => {
    const chartData = useMemo(() => createDataPoints(data), [data]);

    const seriesData = useMemo(() => [
        { name: "> $1k", threshold: 1000, color: "#fa4d56" },
        { name: "> $10k", threshold: 10000, color: "#6929c4" },
        { name: "> $100k", threshold: 100000, color: "#002d9c" },
        { name: "> $1M", threshold: 1000000, color: "#f1c21b" },
        { name: "> $10M", threshold: 10000000, color: "#198038" },
    ].map(({ name, threshold, color }) => ({
        name,
        data: chartData.filter(item => item[1] >= threshold),
        lineWidth: LINE_WIDTH,
        color,
        type: SERIES_TYPE
    })), [chartData]);

    const options: Highcharts.Options = {
        rangeSelector: {
            inputStyle: {
                color: '#6800ff',
                fontWeight: 'bold'
            },
        },
        legend: {
            enabled: true
        },
        yAxis: {
            offset: 50
        },
        tooltip: {
            useHTML: true,
            // its important to use function () here in order to access the proper scope of 'this'
            formatter: function () {
                return this.points?.map((point) =>
                    `<span style="color:${point?.color}">\u25CF</span> ${point?.series.name}: <b>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(point.y as number | bigint)}</b><br/>`
                ).join('');
            }
        },
        series: seriesData as SeriesOptionsType[]
    }
    return (
        <div className='min-h-[400px]'>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                allowChartUpdate={true}
                options={options}
            />
        </div>
    )
}

export default BtcChart;
