import { useCallback, useEffect, useState } from 'react'
import Button from '../components/button'
import Header from '../components/header'
import PlayingCard from '../components/playing-card'
import PlayingCardModel from '../models/playing-card'
import useDeck from '../hooks/useDeck'
import { useAppDispatch } from '../hooks/typedReduxHooks'
import { increment, decrement } from '../store/bankrollSlice'
import { getHandValue } from '../utils/blackjack-hands'
import Modal from '../components/modal'

export default function Blackjack() {
    const [bet, setBet] = useState(1)
    const [gameStarted, setGameStarted] = useState(false)
    const [dealerTurn, setDealerTurn] = useState<boolean | null>(null)
    const [resultString, setResultString] = useState<string | null>(null)
    const [doubledDown, setDoubledDown] = useState(false)
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

    const dealerPlay = useCallback((cards: PlayingCardModel[], currentDeck: PlayingCardModel[]) => {
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
    }, [drawFromDeck])

    const stand = useCallback((uc?: PlayingCardModel[] | null, dc?: PlayingCardModel[] | null, currentDeck?: PlayingCardModel[]) => {
        setDealerTurn(true)
        if (getHandValue(uc || userCards) > 21) setDealerTurn(null)
        else if (getHandValue(dc || dealerCards) < 17) setTimeout(() => dealerPlay(dc || dealerCards, currentDeck || deck), 1000)
        else dealerPlay(dc || dealerCards, currentDeck || deck)
    }, [dealerCards, dealerPlay, deck, userCards])


    const hit = useCallback(() => {
        const updatedDeck = [...deck]
        const newCard = drawFromDeck(1, updatedDeck)[0]
        updatedDeck.shift()
        const dealerTurnOver = getHandValue([...userCards, newCard]) >= 21
        setUserCards(c => [...c, newCard])
        if (dealerTurnOver || doubledDown) stand([...userCards, newCard], null, updatedDeck)
    }, [deck, doubledDown, drawFromDeck, stand, userCards])

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
            if (doubledDown) {
                newResultMultiplier *= 2
                setDoubledDown(false)
            }
            payout(newResultMultiplier)
        }
    }, [dealerTurn, gameStarted, dealerCards, userCards, payout, resultString, doubledDown])

    useEffect(() => {
        if (doubledDown && userCards.length === 2) {
            dispatch(decrement(bet))
            hit()
        }
    }, [doubledDown, dispatch, bet, hit, userCards])

    return (
        <div>
            <Header text='Blackjack' />
            <div className='relative'>
                <div>
                    <h4 className='text-xl'>Dealer{gameStarted && dealerTurn !== false && `: ${getHandValue(dealerCards)}`}</h4>
                    <div className='relative min-h-[140px] mb-2'>
                        {dealerCards.map((card, i) => 
                            <div 
                                key={card.suit+card.rank} 
                                className={`absolute left-[50%]`}
                                style={{ transform: 'translateX(' + String(-50 + i * 50 + (-25 * (dealerCards.length - 1))) + '%)'}}>
                                <PlayingCard 
                                    suit={card.suit} 
                                    rank={card.rank} 
                                    onClick={() => {}}
                                    disabled
                                    flipped={!gameStarted || (i !== 0 && dealerTurn === false)}
                                    shadow
                                    blackjackStyle />  
                            </div>
                        )}
                    </div>
                </div>
                <div className='mb-3'>
                    <h4 className='text-xl'>You{gameStarted && `: ${getHandValue(userCards)}`}</h4>
                    <div className='flex justify-center relative min-h-[140px] lg:h-[275px]'>
                        {userCards.map((card, i) => 
                         <div 
                         key={card.suit+card.rank} 
                         className={`absolute left-[50%]`}
                         style={{ transform: 'translateX(' + String(-50 + i * 50 + (-25 * (userCards.length - 1))) + '%)' }}>
                                <PlayingCard 
                                    key={card.suit + card.rank} 
                                    suit={card.suit} 
                                    rank={card.rank} 
                                    onClick={() => {}}
                                    disabled
                                    flipped={!gameStarted}
                                    shadow />
                                    </div>
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
                        disabled={!(dealerTurn === false) || userCards.length > 2}
                        onClick={() => setDoubledDown(true)} 
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