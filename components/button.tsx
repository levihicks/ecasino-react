interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    extraStyles?: string;
}

export default function Button({ text, onClick, disabled, extraStyles }: ButtonProps) {
    return (
        <button 
            onClick={() => {if (!disabled) onClick()}}
            className={`p-1 px-[10px] sm:py-3 sm:px-7 bg-green-dark rounded-xl sm:text-xl 
                cursor-pointer hover:bg-green disabled:bg-gray
                disabled:cursor-default max-h-14 ${extraStyles}`}
            disabled={disabled}>
            {text}
        </button>
    )
}