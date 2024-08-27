import Link from 'next/link'
import React from 'react'

const MainMenu = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-200 text-primary-foreground py-4 px-6">
                <nav className="flex items-center justify-between">
                    <Link href="#" className="flex items-center gap-2 font-bold text-lg" prefetch={false}>
                        Flight Tracker
                    </Link>
                    <Link href={'/login'} className='font-bold'>Logout</Link>
                </nav>
            </header>
            <main className="flex-1 py-8 px-4 md:px-8">
                <h1 className='font-bold text-2xl pb-6'>Flight Details</h1>
                <div class="rounded-lg divide-y-2 border bg-card text-card-foreground shadow-sm w-full max-w-lg" data-v0-t="card">
                    <div class="grid gap-4 p-6">
                        <div class="flex items-center justify-between">
                            <div class="font-medium">Flight #AB123</div>
                            <div class="text-sm bg-green-500 px-1 py-0.5 rounded-md text-foreground">On Time</div>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="flex flex-col gap-1">
                                <div class="text-sm text-muted-foreground">Departure</div>
                                <div class="flex items-center gap-2">
                                    <div class="text-2xl font-medium">SFO</div>
                                </div>
                                <div>10:30 AM</div>
                            </div>
                            <div class="flex flex-col gap-1">
                                <div class="text-sm text-muted-foreground">Arrival</div>
                                <div class="flex items-center gap-2">
                                    <div class="text-2xl font-medium">JFK</div>
                                </div>
                                <div>5:45 PM</div>
                            </div>
                        </div>
                    </div>
                    <div className='p-6 py-4 flex justify-between items-center'>
                        <div>Duration: 7h 15m</div>
                        <button className='border p-2 px-4 rounded'>View Details</button>
                    </div>
                </div>
            </main>
            <footer className="bg-muted text-muted-foreground py-4 px-6 text-sm">
                <div className="max-w-4xl mx-auto">&copy; 2024 Flight Tracker. All rights reserved.</div>
            </footer>
        </div>
    )
}

export default MainMenu