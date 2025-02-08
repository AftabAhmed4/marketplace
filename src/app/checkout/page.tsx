"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "@/components/CheckoutPage";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";


const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const { cartItems } = useCart(); // Access cart items
  const router = useRouter();

  // Form State
  const [form, setForm] = useState({
    fullName: "",
    city: "",
    address: "",
    phone: "",
    email: "",
  });

  // Payment Method State (Default: Direct Bank Transfer)
  const [paymentMethod, setPaymentMethod] = useState("bankTransfer");

  // Check if form is filled
  const isFormFilled = Object.values(form).every((value) => value.trim() !== "");

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discount = 0.2; // 20% discount
  const deliveryFee = 15;
  const totalAmount = subtotal - subtotal * discount + deliveryFee;

  function convertToSubcurrency(totalAmount: number, factor = 100) {
    return Math.round(totalAmount * factor);
  }

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);




  const paymentMode = paymentMethod === 'bankTransfer' ? 'Paid' : 'COD';




  // Handle Form Change
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");


  console.log("Cart Items:", cartItems);


  const getUserId = async () => {
    const res = await fetch("/api/get-user");
    const data = await res.json();
    return data.userId;
  };
  
  const handlePlaceOrder = async () => {
    if (!isFormFilled) {
      alert("Please fill all fields");
      console.log('form not fill')
      return;
      
    }
  
    setIsSubmitting(true);
    setError("");
  
    try {
      // Get userId from the API instead of Cookies.get()
      const userId = await getUserId();
  
      if (!userId) {
        alert("User not logged in");
        console.log('user not found')
        return;
      }

      console.log("Before sending order to Sanity");
      // Create the order object
      const orderId = uuidv4().slice(0,12);
      const order = {
        _type: "order",
        orderId: orderId,
        user: {
          _type: "reference",
          _ref: userId,
        },
        products: cartItems.map((item) => ({
          _key: uuidv4(), // Generate a unique key for each product
          productTitle: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        fullName: form.fullName,
        city: form.city,
        address: form.address,
        phone: form.phone,
        email: form.email,
        totalAmount,
        paymentMode: paymentMode,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      
      // Save the order to Sanity
      await client.create(order);
      console.log("Order created successfully:", order);
  
      // Redirect to the order confirmation page
      setIsModalOpen(true); // Show success modal
    } catch (err) {
      console.error("Sanity error:", err);
      alert("Sanity API error: ");
      console.log(err)
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div>
      <div className="flex justify-between flex-wrap px-4 sm:px-12 md:px-20 py-8 space-x-8">
        {/* Left Side - Billing Details */}
        <div className="w-full md:w-[45%] space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Billing Details</h1>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              name="phone"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-full md:w-[45%] p-6 rounded-md">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Product</h1>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Subtotal</h1>
          </div>

          {/* Product List from Cart */}
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <p className="text-sm font-medium text-gray-700">
                    {item.name} x {item.quantity}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">Rs. {item.price * item.quantity}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 font-bold py-3">No items in the cart</p>
            )}
          </div>

          {/* Subtotal and Total */}
          <div className="space-y-4 mt-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="font-semibold text-gray-700">Rs. {subtotal}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Discount</p>
              <p className="font-semibold text-gray-700">Rs. {(subtotal * discount).toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Delivery</p>
              <p className="font-semibold text-gray-700">Rs. {deliveryFee}</p>
            </div>

            <div className="flex justify-between py-2 border-b">
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-bold text-[#B88E2F] text-xl">Rs. {totalAmount}</p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mt-6">
  <h2 className="text-lg font-medium text-gray-800 mb-4">Payment Options</h2>
  <div className="space-y-4">
    <div className="flex items-center">
      <input
        type="radio"
        id="bankTransfer"
        name="payment"
        className="mr-2"
        checked={paymentMethod === "bankTransfer"}
        onChange={() => setPaymentMethod("bankTransfer")}
      />
      <label htmlFor="bankTransfer" className="text-sm text-gray-700">Debit - Credit Card</label>
    </div>
    <div className="flex items-center">
      <input
        type="radio"
        id="cod"
        name="payment"
        className="mr-2"
        checked={paymentMethod === "cod"}
        onChange={() => setPaymentMethod("cod")}
      />
      <label htmlFor="cod" className="text-sm text-gray-700">Cash on Delivery</label>
    </div>
  </div>
</div>


          {/* Show Stripe Payment Element Only for Bank Transfer */}
          {paymentMethod === "bankTransfer" && (
            <Elements stripe={stripePromise} options={{ mode: "payment", amount: convertToSubcurrency(totalAmount), currency: "usd" }}>
              <CheckoutPage amount={totalAmount} form={form} isFilled={isFormFilled}  />
              {/* <button
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Paying..." : `Pay $${totalAmount}`}
              </button> */}
            </Elements>
          )}

          {/* Place Order Button */}
          {paymentMethod === "cod" && (
            <div className="mt-6">
              <button
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-gray-700 mb-4">
              Your order has been placed. Thank you for shopping with us!
            </p>
            <Link href="/">
              <button
                className="w-full bg-black text-white px-4 py-2 rounded-md text-lg font-bold hover:bg-gray-800"
                onClick={closeModal}
              >
                Close
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;