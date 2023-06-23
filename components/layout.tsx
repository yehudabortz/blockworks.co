import Head from 'next/head'
import Link from 'next/link'

export default function Layout({
    children
}: {
    children: React.ReactNode
    home?: boolean
}) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content=""
                />
                <meta name="og:title" content="BTC Addresses" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <nav className='relative p-6 border-b border-gray-200'>
                <Link href="https://blockworks.co" target="_blank">
                    <span className="sr-only">Blockworks.co</span>
                    <img className="h-6 w-auto ml-  0" src="/blockworks-logo.svg" alt="Blockworks.co" />
                </Link>
            </nav>
            <header className='pt-12'>
                <div className='container m-auto flex-col gap-4'>
                    <h1 className="font-bold text-gray-900 text-2xl text-center">BTC Address Balances over Time</h1>
                </div>
            </header>
            <main >
                <div className='container m-auto py-8'>
                    {children}
                </div>
            </main>
            <footer className='container m-auto flex-col gap-4'>
                <h4>Blockworks Technical Interview With Yehuda Bortz</h4>
                <p><a href="mailto:yehudabortz@icloud.com?&subject=Congats! Next Steps 🚀" target="_top">yehudabortz@icloud.com</a></p>
            </footer>
        </div >
    )
}