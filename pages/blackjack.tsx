import { useState } from 'react'
import Button from '../components/button'
import Header from '../components/header'
import PlayingCard from '../components/playing-card'
import PlayingCardModel from '../models/playing-card'
import useDeck from '../hooks/useDeck'
import { useAppDispatch } from '../hooks/typedReduxHooks'
import { increment, decrement } from '../store/bankrollSlice'
import {getHandValue} from '../utils/blackjack-hands'

export default function Blackjack() {
    const [bet, setBet] = useState(1)
    const [gameStarted, setGameStarted] = useState(false)
    const [roundEnded, setRoundEnded] = useState<boolean | null>(null)
    const [dealerCards, setDealerCards] = useState<PlayingCardModel[]>([...new Array(2)].map(
        (el, i) => { return {suit: String(i), rank: String(i)} }
    ))
    const [userCards, setUserCards] = useState<PlayingCardModel[]>([...new Array(2)].map(
        (el, i) => { return {suit: String(i), rank: String(i)} }
    ))

    const { deck, getShuffledDeck, drawFromDeck } = useDeck()
    const dispatch = useAppDispatch()

    const deal = () => {
        dispatch(decrement(bet))
        const newCards = drawFromDeck(4, getShuffledDeck())
        setDealerCards(newCards.splice(0, 2))
        setUserCards(newCards)
        setGameStarted(true)
        setRoundEnded(false)
    }

    const hit = () => {
        const newCard = drawFromDeck(1, deck)[0]
        const endRound = getHandValue([...userCards, newCard]) >= 21
        setUserCards(c => [...c, newCard])
        if (endRound) stand()
    }

    const stand = () => {
        setRoundEnded(true)
    }

    return (
        <div>
            <Header text='Blackjack' />
            <div>
                <h4 className='text-xl'>Dealer{roundEnded && `: ${getHandValue(dealerCards)}`}</h4>
                <div className='flex justify-center'>
                    {dealerCards.map((card, i) => 
                        <PlayingCard 
                            key={card.suit + card.rank} 
                            suit={card.suit} 
                            rank={card.rank} 
                            onClick={() => {}}
                            disabled
                            flipped={!gameStarted || (i !== 0 && roundEnded === false)} />  
                    )}
                </div>
            </div>
            <div className='mb-3'>
                <h4 className='text-xl'>You{roundEnded !== null && `: ${getHandValue(userCards)}`}</h4>
                <div className='flex justify-center'>
                    {userCards.map(card => 
                            <PlayingCard 
                                key={card.suit + card.rank} 
                                suit={card.suit} 
                                rank={card.rank} 
                                onClick={() => {}}
                                disabled
                                flipped={!gameStarted} />
                        )}
                </div>
            </div>
            <h3 className='sm:text-3xl text-left w-[350px] lg:w-[600px] m-auto'>BET: ${bet}</h3>
            <div className='w-[370px] lg:w-[600px] m-auto'>
                <div className='flex justify-between'>
                    <Button text='DEAL' disabled={roundEnded === false} onClick={deal} extraStyles='m-1 flex-grow' />
                    <Button text='HIT' disabled={!(roundEnded === false)} onClick={hit} extraStyles='m-1 flex-grow' />
                    <Button text='STAND' disabled={!(roundEnded === false)} onClick={stand} extraStyles='m-1 flex-grow' />
                </div>
                <div className='flex justify-between'>
                    <Button text='DOUBLE DOWN' disabled onClick={() => {}} extraStyles='m-1 flex-grow' />
                    <Button text='BET ONE' onClick={() => setBet(bet === 5 ? 1 : bet + 1)} extraStyles='m-1 flex-grow' />
                    <Button text='MAX BET' onClick={() => setBet(5)} extraStyles='m-1 flex-grow' />
                </div>
            </div>
        </div>
    )
}