'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Loader from "./Loader"

const ProductList = () => {
    const [productData, setProductData] = useState([])
    const [loading, setLoading] = useState(true) // Initialize loading state as true

    useEffect(() => {
        fetch('https://dummyjson.com/products/category/furniture')
            .then(res => res.json())
            .then(data => {
                setProductData(data.products)
                setLoading(false) // Set loading to false once data is fetched
            })
    }, [])

    return (
        <main className="flex flex-col">
            <div className="flex-1 py-8 px-4 md:px-8">
                <h1 className='font-bold text-2xl pb-6'>Product's</h1>

                {loading ? <Loader /> : (
                    // Display the products once loaded
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {productData.map(product => (
                            <div key={product.id} className="rounded-lg divide-y-2 border bg-card text-card-foreground w-full max-w-lg shadow-md">
                                <div className="grid gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Image src={product.thumbnail} alt={product.title} width={500} height={500} className="object-cover" />
                                        <div className="flex justify-between items-center border-t p-4">
                                            <div>
                                                <div className="text-sm text-muted-foreground line-clamp-1">{product.title}</div>
                                                <div className="text-lg font-medium text-green-600">${product.price}</div>
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
                )}
            </div>
        </main>
    )
}

export default ProductList
