import { useState } from 'react'
import { useTransition, animated, config } from 'react-spring'
import Image from 'next/image'
import { SYMBOLS } from '../constants/slots-symbols'

interface SlotsSymbolProps {
    symbol: number;
    leaving?: boolean;
    afterSpin: () => void;
    justMounted: boolean
}

export default function SlotsSymbol({ symbol, leaving, afterSpin, justMounted }: SlotsSymbolProps) {
    
    const transitions = useTransition(symbol, {
        from: { position: 'absolute', x: leaving ? '0px' : '-250px' },
        enter: { x: leaving ? '250px' : '0px' },
        config: config.default,
        onRest: afterSpin,
        immediate: justMounted
    })
    
    return transitions(({ x }, item) => (
        <>{leaving ? (
        <animated.div style={{
            position: 'absolute',
            transform: x
                .to(val => 
                `translateY(${val})`)}}>
            <Image 
                src={`/slots/${SYMBOLS[symbol === 0 ? 6 : symbol - 1]}.png`} 
                alt=''
                width={140}
                height={140}  />
        </animated.div>
        ) : (
            <animated.div style={{
                position: 'absolute',
                transform: x
                    .to(val => 
                    `translateY(${val})`)}}>
                <Image 
                    src={`/slots/${SYMBOLS[symbol]}.png`} 
                    alt=''
                    width={140}
                    height={140}  />
            </animated.div>
        )}</>
    ))
}