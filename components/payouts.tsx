import { ReactNode } from "react"
import Image from "next/image"

const PayoutRow = ({children}: {children: ReactNode}) => (
    <div className='flex flex-row justify-between h-[30px] p-1 px-8 mt-1 bg-green-dark text-base rounded-full'>
        {children}
    </div>
)

export default function Payouts() {
    return (
        <div className='flex flex-col'>
            <div className='text-xl'>Payouts</div>
            <PayoutRow>
                <div>
                    🍒
                </div>
                BET x 1
            </PayoutRow>
            <PayoutRow>
                <div>
                    🍒🍒
                </div>
                BET x 5
            </PayoutRow>
            <PayoutRow>
                <div>
                    🍒🍒🍒
                </div>
                BET x 10
            </PayoutRow>
            <PayoutRow>
                <div>
                    🔔🔔🔔
                </div>
                BET x 10
            </PayoutRow>
            <PayoutRow>
                <div>
                    🍫🍫🍫
                </div>
                BET x 20
            </PayoutRow>
            <PayoutRow>
                <div>
                    🍍🍍🍍
                </div>
                BET x 30
            </PayoutRow>
            <PayoutRow>
                <div>
                    🍋🍋🍋
                </div>
                BET x 40
            </PayoutRow>
            <PayoutRow>
                <div>
                    🍇🍇🍇
                </div>
                BET x 60
            </PayoutRow>
            <PayoutRow>
                <div>
                    🍊🍊🍊
                </div>
                BET x 100
            </PayoutRow>
        </div>
    )
}