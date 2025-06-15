import { type ReactNode } from "react";

interface ModalProps {
    onBGClicked: () => void;
    children: ReactNode;
}

const ModalContainer = ({onBGClicked, children}: ModalProps) => {
    return (
        <div
            onClick={onBGClicked}
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-lg w-full max-w-lg shadow"
            >
                {children}
            </div>
        </div>
    );
}

export default ModalContainer;