'use client';

import { bgState } from '@/state/bgState';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import CButton from './CButton';

export default function Header() {
    const [bgColor, setBgColor] = useRecoilState(bgState);

    const [position, setPosition] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [position]);

    const handleScroll = useCallback(() => {
        const moving = window.pageYOffset;

        if (moving > window.innerHeight / 2) {
            setBgColor('#fff');
        } else {
            setBgColor('#f3f2fb');
        }

        setVisible(position > moving);
        setPosition(moving);
    }, [position]);

    const navigateToLogin = () => {};

    return (
        <div
            className={`w-full py-10 flex justify-center bg-[#e9e9f7] h-32 z-10 fixed transition-all duration-300 ${
                visible ? 'top-0' : '-top-32'
            } left-0`}
        >
            <div className="w-full flex justify-between max-w-set px-20">
                <div className="font-extrabold text-4xl">
                    <Link href="/">PYP</Link>
                </div>

                <div className="flex gap-12 items-center">
                    <div className="bg-none border-none">
                        <Link href="/register/house">매물 등록</Link>
                    </div>
                    <div className="bg-none border-none">
                        <Link href="/search">통합검색</Link>
                    </div>
                    <CButton title="Sign In" onClick={navigateToLogin} />
                </div>
            </div>
        </div>
    );
}
