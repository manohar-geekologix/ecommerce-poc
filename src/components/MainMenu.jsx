'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const MainMenu = () => {
    const [productData, setProductData] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/products').then(res => res.json()).then(data => setProductData(data.products))
    }, [])

    return (
        <div className="flex flex-col">
            <main className="flex-1 py-8 px-4 md:px-8">
                <h1 className='font-bold text-2xl pb-6'>Product List</h1>
                <div className="grid grid-cols-5 gap-6">
                    {productData.map(product => (
                        <div key={product.id} className="rounded-lg divide-y-2 border bg-card text-card-foreground w-full max-w-lg shadow-sm">
                            <div className="grid gap-4 p-6">
                                <div className="flex flex-col gap-2">
                                    <Image src={product.thumbnail} alt={product.title} width={500} height={700} className="object-cover" />
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-sm text-muted-foreground line-clamp-1">{product.title}</div>
                                            <div className="text-lg font-medium">${product.price}</div>
                                        </div>
                                        <div>
                                            <Link href={`/${product.id}`} className='border p-2 px-4 rounded text-sm text-nowrap'>View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default MainMenu
