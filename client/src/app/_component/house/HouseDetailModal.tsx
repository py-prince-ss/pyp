import { cancelBgFixed } from '@/utils/utils';
import DOMPurify from 'dompurify';
import { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
    openDetail: Dispatch<SetStateAction<boolean>>;
}

export default function HouseDetailModal({ openDetail }: Props) {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex justify-center items-center bg-opacity-40 overflow-hidden z-50 p-4">
            <div className="relative w-3/4 h-3/4 overflow-y-scroll bg-white shadow-xl rounded-xl transition-all duration-300 p-8">
                <div className="w-full flex justify-end mb-12">
                    <div
                        className="flex justify-center items-center cursor-pointer hover:-rotate-90 transition-all duration-300"
                        onClick={() => {
                            cancelBgFixed();
                            openDetail(false);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>

                <div className="px-24">
                    <div className="w-full h-fit flex gap-12">
                        {/* {isLoading && <CSpinner />} */}

                        {/* 오른쪽 */}
                        <div className="w-2/3">
                            <div className="w-full bg-gray-50">
                                <Swiper spaceBetween={0} slidesPerView={1}>
                                    <SwiperSlide>
                                        <div className="flex justify-center cursor-pointer">
                                            <img
                                                src="/banpoxi.jpg"
                                                alt="dummy"
                                            />
                                        </div>
                                    </SwiperSlide>
                                    {/* <SwiperSlide>
                                        <div className="flex justify-center cursor-pointer">
                                            <img
                                                src="/banpoxi.jpg"
                                                alt="dummy"
                                            />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="flex justify-center cursor-pointer">
                                            <img
                                                src="/banpoxi.jpg"
                                                alt="dummy"
                                            />
                                        </div>
                                    </SwiperSlide> */}
                                </Swiper>
                            </div>

                            <div className="text-3xl font-extrabold mt-12 flex items-center justify-between">
                                <div>아크로타워</div>

                                <div
                                    className={`cursor-pointer w-12 h-12 rounded-full bg-white items-center flex justify-center border border-gray-300`}
                                    // onClick={onClickLiked}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={true ? '#ef5777' : '#fff'}
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke={true ? '#ef5777' : '#000'}
                                        className="w-7 h-7"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="w-full mt-12">
                                <div className="text-2xl font-bold mb-6">
                                    상세 정보
                                </div>

                                <div className="w-full border-t-2 border-[#181818]">
                                    <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            건물명
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            아크로타워
                                        </div>

                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            가격
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            20,000 만원
                                        </div>
                                    </div>

                                    <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            전용면적
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            22.22&nbsp;㎡
                                        </div>

                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            공급면적
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            33.33&nbsp;㎡
                                        </div>
                                    </div>

                                    <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            건물용도
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            아파트
                                        </div>

                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            층
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            2&nbsp;/&nbsp; 5
                                        </div>
                                    </div>

                                    <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            관리비
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            20
                                        </div>

                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            방향
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            남동
                                        </div>
                                    </div>

                                    <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            방 수
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            2
                                        </div>

                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            욕실 수
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            1
                                        </div>
                                    </div>

                                    <div className="flex w-full h-[52px] border-b border-[#d3d3d3]">
                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            주소
                                        </div>
                                        <div className="flex-1 text-base flex justify-center flex-col px-5">
                                            서울특별시 영등포구 버드나루로 42
                                            510호
                                        </div>
                                    </div>
                                    <div className="flex w-full h-fit min-h-[52px] border-b border-[#d3d3d3]">
                                        <div className="w-1/4 text-base font-extrabold bg-[#f2f2f2] flex justify-center flex-col px-5">
                                            설명
                                        </div>
                                        <div
                                            className="flex-1 text-base flex justify-center flex-col px-5 py-2"
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    '설명설명설명',
                                                ),
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-2xl font-bold mb-6 mt-12">
                                위치
                            </div>
                            {/* <DetailMap center="서울특별시 영등포구 버드나루로 42" /> */}
                        </div>

                        {/* 왼쪽 */}
                        <div className="flex-1">
                            <div>
                                <div className="w-full h-fit p-12 bg-white rounded-lg shadow-2xl">
                                    <div className="text-xl font-bold mb-4">
                                        매매가 변동 및 예상&nbsp;&nbsp;
                                        <span className="text-sm font-medium text-gray-500">
                                            (단위 : 만 원)
                                        </span>
                                    </div>
                                    {/* {!isLoading && (
                                        <Chart
                                            predicted={predicted}
                                            currentPrice={house.objAmt}
                                            pastPrices={pastPrices}
                                        />
                                    )} */}
                                </div>
                            </div>
                        </div>
                        {/* 
                        {isAlert && (
                            <div
                                className={`w-[400px] text-center h-fit px-8 py-2 rounded-md text-base fixed bottom-[12%] left-[calc(50%-200px)] z-50 bg-[#1976D2] text-white`}
                            >
                                {alertTitle}
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}
