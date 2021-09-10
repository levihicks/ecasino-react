export default function SlotsLights() {
    return (
        <>
            {[...new Array(4)].map((el, i) => 
                <div 
                    key={i} 
                    className={`h-2 w-2 md:h-4 md:w-4 rounded-full mx-[1px] md:mx-1 
                        ${(i % 2 === 0) ? 'bg-green-light' : 'bg-white'}`} />
            )}
        </>
    )
}