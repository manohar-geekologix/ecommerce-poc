'use client'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { IoSearchOutline } from "react-icons/io5";
import { LuBellDot } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";

import React from 'react'

const NavMenu = () => {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        const confirmed = window.confirm('Are you sure you want to log out?');
        if (confirmed) {
            Cookies.remove('accessToken');
            router.push('/login');
        }
    }

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/contact-us', label: 'Contact Us' },
    ]

    const handleResponsive = () => {
        return (
            <div className='text-[#213B85] flex gap-6 lg:text-xl font-medium justify-center'>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={pathname === link.href ? 'text-[#CE5C1C] font-bold' : ''}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        )
    }
    return (
        <>
            <header className="text-[#213B85] text-primary-foreground py-3 lg:py-4 lg:px-5 border-b">
                <nav className="flex items-center justify-between px-5 lg:px-10">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg" prefetch={false}>
                        <Image src={'/images/logo.svg'} width={100} height={100} className='size-full' />
                    </Link>
                    <div className="hidden lg:block">{handleResponsive()}</div>
                    <div className="flex items-center gap-5 lg:text-xl">
                        <div className="shadow-lg bg-white rounded-full p-2 hidden lg:block">
                            <IoSearchOutline />
                        </div>
                        <div className="shadow-lg bg-white rounded-full p-2 hidden lg:block">
                            <LuBellDot />
                        </div>
                        <div className="shadow-lg bg-white rounded-full p-2 hidden lg:block">
                            <MdOutlineShoppingCart />
                        </div>
                        <div className='flex items-center gap-3 cursor-pointer' onClick={handleLogout}>
                            <div className="bg-[#213B85] text-white rounded-full p-2">AA</div>
                            <p className='text-base font-semibold cursor-pointer hidden lg:block'>Logout</p>
                        </div>
                    </div>
                </nav>
            </header>
            <div className='py-2 lg:hidden border-b'>
                {handleResponsive()}
            </div>
        </>
    )
}

export default NavMenu