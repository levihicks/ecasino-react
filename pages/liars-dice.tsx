import Header from "../components/header"
import Die from '../components/die'
import Button from '../components/button'

export default function LiarsDice() {
    return (
        <div>
            <Header text={'Liar\'s Dice'} />
            <div className='text-green-light py-2'>Opponent</div>
            <div className='flex justify-center'>
                <Die value={0} size={30} altText='opponent die'/>
                <Die value={1} size={30} altText='opponent die'/>
                <Die value={2} size={30} altText='opponent die'/>
                <Die value={3} size={30} altText='opponent die'/>
                <Die value={4} size={30} altText='opponent die'/>
            </div>
            <hr className='max-w-sm my-2 m-auto' />
            <div className={'text-xl text-green-light flex justify-center'}>
                Opponent bids 6 <Die value={1} size={30} />
            </div>
            <div className='flex justify-center my-6'>
                <Die value={0} altText='user die' />
                <Die value={1} altText='user die' />
                <Die value={2} altText='user die' />
                <Die value={3} altText='user die' />
                <Die value={4} altText='user die' />
            </div>
            <div className='flex items-center justify-between max-w-screen-md m-auto'>
                <div className='text-3xl'>ANTE $1</div>
                <div className='flex'>
                    <div className='flex flex-col items-center justify-between'>
                        <button className='h-8 w-8 bg-green-dark rounded-3xl text-black hover:bg-green-light text-2xl'>+</button>
                        <div className='my-3'><Die value={1} size={40}/></div>
                        <button className='h-8 w-8 bg-green-dark rounded-3xl text-black hover:bg-green-light text-2xl'>-</button>
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                        <button className='h-8 w-8 bg-green-dark rounded-3xl text-black hover:bg-green-light text-2xl'>+</button>
                        <div className='flex justify-center items-center text-2xl my-3'>2</div>
                        <button className='h-8 w-8 bg-green-dark rounded-3xl text-black hover:bg-green-light text-2xl'>-</button>
                    </div>
                </div>
                <div className='flex flex-wrap w-[60%]'>
                    <Button extraStyles='w-[48%] m-1' text='BID' onClick={() => {}} />
                    <Button extraStyles='w-[48%] m-1' text='CALL BLUFF' onClick={() => {}} />
                    <Button extraStyles='w-[48%] m-1' text='INCREASE ANTE' onClick={() => {}} />
                    <Button extraStyles='w-[48%] m-1' text='MAX ANTE' onClick={() => {}} />
                </div>
            </div>
        </div>
    )
}