'use client'
import { useEffect, useState } from 'react';
import { FaLaptop, FaShoppingBasket } from 'react-icons/fa';
import { GiHomeGarage } from 'react-icons/gi';
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext, MdOutlineStorefront } from "react-icons/md";
import { TbPerfume } from "react-icons/tb";

import toast from 'react-hot-toast';
import { FiTablet } from "react-icons/fi";
import { GiLipstick } from "react-icons/gi";
import { IoCarSportOutline, IoSearchSharp } from 'react-icons/io5';
import { RiSofaLine } from 'react-icons/ri';
import Loader from './Loader';
import ProductTable from './ProductTable';

const categoryList = [
    { name: 'All', icon: <MdOutlineStorefront /> },
    { name: 'Beauty', icon: <GiLipstick /> },
    { name: 'Fragrances', icon: <TbPerfume /> },
    { name: 'Furniture', icon: <RiSofaLine /> },
    { name: 'Groceries', icon: <FaShoppingBasket /> },
    { name: 'vehicle', icon: <IoCarSportOutline /> },
    { name: 'tablets', icon: <FiTablet /> },
    { name: 'Laptops', icon: <FaLaptop /> },
]

const Inventory = () => {
    const [productData, setProductData] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const url = activeCategory !== 'All'
            ? `https://dummyjson.com/products/category/${activeCategory}`
            : 'https://dummyjson.com/products';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProductData(data.products || data);
                setLoading(false);
            });
    }, [activeCategory]);

    const handleDelete = (productId) => {
        fetch(`https://dummyjson.com/products/${productId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => {
                // Remove the deleted product from the state
                setProductData(productData.filter(product => product.id !== productId));
                toast.success('Deleted successfully')
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    const filteredProducts = productData.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 pt-2 lg:p-10">
            <div className="flex space-x-4 mb-6 border-b-2 overflow-auto no-scrollbar">
                {categoryList?.map((category) => (
                    <button
                        key={category.name}
                        onClick={() => setActiveCategory(category.name)}
                        className={`flex items-center gap-2 lg:pb-4 lg:px-4 py-2 text-base lg:text-lg text-[#213B85] ${activeCategory == category.name && `border-[#213B85] border-b-2 font-bold`} capitalize`}
                    >
                        <div className={`p-1 lg:p-2 rounded-full ${activeCategory == category.name && 'bg-[#213B85] text-white' || 'bg-[#EAF1FF]'}`}>
                            {category.icon}
                        </div>
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="md:bg-white flex flex-col">
                <div className="flex justify-between items-center lg:border-b lg:p-4 lg:px-8 text-[#777777]">
                    <div className='max-md:hidden'>
                        show
                        <select className='bg-transparent border rounded-lg ps-1 pe-3 mx-3 outline-none' name="" id="">
                            <option value="10">10</option>
                        </select>
                        Entries
                    </div>
                    <div className='flex items-center border rounded-md py-1 max-md:w-full'>
                        <IoSearchSharp className='mx-2 text-xl' />
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-1 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                {!loading && (
                    <ProductTable {...{ filteredProducts, handleDelete }} />
                ) || <Loader />}
            </div>
            <div className="bg-white flex md:flex-row max-md:gap-2 flex-col items-center justify-between md:mb-6 border-t-2 p-4 px-8">
                <div className='max-md:text-sm'>
                    Showing 1-10 of 60 Entries
                </div>
                <div className="flex justify-center items-center space-x-2 max-md:text-sm">
                    <button className="flex items-center gap-1 px-3 py-1 border border-transparent rounded hover:text-blue-700 focus:outline-none">
                        <GrFormPrevious /> Prev
                    </button>

                    <button className="px-3 py-1 text-blue-500  bg-[#E7F0FC] border border-transparent rounded focus:outline-none">
                        1
                    </button>
                    <button className="px-3 py-1 border border-transparent rounded hover:text-blue-700 focus:outline-none">
                        2
                    </button>
                    <button className="px-3 py-1 border border-transparent rounded hover:text-blue-700 focus:outline-none">
                        3
                    </button>

                    <span className="px-3 py-1">...</span>

                    <button className="px-3 py-1 border border-transparent rounded hover:text-blue-700 focus:outline-none">
                        6
                    </button>

                    <button className="flex items-center gap-1 px-3 py-1 border border-transparent rounded hover:text-blue-700 focus:outline-none">
                        Next <MdNavigateNext />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Inventory;
