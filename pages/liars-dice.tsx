import { useEffect, useState } from 'react'
import Header from '../components/header'
import Die from '../components/die'
import Button from '../components/button'
import { useAppDispatch } from '../hooks/typedReduxHooks'
import {decrement, increment} from '../store/bankrollSlice'
import Modal from '../components/modal'

type Player = 'User' | 'Opponent'

interface Move {
    faceBid: number;
    countBid: number;
}

interface Result {
    wagedCount: number;
    wagerValid: boolean;
    bluffCaller: Player;
    winner: Player;
}

export default function LiarsDice() {
    const [ante, setAnte] = useState(1)
    const [gameStarted, setGameStarted] = useState(false)
    const [roundEnded, setRoundEnded] = useState<boolean | null>(null)
    const [opponentMove, setOpponentMove] = useState<Move | null>(null)
    const [result, setResult] = useState<Result | null>(null)
    const [gameWinner, setGameWinner] = useState<Player | null>(null)
    const [userDice, setUserDice] = useState([0, 0, 0, 0, 0])
    const [opponentDice, setOpponentDice] = useState([0, 0, 0, 0, 0])
    const [currentBid, setCurrentBid] = useState<Move>({faceBid: 1, countBid: 1})
    const [lastBid, setLastBid] = useState<Move>({faceBid: 1, countBid: 0})
    const [messageClosed, setMessageClosed] = useState(false)
    const dispatch = useAppDispatch()
    const [userTurn, setUserTurn] = useState(true)

    const shiftFaceBid = (val: number) => {
        let newFaceBid = currentBid.faceBid + val;
        if(newFaceBid >= lastBid.faceBid && newFaceBid <= 6)
            setCurrentBid(cb => {return {...cb, faceBid: newFaceBid}})
        if(newFaceBid === lastBid.faceBid 
            && currentBid.countBid < lastBid.countBid + 1) {
            setCurrentBid(cb => {return {...cb, countBid: lastBid.countBid + 1}})
        }
    }
    
    const shiftCountBid = (val: number) => {
        let newCountBid = currentBid.countBid + val;
        if(newCountBid > 0 
            && (currentBid.faceBid > lastBid.faceBid 
                || newCountBid > lastBid.countBid) 
            && newCountBid <= (opponentDice.length + userDice.length))
            setCurrentBid(cb => {return {...cb, countBid: newCountBid}})
    }

    const startNewRound = () => {
        let newUserDice = [] as number[]
        let newOpponentDice = [] as number[]
        for(let i = 0; i < userDice.length; i++) {
            newUserDice[i] = Math.floor(Math.random() * 6 + 1);
        }
        for(let i = 0; i < opponentDice.length; i++) {
            newOpponentDice[i] = Math.floor(Math.random() * 6 + 1);
        }
        setUserDice([...newUserDice])
        setOpponentDice([...newOpponentDice])
        if (!gameStarted) dispatch(decrement(ante))
        setCurrentBid({faceBid: 1, countBid: 1})
        setLastBid({faceBid: 1, countBid: 0})
        setOpponentMove(null)
        setUserTurn(true)
        setGameStarted(true)
        setRoundEnded(false)
        setGameWinner(null)
    }

    const updateCurrentBid = (newBid: Move) => {
        if (currentBid.faceBid !== newBid.faceBid
            || currentBid.countBid !== newBid.countBid) {
            if (newBid.countBid === userDice.length + opponentDice.length) {
                setCurrentBid({
                    faceBid: newBid.faceBid + 1,
                    countBid: 1
                })
            } 
            else {
                setCurrentBid({
                    faceBid: newBid.faceBid,
                    countBid: newBid.countBid + 1
                })
            }
        }
    }

    const opponentBid = (userBid: Move) => {
        let callBluffProbability = 0.3
        let roll = Math.random()
        let totalDiceCount = userDice.length + opponentDice.length
        let userHitWageCap = userBid.faceBid === 6 
            && userBid.countBid === totalDiceCount
        if (roll < callBluffProbability || userHitWageCap){
            callBluff(userBid, false)
            setUserTurn(false)
        }  
        else {
            let newOpponentMove = {
                faceBid: userBid.faceBid,
                countBid: userBid.countBid
            }
            let wagerProbability = 0.25
            do {
                if (newOpponentMove.countBid === totalDiceCount) {
                    newOpponentMove = {
                        faceBid: newOpponentMove.faceBid + 1,
                        countBid: 1
                    }
                }
                else {
                    newOpponentMove.countBid = newOpponentMove.countBid + 1
                    if (newOpponentMove.faceBid === 6 
                        && newOpponentMove.countBid === totalDiceCount)
                        break
                }
                roll = Math.random()
            } while (roll > wagerProbability)
            setLastBid(newOpponentMove)
            setOpponentMove(newOpponentMove)
            updateCurrentBid(newOpponentMove)
            let opponentHitWageCap = newOpponentMove.faceBid === 6 
                && newOpponentMove.countBid === totalDiceCount
            if (opponentHitWageCap) callBluff(newOpponentMove)
        }
    }

    const bid = (newBid: Move) => {
        setLastBid({...newBid})
        if (userTurn) opponentBid({...newBid})
        else setCurrentBid({...newBid})
    }

    const callBluff = (bluffBid: Move, isUserTurn?: boolean) => {
        if (isUserTurn === undefined)
            isUserTurn = userTurn
        
        setRoundEnded(true)
        let userCount = userDice.filter(d => d === bluffBid.faceBid).length
        let opponentCount = opponentDice.filter(d => d === bluffBid.faceBid).length
        let wagedCount = userCount + opponentCount
        let wagerValid = wagedCount >= bluffBid.countBid
        setResult({
            wagedCount,
            wagerValid,
            bluffCaller: isUserTurn ? 'User' : 'Opponent',
            winner: (isUserTurn !== wagerValid) ? 'User' : 'Opponent'
        })
        setMessageClosed(false)
    }

    useEffect(() => {
        if (userDice.length === 0)
                setGameWinner('Opponent')
        else if (opponentDice.length === 0) {
            setGameWinner('User')
            dispatch(increment(ante * 2))
        }
        else 
            setMessageClosed(true)
    }, [userDice, opponentDice])

    const closeMessage = () => {
        if (!gameWinner && result) {
            if (userTurn !== result.wagerValid) 
                setOpponentDice(od => od.filter((el, i) => i !== 0))
            else
                setUserDice(ud => ud.filter((el, i) => i !== 0))
        }
        else {
            setUserDice([0, 0, 0, 0, 0])
            setOpponentDice([0, 0, 0, 0, 0])
            setGameStarted(false)
            setMessageClosed(true)
        }
    }

    return (
        <div>
            <Header text={'Liar\'s Dice'} imageFilename={'liars-dice-image'} />
            {gameStarted && (<div>
                <div className='text-green-light py-2'>Opponent</div>
                <div className='flex justify-center'>
                    {opponentDice.map((d, i) => 
                        <Die 
                            key={String(d)+String(i)} 
                            value={roundEnded ? d : 0} 
                            size={30} 
                            altText='opponent die'
                        />
                    )}
                </div>
                <hr className='max-w-sm my-2 m-auto' />
                {opponentMove && (<div className={'text-xl text-green-light flex justify-center'}>
                    Opponent bids {opponentMove.countBid} <Die value={opponentMove.faceBid} size={30} />
                </div>)}
            </div>)}
            <div className='flex justify-center items-center my-6'>
                {userDice.map((d, i) => 
                    <Die key={String(d)+String(i)} value={d} altText='user die' />)}
                {(roundEnded && !messageClosed) && (
                    <Modal closeModal={closeMessage}>
                        {!gameWinner && result ? (
                            <>
                                <div>{result.bluffCaller} calls a bluff.</div>
                                <div className='flex justify-center'>
                                    Found {result.wagedCount} <div><Die value={lastBid.faceBid} size={30} /></div>
                                </div>
                                <div>Wager was {result.wagerValid ? 'valid' : 'invalid'}.</div>
                                <div>{result.winner} wins.</div>
                            </> 
                            ) : (
                                <div>
                                    {gameWinner} wins the game!
                                </div>
                            )}
                    </Modal>
                )}
            </div>
            
            <div className='flex items-center justify-between max-w-screen-md m-auto'>
                <div className='text-3xl'>ANTE: ${ante}</div>
                {(gameStarted && !roundEnded) && <div className='flex'>
                    <div className='flex flex-col items-center justify-between'>
                        <button 
                            className='h-8 w-8 bg-green-dark rounded-3xl text-black hover:bg-green-light text-2xl'
                            onClick={() => shiftFaceBid(1)}>
                            +
                        </button>
                        <div className='my-3'><Die value={currentBid.faceBid} size={40}/></div>
                        <button 
                            className='h-8 w-8 bg-green-dark rounded-3xl text-black hover:bg-green-light text-2xl'
                            onClick={() => shiftFaceBid(-1)}>
                            -
                        </button>
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                        <button 
                            className='h-8 w-8 bg-green-dark rounded-3xl text-black hover:bg-green-light text-2xl'
                            onClick={() => shiftCountBid(1)}>
                            +
                        </button>
                        <div className='flex justify-center items-center text-2xl my-3'>
                            {currentBid.countBid}
                        </div>
                        <button 
                            className='h-8 w-8 bg-green-dark rounded-3xl text-black hover:bg-green-light text-2xl'
                            onClick={() => shiftCountBid(-1)}>
                            -
                        </button>
                    </div>
                </div>}
                <div className='flex flex-wrap w-[60%]'>
                    {(roundEnded || !gameStarted) ? (
                        <Button 
                            extraStyles='w-[48%] m-1' 
                            text={gameStarted ? 'NEW ROUND' : 'NEW GAME'} 
                            onClick={startNewRound} />) : (
                        <Button 
                            extraStyles='w-[48%] m-1'
                            text='BID'
                            onClick={() => bid(currentBid)} />
                    )}
                    <Button 
                        extraStyles='w-[48%] m-1' 
                        text='CALL BLUFF' 
                        onClick={() =>{ if (opponentMove) callBluff(opponentMove)}}
                        disabled={roundEnded || !opponentMove || !gameStarted} />
                    <Button 
                        extraStyles='w-[48%] m-1' 
                        text='INCREASE ANTE' 
                        onClick={() => setAnte(a => a === 5 ? 1 : a + 1)}
                        disabled={gameStarted} />
                    <Button 
                        extraStyles='w-[48%] m-1'
                        text='MAX ANTE' 
                        onClick={() => setAnte(5)}
                        disabled={gameStarted} />
                </div>
            </div>
        </div>
    )
}