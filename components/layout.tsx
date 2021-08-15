import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className='bg-black min-h-screen text-center text-white'>
            {children}
        </div>
    )
}