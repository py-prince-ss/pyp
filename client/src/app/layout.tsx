'use client';

import LayoutWrapper from '@/components/wrapper/LayoutWrapper';
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
                    <LayoutWrapper>{children}</LayoutWrapper>
                </RecoilRootWrapper>
            </body>
        </html>
    );
}
