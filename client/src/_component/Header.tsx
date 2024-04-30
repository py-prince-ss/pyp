import Link from 'next/link';
import styled from 'styled-components';
import CButton from './CButton';

const Layout = styled.div`
    width: 100%;
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.div`
    font-weight: 800;
    font-size: 24px;
`;

const NavigationWrap = styled.div`
    display: flex;
    gap: 48px;
    align-items: center;

    & > div {
        background: none;
        border: none;
    }
`;

export default function Header() {
    const navigateToLogin = () => {};

    return (
        <Layout>
            <Logo>
                <Link href="/">Pyp</Link>
            </Logo>

            <NavigationWrap>
                <div>
                    <Link href="/register/house">매물 등록</Link>
                </div>
                <div>
                    <Link href="/search">통합검색</Link>
                </div>
                <CButton title="Sign In" onClick={navigateToLogin} />
            </NavigationWrap>
        </Layout>
    );
}
