'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const menus = [
    { id: 0, title: 'Contact', opacity: 'opacity-90' },
    { id: 1, title: 'About', opacity: 'opacity-80' },
    { id: 2, title: 'FAQs', opacity: 'opacity-70' },
    { id: 3, title: 'Guide', opacity: 'opacity-60' },
    { id: 4, title: 'Support', opacity: 'opacity-50' },
    { id: 5, title: 'Location', opacity: 'opacity-40' },
];

const colors = [
    'hover:text-[#2281d9]',
    'hover:text-[#33B887]',
    'hover:text-[#f84f39]',
    'hover:text-[#8f89fa]',
];

export default function Footer() {
    const [isLarge, setIsLarge] = useState<boolean>(false);
    const container = useRef<HTMLDivElement>(null);
    const [currentColor, setCurrentColor] = useState<number>(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = useCallback(() => {
        if (container.current) {
            let { y } = container.current.getBoundingClientRect();

            setIsLarge(y < 100);
        }
    }, []);

    const handleHoverColor = () => {
        setCurrentColor(currentColor === 3 ? 0 : currentColor + 1);
    };

    useEffect(() => {
        console.log('colors:::', colors[currentColor]);
    }, [currentColor]);

    return (
        <div
            className={`w-full ${isLarge ? '' : 'px-20'} transition-all mt-96`}
            ref={container}
        >
            <div
                className={`w-full h-fit min-h-screen py-52 bg-[#171620] ${
                    isLarge ? 'rounded-none' : 'rounded-t-[10vw]'
                } duration-500 flex justify-center items-center`}
            >
                <div
                    className={`relative ${
                        isLarge ? 'opacity-100 top-0' : 'opacity-0 -top-6'
                    } text-[#dedeeb] text-[5vw] font-bold transition-all duration-500 w-3/5 mx-auto flex flex-col`}
                >
                    {menus.map((menu) => {
                        return (
                            <div
                                key={menu.id}
                                className={`${menu.opacity} cursor-pointer hover:opacity-100 ${colors[currentColor]} w-fit transition-all`}
                                onMouseOver={handleHoverColor}
                            >
                                {menu.title}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="text-[#696f81] bg-[#171620] w-full text-center pb-20">
                ⓒ PYP
            </div>
        </div>
    );
}
