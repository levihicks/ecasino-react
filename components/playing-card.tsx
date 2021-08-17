import Image from 'next/image'

interface PlayingCardProps {
    flipped?: boolean;
    suit: string;
    rank: string;
    onHold?: boolean;
    disabled?: boolean;
}

export default function PlayingCard({
    flipped,
    suit,
    rank,
    onHold,
    disabled
}: PlayingCardProps) {
    let color = (suit === 'clubs' || suit === 'spades') ? 'text-black' : 'text-red'
    return (
        <div 
            data-testid='playing-card'
            className={`relative flex justify-center items-center bg-white
                rounded-xl h-[275px] w-[200px] cursor-pointer hover:shadow`}>
            {onHold && (
                <div>
                    HOLD
                </div>
            )}
            {flipped ? (
                <div>
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