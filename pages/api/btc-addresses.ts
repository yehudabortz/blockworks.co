import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { parse } from "csv-parse";
import { IBitcoinBalanceChunk } from "../../types/bitcoinData";

export default (_: NextApiRequest, res: NextApiResponse) => {
  const data: IBitcoinBalanceChunk[] = [];

  const file = fs.createReadStream(
    "data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv"
  );

  file
    .pipe(
      parse({
        delimiter: "\t",
        encoding: "utf16le",
        from_line: 2,
        relax_quotes: true,
        escape: "\\",
        ltrim: true,
        rtrim: true,
      })
    )
    .on("data", function (row) {
      data.push(row);
    })
    .on("end", () => {
      res.status(200).json(data);
    })
    .on("error", (error) => {
      error;
    });
};
