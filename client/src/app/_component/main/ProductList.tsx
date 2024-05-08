'use client';

import CLargeCard from '@/components/CLargeCard';
import { bgState } from '@/state/bgState';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IProps {
    title: string;
}

export default function ProductList({ title }: IProps) {
    const [bgColor, setBgColor] = useRecoilState(bgState);
    const [opacity, setOpacity] = useState('opacity-100');

    useEffect(() => {
        setOpacity(bgColor === '#fff' ? 'opacity-100' : 'opacity-0');
    }, [bgColor]);

    return (
        <div
            className={`w-full max-w-set mx-auto flex flex-col rounded-[1.6667vw] h-[80vh] p-[3.75vw] ${
                title === 'Liked' ? 'bg-[#f3f2f9]' : 'bg-[#ebf4f0]'
            } ${opacity} transition-all duration-300`}
        >
            <div className="text-[1.875vw] font-extrabold mb-6 flex justify-between">
                <div>
                    <span
                        className={`bg-[${
                            title === 'Liked' ? '#6b66da' : '#2b966f'
                        }]`}
                    >
                        {title}
                    </span>
                    &nbsp;Products
                </div>
                <div className="flex flex-col justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </div>
            </div>

            <Swiper
                spaceBetween={24}
                slidesPerView={3}
                className="w-full flex-1"
            >
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
