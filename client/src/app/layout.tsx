'use client';

import LayoutWrapper from '@/components/wrapper/LayoutWrapper';
import QueryProviderWrapper from '@/components/wrapper/QueryProviderWrapper';
import RQProvider from '@/components/wrapper/RQProvider';
import RecoilRootWrapper from '@/components/wrapper/RecoilWrapper';
import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <RecoilRootWrapper>
                    <QueryProviderWrapper>
                        <RQProvider>
                            <LayoutWrapper>{children}</LayoutWrapper>
                        </RQProvider>
                    </QueryProviderWrapper>
                </RecoilRootWrapper>
            </body>
        </html>
    );
}
