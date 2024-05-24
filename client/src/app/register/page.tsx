'use client';

import { signupApi } from '@/apis/userApi';
import CButton from '@/components/common/CButton';
import CInput from '@/components/common/CInput';
import CSpinner from '@/components/common/CSpinner';
import { useInput } from '@/hooks/useInput';
import { IError } from '@/interface/commonIFC';
import { signupIFC } from '@/interface/userIFC';
import { tokenState } from '@/state/userState';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Register() {
    const [token, setToken] = useRecoilState(tokenState);

    const router = useRouter();

    const email = useInput('');
    const pw = useInput('');
    const pwCorrect = useInput('');
    const name = useInput('');
    const phone = useInput('');
    const address = useInput('');
    const age = useInput('');
    const otp = useInput('');

    // 정규표현식 및 유효성 검사 후 true / false
    const [isEmailErr, setIsEmailErr] = useState<boolean>(false);
    const [isPwErr, setIsPwErr] = useState<boolean>(false);
    const [isPwCorrectErr, setIsPwCorrectErr] = useState<boolean>(false);
    const [isAddressErr, setIsAddressErr] = useState<boolean>(false);
    const [isNameErr, setIsNameErr] = useState<boolean>(false);
    const [isPhoneErr, setIsPhoneErr] = useState<boolean>(false);
    const [isPhonePendingErr, setIsPhonePendingErr] = useState<boolean>(false);
    const [isPhoneAuthErr, setIsPhoneAuthErr] = useState<boolean>(false);
    const [isAgeErr, setIsAgeErr] = useState<boolean>(false);

    const [nameErrMsg, setNameErrMsg] = useState<string>('');
    const [pwErrMsg, setPwErrMsg] = useState<string>('');
    const [pwConfirmErrMsg, setPwConfirmErrMsg] = useState<string>('');
    const [emailErrMsg, setEmailErrMsg] = useState<string>('');
    const [phoneErrMsg, setPhoneErrMsg] = useState<string>('');
    const [addressErrMsg, setAddressErrMsg] = useState<string>('');
    const [ageErrMsg, setAgeErrMsg] = useState<string>('');

    const signupMutation = useMutation({
        mutationFn: signupApi,
        onMutate: (variable) => {
            console.log('onMutate', variable);
        },
        onError: (error: IError, variable, context) => {
            console.error('signupErr:::', error);

            if (error.response.data.msg === '이미 존재하는 이메일입니다.') {
                setIsPwErr(false);
                setIsEmailErr(true);
                setEmailErrMsg('이미 존재하는 이메일입니다.');
            }
        },
        onSuccess: (data, variables, context) => {
            console.log('signupSuccess', data, variables, context);

            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                router.push('/');
            } else {
                if (data.msg === '이미 가입한 이메일입니다.') {
                    setIsEmailErr(true);
                    setEmailErrMsg('이미 존재하는 이메일입니다.');
                }
            }
        },
        onSettled: () => {
            console.log('signupEnd');
        },
    });

    const handleSubmit = useCallback(
        (
            e:
                | React.FormEvent<HTMLFormElement>
                | React.MouseEvent<HTMLButtonElement>,
        ) => {
            e.preventDefault();

            setIsEmailErr(false);
            setIsPwErr(false);
            setIsPwCorrectErr(false);
            setIsAddressErr(false);
            setIsNameErr(false);
            setIsPhoneErr(false);
            setIsPhonePendingErr(false);
            setIsPhoneAuthErr(false);
            setIsAgeErr(false);

            let emailVal = email.value;
            let pwVal = pw.value;
            let pwCheckVal = pwCorrect.value;
            let nameVal = name.value;
            let phoneVal = phone.value;
            let ageVal = age.value;
            let addressVal = address.value;

            let errFlag = false;

            let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            let pwRegex =
                /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/;

            if (emailVal === '') {
                setIsEmailErr(true);
                setEmailErrMsg('이메일을 입력해주세요.');
                errFlag = true;
            } else if (!emailRegex.test(emailVal)) {
                setIsEmailErr(true);
                setEmailErrMsg('이메일 형식을 확인해주세요.');
                errFlag = true;
            }
            if (pwVal === '') {
                setIsPwErr(true);
                setPwErrMsg('비밀번호를 입력해주세요.');
                errFlag = true;
            } else if (!pwRegex.test(pwVal)) {
                setIsPwErr(true);
                setPwErrMsg(
                    '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상 조합하여 8자리 이상으로 입력해주세요.',
                );
                errFlag = true;
            }
            if (pwCheckVal === '') {
                setIsPwCorrectErr(true);
                setPwConfirmErrMsg('비밀번호 확인을 입력해주세요.');
                errFlag = true;
            } else if (pwCheckVal !== pwVal) {
                setIsPwCorrectErr(true);
                setPwConfirmErrMsg(
                    '비밀번호와 비밀번호 확인은 동일해야합니다.',
                );
                errFlag = true;
            }
            if (nameVal === '') {
                setIsNameErr(true);
                setNameErrMsg('이름을 입력해주세요.');
                errFlag = true;
            }
            if (phoneVal === '') {
                setIsPhoneErr(true);
                setPhoneErrMsg('휴대폰 번호를 입력해주세요.');
                errFlag = true;
            }
            if (ageVal === '') {
                setIsAgeErr(true);
                setAgeErrMsg('나이를 입력해주세요.');
                errFlag = true;
            }
            if (addressVal === '') {
                setIsAddressErr(true);
                setAddressErrMsg('주소를 입력해주세요.');
                errFlag = true;
            }
            // if (authNum.value === '') {
            //     setAuthErr(true);
            //     setAuthErrMsg('인증번호를 입력해주세요.');
            //     errFlag = true;
            // } else if (authNum.value !== authNumResponse) {
            //     setAuthErr(true);
            //     setAuthErrMsg('인증번호를 확인해주세요.');
            //     errFlag = true;
            // }

            if (errFlag) return;

            let payload: signupIFC = {
                name: nameVal,
                age: age.value,
                email: emailVal,
                password: pwVal,
                phone: phoneVal,
                address: address.value,
            };

            signupMutation.mutate(payload);
        },
        [
            email,
            pw,
            name,
            pwCorrect,
            phone,
            signupMutation,
            // authNum,
            // authNumResponse,
        ],
    );
    const handlePhoneAuthentication = () => {};

    const confirmPhoneAuthentication = () => {};

    const navigateToBack = () => {
        router.back();
    };

    return (
        <div className="w-screen h-fit bg-[#E7E6F0] p-2 overflow-x-hidden">
            {signupMutation.isPending && <CSpinner />}

            <div className="w-full h-full bg-[#FAFAFC] rounded-lg flex flex-col">
                <div className="w-full flex justify-end p-6">
                    <div
                        className="w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:animate-bounce"
                        onClick={navigateToBack}
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

                <div className="w-full flex-1 py-20 px-20 flex justify-center items-center">
                    <div className="w-full max-w-set flex justify-center">
                        <div className="w-1/2 h-fit rounded-[44px] bg-white shadow-hotplace border-2 border-[rgba(182,182,209,0.15)]">
                            <div className="p-20">
                                <div className="w-full text-center mb-12 text-4xl font-bold">
                                    Sign Up
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-4"
                                >
                                    <CInput
                                        {...email}
                                        type="email"
                                        placeholder="이메일을 입력해주세요."
                                        label="이메일"
                                        isErr={isEmailErr}
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

                                    <CInput
                                        {...pw}
                                        type="password"
                                        placeholder="비밀번호를 입력해주세요."
                                        label="비밀번호"
                                        isErr={isPwErr}
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

                                    <CInput
                                        {...pwCorrect}
                                        type="password"
                                        placeholder="비밀번호 확인을 입력해주세요."
                                        label="비밀번호 확인"
                                        isErr={isPwCorrectErr}
                                        errMsg={pwConfirmErrMsg}
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
                                                d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                            />
                                        </svg>
                                    </CInput>

                                    <CInput
                                        {...name}
                                        type="text"
                                        placeholder="이름을 입력해주세요."
                                        label="이름"
                                        isErr={isNameErr}
                                        errMsg={nameErrMsg}
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
                                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                            />
                                        </svg>
                                    </CInput>

                                    <div>
                                        <div className="mb-2 font-medium text-sm">
                                            핸드폰 번호
                                        </div>
                                        <div className="w-full flex gap-4">
                                            <div className="flex-1">
                                                <CInput
                                                    {...phone}
                                                    type="text"
                                                    placeholder="핸드폰 번호를 입력해주세요."
                                                    isErr={isPhoneErr}
                                                    errMsg={phoneErrMsg}
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
                                                            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                                                        />
                                                    </svg>
                                                </CInput>
                                            </div>

                                            <CButton
                                                title="인증하기"
                                                onClick={
                                                    handlePhoneAuthentication
                                                }
                                            />
                                        </div>
                                    </div>

                                    <CInput
                                        {...age}
                                        type="text"
                                        placeholder="나이를 입력해주세요."
                                        label="나이"
                                        isErr={isAgeErr}
                                        errMsg={ageErrMsg}
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
                                                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                                            />
                                        </svg>
                                    </CInput>

                                    <CInput
                                        {...address}
                                        type="text"
                                        placeholder="주소를 입력해주세요."
                                        label="주소"
                                        isErr={isAddressErr}
                                        errMsg={addressErrMsg}
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
                                                d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                                            />
                                        </svg>
                                    </CInput>

                                    <CButton
                                        title="SIGN UP"
                                        onClick={handleSubmit}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
