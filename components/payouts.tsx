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
                <Image src={'/slots/cherry.png'} alt='' height={20} width={20} />
                BET x 1
            </PayoutRow>
            <PayoutRow>
                <div>
                    <Image src={'/slots/cherry.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/cherry.png'} alt='' height={20} width={20} />
                </div>
                BET x 5
            </PayoutRow>
            <PayoutRow>
                <div>
                    <Image src={'/slots/cherry.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/cherry.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/cherry.png'} alt='' height={20} width={20} />
                </div>
                BET x 10
            </PayoutRow>
            <PayoutRow>
                <div>
                    <Image src={'/slots/bell.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/bell.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/bell.png'} alt='' height={20} width={20} />
                </div>
                BET x 10
            </PayoutRow>
            <PayoutRow>
                <div>
                    <Image src={'/slots/bar.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/bar.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/bar.png'} alt='' height={20} width={20} />
                </div>
                BET x 20
            </PayoutRow>
            <PayoutRow>
                <div>
                    <Image src={'/slots/seven.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/seven.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/seven.png'} alt='' height={20} width={20} />
                </div>
                BET x 30
            </PayoutRow>
            <PayoutRow>
                <div>
                    <Image src={'/slots/lemon.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/lemon.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/lemon.png'} alt='' height={20} width={20} />
                </div>
                BET x 40
            </PayoutRow>
            <PayoutRow>
                <div>
                    <Image src={'/slots/grapes.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/grapes.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/grapes.png'} alt='' height={20} width={20} />
                </div>
                BET x 60
            </PayoutRow>
            <PayoutRow>
                <div>
                    <Image src={'/slots/orange.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/orange.png'} alt='' height={20} width={20} />
                    <Image src={'/slots/orange.png'} alt='' height={20} width={20} />
                </div>
                BET x 100
            </PayoutRow>
        </div>
    )
}