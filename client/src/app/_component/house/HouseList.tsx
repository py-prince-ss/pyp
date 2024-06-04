interface Props {
    openDetail: () => void;
}

export default function HouseList({ openDetail }: Props) {
    return (
        <div className="flex-1 p-8 text-white flex justify-center">
            <div className="w-full max-w-[780px]">
                {/* Filter List */}
                <div className="flex gap-2 mb-4 px-8">
                    <div className="w-fit border border-[#39394a] py-1 px-2 rounded-md text-sm">
                        도봉구
                    </div>
                    <div className="w-fit border border-[#39394a] py-1 px-2 rounded-md text-sm">
                        원룸
                    </div>
                    <div className="w-fit border border-[#39394a] py-1 px-2 rounded-md text-sm">
                        1억 이상
                    </div>
                    <div className="w-fit border border-[#39394a] py-1 px-2 rounded-md text-sm">
                        12평 이상
                    </div>
                </div>

                {/* Item List */}
                <div className="w-full">
                    <div className="w-full flex flex-col">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => {
                            return (
                                <div
                                    key={v}
                                    onClick={openDetail}
                                    className="w-full flex gap-8 p-8 border-b border-[#39394a] cursor-pointer hover:bg-[#303345]"
                                >
                                    <div className="w-32 h-32 bg-white rounded-md flex justify-center items-center">
                                        Image
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        <div>
                                            <div className="text-gray-100 text-base mb-1">
                                                아크로타워
                                            </div>
                                            <div className="text-gray-300 text-sm">
                                                서울특별시 영등포구 버드나루로
                                                42 510호
                                            </div>
                                        </div>
                                        <div className="text-gray-300">
                                            20,000 만원
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
