import "server-only"
import "../styles/global.css"

import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <html lang="en" className="h-full">

    <body className="flex min-h-full flex-col font-sans antialiased [overflow-anchor:none]">

      <div>
        {/* <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="" />
          <meta name="og:title" content="BTC Addresses" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head> */}
        <nav className="relative p-6 border-b border-gray-200">
          <Link href="https://blockworks.co" target="_blank">
            <span className="sr-only">Blockworks.co</span>
            {/* <Image
          height={50}
          width={50}
          className="h-6 w-auto ml-  0"
          src="/blockworks-logo.svg"
          alt="Blockworks.co"
        /> */}
          </Link>
        </nav>
        <header className="pt-12">
          <div className="container m-auto flex-col gap-4">
            <h1 className="font-bold text-gray-900 text-2xl text-center">
              BTC Address Balances Over Time
            </h1>
          </div>

        </header>
        <main>
          <div className="container m-auto py-8">{children}</div>
        </main>
        <footer className="container m-auto flex-col gap-4">
          <h3 className="text-lg font-bold">Blockworks Interview Challenge</h3>
          <p>
            Yehuda Bortz:{' '}
            <a
              href="mailto:yehudabortz@icloud.com?&subject=Congats! Next Steps 🚀"
              target="_top"
            >
              yehudabortz@icloud.com
            </a>
          </p>
        </footer>
      </div>
    </body >
  </html>
);

export default RootLayout;
