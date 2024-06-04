import { cancelBgFixed } from '@/utils/utils';
import DaumPostcode from 'react-daum-postcode';

interface IProps {
    closeModal: () => void;
    handleAddress: (e: any) => void;
}

export default function AddressModal({ closeModal, handleAddress }: IProps) {
    const handleComplete = (data: any) => {
        handleAddress(data);
        closeModal();
        cancelBgFixed();
    };

    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden z-50">
            <div className="relative w-1/2 h-fit bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex">
                <DaumPostcode onComplete={handleComplete} />

                <div
                    className={`absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all`}
                    onClick={() => {
                        closeModal();
                        cancelBgFixed();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
