const hotPlaces = [
    { id: 0, place: '성동구', isActive: true },
    { id: 1, place: '중구', isActive: false },
    { id: 2, place: '광진구', isActive: false },
];

export default function HotPlaces() {
    return (
        <div className="w-full max-w-set mx-auto h-full rounded-[44px] flex items-center mb-32 p-3 gap-2.5 bg-[#f3f2fb] border-2 border-[rgba(182,182,209,0.15)]">
            <div className="h-full rounded-[32px] w-60 py-6 bg-white shadow-hotplace">
                <div className="text-[#72718a] text-sm py-1.5 px-6 mb-[5px]">
                    TOP 3
                </div>

                <div>
                    {hotPlaces.map((v) => {
                        return (
                            <div
                                key={v.id}
                                className={`w-full px-6 py-3 text-base text-[#26253b] cursor-pointer font-medium hover:bg-[rgba(108,108,158,.08)] ${
                                    v.isActive &&
                                    'bg-[rgba(108,108,158,.08)] border-r-4 border-[#f84f39]'
                                }`}
                            >
                                {v.place}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex-1 bg-white h-full rounded-[32px] shadow-hotplace text-center flex flex-col justify-center">
                MAP
            </div>
        </div>
    );
}
