'use client';

import { bgState } from '@/state/bgState';
import { userState } from '@/state/userState';
import { bgFixed } from '@/utils/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import LoginModal from './LoginModal';
import CButton from './common/CButton';

export default function Header() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [bgColor, setBgColor] = useRecoilState(bgState);

    const [position, setPosition] = useState(0);

    const router = useSelectedLayoutSegment();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [position]);

    const [user, setUser] = useRecoilState(userState);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        setIsAuth(user.token !== '');
    }, [user]);

    const handleScroll = useCallback(() => {
        const moving = window.pageYOffset;

        // Home에서만 스크롤 어느정도 아래로 내렸을 때 색 변경
        let bg = router
            ? '#f3f2fb'
            : moving > window.innerHeight / 2
            ? '#fff'
            : '#f3f2fb';
        setBgColor(bg);

        setPosition(moving);
    }, [position]);

    const navigateToLogin = () => {
        setModalOpen(true);
        bgFixed();
    };

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const handleShowMyPage = async () => {
        setShowDropdown((prev) => !prev);
    };

    const onClickLogout = () => {
        setShowDropdown(false);
        localStorage.removeItem('token');

        setUser({
            token: '',
            user: {
                id: 0,
                name: '',
                email: '',
                age: 0,
                phone: '',
            },
        });
    };

    return (
        <div className="w-full py-12 flex px-20 justify-center bg-[#f3f2fb] h-24">
            <div className="w-full flex justify-between max-w-set items-center">
                <div className="font-extrabold text-4xl text-[#26253b]">
                    <Link href="/">PYP</Link>
                </div>

                <div className="flex gap-12 items-center">
                    <div className="bg-none border-none">
                        <Link href="/house/register">매물 등록</Link>
                    </div>
                    <div className="bg-none border-none">
                        <Link href="/search">통합검색</Link>
                    </div>
                    {isAuth ? (
                        <div className="relative nav-mypage">
                            <div
                                className="w-10 h-10 rounded-full bg-black flex justify-center items-center cursor-pointer hover:bg-gray-800"
                                onClick={handleShowMyPage}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                            </div>

                            {showDropdown && (
                                <div className="absolute top-14 -left-[120px]">
                                    <div className="bg-white rounded-md border border-gray-200 z-10 absolute w-[280px] h-fit shadow-md">
                                        <div className="p-8 w-full">
                                            <div className="w-full text-center text-xl font-bold mb-4">
                                                {user.user.name}
                                            </div>
                                            <div className="w-full flex justify-center">
                                                <div className="w-24 h-24 rounded-full bg-gray-500"></div>
                                            </div>
                                        </div>
                                        <div className="w-full h-[1px] border border-gray-200"></div>
                                        <div className="p-4 py-2 w-full flex justify-end gap-4">
                                            <div
                                                className="text-sm text-blue-600 cursor-pointer"
                                                // onClick={navigateToMypage}
                                            >
                                                Mypage
                                            </div>

                                            <div
                                                className="text-sm text-blue-600 cursor-pointer"
                                                onClick={onClickLogout}
                                            >
                                                Logout
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-3 h-3 rotate-45 bg-white border border-gray-200 absolute -top-1 left-[135px]"></div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <CButton title="Sign In" onClick={navigateToLogin} />
                    )}
                </div>
            </div>

            {modalOpen ? <LoginModal setModalOpen={setModalOpen} /> : ''}
        </div>
    );
}
