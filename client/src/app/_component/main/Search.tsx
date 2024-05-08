import CButton from '@/components/common/CButton';
import { useState } from 'react';

const locVal = [
    { id: '도봉구', place: '도봉구', isActive: true },
    { id: '노원구', place: '노원구', isActive: false },
    { id: '강북구', place: '강북구', isActive: false },
    { id: '중랑구', place: '중랑구', isActive: false },
    { id: '동대문구', place: '동대문구', isActive: false },
    { id: '성북구', place: '성북구', isActive: false },
    { id: '종로구', place: '종로구', isActive: false },
    { id: '은평구', place: '은평구', isActive: false },
    { id: '서대문구', place: '서대문구', isActive: false },
    { id: '마포구', place: '마포구', isActive: false },
    { id: '용산구', place: '용산구', isActive: false },
    { id: '중구', place: '중구', isActive: false },
    { id: '성동구', place: '성동구', isActive: false },
    { id: '광진구', place: '광진구', isActive: false },
    { id: '강동구', place: '강동구', isActive: false },
    { id: '송파구', place: '송파구', isActive: false },
    { id: '강남구', place: '강남구', isActive: false },
    { id: '서초구', place: '서초구', isActive: false },
    { id: '동작구', place: '동작구', isActive: false },
    { id: '관악구', place: '관악구', isActive: false },
    { id: '영등포구', place: '영등포구', isActive: false },
    { id: '금천구', place: '금천구', isActive: false },
    { id: '구로구', place: '구로구', isActive: false },
    { id: '양천구', place: '양천구', isActive: false },
    { id: '강서구', place: '강서구', isActive: false },
];

export default function HotPlaces() {
    const [showDetail, setShowDetail] = useState(false);
    const [places, setPlaces] = useState(locVal);
    const [activePlace, setActivePlace] = useState<string>('도봉구');
    const [searchKey, setSearchKey] = useState<string>('');

    const [showSearchList, setShowSearchList] = useState<boolean>(true);

    const handleSearchPlaces = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setSearchKey(e.target.value);

        let copiedPlaces = locVal.filter((v) => v.id.includes(e.target.value));
        setPlaces(copiedPlaces);
    };

    const handlePlaces = (e: string) => {
        setActivePlace(e);
        let copiedPlaces = places.map((v) => {
            return { ...v, isActive: v.id === e };
        });
        setPlaces(copiedPlaces);

        setShowSearchList(false);
        setTimeout(() => {
            setShowSearchList(true);
        }, 400);
    };

    const handleDetail = () => {
        setShowDetail(true);
    };

    const navigateToDetail = () => {};

    return (
        <div className="w-full max-w-set mx-auto h-full rounded-[44px] flex items-center mb-32 p-3 gap-2.5 bg-[#f3f2fb] border-2 border-[rgba(182,182,209,0.15)]">
            <div className="h-full rounded-[32px] w-60 py-6 bg-white shadow-hotplace flex flex-col">
                <div className="text-black text-xl font-bold py-1.5 px-6 mb-2">
                    자치구
                </div>

                <div className="w-full px-4 mb-6">
                    <div className="w-full h-10 flex gap-2 rounded-md border border-[#f3f2fb] px-4 bg-white">
                        <input
                            className="flex-1 h-full border-none text-sm focus:outline-none"
                            placeholder="자치구를 입력해주세요."
                            value={searchKey}
                            onChange={handleSearchPlaces}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-scroll max-h-[320px] overflow-x-hidden">
                    {places.length < 1 ? (
                        <div className="text-center text-gray-500 mt-4">
                            검색된 자치구가 없습니다.
                        </div>
                    ) : (
                        places.map((v) => {
                            return (
                                <div
                                    key={v.id}
                                    className={`w-full cursor-pointer px-6 py-3 text-base text-[#26253b] font-medium hover:bg-[rgba(108,108,158,.08)] ${
                                        v.isActive &&
                                        'bg-[rgba(108,108,158,.08)] border-r-4 border-[#f84f39]'
                                    }`}
                                    onClick={() => handlePlaces(v.id)}
                                >
                                    {v.place}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <div
                id="search-list"
                className="flex-1 bg-white h-full rounded-[32px] shadow-hotplace p-8"
            >
                <div
                    className={`w-full h-full flex flex-wrap gap-4 relative ${
                        showSearchList
                            ? 'top-0 opacity-100'
                            : 'top-16 opacity-0'
                    } transition-all duration-300`}
                >
                    {[1, 2, 3, 4, 5, 6].map((v) => {
                        return (
                            <div
                                key={v}
                                onClick={handleDetail}
                                className="w-[calc((100%-32px)/3)] h-[calc((100%-16px)/2)] border border-[#f3f2fb] shadow-hotplace p-4 rounded-xl cursor-pointer flex flex-col"
                            >
                                <div className="w-full flex-1 bg-[#F4F6F5] rounded-xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg">
                                    NO IMAGE
                                </div>

                                <div className="w-full flex justify-between mt-4">
                                    <div>
                                        <div className="text-lg font-bold">
                                            반포자이
                                        </div>
                                        <div className="text-[#7F7F7F] text-sm">
                                            20,000 만원
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
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
                                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="w-[420px] h-full rounded-[32px] bg-white shadow-hotplace">
                {showDetail ? (
                    <div className="w-full h-full p-8 flex flex-col justify-between">
                        <div>
                            <div className="text-2xl font-bold mb-8">
                                반포 자이
                            </div>
                            <div className="w-full h-[240px] bg-[#F4F6F5] rounded-xl text-center flex flex-col justify-center text-[#9b9b9b] text-lg">
                                NO IMAGE
                            </div>

                            <div className="w-full mt-4">
                                <div className="flex px-4 py-2">
                                    <div className="font-bold w-1/3">가격</div>
                                    <div className="flex-1">20,000 만원</div>
                                </div>
                                <div className="flex px-4 py-2">
                                    <div className="font-bold w-1/3">위치</div>
                                    <div className="flex-1">
                                        서울시 중구 명동7길 21
                                    </div>
                                </div>
                                <div className="flex px-4 py-2">
                                    <div className="font-bold w-1/3">
                                        건물용도
                                    </div>
                                    <div className="flex-1">아파트</div>
                                </div>
                                <div className="flex px-4 py-2">
                                    <div className="font-bold w-1/3">
                                        전용면적
                                    </div>
                                    <div className="flex-1">48.03 ㎡</div>
                                </div>
                            </div>
                        </div>

                        <CButton
                            title="Go to Detail"
                            onClick={navigateToDetail}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full text-center flex flex-col justify-center text-gray-500">
                        매물을 선택해주세요.
                    </div>
                )}
            </div>
        </div>
    );
}
