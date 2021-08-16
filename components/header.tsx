export default function Header({ text, home }: { text: string, home?: boolean }) {
    return (
        <header>
            <h1 className='py-8 text-4xl'>{text}</h1>
        </header>
    )
}