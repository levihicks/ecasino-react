import { useState } from "react"
import Header from "../components/header"
import PlayingCard from "../components/playing-card"
import Button from '../components/button'

export default function VideoPoker() {
    const [bet, setBet] = useState(1)

    return (
        <div>
            <Header text='Video Poker' />
            <div className='flex w-full justify-between items-center m-auto mb-[50px] max-w-screen-xl'>
                <PlayingCard suit='clubs' rank='2' />
                <PlayingCard suit='spades' rank='Q' />
                <PlayingCard suit='hearts' rank='2' />
                <PlayingCard suit='diamonds' rank='2' />
                <PlayingCard suit='clubs' rank='2' />
            </div>
            <div className='max-w-screen-lg m-auto'>
                <h3 className='text-3xl text-left'>BET: ${bet}</h3>
                <div className='max-w-screen-lg flex justify-between'>
                    <Button text='BET ONE' />
                    <Button text='BET MAX' />
                    <Button text='DRAW' />
                </div>
            </div>
        </div>
    )
}