import { useState } from "react"
import Header from "../components/header"
import PlayingCard from "../components/playing-card"
import Button from '../components/button'
import PlayingCardModel from '../models/playing-card'
import getHighestHand from '../utils/poker-hands'
import { RANKS, SUITS } from '../constants/card-values'
import Modal from "../components/modal"
import { useAppDispatch, } from "../hooks/typedReduxHooks"
import { increment, decrement, } from '../store/bankrollSlice'
import useDeck from '../hooks/useDeck'

interface HighestHand {
    reward: number;
    result: string;
}

export default function VideoPoker() {
    const [bet, setBet] = useState(1)
    const [gameStarted, setGameStarted] = useState(false)
    const [roundEnded, setRoundEnded] = useState<boolean | null>(null)
    const [heldCards, setHeldCards] = useState<PlayingCardModel[]>([])
    const [cards, setCards] = useState<PlayingCardModel[]>([...new Array(5)].map(
        (el, i) => { return { suit: String(i), rank: String(i) } }
    ))
    const [highestHand, setHighestHand] = useState<HighestHand | null>(null)
    const dispatch = useAppDispatch()
    const { deck, getShuffledDeck, drawFromDeck } = useDeck()

    const isCardHeldAtIndex = (i: number) => heldCards.filter(c => c.index === i)[0]

    const dealNewHand = () => {
        if(!gameStarted)
            setGameStarted(true)
        setHighestHand(null)
        setRoundEnded(false)
        setHeldCards([])
        setCards(drawFromDeck(5, getShuffledDeck()))
        dispatch(decrement(bet))
    }

    const drawNewCards = () => {
        let newCards: PlayingCardModel[] = []
        if(heldCards.length < 5) {
            let drawnCards = drawFromDeck(5 - heldCards.length, deck)
            let newCardIndex = 0
            for(let i = 0; i < 5; i++) {
                let heldCard = isCardHeldAtIndex(i)
                if(heldCard)
                    newCards.push({suit: heldCard.suit, rank: heldCard.rank})
                else{
                    newCards.push(drawnCards[newCardIndex]);
                    newCardIndex++;
                }
            }
            setCards(newCards)
        }
        setRoundEnded(true)
        const newHighestHand = getHighestHand(newCards)
        dispatch(increment(bet * newHighestHand.reward ))
        setHighestHand(newHighestHand)
    }

    const toggleHoldCard = (card: PlayingCardModel) => {
        if(gameStarted && !roundEnded) {
            let newHeldCards = heldCards.filter(
                c => c.suit !== card.suit || c.rank !== card.rank
            )
            if(newHeldCards.length < heldCards.length)
                setHeldCards(newHeldCards)
            else 
                setHeldCards([...heldCards, card])
        }
    }

    return (
        <div>
            <Header text='Video Poker' imageFilename='video-poker-image' />
            <div className='flex w-full justify-around items-center m-auto mb-[50px] max-w-screen-xl'>
                {cards.map((c, i) => {
                    return (
                        <PlayingCard 
                            key={c.suit + c.rank}
                            suit={c.suit}
                            rank={c.rank}
                            flipped={!gameStarted}
                            disabled={roundEnded}
                            held={Boolean(isCardHeldAtIndex(i))}
                            onClick={() => toggleHoldCard({...c, index: i})}
                        />
                    )
                })}
                {highestHand && (
                    <Modal>
                        {highestHand.result}
                        <p>Reward: { bet * highestHand.reward }</p>
                    </Modal>
                )}
            </div>
            <div className='max-w-screen-lg m-auto'>
                <h3 className='text-3xl text-left'>BET: ${bet}</h3>
                <div className='max-w-screen-lg flex justify-between'>
                    <Button 
                        disabled={roundEnded === false} 
                        onClick={() => setBet(bet === 5 ? 1 : bet + 1)} 
                        text='BET ONE' />
                    <Button 
                        disabled={roundEnded === false} 
                        onClick={() => setBet(5)} 
                        text='BET MAX' />
                    <Button 
                        onClick={(roundEnded !== false) ? dealNewHand : drawNewCards} 
                        text={roundEnded !== false ? 'DEAL' : 'DRAW'} />
                </div>
            </div>
        </div>
    )
}