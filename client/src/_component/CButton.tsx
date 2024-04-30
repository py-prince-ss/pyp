import styled from 'styled-components';

interface ICButton {
    title: string;
    isFull?: boolean;
    isCancel?: boolean;
    addClass?: string;
    onClick: (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>,
    ) => void;
}

const Btn = styled.button<{ isCancel?: boolean }>`
    border-radius: 6px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    background: black;
    color: white;
    &:hover {
        background: gray;
    }
`;

export default function CButton({
    title,
    isFull,
    isCancel,
    onClick,
    addClass,
}: ICButton) {
    return <Btn onClick={onClick}>{title}</Btn>;
}
