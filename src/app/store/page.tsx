'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TbAdjustmentsDown, TbX } from "react-icons/tb";
import { FaAngleRight } from "react-icons/fa6";
import { client } from '@/sanity/lib/client';


const page = () => {

    const [isOpen, setIsOpen] = useState(false);
    interface Product {
        _id: string;
        name: string;
        description: string;
        price: number;
        category: string;
        dressType: string;
        colors: string;
        sizes: string[];
        dressStyle: string;
        imageUrl: string;
        rating: number; // Optional field
        originalPrice: number; // Optional field
    }

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState<string>(""); // Category
    const [priceRange, setPriceRange] = useState([0, 500]); // Example range: $0 - $500
    const [selectedColor, setSelectedColor] = useState<string>(""); // Color
    const [selectedSize, setSelectedSize] = useState<string>(""); // Size
    const [selectedDressStyle, setSelectedDressStyle] = useState<string>(""); // Dress Style

    useEffect(() => {
        const productFetch = async () => {
            const qwery = `*[_type == "product"]{
  description,
  price,
  "imageUrl": image.asset->url,
  category,
  isNew,
  _id,
  name,
  discountPercent,
  colors,
  sizes,
  }`
            const productApi = await client.fetch(qwery);

            setProducts(productApi);
            setFilteredProducts(productApi);
        };
        productFetch();
    }, []);



    useEffect(() => {
    }, [selectedCategory, selectedColor, selectedSize, selectedDressStyle, priceRange]);

    const applyFilters = () => {
        const filtered = products.filter((product) => {
            const matchesCategory = selectedCategory
                ? product.category === selectedCategory
                : true;
    
            const matchesPrice =
                product.price >= priceRange[0] && product.price <= priceRange[1];
    
            const matchesColor = selectedColor
                ? product.colors && product.colors.includes(selectedColor)
                : true;
    
            const matchesSize = selectedSize
                ? product.sizes && product.sizes.includes(selectedSize)
                : true;
    
            const matchesDressStyle = selectedDressStyle
                ? product.dressStyle === selectedDressStyle
                : true;
    
            return (
                matchesCategory &&
                matchesPrice &&
                matchesColor &&
                matchesSize &&
                matchesDressStyle
            );
        });
    
        setFilteredProducts(filtered);
    };
    

    return (
        <div>


            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* <!-- Breadcrumb --> */}
                <nav className="text-sm">
                    <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
                    <span className="mx-2 text-gray-500">/</span>
                    <span className="text-black font-bold">shop</span>
                </nav>

                {/* <!-- Main Container --> */}
                <div className="container py-4">


                    {/* <!-- Content --> */}
                    <div className="flex gap-6 ">
                        {/* <!-- Filters Sidebar --> */}
                        <aside className="w-1/4 h-full bg-white px-4 py-2 rounded-lg shadow hidden md:block border">
                            <div className="flex items-center border-b pb-4 mb-4">
                                <h1 className="text-xl font-bold flex-grow">Filters</h1>
                                <TbAdjustmentsDown className="text-4xl bg-[#F0F0F0] p-2 rounded-full" />
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-col justify-between pb-4 mb-4">
                                {["T-shirts", "Pant Court", "Jeans", "Three Piece", "Jackets"].map(
                                    (category) => (
                                        <div
                                            key={category}
                                            className={`flex justify-between items-center pb-4 mb-4 text-gray-600 cursor-pointer ${selectedCategory === category ? "text-black font-bold" : ""
                                                }`}
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            <span>{category}</span>
                                            <FaAngleRight />
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Price Filter */}
                            <div className="border-b pb-4 mb-4">
                                <h1 className="text-xl font-bold flex-grow mb-2">Price</h1>
                                <input
                                    type="range"
                                    min="50"
                                    max="200"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-2 bg-black appearance-none rounded-full"
                                />
                                <style jsx>{`
    input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 24px;
      height: 24px;
      background: black;
      border: 2px solid white;
      border-radius: 50%;
      cursor: pointer;
    }

    input[type="range"]::-moz-range-thumb {
      width: 24px;
      height: 24px;
      background: black;
      border: 2px solid white;
      border-radius: 50%;
      cursor: pointer;
    }

    input[type="range"]::-ms-thumb {
      width: 24px;
      height: 24px;
      background: black;
      border: 2px solid white;
      border-radius: 50%;
      cursor: pointer;
    }
  `}</style>
                                <div className="flex justify-between text-black mt-2 text-md font-bold">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>

                            {/* Color Filter */}
                            <div className="border-b pb-4 mb-4">
                                <h1 className="text-xl font-bold flex-grow mb-2">Colors</h1>
                                <div className="flex gap-2">
                                    {["red-500", "blue-500", "yellow-500", "green-500", "purple-500"].map(
                                        (color) => (
                                            <span
                                                key={color}
                                                className={`w-6 h-6 bg-${color} rounded-full border cursor-pointer ${selectedColor === color ? "border-black" : ""
                                                    }`}
                                                onClick={() => setSelectedColor(color)}
                                            ></span>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Size Filter */}
                            <div className="border-b pb-4 mb-4">
                                <h1 className="text-xl font-bold flex-grow mb-2">Size</h1>
                                <div className="flex flex-wrap gap-3">
                                    {["S", "M", "L", "XL", "2XL"].map((size) => (
                                        <span
                                            key={size}
                                            className={`py-2 px-6 rounded-full border border-gray-300 text-gray-600 cursor-pointer ${selectedSize === size ? "bg-black text-white" : ""
                                                }`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Dress Style Filter */}
                            <div className="border-b pb-4 mb-4">
                                <h1 className="text-xl font-bold flex-grow mb-2">Dress Style</h1>
                                {["Casual", "Formal", "Party"].map((style) => (
                                    <div
                                        key={style}
                                        className={`flex items-center justify-between py-1 text-gray-600 cursor-pointer ${selectedDressStyle === style ? "text-black font-bold" : ""
                                            }`}
                                        onClick={() => setSelectedDressStyle(style)}
                                    >
                                        <span>{style}</span>
                                        <FaAngleRight />
                                    </div>
                                ))}
                            </div>

                            <button
                                className="mt-6 w-full py-2 bg-black text-white rounded-full"
                                onClick={applyFilters}
                            >
                                Apply Filter
                            </button>
                        </aside>



                        {/* Sidebar */}
                        {isOpen && (
                            <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex justify-end">
                                {/* Overlay */}
                                <div
                                    className="absolute inset-0"
                                    onClick={() => setIsOpen(false)}
                                ></div>

                                {/* Sidebar Content */}
                                <aside
                                    className={`w-full md:w-1/4 h-auto mt-20 bg-white rounded-t-3xl p-4 shadow-lg transform transition-transform ${isOpen ? "translate-y-0" : "translate-y-full"
                                        }`}
                                    style={{ maxHeight: "calc(100vh)", overflowY: "auto" }}
                                >
                                    {/* Close Button */}
                                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                                        <h1 className="text-xl font-bold flex-grow">Filters</h1>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="text-xl bg-[#F0F0F0] p-2 rounded-full"
                                        >
                                            <TbX />
                                        </button>
                                    </div>

                                    {/* Category Filter */}
                                    <div className="flex flex-col justify-between pb-4 mb-4">
                                        {["T-shirts", "Pant Court", "Jeans", "Three Piece", "Jackets"].map(
                                            (category) => (
                                                <div
                                                    key={category}
                                                    className={`flex justify-between items-center pb-4 mb-4 text-gray-600 cursor-pointer ${selectedCategory === category ? "text-black font-bold" : ""
                                                        }`}
                                                    onClick={() => setSelectedCategory(category)}
                                                >
                                                    <span>{category}</span>
                                                    <FaAngleRight />
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {/* Price Filter */}
                                    <div className="border-b pb-4 mb-4">
                                        <h1 className="text-xl font-bold flex-grow mb-2">Price</h1>
                                        <input
                                            type="range"
                                            min="50"
                                            max="200"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="w-full h-2 bg-black appearance-none rounded-full"
                                        />
                                        <style jsx>{`
    input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 24px;
      height: 24px;
      background: black;
      border: 2px solid white;
      border-radius: 50%;
      cursor: pointer;
    }

    input[type="range"]::-moz-range-thumb {
      width: 24px;
      height: 24px;
      background: black;
      border: 2px solid white;
      border-radius: 50%;
      cursor: pointer;
    }

    input[type="range"]::-ms-thumb {
      width: 24px;
      height: 24px;
      background: black;
      border: 2px solid white;
      border-radius: 50%;
      cursor: pointer;
    }
  `}</style>
                                        <div className="flex justify-between text-black mt-2 text-md font-bold">
                                            <span>${priceRange[0]}</span>
                                            <span>${priceRange[1]}</span>
                                        </div>
                                    </div>

                                    {/* Color Filter */}
                                    <div className="border-b pb-4 mb-4">
                                        <h1 className="text-xl font-bold flex-grow mb-2">Colors</h1>
                                        <div className="flex gap-2">
                                            {["red-500", "blue-500", "yellow-500", "green-500", "purple-500"].map(
                                                (color) => (
                                                    <span
                                                        key={color}
                                                        className={`w-6 h-6 bg-${color} rounded-full border cursor-pointer ${selectedColor === color ? "border-black" : ""
                                                            }`}
                                                        onClick={() => setSelectedColor(color)}
                                                    ></span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Size Filter */}
                                    <div className="border-b pb-4 mb-4">
                                        <h1 className="text-xl font-bold flex-grow mb-2">Size</h1>
                                        <div className="flex flex-wrap gap-3">
                                            {["S", "M", "L", "XL", "2XL"].map((size) => (
                                                <span
                                                    key={size}
                                                    className={`py-2 px-6 rounded-full border border-gray-300 text-gray-600 cursor-pointer ${selectedSize === size ? "bg-black text-white" : ""
                                                        }`}
                                                    onClick={() => setSelectedSize(size)}
                                                >
                                                    {size}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dress Style Filter */}
                                    <div className="border-b pb-4 mb-4">
                                        <h1 className="text-xl font-bold flex-grow mb-2">Dress Style</h1>
                                        {["Casual", "Formal", "Party"].map((style) => (
                                            <div
                                                key={style}
                                                className={`flex items-center justify-between py-1 text-gray-600 cursor-pointer ${selectedDressStyle === style ? "text-black font-bold" : ""
                                                    }`}
                                                onClick={() => setSelectedDressStyle(style)}
                                            >
                                                <span>{style}</span>
                                                <FaAngleRight />
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className="mt-6 w-full py-2 bg-black text-white rounded-full"
                                        onClick={() => {
                                            applyFilters();
                                            setIsOpen(false);
                                        }}
                                    >
                                        Apply Filter
                                    </button>

                                </aside>
                            </div>
                        )}


                        {/* <!-- Product Grid --> */}
                        <div className="w-full md:w-3/4">
                            {/* <!-- Header --> */}
                            <header className="flex justify-between items-center mb-8">
                                <h1 className="text-2xl font-semibold">Casual</h1>
                                <p className="text-gray-600 md:block hidden">Showing 1-10 of 100 Products • Sort by: <span className="font-medium">Most Popular</span></p>
                                <div className="md:hidden">
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className="text-4xl bg-[#F0F0F0] p-2 rounded-full"
                                    >
                                        <TbAdjustmentsDown className='text-4xl bg-[#F0F0F0] p-2 rounded-full' />
                                    </button>
                                </div>
                            </header>

                            {/* <!-- Product Card --> */}

                            <main className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-4">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <Link href={`/productDeatil/${product._id}`}
                                            key={product._id}
                                            className=""
                                        >
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="rounded-xl"
                                                width={400}
                                                height={400}
                                            />
                                            <h2 className="text-lg font-semibold text-gray-800 text-left">
                                                {product.name}
                                            </h2>
                                            <div className="flex items-center mt-2">
                                                <div className="flex text-yellow-500">
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <svg
                                                            key={index}
                                                            className={`sm:w-5 w-3 h-3 sm:h-5 ${index < product.rating ? "text-yellow-500" : "text-gray-300"
                                                                }`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.177 3.617a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.087 2.24a1 1 0 00-.364 1.118l1.177 3.617c.3.921-.755 1.688-1.539 1.118l-3.087-2.24a1 1 0 00-1.175 0l-3.087 2.24c-.783.57-1.838-.197-1.539-1.118l1.177-3.617a1 1 0 00-.364-1.118L2.049 9.044c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.177-3.617z"></path>
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-sm text-gray-600">{product.rating}/5</span>
                                            </div>
                                            <div className="flex items-center mt-4 flex-wrap w-full">
                                                <span className="text-lg font-semibold text-gray-800">
                                                    ${product.price}
                                                </span>
                                                {product.originalPrice && (
                                                    <>
                                                        <span className="mx-2 text-md text-gray-500 line-through">
                                                            ${product.originalPrice}
                                                        </span>
                                                        <span className=" rounded-full text-sm text-red-500 bg-[#FFE9E9] px-2 py-[2px]">
                                                            {Math.round(
                                                                ((product.originalPrice - product.price) /
                                                                    product.originalPrice) *
                                                                100
                                                            )}
                                                            %
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center text-gray-500">
                                        No products found
                                    </div>
                                )}
                            </main>
                        </div>

                    </div>
                </div>
            </div>


            {/* 
<!-- Add more product cards below --> */}


            {/* <!-- Pagination --> */}
            <div className="flex justify-center mt-8">
                <button className="px-4 py-2 mx-1 bg-gray-300 rounded">Previous</button>
                <button className="px-4 py-2 mx-1 bg-black text-white rounded">1</button>
                <button className="px-4 py-2 mx-1 bg-gray-300 rounded">2</button>
                <button className="px-4 py-2 mx-1 bg-gray-300 rounded">Next</button>
            </div>
        </div>


    )
}

export default page