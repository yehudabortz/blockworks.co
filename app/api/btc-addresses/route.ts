import "server-only"

import { parse } from 'csv-parse';
import fs from 'fs';
import { NextResponse } from 'next/server';

import { TBitcoinBalanceChunk } from "../../../types/bitcoinData";
import { TChartDataPoint } from "../../../types/btcChart";

const toChartDataPoints = (data: TBitcoinBalanceChunk[]): TChartDataPoint[] => {
    const newArray: TChartDataPoint[] = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 1; j < data[i].length; j++) {
            newArray.push([new Date(data[i][0]).getTime(), Number(data[i][j])]);
        }
    }
    return newArray;
};

const getBtcAddressesData = (): Promise<TChartDataPoint[]> => {
    return new Promise((resolve, reject) => {
        const data: TBitcoinBalanceChunk[] = [];
        const file = fs.createReadStream('data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv');

        file
            .pipe(
                parse({
                    delimiter: '\t',
                    encoding: 'utf16le',
                    from_line: 2, // Starting from line 2 (ignoring header)
                    relax_quotes: true,
                    escape: '\\',
                    ltrim: true,
                    rtrim: true
                })
            )
            .on('data', (row) => {
                data.push(row);
            })
            .on('end', () => {
                resolve(toChartDataPoints(data)); // Resolving the promise with the processed data
            })
            .on('error', (error) => {
                reject(error); // Rejecting the promise if an error occurs
            });
    });
};

export async function GET() {
    const btcAddressesData = await getBtcAddressesData();
    return NextResponse.json(btcAddressesData);
}