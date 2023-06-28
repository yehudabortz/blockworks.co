import "server-only";

import { NextResponse } from "next/server";

const getBtcAddressesData = () => {
  const data = {
    "> $1k": [
      [1279411200000, 0],
      [1279497600000, 0],
      [1279584000000, 0],
    ],
    "> $10k": [
      [1279411200000, 0],
      [1279497600000, 0],
      [1279584000000, 0],
    ],
    "> $100k": [
      [1279411200000, 0],
      [1279497600000, 0],
      [1279584000000, 0],
    ],
    "> $1M": [
      [1279411200000, 0],
      [1279497600000, 0],
      [1279584000000, 0],
    ],
    "> $10M": [
      [1279411200000, 0],
      [1279497600000, 0],
      [1279584000000, 0],
    ],
  };
  return data;
};

export async function GET() {
  const btcAddressesData = await getBtcAddressesData();
  return NextResponse.json(btcAddressesData);
}
