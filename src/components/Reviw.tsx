import React from 'react'

const Reviw = () => {
  return (
    <div>
        <div className=" text-center font-black text-4xl mt-10">
        OUR HAPPAY CUSTOMER
        </div>

      
  <div className="container xL:py-10 lg:py-6 lg:px-10 px-4">
    <h1 className="text-3xl font-bold text-center mb-8"> </h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* <!-- Testimonial 1 --> */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-lg font-semibold mr-2">★★★★★</span>
          <span className="text-green-500 text-sm font-semibold">Verified</span>
        </div>
        <p className="text-gray-800 font-medium">Sarah M.</p>
        <p className="text-gray-600 mt-2">
          Im blown away by the quality and style of the clothes I received from Shopza. From casual wear to elegant dresses, every piece Ive bought has exceeded my expectations.
        </p>
      </div>
      {/* <!-- Testimonial 2 --> */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-lg font-semibold mr-2">★★★★★</span>
          <span className="text-green-500 text-sm font-semibold">Verified</span>
        </div>
        <p className="text-gray-800 font-medium">Alex K.</p>
        <p className="text-gray-600 mt-2">
        Im blown away by the quality and style of the clothes I received from Shopza. From casual wear to elegant dresses, every piece Ive bought has exceeded my expectations.
        </p>
      </div>
      {/* <!-- Testimonial 3 --> */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-lg font-semibold mr-2">★★★★★</span>
          <span className="text-green-500 text-sm font-semibold">Verified</span>
        </div>
        <p className="text-gray-800 font-medium">James L.</p>
        <p className="text-gray-600 mt-2">
        Im blown away by the quality and style of the clothes I received from Shopza. From casual wear to elegant dresses, every piece Ive bought has exceeded my expectations.
        </p>
      </div>
    </div>
  </div>
        
    </div>
  )
}

export default Reviw