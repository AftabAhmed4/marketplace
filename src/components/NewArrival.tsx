'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  imageUrl: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
}

const NewArrival: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const productFetch = async () => {
            const qwery =`*[_type == "product" ] | order(_createdAt desc) [0..3]{
  description,
  price,
  "imageUrl": image.asset->url,
  category,
  isNew,
  _id,
  name,
  discountPercent,
  colors,
  sizes
}
 `
            const productApi = await client.fetch(qwery);
   
            setProducts(productApi);
            // setFilteredProducts(productApi);
        };
        productFetch();
    }, []);

  if (loading) {
    <div className="flex justify-center items-center h-[90vh]">
    <div className="text-xl font-bold text-gray-800 lg:text-2xl">
<Link href="/" className="hover:text-gray-900">
SHOP.CO
</Link>
</div>
</div>
  }

  return (
    <div>

      <div className=" text-center font-black text-xl sm:text-4xl mt-10 pb-3">
        New Arrival
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 sm:px-16 py-4">

        {products.map((product) => (
          <Link href={`/productDeatil/${product._id}`}
            key={product.id}
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
                  <span className="mx-2 sm:mx-4 text-md text-gray-500 line-through">
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
        ))}
      </div>
      <div className="flex flex-col justify-center items-center py-6 ">
        <Link href='/store'> <button className="bg-white border-2 px-11 py-3 my-4 rounded-full hover:bg-slate-100 font-regular ">View All</button></Link>
        <div className="border-b border-slate-500 w-[70vw] flex justify-center items-center"></div>
      </div>


    </div>
  );
};

export default NewArrival;
