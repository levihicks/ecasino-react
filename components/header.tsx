import Link from "next/link"

export default function Header({ text, home }: { text: string, home?: boolean }) {
    return ( 
        <header className='flex justify-around items-center space-around'>
            {!home && (
                <Link href='/'>
                    <a className='text-green-dark hover:text-green-light' >
                        eCASINO
                    </a>
                </Link>
            )}
            <h1 className='py-8 text-4xl'>{text}</h1>
            {!home && (
                <div>Bankroll: $1000</div>
            )}
        </header>
    )
}