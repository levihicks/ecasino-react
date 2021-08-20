import Image from 'next/image'

interface DieProps {
    value: number;
    size?: number;
    altText?: string;
}

export default function Die({ value, size=125, altText='' }: DieProps) {
    return (
        <div className='px-2 flex'>
            <Image 
                src={`/dice/${value}.png`} 
                alt={altText}
                height={size}
                width={size} />
        </div>
    )
}