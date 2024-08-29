'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Loader from "./Loader"

const ProductList = () => {
    const [productData, setProductData] = useState([])
    const [beautyProduct, setBeautyProduct] = useState([])
    const [loading, setLoading] = useState(true) // Initialize loading state as true

    useEffect(() => {
        fetch('https://dummyjson.com/products/category/beauty')
            .then(res => res.json())
            .then(data => {
                setBeautyProduct(data.products)
                setLoading(false) // Set loading to false once data is fetched
            })
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProductData(data.products)
                setLoading(false) // Set loading to false once data is fetched
            })
    }, [])

    return (
        <main>
            <Image
                src="/images/banner.svg"
                height={100}
                width={100}
                className="size-full hidden md:block"
            />
            <Image
                src="/images/mobile-banner.svg"
                height={100}
                width={100}
                className="size-full block md:hidden"
            />
            <div className="flex-1 py-4 lg:py-8 px-4 lg:px-8 max-lg:pe-0">
                <h1 className='font-bold lg:text-3xl pb-2 lg:pb-6 text-[#CE5C1C] lg:text-center'>Deals of the Day</h1>
                {loading ? <Loader /> : (
                    // Display the products once loaded
                    <div className="flex gap-3 lg:gap-6 overflow-auto no-scrollbar">
                        {beautyProduct.slice(0, 5).map(product => (
                            <div key={product.id} className="rounded divide-y-2 w-full max-w-lg">
                                <Link href={`/${product.id}`} className="grid gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="h-50">
                                            <Image src={product.thumbnail} alt={product.title} width={700} height={700} className=" object-contain bg-gray-50" />
                                        </div>
                                        <div className="text-center max-lg:w-[200px]">
                                            <div className="text-base lg:text-xl font-semibold tracking-wide line-clamp-1 text-[#213B85] uppercase">{product.category}</div>
                                            <div className="text-sm lg:text-base line-clamp-1 text-[#555555]">{product.title}</div>
                                            <div className="text-base lg:text-xl font-semibold tracking-wide text-[#213B85]">${product.price}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex-1 py-4 lg:py-8 px-4 lg:px-8 max-lg:pe-0">
                <h1 className='font-bold lg:text-3xl pb-2 lg:pb-6 text-[#CE5C1C] lg:text-center'>Recommended for You</h1>
                {loading ? <Loader /> : (
                    // Display the products once loaded
                    <div className="flex gap-3 lg:gap-6 overflow-auto no-scrollbar  ">
                        {productData?.slice(10, 15).map(product => (
                            <div key={product.id} className="rounded divide-y-2 w-full max-w-lg">
                                <Link href={`/${product.id}`} className="grid gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="h-50">
                                            <Image src={product.thumbnail} alt={product.title} width={1000} height={1000} className=" object-contain bg-gray-50" />
                                        </div>
                                        <div className="text-center max-lg:w-[200px]">
                                            <div className="text-base lg:text-xl font-semibold tracking-wide line-clamp-1 text-[#213B85] uppercase">{product.category}</div>
                                            <div className="text-sm lg:text-base line-clamp-1 text-[#555555]">{product.title}</div>
                                            <div className="text-base lg:text-xl font-semibold tracking-wide text-[#213B85]">${product.price}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default ProductList
