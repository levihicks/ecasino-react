export default function SlotsLights() {
    return (
        <>
            {[...new Array(4)].map((el, i) => 
                <div 
                    key={i} 
                    className={`h-4 w-4 rounded-full
                    bg-white mx-1 ${(i % 2 === 0) && 'bg-green-light'}`} />
            )}
        </>
    )
}