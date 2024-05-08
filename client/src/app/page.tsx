'use client';

import { useCallback, useEffect, useState } from 'react';
import ProductList from './_component/main/ProductList';
import Search from './_component/main/Search';

export default function Home() {
    const [isFixed, setIsFixed] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = useCallback(() => {
        const innerHeight = window.innerHeight;
        const likedList = document
            .getElementById('liked-list')
            ?.getBoundingClientRect();

        // console.log('innerHeight:::', innerHeight);
        // console.log('liked:::', likedList);
        if (likedList && likedList.top < (innerHeight - likedList.height) / 2) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    }, []);

    return (
        <div>
            <div className="px-20 h-[calc(100vh-320px)] flex flex-col gap-12 mb-40">
                <div className="text-center">
                    <div className="text-7xl font-bold mb-16 mt-12">
                        Predict real prices
                        <br />
                        with&nbsp;<span className="text-[#f84f39]">PYP</span>!
                    </div>
                </div>
                <div className="flex-1">
                    <Search />
                </div>
            </div>

            <div className="w-full flex flex-col gap-6 px-20 relative">
                <div
                    id="liked-list"
                    className={`${
                        isFixed
                            ? 'absolute top-0 left-1/2 -translate-x-[50%]'
                            : ''
                    }`}
                >
                    <ProductList title="Liked" />
                </div>

                <div className="z-1 absolute top-[100vh] left-1/2 -translate-x-[50%]">
                    <ProductList title="Recommended" />
                </div>
            </div>
        </div>
    );
}
