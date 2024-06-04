'use client';

import CButton from '@/components/common/CButton';
import CInput from '@/components/common/CInput';
import { useInput } from '@/hooks/useInput';
import { bgFixed } from '@/utils/utils';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export default function UpdateHouse() {
    const [showAddressModal, setShowAddressModal] = useState<boolean>(false);

    const [isActive, setIsActive] = useState<boolean>(false);

    // required
    const floor = useInput(''); // 해당층 string
    const room = useInput(''); // 방수 string
    const supplyArea = useInput(''); // 공급면적 double
    const netLeasableArea = useInput(''); // 전용면적 double
    const houseType = useInput(''); // 건물용도 string
    const objAmt = useInput(''); // 물건금액(만원) int
    const bldgNm = useInput(''); // 건물명 string

    // not required
    const direction = useInput(''); // 방향 string
    const entranceStructure = useInput(''); // 현관구조 string
    const numberOfHouseholds = useInput(''); // 해당면적 세대수 string
    const managementFee = useInput(''); // 관리비 string
    const parkingSpaces = useInput(''); // 총주차대수 string
    const description = useInput(''); // 매물설명 string
    const totalFloor = useInput(''); // 총층 string
    const bathroom = useInput(''); // 욕실수 string

    // Address
    const [addressRoad, setAddressRoad] = useState<string>('');
    const [sggNm, setSggNm] = useState<string>('');
    const [bjdongNm, setBjdongNm] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    // Error
    const [addressRoadErr, setAddressRoadErr] = useState<boolean>(false);
    const [floorErr, setFloorErr] = useState<boolean>(false);
    const [roomErr, setRoomErr] = useState<boolean>(false);
    const [supplyAreaErr, setSupplyAreaErr] = useState<boolean>(false);
    const [netLeasableAreaErr, setNetLeasableAreaErr] =
        useState<boolean>(false);
    const [houseTypeErr, setHouseTypeErr] = useState<boolean>(false);
    const [objAmtErr, setObjAmtErr] = useState<boolean>(false);
    const [bldgNmErr, setBldgNmErr] = useState<boolean>(false);
    const [descriptionErr, setDescriptionErr] = useState<boolean>(false);
    const [totalFloorErr, setTotalFloorErr] = useState<boolean>(false);
    const [bathroomErr, setBathroomErr] = useState<boolean>(false);

    // ErrorMsg

    const checkErr = (val: string, func: Dispatch<SetStateAction<boolean>>) => {
        func(val === '');
        return val === '';
    };

    const handleSubmit = useCallback(
        (
            e:
                | React.FormEvent<HTMLFormElement>
                | React.MouseEvent<HTMLButtonElement>,
        ) => {
            e.preventDefault();

            let errFlag = false;

            errFlag = checkErr(addressRoad, setAddressRoadErr);
            errFlag = checkErr(floor.value, setFloorErr);
            errFlag = checkErr(room.value, setRoomErr);
            errFlag = checkErr(supplyArea.value, setSupplyAreaErr);
            errFlag = checkErr(netLeasableArea.value, setNetLeasableAreaErr);
            errFlag = checkErr(houseType.value, setHouseTypeErr);
            errFlag = checkErr(objAmt.value, setObjAmtErr);
            errFlag = checkErr(bldgNm.value, setBldgNmErr);
            errFlag = checkErr(description.value, setDescriptionErr);
            errFlag = checkErr(totalFloor.value, setTotalFloorErr);
            errFlag = checkErr(bathroom.value, setBathroomErr);

            if (errFlag) return;

            let data = {
                house: {
                    addressRoad: addressRoad,
                    sggNm: sggNm,
                    bjdongNm: bjdongNm,
                    floor: floor.value,
                    room: room.value,
                    supplyArea: Number(supplyArea.value),
                    netLeasableArea: Number(netLeasableArea.value),
                    houseType: houseType.value,
                    objAmt: Number(objAmt.value),
                    bldgNm: bldgNm.value,
                    description: description.value,
                    totalFloor: totalFloor.value,
                    bathroom: bathroom.value,
                    direction: direction.value,
                    entranceStructure: entranceStructure.value,
                    numberOfHouseholds: numberOfHouseholds.value,
                    address: address,
                    managementFee: managementFee.value,
                    parkingSpaces: parkingSpaces.value,
                },
            };
        },
        [
            addressRoad,
            sggNm,
            bjdongNm,
            floor,
            room,
            supplyArea,
            netLeasableArea,
            houseType,
            objAmt,
            bldgNm,
            description,
            totalFloor,
            bathroom,
            direction,
            entranceStructure,
            numberOfHouseholds,
            address,
            managementFee,
            parkingSpaces,
        ],
    );

    const onClickAddress = () => {
        setShowAddressModal(true);
        bgFixed();
    };

    // const closeAddressModal = () => setShowAddressModal(false);
    // const handleAddress = (e) => {
    //     setAddressRoadErr(false);
    //     setAddressRoad(e.address);
    //     setSggNm(e.sigungu.split(' ')[1]);
    //     setBjdongNm(e.bname);
    //     setAddress(e.jibunAddress);
    // };

    return (
        <div className="flex justify-center px-20 pt-12 pb-0">
            {/* {isLoading && <CSpinner />} */}

            <div className="bg-white max-w-set p-24 rounded-3xl w-full">
                <div className="w-full">
                    <h1 className="w-full text-4xl font-bold mb-10">
                        수정할 매물 정보를 입력해주세요.
                    </h1>

                    <form
                        className="flex flex-col gap-6"
                        onSubmit={handleSubmit}
                    >
                        <CInput
                            {...bldgNm}
                            type="text"
                            label="건물명"
                            placeholder="건물명을 입력해주세요."
                            required
                            isErr={bldgNmErr}
                            errMsg="건물명을 입력해주세요."
                        />

                        <CInput
                            {...objAmt}
                            type="text"
                            label="물건금액(만원)"
                            placeholder="물건금액을 입력해주세요."
                            required
                            isErr={objAmtErr}
                            errMsg="물건금액을 입력해주세요."
                        />
                        <div className="w-full">
                            <div className="mb-2 font-medium text-sm">
                                주소
                                <span className="text-[#ea002c]">&nbsp;*</span>
                            </div>
                            <div
                                className={`w-full h-10 flex gap-2 rounded-md border ${
                                    addressRoadErr
                                        ? 'border-[#ea002c]'
                                        : 'border-gray-400'
                                } px-4 cursor-pointer`}
                            >
                                <input
                                    className="flex-1 h-full border-none text-sm focus:outline-none bg-white cursor-pointer"
                                    type="text"
                                    value={addressRoad}
                                    placeholder="주소를 입력해주세요."
                                    readOnly
                                    onClick={onClickAddress}
                                />
                            </div>
                            {addressRoadErr && (
                                <div className="text-[#ea002c] text-xs mt-1 pl-4">
                                    주소를 입력해주세요.
                                </div>
                            )}
                        </div>
                        <CInput
                            {...description}
                            type="text"
                            label="매물 설명"
                            placeholder="매물 설명을 입력해주세요."
                            required
                            isErr={descriptionErr}
                            errMsg="매물 설명을 입력해주세요."
                        />
                        <div className="w-full flex gap-6">
                            <CInput
                                {...floor}
                                type="text"
                                label="해당 층"
                                placeholder="해당 층을 입력해주세요."
                                required
                                isErr={floorErr}
                                errMsg="해당 층을 입력해주세요."
                            />

                            <CInput
                                {...totalFloor}
                                type="text"
                                label="총 층"
                                placeholder="총 층을 입력해주세요."
                                required
                                isErr={totalFloorErr}
                                errMsg="총 층을 입력해주세요."
                            />
                        </div>
                        <div className="w-full flex gap-6">
                            <CInput
                                {...netLeasableArea}
                                type="text"
                                label="전용면적"
                                placeholder="전용면적을 입력해주세요."
                                required
                                isErr={netLeasableAreaErr}
                                errMsg="전용면적을 입력해주세요."
                            />

                            <CInput
                                {...supplyArea}
                                type="text"
                                label="공급면적"
                                placeholder="공급면적을 입력해주세요."
                                required
                                isErr={supplyAreaErr}
                                errMsg="공급면적을 입력해주세요."
                            />
                        </div>
                        <div className="w-full flex gap-6">
                            <CInput
                                {...room}
                                type="text"
                                label="방 수"
                                placeholder="방 수를 입력해주세요."
                                required
                                isErr={roomErr}
                                errMsg="방 수를 입력해주세요."
                            />
                            <CInput
                                {...bathroom}
                                type="text"
                                label="욕실 수"
                                placeholder="욕실 수를 입력해주세요."
                                required
                                isErr={bathroomErr}
                                errMsg="욕실 수를 입력해주세요."
                            />
                        </div>
                        <div className="w-full flex gap-6">
                            <CInput
                                {...houseType}
                                type="text"
                                label="건물 용도"
                                placeholder="건물 용도를 입력해주세요."
                                required
                                isErr={houseTypeErr}
                                errMsg="건물 용도를 입력해주세요."
                            />
                            <CInput
                                {...numberOfHouseholds}
                                type="text"
                                label="해당 면적"
                                placeholder="해당 면적을 입력해주세요."
                            />
                        </div>
                        <div className="w-full flex gap-6">
                            <CInput
                                {...parkingSpaces}
                                type="text"
                                label="총 주차 대수"
                                placeholder="총 주차 대수를 입력해주세요."
                            />
                            <CInput
                                {...direction}
                                type="text"
                                label="방향"
                                placeholder="방향을 입력해주세요."
                            />
                        </div>
                        <div className="w-full flex gap-6">
                            <CInput
                                {...managementFee}
                                type="text"
                                label="관리비"
                                placeholder="관리비를 입력해주세요."
                            />

                            <CInput
                                {...entranceStructure}
                                type="text"
                                label="현관구조"
                                placeholder="현관구조를 입력해주세요."
                            />
                        </div>
                        {/* {showAddressModal && (
                        <AddressModal
                            closeModal={closeAddressModal}
                            handleAddress={handleAddress}
                        />
                    )} */}

                        <div>
                            {' '}
                            <div className="mb-2 font-medium text-sm">
                                건물 이미지
                            </div>
                            <label
                                //   onDrop={onDragAddImage}
                                //   onDragOver={onPreventDragOver}
                                onMouseOver={() => setIsActive(true)}
                                onMouseLeave={() => setIsActive(false)}
                                onDragLeave={() => setIsActive(false)}
                                onDragEnter={() => setIsActive(true)}
                                className={`w-full cursor-pointer text-gray-600 flex items-center justify-center border-2 border-dashed ${
                                    isActive
                                        ? 'border-[#FB2E86]'
                                        : 'border-gray-300'
                                } h-48 rounded-md`}
                            >
                                <svg
                                    className="h-12 w-12"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="ml-2 font-lato">
                                    Select the imgs
                                </div>
                                <input
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    // onChange={handleImgs}
                                />
                            </label>
                        </div>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4, 5].map((item, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="font-lato w-32 h-32 text-gray-600 border-2 border-gray-300 rounded-md text-center flex justify-center flex-col"
                                    >
                                        Empty...
                                    </div>
                                );
                            })}
                        </div>

                        <div className="w-full flex justify-end">
                            <CButton title="등록하기" onClick={handleSubmit} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
