'use client';

import { bgState } from '@/state/bgState';
import { useSelectedLayoutSegment } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Footer from '../Footer';
import Header from '../Header';

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [bgColor, setBgColor] = useRecoilState(bgState);
    const [bgClass, setBgClass] = useState('#f3f2fb');
    const router = useSelectedLayoutSegment();

    useEffect(() => {
        setBgClass(bgColor);
    }, [bgColor]);

    return (
        <div className={`w-full bg-[${bgClass}] transition-all duration-300`}>
            {router === 'register' ? (
                <div className="w-full">{children}</div>
            ) : (
                <div className="w-full">
                    <Header />
                    <div className="pt-40">{children}</div>
                    <Footer />
                </div>
            )}
        </div>
    );
}
