import { ReactNode } from "react";

interface ModalProps {
    children: ReactNode;
    closeModal?: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
    return (
        <div 
            className={`absolute bg-green p-10 text-xl rounded-2xl 
            border-4 border-green-light opacity-90 z-20`}>
            {children}
            {closeModal && (
                <button 
                    className='bg-red rounded-2xl py-2 px-3 border-3 border-white text-xl'
                    onClick={closeModal}>
                    Okay
                </button>)}
        </div>
    )
}