import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/header'
import { ReactNode } from 'react'

const MenuOption = ({children}: {children: ReactNode}) => (
  <div className='group hover:animate-expand'>{children}</div>
)

const MenuOptionLink = ({children}: {children: ReactNode}) => (
  <div className='relative text-3xl text-white group-hover:text-green-light my-3'>{children}</div>
)

const Home: NextPage = () => {
  return (
    <>
      <div>
        <div className='top-0 animate-float-bl w-[900px] h-[550px] bg-green rounded-[50%] fixed opacity-20 rotate-45'></div>
        <div className='top-[50%] w-[800px] animate-float-br h-[350px] bg-green-light rounded-[50%] fixed opacity-20 -rotate-45'></div>
        <div className='top-[75%] w-[600px] animate-float-tr h-[450px] bg-green-dark rounded-[50%] fixed opacity-20 rotate-12'></div>
      </div>
      <div className='relative'>
        <Header text='eCASINO' home />
        <div className='flex justify-around my-24'>
          <Link href='/video-poker'>
            <a>
              <MenuOption>
                <Image src='/video-poker-image.png' alt='' height={200} width={200} />
                <MenuOptionLink>Video Poker</MenuOptionLink>
              </MenuOption>
            </a>
          </Link>
          <Link href='/slots'>
            <a>
              <MenuOption>
                <Image src='/slots-image.png' alt='' height={200} width={200} />
                <MenuOptionLink>Slots</MenuOptionLink>
              </MenuOption>
            </a>
          </Link>
          <Link href='/liars-dice'>
            <a>
              <MenuOption>
                <Image src='/liars-dice-image.png' alt='' height={200} width={200} />
                <MenuOptionLink>Liar&apos;s Dice</MenuOptionLink>
              </MenuOption>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
