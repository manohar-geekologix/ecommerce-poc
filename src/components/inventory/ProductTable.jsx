import Link from 'next/link';
import React from 'react'
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiArrowDropRightLine, RiDeleteBin6Line } from "react-icons/ri";
const ProductTable = ({ productData, activeCategory, handleDelete }) => {
    return (
        <div className="-m-1.5 overflow-x-auto px-6">
            <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">S.No.</th>
                                <th scope="col" className="px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Image</th>
                                <th scope="col" className="px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Name</th>
                                {activeCategory == 'all' && (
                                    <th scope="col" className="px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Category</th>
                                )}
                                <th scope="col" className="px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Brand</th>
                                <th scope="col" className="px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Availability</th>
                                <th scope="col" className="px-6 py-5 text-center text-sm font-bold text-[#1A1A1A]">Stock Left</th>
                                <th scope="col" className="px-6 py-5 text-start text-sm font-bold text-[#1A1A1A]">Price</th>
                                <th scope="col" className="px-6 py-5 text-center text-sm font-bold text-[#1A1A1A]">Weight</th>
                                <th scope="col" className="px-6 py-5 text-center text-sm font-bold text-[#1A1A1A]">Action</th>
                                <th scope="col" className="px-6 py-5 text-center text-sm font-bold text-[#1A1A1A]">Detail</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {productData?.slice(0, 10).map((item, index) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</td>
                                    <td className="px-6  whitespace-nowrap text-sm">
                                        <img src={item.images} alt={item.title} className="bg-gray-200 w-12 object-cover" />
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-800">{item.title}</td>
                                    {activeCategory == 'all' && (
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-800">{item.category}</td>
                                    )}
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-800">{item.brand || '-'}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm">
                                        <span className={`rounded-2xl text-xs py-1 border ${item.availabilityStatus == 'In Stock' ? 'text-[#09AD95] bg-[#E6F7F4] px-3.5 border-[#A3E9D1]' : 'text-[#DC3545] bg-[#FDE9EC] border-[#FFC6CE] px-2'}`}>
                                            {item.availabilityStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-center text-sm text-gray-800">{item.stock}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-800">$ {item.price}</td>
                                    <td className="px-6 py-5 whitespace-nowrap  text-center text-sm text-gray-800">{item.weight}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-center text-sm font-medium">
                                        <button type="button" className="inline-flex items-center gap-x-2 text-base font-semibold  border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 bg-[#E7F0FC] p-1.5 rounded-full border-[#C3DDFF]"><MdOutlineModeEdit /></button>
                                        <button type="button" className="inline-flex items-center gap-x-2 text-base font-semibold border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 ml-2 bg-[#FDE9EC] p-1.5 rounded-full border-[#FFC6CE]" onClick={() => handleDelete(item.id)}><RiDeleteBin6Line /></button>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-center text-sm font-medium">
                                        <Link href={`/product/${item.id}`}>
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-s-2 text-sm rounded-lg border border-transparent text-[#213B85] hover:text-blue-800 focus:outline-none focus:text-blue-800 underline"
                                            >
                                                View Details
                                                <RiArrowDropRightLine className='text-xl' />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductTable