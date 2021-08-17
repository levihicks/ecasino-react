interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    return (
        <div className='py-3 px-7 bg-green-dark rounded-xl text-xl cursor-pointer hover:bg-green'>
            {text}
        </div>
    )
}