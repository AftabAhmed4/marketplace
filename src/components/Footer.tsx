import React from 'react'
import Image from 'next/image'
import Icon from "../../public/Frame 53.png"
import Facebook from "../../public/Social.png"
const Footer = () => {
  return (
    <div>


{/* <!-- Newsletter Section --> */}
  <div className="bg-black text-white flex-wrap py-10 px-10 mx-4 sm:mx-20 rounded-xl relative top-20 sm:top-20">
    <div className="container mx-auto text-center md:text-left md:flex flex-wrap justify-between items-center">
      <h2 className="text-2xl font-bold mb-4 md:mb-0">STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
      <div className=" items-center gap-2 flex flex-col">
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full md:w-72 px-4 py-2 rounded-full focus:outline-none"
        />
        <button className="bg-white text-black w-full px-1 sm:px-4 py-2 rounded-full font-semibold">
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  </div>


  <div className="bg-gray-200 xl:py-10 lg:py-7 py-7 px-6 ">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-20">
      {/* <!-- Logo and Description --> */}
      <div>
        <h3 className="text-xl font-bold mb-4">SHOP.CO</h3>
        <p className="text-gray-600 ">
          We have clothes that suit your style and what you&apos;re proud to wear. From women to men.
        </p>
        <div className="flex space-x-4 mt-4 ">


        <Image src={Facebook} alt="Ashirt" className="rounded-xl  " /> 


        </div>
      </div>

      {/* <!-- Links Section --> */}
      <div>
        <h4 className="text-lg font-semibold mb-4">COMPANY</h4>
        <ul className="space-y-2 text-gray-600">
          <li><a href="#" className="hover:text-black">About</a></li>
          <li><a href="#" className="hover:text-black">Features</a></li>
          <li><a href="#" className="hover:text-black">Works</a></li>
          <li><a href="#" className="hover:text-black">Career</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">HELP</h4>
        <ul className="space-y-2 text-gray-600">
          <li><a href="#" className="hover:text-black">Customer Support</a></li>
          <li><a href="#" className="hover:text-black">Delivery Details</a></li>
          <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">FAQ</h4>
        <ul className="space-y-2 text-gray-600">
          <li><a href="#" className="hover:text-black">Account</a></li>
          <li><a href="#" className="hover:text-black">Manage Deliveries</a></li>
          <li><a href="#" className="hover:text-black">Orders</a></li>
          <li><a href="#" className="hover:text-black">Payments</a></li>
        </ul>
      </div>
    </div>

    {/* <!-- Bottom Section --> */}
    <div className="mt-8 border-t pt-6 text-center md:flex md:justify-between text-gray-600">
      <p className=' px-10'>Shop.co © 2000-2023, All Rights Reserved</p>
      <div className="flex justify-center space-x-4 mt-4 md:mt-0">


      <Image src={Icon} alt="Ashirt" className="rounded-xl mr-10 " /> 


      </div>
    </div>
  </div>


    </div>
  )
}

export default Footer