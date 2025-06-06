import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Navbar = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4 pr-6'>
          <UserButton />
        </div>
      </div>
    </div>
  )
}

export default Navbar;
