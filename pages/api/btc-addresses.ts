import { parse } from 'csv-parse';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

import { TBitcoinBalanceChunk } from '../../types/bitcoinData';
import { TChartDataPoint } from '../../types/btcChart';

const toChartDataPoints = (data: TBitcoinBalanceChunk[]): TChartDataPoint[] => {
  const newArray: TChartDataPoint[] = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j < data[i].length; j++) {
      newArray.push([new Date(data[i][0]).getTime(), Number(data[i][j])]);
    }
  }
  return newArray;
};

export default (_: NextApiRequest, res: NextApiResponse) => {
  const data: TBitcoinBalanceChunk[] = [];

  const file = fs.createReadStream(
    'data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv'
  );

  file
    .pipe(
      parse({
        delimiter: '\t',
        encoding: 'utf16le',
        from_line: 2,
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
      if (data.length > 0) {
        res.status(200).json(toChartDataPoints(data));
      } else {
        res.status(404).send('No data found');
      }
    })
    .on('error', (error) => {
      res.status(500).json({ error: error.message });
    });
};
