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

export default function CButton({
    title,
    isFull,
    isCancel,
    onClick,
    addClass,
}: ICButton) {
    return (
        <button
            className="rounded-md px-4 py-2 bg-black text-white hover:bg-gray"
            onClick={onClick}
        >
            {title}
        </button>
    );
}
