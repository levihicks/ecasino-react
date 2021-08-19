import Image from 'next/image'
import PlayingCardModel from '../models/playing-card'

interface PlayingCardProps extends PlayingCardModel {
    onClick: () => void;
}

export default function PlayingCard({
    flipped,
    suit,
    rank,
    held,
    disabled,
    onClick
}: PlayingCardProps) {
    let color = (suit === 'clubs' || suit === 'spades') ? 'text-black' : 'text-red'
    return (
        <div 
            data-testid='playing-card'
            className={`relative flex justify-center items-center
                ${flipped ? 'bg-gradient-to-b from-green-dark to-green border-4' 
                : 'bg-white'}
                ${!disabled && !flipped && 'cursor-pointer hover:shadow' }
                rounded-xl h-[275px] w-[200px] `}
                onClick={onClick}>
            {held && (
                <div className='absolute w-full text-3xl bg-green-dark opacity-80 text-green-light z-10'>
                    HOLD
                </div>
            )}
            {flipped ? (
                <div className='text-4xl absolute bottom-5 left-2'>
                    eCASINO
                </div>
            ) : (
                <div>
                    <div className={`${color} text-3xl absolute
                    left-5 top-5`}>
                        {rank}
                    </div>
                    <div className={`${color} text-3xl absolute
                    right-5 bottom-5 -rotate-180`}>
                        {rank}
                    </div>
                    <div>
                        <Image 
                            src={`/${suit}.png`} 
                            alt=''
                            height='80'
                            width='80' />
                    </div>
                </div>
            )}
        </div>
    )
}