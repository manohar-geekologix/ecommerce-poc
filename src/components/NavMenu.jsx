'use client'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import React from 'react'

const NavMenu = () => {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        Cookies.remove('accessToken');
        router.push('/login')
    }

    return (
        <header className="bg-gray-200 text-primary-foreground py-4 px-6">
            <nav className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg" prefetch={false}>
                    Logo
                </Link>
                <div className='flex gap-5'>
                    <Link href={'/'} className={`${pathname == '/' ? 'text-gray-500' : ''} font-semibold`}>Home</Link>
                    <Link href={'/about'} className={`${pathname == '/about' ? 'text-gray-500' : ''} font-semibold`}>About</Link>
                    <Link href={'/contact-us'} className={`${pathname == '/contact-us' ? 'text-gray-500' : ''} font-semibold`}>Contact Us</Link>
                </div>
                <a onClick={handleLogout} className='font-bold cursor-pointer'>Logout</a>
            </nav>
        </header>
    )
}

export default NavMenu