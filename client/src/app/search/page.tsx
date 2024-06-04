'use client';

import { bgFixed, cancelBgFixed } from '@/utils/utils';
import { useState } from 'react';
import HouseDetailModal from '../_component/house/HouseDetailModal';
import HouseList from '../_component/house/HouseList';
import ListFiltering from '../_component/house/ListFiltering';

export default function SearchHouse() {
    const [openDetail, showOpenDetail] = useState<boolean>(false);

    const handleDetail = () => {
        if (!openDetail) bgFixed();
        else cancelBgFixed();

        showOpenDetail(!openDetail);
    };

    return (
        <div className="w-full min-h-screen bg-[#2b2f40] flex">
            <ListFiltering />
            <HouseList openDetail={handleDetail} />
            {openDetail && <HouseDetailModal openDetail={showOpenDetail} />}
        </div>
    );
}
