import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/header'
import { ReactNode } from 'react'

const MenuOption = ({children}: {children: ReactNode}) => (
  <div className='group'>{children}</div>
)

const MenuOptionLink = ({children}: {children: ReactNode}) => (
  <div className='text-2xl text-white group-hover:text-green-light my-3'>{children}</div>
)

const Home: NextPage = () => {
  return (
    <>
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
              <MenuOptionLink>Liar&apos;s dice</MenuOptionLink>
            </MenuOption>
          </a>
        </Link>
      </div>
    </>
  )
}

export default Home
