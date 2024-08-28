'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ProductDetails = ({ id }) => {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        if (id) {
            fetch(`https://dummyjson.com/products/${id}`)
                .then(res => res.json())
                .then(data => setProduct(data))
        }
    }, [id])

    if (!product) return (
        <div role="status" className='h-screen flex justify-center items-center'>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-gray-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )

    return (
        <section className="flex flex-col">
            <main className="flex-1 py-8 px-4 md:px-8">
                <h1 className='font-bold text-2xl pb-6'>{product.title}</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="lg:w-1/2 2xl:w-1/3">
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={400}
                            height={400}
                            className="object-cover rounded-lg mx-auto"
                        />
                        <div className="flex mt-4 space-x-2">
                            {product.images.slice(1).map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`${product.title} image ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="object-cover rounded-md border"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <p className="text-lg mb-4">{product.description}</p>
                        <p className="text-2xl font-bold mb-4 text-green-500">${product.price}</p>
                        <p className="mb-2">Category: <span className="font-medium">{product.category}</span></p>
                        <p className="mb-2">Brand: <span className="font-medium">{product.brand}</span></p>
                        <p className="mb-2">Availability: <span className={`font-medium ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {product.availabilityStatus}
                        </span></p>
                        <p className="mb-2">Stock: <span className="font-medium">{product.stock}</span></p>
                        <p className="mb-2">SKU: <span className="font-medium">{product.sku}</span></p>
                        <p className="mb-2">Rating: <span className="font-medium">{product.rating} / 5</span></p>
                        <p className="mb-2">Warranty: <span className="font-medium">{product.warrantyInformation}</span></p>
                        <p className="mb-2">Return Policy: <span className="font-medium">{product.returnPolicy}</span></p>
                        <p className="mb-2">Shipping: <span className="font-medium">{product.shippingInformation}</span></p>
                        <p className="mb-2">Tags: <span className="font-medium">{product.tags.join(', ')}</span></p>
                        <p className="mb-2">Dimensions: <span className="font-medium">
                            {`W: ${product.dimensions.width}" H: ${product.dimensions.height}" D: ${product.dimensions.depth}"`}
                        </span></p>
                        <p className="mb-6">Weight: <span className="font-medium">{product.weight} kg</span></p>
                        <button className="bg-gray-800 text-white p-2 px-6 rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="font-bold text-xl mb-4">Customer Reviews</h2>
                    <div className="space-y-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border p-4 rounded-lg shadow-sm">
                                <p className="font-medium">Rating: {review.rating} / 5</p>
                                <p className="italic">"{review.comment}"</p>
                                <p className="text-sm text-gray-500">- {review.reviewerName ? review.reviewerName : 'Anonymous'}, {new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </section>
    )
}

export default ProductDetails
