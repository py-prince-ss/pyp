'use client';

import { bgState } from '@/state/bgState';
import React from 'react';
import { useRecoilState } from 'recoil';
import Header from '../Header';

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [bgColor, setBgColor] = useRecoilState(bgState);

    return (
        <div className={`w-full bg-[${bgColor}] transition-all duration-300`}>
            <div className="w-full">
                <Header />
                <div className="pt-40">{children}</div>
            </div>
        </div>
    );
}
