import { ReactNode } from 'react';

import './globals.css';

export const metadata = {
    title: 'ui-v3',
    description: 'Page Description'
};

type Props = {
    children: ReactNode;
};

const RootLayout = async ({ children }: Props) => {
    return (
        <html lang="en" className="h-full">
            <body className="flex min-h-full flex-col font-sans antialiased [overflow-anchor:none]">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Blockworks
                            Interview Challenge</h2>
                        <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">BTC Address
                            Balances over Time</p>
                    </div>
                </div>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
