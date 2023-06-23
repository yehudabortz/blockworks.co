import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { parse } from "csv-parse";
import { TBitcoinBalanceChunk } from "../../types/bitcoinData";

export default (_: NextApiRequest, res: NextApiResponse) => {
  const data: TBitcoinBalanceChunk[] = [];

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
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).send("No data found");
      }
    })
    .on("error", (error) => {
      console.error(`Error occurred while processing data: ${error}`);
      res.status(500).json({ error: error.message });
    });
};
