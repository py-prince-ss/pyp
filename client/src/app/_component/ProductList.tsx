'use client';

import CLargeCard from '@/_component/CLargeCard';
import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const Wrap = styled.div<{ bgColor: string }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 1.6667vw;
    height: 80vh;
    padding: 3.75vw;
    background-color: ${(props) => props.bgColor};
`;

const Title = styled.div<{ bgColor: string }>`
    font-size: 1.875vw;
    font-weight: 800;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;

    & span {
        color: ${(props) =>
            props.bgColor === '#f3f2f9' ? '#6B66DA' : '#2B966F'};
    }
`;

const Plus = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > svg {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
`;

const List = styled(Swiper)`
    width: 100%;
    flex: 1;
`;

interface IProps {
    bgColor: string;
    title: string;
}

export default function ProductList({ bgColor, title }: IProps) {
    return (
        <Wrap bgColor={bgColor}>
            <Title bgColor={bgColor}>
                <div>
                    <span>{title}</span>&nbsp;Products
                </div>
                <Plus>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </Plus>
            </Title>

            <List spaceBetween={24} slidesPerView={3}>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CLargeCard />
                </SwiperSlide>
            </List>
        </Wrap>
    );
}
