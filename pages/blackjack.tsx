import { useCallback, useEffect, useState } from 'react'
import Button from '../components/button'
import Header from '../components/header'
import PlayingCard from '../components/playing-card'
import PlayingCardModel from '../models/playing-card'
import useDeck from '../hooks/useDeck'
import { useAppDispatch } from '../hooks/typedReduxHooks'
import { increment, decrement } from '../store/bankrollSlice'
import {getHandValue} from '../utils/blackjack-hands'
import Modal from '../components/modal'

export default function Blackjack() {
    const [bet, setBet] = useState(1)
    const [gameStarted, setGameStarted] = useState(false)
    const [dealerTurn, setDealerTurn] = useState<boolean | null>(null)
    const [resultString, setResultString] = useState<string | null>(null)
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
        setResultString(null)
        const newCards = drawFromDeck(4, getShuffledDeck())
        const newDealerCards = newCards.splice(0, 2)
        setDealerCards(newDealerCards)
        setUserCards(newCards)
        setGameStarted(true)
        setDealerTurn(false)
        if (getHandValue(newCards) === 21)
            stand(null, newDealerCards)
    }

    const hit = () => {
        const updatedDeck = [...deck]
        const newCard = drawFromDeck(1, updatedDeck)[0]
        updatedDeck.shift()
        const dealerTurnOver = getHandValue([...userCards, newCard]) >= 21
        setUserCards(c => [...c, newCard])
        if (dealerTurnOver) stand([...userCards, newCard], null, updatedDeck)
    }

    const stand = (uc?: PlayingCardModel[] | null, dc?: PlayingCardModel[] | null, currentDeck?: PlayingCardModel[]) => {
        setDealerTurn(true)
        if (getHandValue(uc || userCards) > 21) setDealerTurn(null)
        else if (getHandValue(dc || dealerCards) < 17) setTimeout(() => dealerPlay(dc || dealerCards, currentDeck || deck), 1000)
        else dealerPlay(dc || dealerCards, currentDeck || deck)
    }

    const dealerPlay = (cards: PlayingCardModel[], currentDeck: PlayingCardModel[]) => {
        if(getHandValue(cards) < 17) {
            const updatedDeck = [...currentDeck]
            const newCard = drawFromDeck(1, updatedDeck)[0]
            updatedDeck.shift()
            const dealerTurnOver = getHandValue([...cards, newCard]) >= 17
            setDealerCards(c => [...c, newCard])
            if (!dealerTurnOver) setTimeout(() => dealerPlay([...cards, newCard], updatedDeck), 1000)
            else setDealerTurn(null)
            
        } 
        else setDealerTurn(null)
    }

    const payout = useCallback((resultMultiplier: number) => 
        dispatch(increment(resultMultiplier * bet)), [bet, dispatch])

    useEffect(() => {
        if (dealerTurn === null && gameStarted && resultString === null) {
            let newResultMultiplier = 0
            if (getHandValue(userCards) === getHandValue(dealerCards))
                newResultMultiplier = 1
            else if (getHandValue(userCards) > 21)
                newResultMultiplier = 0
            else if (getHandValue(userCards) > getHandValue(dealerCards) || getHandValue(dealerCards) > 21)
                newResultMultiplier = (getHandValue(userCards) === 21 && userCards.length === 2) ? 2.5 : 2
            switch(newResultMultiplier) {
                case 0:
                    setResultString('Dealer wins.')
                    break
                case 1:
                    setResultString('Push.')
                    break
                case 2: 
                    setResultString('User wins.')
                    break
                case 2.5:
                    setResultString('Blackjack!')
                    break
                default:
                    setResultString('This message should not be seen!')
            }
            payout(newResultMultiplier)
        }
    }, [dealerTurn, gameStarted, dealerCards, userCards, payout, resultString])

    return (
        <div>
            <Header text='Blackjack' />
            <div className='relative'>
                <div>
                    <h4 className='text-xl'>Dealer{gameStarted && dealerTurn !== false && `: ${getHandValue(dealerCards)}`}</h4>
                    <div className='flex justify-center'>
                        {dealerCards.map((card, i) => 
                            <PlayingCard 
                                key={card.suit + card.rank} 
                                suit={card.suit} 
                                rank={card.rank} 
                                onClick={() => {}}
                                disabled
                                flipped={!gameStarted || (i !== 0 && dealerTurn === false)} />  
                        )}
                    </div>
                </div>
                <div className='mb-3'>
                    <h4 className='text-xl'>You{gameStarted && `: ${getHandValue(userCards)}`}</h4>
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
                        {resultString && (
                            <Modal>{resultString}</Modal>
                        )}
                    </div>
                </div>
            </div>
            <h3 className='sm:text-3xl text-left w-[350px] lg:w-[600px] m-auto'>BET: ${bet}</h3>
            <div className='w-[370px] lg:w-[600px] m-auto'>
                <div className='flex justify-between'>
                    <Button 
                        text='DEAL' 
                        disabled={dealerTurn !== null} 
                        onClick={deal} 
                        extraStyles='m-1 flex-grow' />
                    <Button 
                        text='HIT' 
                        disabled={!(dealerTurn === false)} 
                        onClick={hit} 
                        extraStyles='m-1 flex-grow' />
                    <Button 
                        text='STAND' 
                        disabled={!(dealerTurn === false)} 
                        onClick={stand} 
                        extraStyles='m-1 flex-grow' />
                </div>
                <div className='flex justify-between'>
                    <Button 
                        text='DOUBLE DOWN' 
                        disabled 
                        onClick={() => {}} 
                        extraStyles='m-1 flex-grow' />
                    <Button 
                        text='BET ONE' 
                        disabled={dealerTurn !== null} 
                        onClick={() => setBet(bet === 5 ? 1 : bet + 1)} 
                        extraStyles='m-1 flex-grow' />
                    <Button 
                        text='MAX BET' 
                        disabled={dealerTurn !== null} 
                        onClick={() => setBet(5)} 
                        extraStyles='m-1 flex-grow' />
                </div>
            </div>
        </div>
    )
}