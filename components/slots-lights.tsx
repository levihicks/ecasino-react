export default function SlotsLights() {
    return (
        <>
            {[...new Array(4)].map((el, i) => 
                <div 
                    key={i} 
                    className={`h-2 w-2 sm:h-4 sm:w-4 rounded-full mx-[1px] sm:mx-1 
                        ${(i % 2 === 0) ? 'bg-green-light' : 'bg-white'}`} />
            )}
        </>
    )
}