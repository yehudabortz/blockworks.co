import { parse } from 'csv-parse';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

import { TBitcoinBalanceChunk } from '../../types/bitcoinData';
import { TAllChartData, TChartDataPoint } from '../../types/btcChart';
import { BtcChartChunks } from '../../types/enums';

const organizeDataPoints = (data: TBitcoinBalanceChunk[]): TAllChartData[] => {
  let over1k: TChartDataPoint[] = [];
  let over10k: TChartDataPoint[] = [];
  let over100k: TChartDataPoint[] = [];
  let over1M: TChartDataPoint[] = [];
  let over10M: TChartDataPoint[] = [];

  data.forEach(row => {
    const date = new Date(row[0]).getTime()
    over1k.push([date, Number(row[1])]);
    over10k.push([date, Number(row[2])]);
    over100k.push([date, Number(row[3])]);
    over1M.push([date, Number(row[4])]);
    over10M.push([date, Number(row[5])]);
  });
  const organizedByAmount = {
    [BtcChartChunks.Over1k]: over1k,
    [BtcChartChunks.Over10k]: over10k,
    [BtcChartChunks.Over100k]: over100k,
    [BtcChartChunks.Over1M]: over1M,
    [BtcChartChunks.Over10M]: over10M
  }

  return organizedByAmount

};

export default (_: NextApiRequest, res: NextApiResponse) => {
  const data: TBitcoinBalanceChunk[] = [];

  const file = fs.createReadStream(
    'data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv'
  );

  file
    .pipe(
      parse({
        from_line: 2, // Starting from line 2 (ignoring header)
        delimiter: '\t',
        encoding: 'utf16le',
        relax_quotes: true,
        escape: '\\',
        ltrim: true,
        rtrim: true,
      })
    )
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      if (data.length > 0) {
        res.status(200).json(organizeDataPoints(data));
      } else {
        res.status(404).send('No data found');
      }
    })
    .on('error', (error) => {
      res.status(500).json({ error: error.message });
    });
};

export const revalidate = 86400; // revalidate once a day