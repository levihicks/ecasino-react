interface DieProps {
    value: number;
    extraStyles: string;
    testId?: string;
}

export default function Die({ value, testId, extraStyles }: DieProps) {
    let rowVals: {[key: string]: number[]} = {
        '1': [0, 0, 0, 0, 1, 0, 0, 0, 0],
        '2': [0, 0, 1, 0, 0, 0, 1, 0, 0],
        '3': [0, 0, 1, 0, 1, 0, 1, 0, 0],
        '4': [1, 0, 1, 0, 0, 0, 1, 0, 1],
        '5': [1, 0, 1, 0, 1, 0, 1, 0, 1],
        '6': [1, 0, 1, 1, 0, 1, 1, 0, 1],
    }

    return (
        <div className='px-1 sm:px-2 flex' data-testid={testId}>
            <div 
                className={`${value > 0 ? 'bg-white' : 'bg-green-dark'} rounded-lg
                    flex flex-wrap p-2 ${extraStyles}`}>
                {value > 0 && rowVals[value].map((el, i) => (
                    <div key={i} className={`h-1/3 w-1/3 rounded-full flex justify-center items-center`}>
                        <div className={`min-h-[70%] min-w-[70%] rounded-full ${el && 'bg-black'}`}></div>
                    </div>
                ))} 
            </div>
        </div>
    )
}