import { ReactNode } from "react";

interface ModalProps {
    children: ReactNode;
    closeModal?: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
    return (
        <div 
            className={`absolute bg-green p-10 text-3xl rounded-2xl 
            border-4 border-green-light opacity-95 z-20 w-[450px] h-[350px]
            flex flex-col justify-around`}>
            {children}
            {closeModal && (
                <button 
                    className={`bg-pink hover:bg-red-dark rounded-2xl 
                        py-2 px-3 border-4 border-white text-xl mt-6`}
                    onClick={closeModal}>
                    Okay
                </button>)}
        </div>
    )
}