import { useEffect, useState } from "react"
import Button from "../components/button"
import Header from "../components/header"
import SlotsLights from "../components/slots-lights"
import SlotsSymbol from "../components/slots-symbol"
import { getPayoutMultiplier } from '../utils/slots-payouts'
import { SYMBOLS } from '../constants/slots-symbols'
import { useAppDispatch } from "../hooks/typedReduxHooks"
import { decrement, increment } from "../store/bankrollSlice"

export default function Slots() {
    const [bet, setBet] = useState(1)
    const [reward, setReward] = useState<number | null>(null)
    const [spinning, setSpinning] = useState(false)
    const [currentSymbols, setCurrentSymbols] = useState<number[]>([1, 2, 3])
    const [newSymbols, setNewSymbols] = useState<number[]>([1, 2, 3])
    const [gameStarted, setGameStarted] = useState(false)
    const dispatch = useAppDispatch()

    const newSpin = () => {
        if (!gameStarted) setGameStarted(true)
        setSpinning(true)
        setReward(null)
        dispatch(decrement(bet))
        setNewSymbols([...new Array(3)].map(el => Math.floor(Math.random() * 7)))
        setCurrentSymbols(cs => cs.map(s => 
            s + 1 === 7 ? 0 : s + 1
        ))
    }  

    const areEqual = (arr1: number[], arr2: number[]) => {
        return arr1.filter((el, i) => el === arr2[i]).length === arr1.length
    }

    const spin = (pos: number) => {
        if (spinning && areEqual(currentSymbols, newSymbols)) {
            setSpinning(false)
            const rewardAmount = getPayoutMultiplier(currentSymbols.map(cs => SYMBOLS[cs])) * bet
            setReward(rewardAmount)
            dispatch(increment(rewardAmount))
        }
        else {
            setCurrentSymbols(cs => cs.map((val, i) => 
                val === newSymbols[i] || i !== pos ? val : val + 1 === 7 ? 0 : val + 1
            ))
        }
    }

    const setNewBet = (val: number) => {
        setReward(null)
        setBet(val)
    }

    return (
        <div>
            <Header text='Slots' imageFilename='slots-image' />
            <div className={`bg-gradient-to-b from-green to-black
                rounded-t-[95px] w-[720px] h-[400px] m-auto pt-4`}>
                <div className='flex justify-center items-center'>
                    <SlotsLights />
                    <div className='text-red bg-black rounded-full py-1 px-3 w-[300px] mx-1 font-retro'>
                        {spinning ? 'SPINNING...' 
                            :reward !== null
                            ? `REWARD: $${String(reward)}`
                            : `BET: $${String(bet)}`}
                    </div>
                    <SlotsLights />
                </div>
                <div className='flex justify-center'>
                    {[...new Array(3)].map((el, i) => (
                        <div 
                            key={i}
                            className={`relative flex items-center justify-center overflow-hidden
                                h-[300px] w-[150px] my-4 mx-2 rounded-xl 
                                bg-gradient-to-b from-yellow to-white`}>
                                <>
                                    <SlotsSymbol 
                                        symbol={currentSymbols[i]} 
                                        afterSpin={() => spin(i)}
                                        justMounted={!gameStarted} />
                                    <SlotsSymbol 
                                        symbol={currentSymbols[i]} 
                                        leaving 
                                        afterSpin={() => {}}
                                        justMounted={!gameStarted} />
                                </>
                        </div>
                    ))}
                </div>
                <div className='flex justify-around'>
                    <Button 
                        extraStyles='min-w-[200px]' 
                        text='BET ONE' 
                        onClick={() => setNewBet(bet === 5 ? 1 : bet + 1)}
                        disabled={spinning} />
                    <Button 
                        extraStyles='min-w-[200px]' 
                        text='BET MAX' 
                        onClick={() => setNewBet(5)}
                        disabled={spinning} />
                    <Button 
                        extraStyles='min-w-[200px]' 
                        text='SPIN' 
                        onClick={newSpin}
                        disabled={spinning} />
                </div>
            </div>
        </div>
    )
}