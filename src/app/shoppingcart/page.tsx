"use client";

import React ,{ useState } from "react";
import { useCart } from "@/components/CartContext";
import { FaTrashCan, FaMinus, FaPlus } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";


const removeFromCart = (id: string | number) => {
  console.log("Removing item with ID:", id);
  // Your logic to remove item from cart
};

const CartPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  


  const { cartItems, removeFromCart } = useCart();
  console.log(cartItems)
  

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discount = 0.2; // 20% discount
  const deliveryFee = 15;


    const [quantity, setQuantity] = useState(1);
      // Handle quantity input change
      const handleQuantityChange = (event: { target: { value: string; }; }) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        } else {
            setQuantity(1); // Prevent negative or invalid inputs
        }
    };


  return (
    <div className="max-w-7xl mx-auto px-4 py-6 ">
  <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

  {cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <div className="flex flex-col lg:flex-row gap-14">
      {/* Cart Items Section */}
      <div className="flex-1 ">
        {cartItems.map((item) => (
          <div
          key={item._id}
          className="flex flex-wrap items-center py-3 border-b pb-4 mb-4 gap-4" // Added gap-4 for spacing
        >
          {/* Image Section */}
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={100}
            height={100}
            className="rounded-xl w-24 sm:w-[110px]"
          />
        
          {/* Item Details Section */}
          <div className="ml-4 flex-1 mt-4 sm:mt-0 relative">
            <h3 className="text-[16px] sm:text-lg font-semibold">{item.name}</h3>
            <p className="text-[12px] sm:text-md text-gray-500">Size: {item.size}</p>
            <p className="text-[12px] sm:text-md text-gray-500">Color: {item.color}</p>
            <span className="text-md sm:text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span>

          </div>
        
          {/* Actions Section */}
          <div className="flex flex-col gap-2 sm:gap-8 sm:items-end justify-center items-center">
            {/* Remove Button */}
            <button
  className="text-red-500 hover:text-red-700"
  onClick={() => item?._id && removeFromCart(item._id)}
>
  <FaTrashCan />
</button>;
        
            {/* Quantity Controls */}
            <div className="bg-gray-100 flex px-2 sm:px-4 items-center border border-gray-300 rounded-full w-[30%] sm:w-[40%] h-10">
              {/* Decrease Button */}
              <button
                className="w-12 h-full flex items-center justify-center text-gray-700 text-sm sm:text-md rounded-l-full"
                onClick={() => setQuantity(item.quantity > 1 ? item.quantity-- : 1)}
              >
                <FaMinus />
              </button>
        
              {/* Quantity Input */}
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={handleQuantityChange}
                className="w-full text-md sm:text-md bg-transparent text-center outline-none text-gray-800"
              />
        
              {/* Increase Button */}
              <button
                className="w-12 h-full flex items-center justify-center text-gray-700 text-sm sm:text-md rounded-r-full"
                onClick={() => setQuantity(item.quantity++)}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
        
        ))}
      </div>

      {/* Order Summary Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <div className="flex justify-between mb-4">
          <span>Subtotal</span>
          <span className="font-semibold">${calculateTotal()}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Discount (-20%)</span>
          <span className="text-red-500">
            -${(calculateTotal() * discount).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between mb-6">
          <span>Delivery Fee</span>
          <span>${deliveryFee}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>
            $
            {(
              calculateTotal() -
              calculateTotal() * discount +
              deliveryFee
            ).toFixed(2)}
          </span>
        </div>
        <Link href='/checkout'>
        <button className="w-full bg-black text-white px-6 py-3 rounded-md text-lg font-bold hover:bg-gray-800">
          Go to Checkout
        </button>
        </Link>
      </div>
    </div>
  )}


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-gray-700 mb-4">
              Your order is ready to proceed to checkout. Thank you for shopping with us!
            </p>
            <Link href='/'> <button
              className="w-full bg-black text-white px-4 py-2 rounded-md text-lg font-bold hover:bg-gray-800"
              onClick={closeModal}
            >
              Close
            </button> </Link>
          </div>
        </div>
      )}


</div>

  );
};

export default CartPage;
