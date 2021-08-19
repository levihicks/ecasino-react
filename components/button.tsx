interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

export default function Button({ text, onClick, disabled }: ButtonProps) {
    return (
        <button 
            onClick={() => {if (!disabled) onClick()}}
            className={`py-3 px-7 bg-green-dark rounded-xl text-xl 
                cursor-pointer hover:bg-green disabled:bg-gray
                disabled:cursor-default`}
            disabled={disabled}>
            {text}
        </button>
    )
}