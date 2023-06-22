import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { NextResponse } from "next/server";
import { IBitcoinBalanceChunk } from "../../../types/bitcoinData";

export const GET = async () => {
  const data: IBitcoinBalanceChunk[] = [];

  const file = fs.createReadStream(
    "data/Coin_Metrics_Network_Data_2023-02-02T14-32.csv"
  );

  file
    .pipe(
      csvParse({
        delimiter: "\t",
        encoding: "utf16le",
        from_line: 2,
        relax_quotes: true,
        escape: "\\",
        ltrim: true,
        rtrim: true,
      })
    )
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      return NextResponse.json({ data });
    })
    .on("error", (error) => {
      return NextResponse.json({ error });
    });
};
