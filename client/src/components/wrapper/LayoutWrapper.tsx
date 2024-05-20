'use client';

import { bgState } from '@/state/bgState';
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

    useEffect(() => {
        setBgClass(bgColor);
    }, [bgColor]);

    return (
        <div className={`w-full bg-[${bgClass}] transition-all duration-300`}>
            <div className="w-full">
                <Header />
                <div className="pt-40">{children}</div>
                <Footer />
            </div>
        </div>
    );
}
