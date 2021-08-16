import { ReactNode } from "react"
import Head from 'next/head'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Head>
            <title>eCasino</title>
            <meta name="description" content="Created by Levi Hicks" />
            <link rel="icon" href="/favicon.ico" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet" />
            </Head>
            <div className='bg-black min-h-screen text-center text-white'>
                {children}
            </div>
        </>
    )
}