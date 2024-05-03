'use client';

import HotPlaces from './_component/HotPlaces';
import ProductList from './_component/ProductList';

export default function Home() {
    return (
        <div>
            <div className="px-20 h-[calc(100vh-320px)] flex flex-col gap-12 mb-40">
                <div className="text-center">
                    <div className="text-7xl font-bold mb-16 mt-12">
                        Predict real prices
                        <br />
                        with&nbsp;<span className="text-[#f84f39]">PYP</span>!
                    </div>
                    <div className="text-5xl font-bold">Hot Places</div>
                </div>
                <div className="px-20 flex-1">
                    <HotPlaces />
                </div>
            </div>

            <div className="w-full flex flex-col gap-6 px-20">
                <ProductList title="Liked" />
                <ProductList title="Recommended" />
            </div>
        </div>
    );
}
