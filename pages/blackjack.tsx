import Button from '../components/button'
import Header from '../components/header'
import PlayingCard from '../components/playing-card'

export default function Blackjack() {
    return (
        <div>
            <Header text='Blackjack' />
            <div>
                <h4 className='text-xl'>Dealer</h4>
                <div className='flex justify-center'>
                    <PlayingCard onClick={() => {}} suit='clubs' rank='3' disabled/>
                    <PlayingCard onClick={() => {}} flipped suit='clubs' rank='3' disabled/>
                </div>
            </div>
            <div className='mb-3'>
                <h4 className='text-xl'>You</h4>
                <div className='flex justify-center'>
                    <PlayingCard onClick={() => {}} suit='hearts' rank='A' disabled/>
                    <PlayingCard onClick={() => {}} suit='spades' rank='10' disabled/>
                </div>
            </div>
            <h3 className='sm:text-3xl text-left w-[350px] lg:w-[600px] m-auto'>BET: $1</h3>
            <div className='w-[370px] lg:w-[600px] m-auto'>
                <div className='flex justify-between'>
                    <Button text='DEAL' onClick={() => {}} extraStyles='m-1 flex-grow' />
                    <Button text='HIT' disabled onClick={() => {}} extraStyles='m-1 flex-grow' />
                    <Button text='STAND' disabled onClick={() => {}} extraStyles='m-1 flex-grow' />
                </div>
                <div className='flex justify-between'>
                    <Button text='DOUBLE DOWN' disabled onClick={() => {}} extraStyles='m-1 flex-grow' />
                    <Button text='BET ONE' onClick={() => {}} extraStyles='m-1 flex-grow' />
                    <Button text='MAX BET' onClick={() => {}} extraStyles='m-1 flex-grow' />
                </div>
            </div>
        </div>
    )
}