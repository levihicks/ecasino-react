import Link from "next/link"
import Image from 'next/image'
import { useAppSelector } from "../hooks/typedReduxHooks"
import { selectCount } from "../store/bankrollSlice"

interface HeaderProps {
    text: string;
    home?: boolean;
}

export default function Header({ text, home }: HeaderProps) {
    const bankrollValue = useAppSelector(selectCount)

    return ( 
        <header className='flex justify-around items-center'>
            {!home && (
                <Link href='/'>
                    <a className='text-green-dark hover:text-green-light text-sm sm:text-lg  w-1/4' >
                        eCASINO
                    </a>
                </Link>
            )}
            <h1 className='py-4 text-lg sm:text-4xl w-1/4'>
                {text}
            </h1>
            {!home && (
                <div className='text-sm sm:text-lg w-1/4'>Bankroll: ${bankrollValue.toFixed(2)}</div>
            )}
        </header>
    )
}