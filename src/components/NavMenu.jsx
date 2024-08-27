import Link from 'next/link'
import React from 'react'

const NavMenu = () => {
    return (
        <header className="bg-gray-200 text-primary-foreground py-4 px-6">
            <nav className="flex items-center justify-between">
                <Link href="#" className="flex items-center gap-2 font-bold text-lg" prefetch={false}>
                    Logo
                </Link>
                <div className='flex gap-5'>
                    <Link href={'/'} className='font-semibold'>Home</Link>
                    <Link href={'/about'} className='font-semibold'>About</Link>
                    <Link href={'/contact-us'} className='font-semibold'>Contact Us</Link>
                </div>
                <Link href={'/login'} className='font-bold'>Logout</Link>
            </nav>
        </header>
    )
}

export default NavMenu