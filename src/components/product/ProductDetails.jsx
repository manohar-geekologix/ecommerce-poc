'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { IoMdStar } from "react-icons/io";
import { MdOutlineShoppingCart } from 'react-icons/md';


const ProductDetails = ({ id }) => {
    const [product, setProduct] = useState(null)
    console.log("🚀 ~ ProductDetails ~ product:", product)

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

    const renderStars = (rating) => {
        const filledStars = Math.floor(rating); // Number of filled stars
        const totalStars = 5; // Total stars to display
        const outlinedStars = totalStars - filledStars; // Number of outlined stars

        return (
            <>
                {Array.from({ length: filledStars }).map((_, index) => (
                    <IoMdStar key={`filled-${index}`} className='text-[#FFC145] text-2xl' />
                ))}
                {Array.from({ length: outlinedStars }).map((_, index) => (
                    <IoMdStar key={`filled-${index}`} className='text-[#D9D9D9] text-2xl' />
                ))}
            </>
        );
    };

    return (
        <section className="flex flex-col md:flex-row justify-center max-lg:pb-2 md:py-8 px-4 md:px-8 lg:px-16 gap-8">
            <div>
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={700}
                    height={500}
                    className="object-fit rounded bg-gray-50"
                    priority
                />
            </div>
            <div>
                <h1 className='font-semibold text-2xl lg:text-3xl text-[#213B85] pb-2 lg:pb-4 uppercase'>{product.title}</h1>
                <p className="text-balance text-[#555555] text-sm lg:text-base">{product.description}</p>
                <div className="flex my-2 mb-3">{renderStars(product.rating)}</div>
                <p className="text-2xl font-bold mb-4 text-[#213B85]">${product.price}</p>
                <div className="grid grid-cols-2 gap-2 capitalize lg:grid-cols-4 max-w-screen-md">
                    <div className="w-full border text-center bg-[#F6F9FF] border-[#213B85] rounded-md p-2 lg:p-3">
                        <div className="text-[#555555] pb-0.5 text-sm">category</div>
                        <h4 className="text-[#213B85] font-semibold">{product.category}</h4>
                    </div>
                    <div className="w-full border text-center bg-[#F6F9FF] border-[#213B85] rounded-md p-2 lg:p-3">
                        <div className="text-[#555555] pb-0.5 text-sm">Brand</div>
                        <h4 className="text-[#213B85] font-semibold">{product.brand}</h4>
                    </div>
                    <div className="w-full border text-center bg-[#F6FFF5] border-[#04B800] rounded-md p-2 lg:p-3">
                        <div className="text-[#555555] pb-0.5 text-sm">Availability</div>
                        <h4 className="text-[#04B800] font-semibold">In Stock</h4>
                    </div>
                    <div className="w-full border text-center bg-[#F6F9FF] border-[#213B85] rounded-md p-2 lg:p-3">
                        <div className="text-[#555555] pb-0.5 text-sm">Stock Left</div>
                        <h4 className="text-[#213B85] font-semibold">{product.stock}</h4>
                    </div>
                </div>
                <p className="my-2.5">Warranty: <span className="font-semibold">{product.warrantyInformation}</span></p>
                <p className="mb-2.5">Return Policy: <span className="font-semibold">{product.returnPolicy}</span></p>
                <p className="mb-2.5">Shipping: <span className="font-semibold">{product.shippingInformation}</span></p>
                <p className="mb-2.5">Tags: <span className="font-semibold capitalize">{product.tags.join(', ')}</span></p>
                <p className="mb-2.5">Dimensions: <span className="font-semibold">
                    {`W: ${product.dimensions.width}" H: ${product.dimensions.height}" D: ${product.dimensions.depth}"`}
                </span></p>
                <p className="mb-6">Weight: <span className="font-semibold">{product.weight} kg</span></p>
                <div className="flex gap-4 font-medium">
                    <button className="border border-[#213B85] text-[#213B85] py-2 sm:py-3 px-3 sm:px-8 rounded-md text-sm lg:text-lg lg:rounded-xl flex items-center gap-2">
                        <FaRegHeart />
                        Add to Watchlist
                    </button>
                    <button className="border bg-[#213B85] border-[#213B85] text-white py-2 sm:py-3 px-7 sm:px-16 rounded-md text-sm lg:text-lg lg:rounded-xl flex items-center gap-2">
                        <MdOutlineShoppingCart className='text-xl lg:text-2xl' />
                        Add to Cart
                    </button>
                </div>
                <div>
                    <div className='text-[#213B85] font-semibold text-lg mt-5 mb-3'>Product Review</div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3 max-w-screen-md">
                        {product.reviews.map((review, index) => (
                            <div key={index} className='p-2 lg:p-4 rounded border text-start lg:text-center'>
                                <div className='max-lg:flex justify-between gap-4 items-center' >
                                    <p className='font-semibold text-sm lg:text-base text-[#213B85]'>{review.comment}!</p>
                                    <div className='flex justify-center mb-2'>
                                        {renderStars(review.rating)} {/* Rendering stars based on rating */}
                                    </div>
                                </div>
                                <span className='text-sm'>{review.reviewerName ? review.reviewerName : 'Anonymous'}, {new Date(review.date).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails
