import { useTransition, animated, config } from 'react-spring'

interface SlotsSymbolProps {
    symbol: number;
    leaving?: boolean;
    afterSpin: () => void;
    justMounted: boolean
}

export default function SlotsSymbol({ symbol, leaving, afterSpin, justMounted }: SlotsSymbolProps) {

    const slotsObj = ['🍫', '🔔', '🍒', '🍇', '🍋', '🍊', '🍍']
    
    const transitions = useTransition(symbol, {
        from: { position: 'absolute', x: leaving ? '0px' : '-250px' },
        enter: { x: leaving ? '250px' : '0px' },
        config: config.default,
        onRest: afterSpin,
        immediate: justMounted
    })
    
    return transitions(({ x }) => (
        <>{leaving ? (
        <animated.div style={{
            position: 'absolute',
            transform: x
                .to(val => 
                `translateY(${val})`)}}>
            <div className='text-4xl sm:text-8xl'>{slotsObj[symbol === 0 ? 6 : symbol - 1]}</div>
        </animated.div>
        ) : (
            <animated.div style={{
                position: 'absolute',
                transform: x
                    .to(val => 
                    `translateY(${val})`)}}>
                <div className='text-4xl sm:text-8xl'>{slotsObj[symbol]}</div>
            </animated.div>
        )}</>
    ))
}