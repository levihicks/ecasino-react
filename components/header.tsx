import Link from "next/link"
import Image from 'next/image'
import { useAppSelector } from "../hooks/typedReduxHooks"
import { selectCount } from "../store/bankrollSlice"

interface HeaderProps {
    text: string;
    home?: boolean;
}

export default function Header({ text, home, imageFilename }: HeaderProps) {
    const bankrollValue = useAppSelector(selectCount)

    return ( 
        <header className='flex justify-around items-center space-around'>
            {!home && (
                <Link href='/'>
                    <a className='text-green-dark hover:text-green-light' >
                        eCASINO
                    </a>
                </Link>
            )}
            <h1 className='py-8 text-4xl'>
                {text}
            </h1>
            {!home && (
                <div>Bankroll: ${bankrollValue}</div>
            )}
        </header>
    )
}