import { ReactNode } from "react";

interface ModalProps {
    children: ReactNode;
    closeModal?: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
    return (
        <div 
            className={`absolute bg-green p-4 sm:p-10 text-lg sm:text-3xl rounded-2xl 
            border-4 border-green-light opacity-95 z-20 max-w-[300px] max-h-[200px] sm:max-w-[450px] sm:max-h-[380px]
            flex flex-col justify-center sm:justify-around items-center`}>
            {children}
            {closeModal && (
                <button 
                    className={`bg-pink hover:bg-red-dark rounded-2xl 
                        sm:py-2 px-3 border-2 sm:border-4 border-white 
                        text-xl mt-1 sm:mt-6 w-1/2`}
                    onClick={closeModal}>
                    Okay
                </button>)}
        </div>
    )
}