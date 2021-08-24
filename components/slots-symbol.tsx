import { useState } from 'react'
import { useTransition, animated, config } from 'react-spring'
import Image from 'next/image'

interface SlotsSymbolProps {
    symbol: number;
    leaving?: boolean;
}

export default function SlotsSymbol({ symbol, leaving }: SlotsSymbolProps) {
    const symbols = ['bar', 'bell', 'cherry', 'grapes', 'lemon', 'orange', 'seven']
    
    const transitions = useTransition(symbol, {
        from: { position: 'absolute', x: leaving ? '0px' : '-250px' },
        enter: { x: leaving ? '250px' : '0px' },
        config: config.default,
    })
    
    return transitions(({ x }, item) => (
        <>{leaving ? (
        <animated.div style={{
            position: 'absolute',
            transform: x
                .to(val => 
                `translateY(${val})`)}}>
            <Image 
                src={`/slots/${symbols[symbol]}.png`} 
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
                    src={`/slots/${symbols[symbol === 6 ? 0 : symbol + 1]}.png`} 
                    alt=''
                    width={140}
                    height={140}  />
            </animated.div>
        )}</>
    ))
}