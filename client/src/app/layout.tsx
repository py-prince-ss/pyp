'use client';

import Header from '@/_component/Header';
import styled from 'styled-components';
import './globals.css';

const Layout = styled.div`
    width: 100%;
`;
const Wrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    & > div {
        width: 100%;
        min-width: 1340px;
        max-width: 1730px;
        padding-left: 80px;
        padding-right: 80px;
    }
`;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Layout>
                    <Wrap>
                        <div>
                            <Header />
                            {children}
                        </div>
                    </Wrap>
                </Layout>
            </body>
        </html>
    );
}
