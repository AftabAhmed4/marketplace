'use client'

import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown } from "react-icons/fa";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Image from "next/image";



const Navbar = () => {

  interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    dressType: string;
    color: string;
    sizes: string[];
    dressStyle: string;
    imageUrl: string;
    rating: number; // Optional field
    originalPrice: number; // Optional field
  }
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  const { cartItems } = useCart(); // Access cartItems from context
  const cartLength = cartItems.length; // Get the length of items in the cart

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
    useEffect(() => {
      if (searchQuery.trim() === "") {
        setFilteredProducts([]);
      } else {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    }, [searchQuery, products]);
    
  
    
  
    useEffect(() => {
      const productFetching = async () => {
        const query = `*[_type == "product"]{
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
        }`;
        const productApi = await client.fetch(query);
        setProducts(productApi);
        setFilteredProducts(productApi);
        // setLoading(false);
      };
      productFetching();
    }, []);

  return (
    <div>
      {/* <!-- Top Bar --> */}
      <div className=" bg-gray-900 text-white text-center px-5 sm:px-[30%] py-2 text-sm flex justify-between items-center">
        <div>
          Sign up and get 20% off your first order.{" "}
          <a href="#" className="underline hover:text-gray-300">
            Sign Up Now
          </a>
        </div>
        <div className="hidden sm:block">
          <ImCross />
        </div>
      </div>

      {/* <!-- Navigation Bar --> */}
      <nav className="bg-white shadow ">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Hamburger Menu */}
          <div className="flex gap-3">
          <button
            className="lg:hidden text-2xl text-gray-800 relative"
            onClick={toggleMenu}
          >
            {/* Hamburger Icon or X Icon with transition */}
            <div
              className={`transition-all duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
              style={{
                transformOrigin: 'center',
              }}
            >
              {isMenuOpen ? (
                <ImCross className="text-[18px]" /> // Show "X" when menu is open
              ) : (
                <GiHamburgerMenu /> // Show Hamburger when menu is closed
              )}
            </div>
          </button>

            {/* Logo */}
            <div className="text-xl font-bold text-gray-800 lg:text-2xl">
              <Link href="/" className="hover:text-gray-900">
                SHOP.CO
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex space-x-8 text-gray-600 font-medium items-center ">
            <li className="flex items-center gap-1">
              <Link href="/store">Shop </Link><FaAngleDown />
            </li>
            <li>
              <Link href="/#sale">OnSale</Link>
            </li>
            <li>
              <Link href="/#new-arrival">NewArrival</Link>
            </li>
            <li>
              <Link href="/#Brand">Brand</Link>
            </li>
          </ul>

          {/* Icons Section */}
          <div className="flex items-center space-x-4 z-50">
            {/* Search Input (Hidden on Small Screens) */}
            <div onClick={()=>setIsPanelOpen(true)} className="hidden lg:block relative w-[30vw]">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaSearch />
              </div>
              <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-full bg-[#F0F0F0] px-12 py-2 w-full focus:outline-none focus:ring focus:ring-gray-300"
              />
            </div>

            <button className="text-gray-600 hover:text-gray-900 text-2xl relative">
        <Link href="/shoppingcart">
          <FiShoppingCart />
        </Link>
        <div
          className={`bg-slate-900 text-center h-5 rounded-full text-white text-xs absolute -top-4 left-4 flex items-center justify-center ${
            cartLength > 9 ? 'w-6 px-1' : 'w-5'
          }`}
        >
          {cartLength}
        </div>
      </button>


            <Link href='/sign-up'> <button className="text-gray-600 hover:text-gray-900 text-2xl pl-4">
              <FaRegCircleUser />
            </button> </Link>
          </div>
        </div>

        {/* Dropdown Menu for Small Screens */}
        {isMenuOpen && (
  <>
    {/* Overlay background */}
    <div className="fixed top-44 left-0 w-full h-full bg-black bg-opacity-60 z-40" onClick={() => setIsMenuOpen(false)}></div>

    {/* Mobile menu */}
    <div className="lg:hidden bg-gray-100 shadow-md absolute w-full z-50">
      <ul className="flex flex-col text-gray-800 text-center py-2 space-y-2 font-medium">
        <li onClick={() => setIsMenuOpen(false)}>
          <Link href="/store" className="block py-4 border-b  hover:bg-gray-200">
            Shop
          </Link>
        </li>
        <li onClick={() => setIsMenuOpen(false)}>
          <Link href="/#sale" className="block py-4 border-b 2 hover:bg-gray-200">
            OnSale
          </Link>
        </li>
        <li onClick={() => setIsMenuOpen(false)}>
          <Link href="/#new-arrival" className="block py-4 border-b  hover:bg-gray-200">
            NewArrival
          </Link>
        </li>
        <li onClick={() => setIsMenuOpen(false)}>
          <Link href="/#Brand" className="block py-4  hover:bg-gray-200">
            Brand
          </Link>
          
        </li>
        <li>
        <div onClick={()=>setIsPanelOpen(true)} className=" lg:block relative w-[100vw] mt-10">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaSearch />
              </div>
              <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-full bg-[#F0F0F0] px-12 py-2 w-full focus:outline-none focus:ring focus:ring-gray-300"
              />
            </div>

        </li>
        
      </ul>

    </div>
  </>
)}

      </nav>

      
{/* Sliding Search Panel */}
<div
  className={`fixed inset-0 bg-black bg-opacity-50 z-50 top-0 ${
    isPanelOpen ? "block" : "hidden"
  }`}
  // onClick={() => setIsPanelOpen(false)}
>

<div
  className="overflow-y-auto absolute top-0 right-0 h-full w-[310px] md:w-[510px] bg-slate-100  rounded-4xl shadow-lg transform transition-transform duration-300 z-50">

<div className="flex justify-between items-center px-6 pt-11">
<div className="text-xl font-bold">Search</div>
<div className="text-xl cursor-pointer font-bold" onClick={()=>setIsPanelOpen(false)}>&times;</div>
</div>

  <div className="p-4 relative h-full flex flex-col ">


  <div className=" lg:block relative w-[100vw] mt-4">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaSearch />
              </div>
              <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-full bg-[#F0F0F0] px-12 py-2 w-[300px] md:w-[420px] focus:outline-none focus:ring focus:ring-gray-300"
              />
            </div>

    {/* Search Results */}
    <div className="mt-4 flex-grow ">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link href={`/productDeatil/${product._id}`} key={product._id}>
          <div
            className="flex items-center space-x-4 border-b border-gray-200 py-2"
            onClick={() => setIsPanelOpen(false)}
          >
            <Image
            width={100}
            height={100}
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
              loading="lazy" // Lazy loading for images
            />
            <div>
              <h4 className="text-sm font-medium">{product.name}</h4>
              <p className="text-gray-600 text-xs">${product.price}</p>
            </div>
          </div>
          </Link>
        ))
      ) : searchQuery.trim() ? (
        <p className="text-gray-600 text-left mt-5">No products found</p>
      ) : (
        <p className="text-gray-600 text-left mt-5">Start searching...</p>
      )}
    </div>
  </div>
  </div>

    </div>


    </div>
  );
};

export default Navbar;





