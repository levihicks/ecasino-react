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
    let suitsObj: any = { spades: '♠️', clubs: '♣️', diamonds: '♦️', hearts: '♥️' }
    let color = (suit === 'clubs' || suit === 'spades') ? 'text-black' : 'text-red'
    return (
        <div 
            data-testid='playing-card'
            className={`relative flex justify-center items-center m-[2px] sm:m-[4px] 
                ${flipped ? 'bg-gradient-to-b from-green-dark to-green border-4' 
                : 'bg-white'}
                ${!disabled && !flipped && 'cursor-pointer sm:hover:shadow' }
                rounded-xl h-[140px] w-[100px] sm:h-[275px] sm:w-[200px] `}
                onClick={onClick}>
            {held && (
                <div className='absolute w-full text-3xl bg-green-dark opacity-80 text-green-light z-10'>
                    HOLD
                </div>
            )}
            {flipped ? (
                <div className='text-md sm:text-4xl absolute bottom-5 left-2'>
                    eCASINO
                </div>
            ) : (
                <div>
                    <div className={`${color} text-2xl sm:text-3xl absolute
                    left-3 sm:left-5 top-3 sm:top-5`}>
                        {rank}
                    </div>
                    <div className={`${color} text-2xl sm:text-3xl absolute
                    right-3 sm:right-5 bottom-3 sm:bottom-5 -rotate-180`}>
                        {rank}
                    </div>
                    <div className={`${color} text-5xl sm:text-8xl`}>
                        {suitsObj[suit]}
                    </div>
                </div>
            )}
        </div>
    )
}