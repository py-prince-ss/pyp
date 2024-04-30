import Link from 'next/link';
import styled from 'styled-components';

const Wrap = styled(Link)`
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const ImageContent = styled.div`
    width: 100%;
    flex: 1;
    border-radius: 12px;
    background-color: white;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 700;
`;
const Price = styled.div`
    color: #7f7f7f;
    font-size: 14px;
`;
const Arrow = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > svg {
        width: 24px;
        height: 24px;
    }
`;

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
        <Wrap href={`/`}>
            <ImageContent></ImageContent>
            <Content>
                <div>
                    <Title>TITLE</Title>
                    <Price>20000</Price>
                </div>
                <Arrow>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </Arrow>
            </Content>
        </Wrap>
    );
}
