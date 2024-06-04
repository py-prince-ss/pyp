'use client';

import { useState } from 'react';

const locVal = [
    { id: '도봉구', title: '도봉구', checked: false },
    { id: '노원구', title: '노원구', checked: false },
    { id: '강북구', title: '강북구', checked: false },
    { id: '중랑구', title: '중랑구', checked: false },
    { id: '동대문구', title: '동대문구', checked: false },
    { id: '성북구', title: '성북구', checked: false },
    { id: '종로구', title: '종로구', checked: false },
    { id: '은평구', title: '은평구', checked: false },
    { id: '서대문구', title: '서대문구', checked: false },
    { id: '마포구', title: '마포구', checked: false },
    { id: '용산구', title: '용산구', checked: false },
    { id: '중구', title: '중구', checked: false },
    { id: '성동구', title: '성동구', checked: false },
    { id: '광진구', title: '광진구', checked: false },
    { id: '강동구', title: '강동구', checked: false },
    { id: '송파구', title: '송파구', checked: false },
    { id: '강남구', title: '강남구', checked: false },
    { id: '서초구', title: '서초구', checked: false },
    { id: '동작구', title: '동작구', checked: false },
    { id: '관악구', title: '관악구', checked: false },
    { id: '영등포구', title: '영등포구', checked: false },
    { id: '금천구', title: '금천구', checked: false },
    { id: '구로구', title: '구로구', checked: false },
    { id: '양천구', title: '양천구', checked: false },
    { id: '강서구', title: '강서구', checked: false },
];
const typeVal = [
    { id: '원룸', title: '원룸', checked: false },
    { id: '투,쓰리룸', title: '투,쓰리룸', checked: false },
    { id: '오피스텔', title: '오피스텔', checked: false },
    { id: '아파트', title: '아파트', checked: false },
];

export default function ListFiltering() {
    const [openLocation, setOpenLocation] = useState<boolean>(true);
    const [openType, setOpenType] = useState<boolean>(false);
    const [openPrice, setOpenPrice] = useState<boolean>(false);
    const [openSquareFeet, setOpenSquareFeet] = useState<boolean>(false);

    return (
        <div className="bg-[#303345] w-[300px] p-8 text-white">
            <div className="text-md mb-8 font-semibold">Filtering</div>

            <div className="flex flex-col gap-8">
                {/* Location */}
                <div>
                    <div
                        className="text-[#787e90] text-sm w-full flex justify-between items-center cursor-pointer"
                        onClick={() => setOpenLocation(!openLocation)}
                    >
                        <div>LOCATION</div>
                        <div
                            className={`${
                                !openLocation && '-rotate-180'
                            } transition-all duration-300`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </div>
                    <div
                        className={`w-full grid grid-cols-2 gap-4 mt-4 ${
                            !openLocation && 'mt-0 h-0 overflow-y-hidden'
                        } transition-[height] duration-300`}
                    >
                        {locVal.map((loc) => {
                            return <div key={loc.id}>{loc.title}</div>;
                        })}
                    </div>
                </div>

                {/* Type */}
                <div>
                    <div
                        className="text-[#787e90] text-sm w-full flex justify-between items-center cursor-pointer"
                        onClick={() => setOpenType(!openType)}
                    >
                        <div>TYPE</div>
                        <div
                            className={`${
                                !openType && '-rotate-180'
                            } transition-all duration-300`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </div>
                    <div
                        className={`w-full grid grid-cols-2 gap-4 mt-4 ${
                            !openType && 'mt-0 h-0 overflow-y-hidden'
                        } transition-[height] duration-300`}
                    >
                        {typeVal.map((type) => {
                            return <div key={type.id}>{type.title}</div>;
                        })}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <div
                        className="text-[#787e90] text-sm w-full flex justify-between items-center cursor-pointer"
                        onClick={() => setOpenPrice(!openPrice)}
                    >
                        <div>PRICE</div>
                        <div
                            className={`${
                                !openPrice && '-rotate-180'
                            } transition-all duration-300`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </div>
                    <div
                        className={`mt-4 ${
                            !openPrice && 'mt-0 h-0 overflow-y-hidden'
                        } transition-[height] duration-300`}
                    >
                        <div className="w-full h-1 bg-white rounded-full"></div>
                    </div>
                </div>

                {/* Square Feet */}
                <div>
                    <div
                        className="text-[#787e90] text-sm w-full flex justify-between items-center cursor-pointer"
                        onClick={() => setOpenSquareFeet(!openSquareFeet)}
                    >
                        <div>Square Feet</div>
                        <div
                            className={`${
                                !openSquareFeet && '-rotate-180'
                            } transition-all duration-300`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </div>

                    <div
                        className={`mt-4 ${
                            !openSquareFeet && 'mt-0 h-0 overflow-y-hidden'
                        } transition-[height] duration-300`}
                    >
                        <div className="w-full h-1 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
