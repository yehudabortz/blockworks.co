'use client';

import 'client-only';

import React, { useMemo } from 'react';
import Highcharts, { SeriesOptionsType } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { IBitcoinBalanceChunk } from '../types/bitcoinData';

interface ChartDataPoint {
    [key: number]: any;
}

type Props = {
    data: IBitcoinBalanceChunk[];
}

const createDataPoints = (data: IBitcoinBalanceChunk[]): ChartDataPoint[] => {
    const newArray: ChartDataPoint[] = [];
    data.forEach(obj => {
        const time = new Date(obj["Time"]).getTime();
        Object.keys(obj).forEach(key => {
            if (key !== "Time") {
                const item: ChartDataPoint[] = [time, obj[key]];
                newArray.push(item);
            }
        });
    });
    return newArray;
}

const LINE_WIDTH = 2;
const SERIES_TYPE = 'line';

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
        legend: {
            enabled: true
        },
        yAxis: {
            offset: 50,
        },
        tooltip: {
            useHTML: true,
            formatter: () => {
                return this.points?.map((point) =>
                    `<span style="color:${point?.color}">\u25CF</span> ${point?.series.name}: <b>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(point.y as number | bigint)}</b><br/>`
                ).join('');
            }
        },
        series: seriesData as SeriesOptionsType[],
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

export default BtcChart;
