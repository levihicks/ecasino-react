import { useEffect, useState } from "react"
import Button from "../components/button"
import Header from "../components/header"
import SlotsLights from "../components/slots-lights"
import SlotsSymbol from "../components/slots-symbol"

export default function Slots() {
    const [bet, setBet] = useState(1)
    const [reward, setReward] = useState<number | null>(null)
    const [spinning, setSpinning] = useState(false)
    const [currentSymbols, setCurrentSymbols] = useState<number[] | null>(null)
    const [hasSpun, setHasSpun] = useState(false)

    useEffect(() => {
        if (currentSymbols && currentSymbols[0] === 1 && !hasSpun) 
            setHasSpun(true)
    })

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
                            {currentSymbols && (
                                <>
                                <SlotsSymbol symbol={currentSymbols[i]} />
                                {(hasSpun || currentSymbols[0] === 1) && <SlotsSymbol symbol={currentSymbols[i]} leaving />}
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className='flex justify-around'>
                    <Button extraStyles='min-w-[200px]' text='BET ONE' onClick={() => {}} />
                    <Button extraStyles='min-w-[200px]' text='BET MAX' onClick={() => {}} />
                    <Button extraStyles='min-w-[200px]' text='SPIN' onClick={() => {}} />
                </div>
            </div>
        </div>
    )
}