'use client';

import styled from 'styled-components';
import ProductList from './_component/ProductList';

const Products = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export default function Home() {
    return (
        <div>
            <Products>
                <ProductList bgColor="#f3f2f9" title="Liked" />
                <ProductList bgColor="#EBF4F0" title="Recommended" />
            </Products>
        </div>
    );
}
