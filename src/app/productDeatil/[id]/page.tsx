'use client'
import { FaMinus, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Reviw from '@/components/Reviw';
import { useCart } from "@/components/CartContext";
import { client } from '@/sanity/lib/client';

// Define the type for `params`
interface PageProps {
    params: {
        id: string;
    };
}

const Page = ({ params }: PageProps) => {
    const [activeSection, setActiveSection] = useState('reviews'); // Default to 'reviews'


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsModalOpen(true); // Open modal when product is added
        setTimeout(() => {
            setIsModalOpen(false); // Auto-close modal after 2 seconds
        }, 2000);
    };




    const { addToCart } = useCart();

    const [selectedColor, setSelectedColor] = useState<string>(""); // Color
    const [selectedImage, setSelectedImage] = useState<string>(''); // State to hold the selected image
    const [activeImage, setActiveImage] = useState<string>(''); // State to track the active small image
    // Function to handle image click
    const handleImageClick = (image: string) => {
        setSelectedImage(image); // Update the large image when a small image is clicked
        setActiveImage(image); // Update the active state to highlight the selected small image
    };



    const [activeSize, setActiveSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<any>(null); // State to store the fetched product
    const [loading, setLoading] = useState(true); // State to track loading state
    const [error, setError] = useState<string | null>(null); // State for error messages

    const { id } = params;

    // Handle size selection
    const handleClick = (size: string) => {
        console.log(`Selected size: ${size}`); // Log the selected size
        setActiveSize(size); // Set the active size
    };

    // Handle quantity input change
    const handleQuantityChange = (event: { target: { value: string; }; }) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        } else {
            setQuantity(1); // Prevent negative or invalid inputs
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const query = `
                    *[_type == "product" && _id == '${id}'] [0]{
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
                `;
    
                const response = await client.fetch(query);
    
                // Check if the response is null or undefined
                if (!response) {
                    throw new Error("Product not found");
                }
    
                setProduct(response); // Set the fetched product data
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                console.error("Error fetching product:", err); // Log the error for debugging
                setError("Failed to load product");
                setLoading(false); // Set loading to false even if there's an error
            }
        };
    
        fetchProduct();
    }, [id]);
    
    

    if (loading) {
        return (
          <div className="flex justify-center items-center h-[90vh]">
                        <div className="text-xl font-bold text-gray-800 lg:text-2xl">
              <Link href="/" className="hover:text-gray-900">
                SHOP.CO
              </Link>
            </div>
          </div>
        );
      }

    // If error, show error message
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <nav className="text-sm">
                    <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
                    <span className="mx-2 text-gray-500">/</span>
                    <span className="text-black font-bold">shop</span>
                </nav>
            </div>

            {/* Product Detail Section */}
            <div className="px-4 md:px-20 py-4 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Images */}
                    <div className="space-y-4">
                        <div className="grid sm:flex gap-4 sm:flex-row-reverse">
                            {/* Large Image */}
                            <div>
                                <Image
                                    src={selectedImage || product.imageUrl} // Use the selected image for the main large image, default to product.image if selectedImage is null
                                    alt="Product Image"
                                    className="w-[full] h-[300px] sm:h-[500px] object-cover rounded-xl"
                                    width={550}
                                    height={1300}
                                />
                            </div>

                            {/* Small Images */}
                            <div className="flex sm:flex-col gap-2 sm:gap-4 flex-wrap">
                                {/* Small Image 1 (Main Image) */}
                                <Image
                                    src={product.imageUrl} // Default to product.image for the first small image
                                    alt="Product Image"
                                    className={`sm:w-[full] w-[85px] h-auto sm:h-auto object-cover rounded-md cursor-pointer ${activeImage === product.image ? 'border-2 border-black' : ''
                                        }`} // Add border for active image
                                    width={120}
                                    height={120}
                                    onClick={() => handleImageClick(product.imageUrl)} // Handle click to change large image
                                />

                                {/* Small Image 2 */}
                                <Image
                                    src={product.imageUrl}
                                    alt="Product Detail Image 1"
                                    className={`sm:w-[full] w-[85px] h-auto sm:h-auto object-cover rounded-md cursor-pointer ${activeImage === product.detailImage ? 'border-2 border-black' : ''
                                        }`} // Add border for active image
                                    width={120}
                                    height={120}
                                    onClick={() => handleImageClick(product.imageUrl)} // Handle click to change large image
                                />

                                {/* Small Image 3 */}
                                <Image
                                    src={product.imageUrl}
                                    alt="Product Detail Image 2"
                                    className={`sm:w-[full] w-[85px] h-auto sm:h-auto object-cover rounded-md cursor-pointer ${activeImage === product.detailImage2 ? 'border-2 border-black' : ''
                                        }`} // Add border for active image
                                    width={120}
                                    height={120}
                                    onClick={() => handleImageClick(product.imageUrl)} // Handle click to change large image
                                />

                                {/* Small Image 4 */}
                                <Image
                                    src={product.imageUrl}
                                    alt="Product Detail Image 3"
                                    className={`sm:w-[full] w-[85px] h-auto sm:h-auto object-cover rounded-md cursor-pointer ${activeImage === product.detailImage3 ? 'border-2 border-black' : ''
                                        }`} // Add border for active image
                                    width={120}
                                    height={120}
                                    onClick={() => handleImageClick(product.imageUrl)} // Handle click to change large image
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Product Details */}
                    <div className="space-y-6">
                        {/* Product Title and Price */}
                        <h1 className="text-3xl font-semibold">{product.name}</h1>
                        <h3 className="text-2xl font-bold text-black">{`$ ${product.price}.00`}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-500 text-xl">★★★★★</span>
                            <p className="text-sm text-gray-600">(10 customer reviews)</p>
                        </div>

                        {/* Product Description */}
                        <p className="text-lg text-gray-700">
                            {product.description}
                        </p>

                        {/* Size Options */}
                        {/* <div>
                            <h5 className="font-semibold text-lg">Size</h5>
                            <div className="flex flex-wrap gap-3 sm:gap-4 mt-2">
                                {product.sizes.map((size: string, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => handleClick(size)} // Handle click event
                                        className={`py-2 px-3 sm:px-5 font-medium rounded-full ${activeSize === size ? "bg-black text-white font-medium" : "bg-[#F0F0F0] text-[#3A3A3A]"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div> */}

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

                        {/* Action Buttons */}
                        <div className="gap-2 sm:gap-4 flex justify-center sm:justify-between items-center mt-6">
                            {/* Quantity Selector */}
                            <div className="bg-gray-100 flex px-2 sm:px-4 items-center border border-gray-300 rounded-full w-[30%] sm:w-[40%] h-12">
                                <button
                                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                    className="w-12 h-full flex items-center justify-center text-gray-700  text-sm sm:text-xl rounded-l-full"
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    min="1"
                                    onChange={handleQuantityChange}
                                    className="w-full  text-md sm:text-xl bg-transparent  text-center outline-none text-gray-800"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-full flex items-center justify-center text-gray-700  text-sm sm:text-xl rounded-r-full"
                                >
                                    <FaPlus />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                className="h-12 px-6 w-full sm:w-full text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-200"
                                onClick={() => {
                                    addToCart(product); // First action
                                    handleAddToCart(); // Second action
                                }}
                            >
                                Add to Cart
                            </button>


                            {/* Modal */}
                            {isModalOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                        <h3 className="text-lg font-bold mb-2">Success!</h3>
                                        <p>Your product has been added to the cart successfully.</p>
                                        <button
                                            className="mt-4 w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}





                        </div>


                    </div>
                </div>
            </div>

            <div className="py-8 border-t border-gray-300">
      {/* Headings */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6">
        <h2
          className={`font-semibold text-lg text-slate-500 cursor-pointer ${activeSection === 'reviews' ? 'text-slate-900' : ''}`}
          onClick={() => setActiveSection('reviews')}
        >
          Customer Reviews
        </h2>
        <h2
          className={`font-semibold text-lg text-slate-500 cursor-pointer ${activeSection === 'description' ? 'text-slate-900' : ''}`}
          onClick={() => setActiveSection('description')}
        >
          Product Description
        </h2>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        {activeSection === 'reviews' && <Reviw />} {/* Reviews Section */}
        {activeSection === 'description' && (
          <div className="text-gray-600">
            {/* Product Description Content */}
            <div className='px-4 sm:px-9'>
                <div className='text-center text-md'>{product.description}</div>
                <div className='flex flex-wrap justify-between items-center py-5'>
                    <div className='w-[30%] h-auto border-2 rounded-2xl p-1 sm:p-4'><Image src={product.imageUrl} alt='product-detail-image' width={500} height={500}></Image></div>
                    <div className='w-[30%] h-auto border-2 rounded-2xl p-1 sm:p-4'><Image src={product.detailImage1} alt='product-detail-image' width={500} height={500}></Image></div>
                    <div className='w-[30%] h-auto border-2 rounded-2xl p-1 sm:p-4'><Image src={product.detailImage3} alt='product-detail-image' width={500} height={500}></Image></div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>

    
        </div>
    );
};

export default Page;
