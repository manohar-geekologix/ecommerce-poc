'use client'
import { useEffect, useState } from 'react';
import { FaLaptop, FaShoppingBasket } from 'react-icons/fa';
import { MdOutlineStorefront } from "react-icons/md";
import { TbPerfume } from "react-icons/tb";

import toast from 'react-hot-toast';
import { FiTablet } from "react-icons/fi";
import { GiLipstick } from "react-icons/gi";
import { IoCarSportOutline, IoSearchSharp } from 'react-icons/io5';
import { RiShoppingBasketLine, RiSofaLine } from 'react-icons/ri';
import Loader from './Loader';
import ProductTable from './ProductTable';

const categoryList = [
    { name: 'All', icon: <MdOutlineStorefront /> },
    { name: 'Beauty', icon: <GiLipstick /> },
    { name: 'Fragrances', icon: <TbPerfume /> },
    { name: 'Furniture', icon: <RiSofaLine /> },
    { name: 'Groceries', icon: <RiShoppingBasketLine /> },
    { name: 'vehicle', icon: <IoCarSportOutline /> },
    { name: 'tablets', icon: <FiTablet /> },
    { name: 'Laptops', icon: <FaLaptop /> },
]

const Inventory = () => {
    const [productData, setProductData] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);

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
        <div className="pt-2 lg:p-10">
            <div className="flex space-x-4 mb-6 max-md:ps-2 border-b-2 overflow-auto no-scrollbar">
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
            <div className="md:bg-white flex flex-col max-md:px-3">
                <div className="flex justify-between items-center lg:border-b lg:p-4 md:p-4 lg:px-8 text-[#777777]">
                    <div className='max-md:hidden'>
                        show
                        <select
                            className='bg-transparent border rounded-lg ps-1 mx-2 outline-none'
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(parseInt(e.target.value, 10));
                                setCurrentPage(1);
                            }}
                        >
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                        Entries
                    </div>
                    <div className='flex items-center border rounded-md py-1 max-md:w-full bg-white'>
                        <IoSearchSharp className='mx-2 text-xl min-h-5 min-w-5' />
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
                    <ProductTable {...{ filteredProducts, handleDelete, currentPage, setCurrentPage, itemsPerPage, activeCategory }} />
                ) || <Loader />}
            </div>
        </div>
    );
};

export default Inventory;
