import Image from 'next/image'
import PlayingCardModel from '../models/playing-card'

interface PlayingCardProps extends PlayingCardModel {
    onClick: () => void;
    shadow?: boolean;
    blackjackStyle?: boolean;
}

export default function PlayingCard({
    flipped,
    suit,
    rank,
    held,
    disabled,
    onClick,
    shadow,
    blackjackStyle,
}: PlayingCardProps) {
    let suitsObj: any = { spades: '♠️', clubs: '♣️', diamonds: '♦️', hearts: '♥️' }
    let color = (suit === 'clubs' || suit === 'spades') ? 'text-black' : 'text-red'
    return (
        <div 
            data-testid='playing-card'
            className={`relative flex justify-center items-center
                ${flipped ? 'bg-gradient-to-b from-green-dark to-green border-4' 
                : 'bg-white'}
                ${!disabled && !flipped && 'cursor-pointer lg:hover:shadow' }
                rounded-xl h-[140px] w-[100px] m-[2px]
                ${!blackjackStyle && `lg:h-[275px] lg:w-[200px] lg:m-[4px]`} ${shadow && 'shadow-md'}`}
                onClick={onClick}>
            {held && (
                <div className='absolute w-full text-3xl bg-green-dark opacity-80 text-green-light z-10'>
                    HOLD
                </div>
            )}
            {flipped ? (
                <div className={`text-md ${!blackjackStyle && `lg:text-4xl`} absolute bottom-5 left-2`}>
                    eCASINO
                </div>
            ) : (
                <div>
                    <div className={`${color} text-2xl absolute
                    left-3 top-3 ${!blackjackStyle && `lg:text-3xl lg:left-5 lg:top-5`}`}>
                        {rank}
                    </div>
                    <div className={`${color} text-2xl  absolute
                    right-3 bottom-3 ${!blackjackStyle && `lg:text-3xl lg:right-5 lg:bottom-5`} -rotate-180`}>
                        {rank}
                    </div>
                    <div className={`${color} text-5xl ${!blackjackStyle && `lg:text-8xl`}`}>
                        {suitsObj[suit]}
                    </div>
                </div>
            )}
        </div>
    )
}