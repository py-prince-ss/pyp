import Link from 'next/link';

interface ICLargeCard {
    data: {
        id: string;
        title: string;
        price: number;
        image: string;
    };
}

export default function CLargeCard() {
    return (
        <Link className="cursor-pointer w-full h-full flex flex-col" href={`/`}>
            <div className="w-full flex-1 rounded-xl bg-white"></div>
            <div className="w-full flex justify-between mt-4">
                <div>
                    <div className="text-lg font-bold">TITLE</div>
                    <div className="text-[#7f7f7f] text-sm">20000</div>
                </div>
                <div className="flex flex-col justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
