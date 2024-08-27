'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ProductDetails = ({ id }) => {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        if (id) {
            fetch(`https://dummyjson.com/products/${id}`).then(res => res.json()).then(data => setProduct(data))
        }
    }, [id])

    if (!product) return <div>Loading...</div>

    return (
        <div className="flex flex-col">
            <main className="flex-1 py-8 px-4 md:px-8">
                <h1 className='font-bold text-2xl pb-6'>{product.title}</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={400}
                            height={400}
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-lg mb-4">{product.description}</p>
                        <p className="text-xl font-bold mb-4 text-green-500">${product.price}</p>
                        <p className="mb-2">Category: <span className="font-medium">{product.category}</span></p>
                        <p className="mb-2">Brand: <span className="font-medium">{product.brand}</span></p>
                        <p className="mb-2">Availability: <span className={`font-medium ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span></p>
                        <p className="mb-2">Rating: <span className="font-medium">{product.rating} / 5</span></p>
                        <p className="mb-2">Warranty: <span className="font-medium">{product.warrantyInformation}</span></p>
                        <p className="mb-6">Return Policy: <span className="font-medium">{product.returnPolicy}</span></p>
                        <button className="bg-gray-800 text-white p-2 px-6 rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductDetails
