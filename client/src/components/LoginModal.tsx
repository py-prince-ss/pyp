'use client';

import { signinApi } from '@/apis/userApi';
import { useInput } from '@/hooks/useInput';
import { IError } from '@/interface/commonIFC';
import { tokenState } from '@/state/userState';
import { cancelBgFixed } from '@/utils/utils';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import CButton from './common/CButton';
import CInput from './common/CInput';
import CSpinner from './common/CSpinner';

interface ILoginModal {
    setModalOpen: (flag: boolean) => void;
}

export default function LoginModal({ setModalOpen }: ILoginModal) {
    const [token, setToken] = useRecoilState(tokenState);

    const router = useRouter();

    const [emailErr, setEmailErr] = useState(false);
    const [pwErr, setPwErr] = useState(false);
    const [emailErrMsg, setEmailErrMsg] = useState('이메일을 입력해주세요.');
    const [pwErrMsg, setPwErrMsg] = useState('비밀번호를 입력해주세요.');

    const [fetchErr, setFetchErr] = useState(false);

    const email = useInput('');
    const password = useInput('');

    const signInMutation = useMutation({
        mutationFn: signinApi,
        onMutate: (variable) => {
            console.log('onMutate', variable);
            setFetchErr(false);
        },
        onError: (error: IError, variable, context) => {
            console.error('signinErr:::', error);
            setFetchErr(true);
        },
        onSuccess: (data, variables, context) => {
            console.log('signinSuccess', data, variables, context);
            if (data.success) {
                setModalOpen(false);
                localStorage.setItem('token', data.token);
                setToken(data.token);

                router.push('/');
            } else setFetchErr(true);
        },
        onSettled: () => {
            cancelBgFixed();
            console.log('signinEnd');
        },
    });

    const handleSubmit = useCallback(
        (
            e:
                | React.FormEvent<HTMLFormElement>
                | React.MouseEvent<HTMLButtonElement>,
        ) => {
            e.preventDefault();

            setEmailErr(false);
            setPwErr(false);

            let emailVal = email.value;
            let pwVal = password.value;

            let errFlag = false;
            if (emailVal === '') {
                setEmailErr(true);
                setEmailErrMsg('이메일을 입력해주세요.');
                errFlag = true;
            }
            if (pwVal === '') {
                setPwErr(true);
                setEmailErrMsg('비밀번호를 입력해주세요.');
                errFlag = true;
            }
            let email_regex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            if (!email_regex.test(emailVal)) {
                setEmailErr(true);
                setEmailErrMsg('이메일 형식을 확인해주세요.');
                errFlag = true;
            }

            if (errFlag) return;

            let payload = {
                email: emailVal,
                password: pwVal,
            };

            signInMutation.mutate(payload);
        },
        [email, password, signInMutation],
    );

    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden z-50">
            {signInMutation.isPending && <CSpinner />}

            <div className="relative w-[480px] h-fit py-12 bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex">
                <div className="w-full h-full px-12 flex justify-center flex-col">
                    <div className="mb-8 text-3xl font-bold">Log In</div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <div className="mb-2 font-medium text-sm">
                                Email
                            </div>
                            <CInput
                                {...email}
                                type="email"
                                placeholder="Enter the email"
                                isErr={emailErr}
                                errMsg={emailErrMsg}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                                    />
                                </svg>
                            </CInput>
                        </div>

                        <div>
                            <div className="mb-2 font-medium text-sm">
                                Password
                            </div>
                            <CInput
                                {...password}
                                type="password"
                                placeholder="Enter the password"
                                isErr={pwErr}
                                errMsg={pwErrMsg}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                    />
                                </svg>
                            </CInput>
                        </div>

                        {fetchErr && (
                            <div className="text-[#ea002c] text-xs pl-2 -mt-2">
                                이메일 혹은 비밀번호를 확인해주세요.
                            </div>
                        )}
                        <CButton title="SIGN IN" onClick={handleSubmit} />
                    </form>

                    <div className="text-center mt-8 text-sm text-gray-400">
                        Not a Member?&nbsp;
                        <Link
                            href="/register"
                            onClick={() => {
                                setModalOpen(false);
                                cancelBgFixed();
                            }}
                        >
                            <span className="text-blue-500">Sign Up</span>
                        </Link>
                    </div>

                    <div className="text-center mt-2">
                        <Link
                            href="/findpw"
                            onClick={() => {
                                setModalOpen(false);
                                cancelBgFixed();
                            }}
                        >
                            <span className="text-sm text-gray-400 hover:underline cursor-pointer">
                                Forgot your password?
                            </span>
                        </Link>
                    </div>
                </div>

                <div
                    className={`absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all`}
                    onClick={() => {
                        setModalOpen(false);
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
