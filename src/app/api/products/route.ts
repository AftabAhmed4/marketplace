import { NextResponse } from 'next/server';



const products = [ /* Your products array */
  {
    id: 1,
    image: '/t-shirt-1.png',
    detailImage1 : '/t-shirt-1-detail-1.png',
    detailImage2 : '/t-shirt-1-detail-2.png',
    detailImage3 : '/t-shirt-1-detail-3.png',
    title: 'Retro Vibes Tee',
    description: 'Relive the charm of the past with the Retro Vibes Tee, a tribute to vintage style and nostalgia. With bold, retro-inspired prints and a relaxed fit, this t-shirt brings a touch of the 80s and 90s to your everyday look. Crafted from premium materials, it feels as good as it looks. Ideal for casual hangouts or themed parties, it pairs perfectly with denim shorts or high-waisted jeans. Celebrate the good old days in a tee that’s designed for modern comfort and timeless fashion.',
    price: 100,
    originalPrice: 120,
    rating: 4,
    category: 'top-selling',
    color: "red-500",
    sizes: ["S", "M", "L", "XL"], // Multiple sizes
    dressStyle: "Casual",
    dressType: 'T-shirts'
  },
  {
    id: 2,
    image: '/pant-court-1.png',
    detailImage1 : '/pant-court-1-detail-1.png',
    detailImage2 : '/pant-court-1-detail-2.png',
    detailImage3 : '/pant-court-1-detail-3.png',
    title: 'Elite Flex Pant Court',
    description: "Step up your style game with the Elite Flex Pant Court, a perfect blend of sophistication and versatility. Designed with a tailored fit and cropped length, it offers a contemporary twist on classic formal wear. Crafted from premium, stretchable fabric, these pants provide unmatched comfort and freedom of movement. Whether you're heading to the office, attending a social gathering, or enjoying a casual outing, the Elite Flex Pant Court adapts effortlessly to any occasion. Pair it with a crisp shirt for a polished look or a casual tee for relaxed vibes. Durable, breathable, and timeless, it’s the wardrobe essential you’ve been waiting for.",
    price: 120,
    originalPrice: 140,
    rating: 5,
    category: 'new-arrival',
    color: "Blue",
    sizes: ["S", "M", "L", "XL"], // Multiple sizes
    dressStyle: "Casual",
    dressType: 'Pant Court'
  },
  {
    id: 3,
    image: '/jackets-1.png',
    detailImage1 : '/jackets-1-detail-1.png',
    detailImage2 : '/jackets-1-detail-2.png',
    detailImage3 : '/jackets-1-detail-3.png',
    title: 'Arctic Shield Jacket',
    description: "Conquer the cold with the Arctic Shield Jacket, your ultimate companion for chilly days and adventurous nights. Designed with advanced thermal insulation, this jacket ensures you stay warm without compromising on style. Its water-resistant outer layer protects you from unexpected rain or snow, while the soft fleece-lined interior provides unmatched comfort. Featuring a sleek, modern design with multiple pockets, it’s as functional as it is fashionable. Perfect for outdoor adventures, commutes, or casual outings, the Arctic Shield Jacket keeps you cozy and confident in any weather. Stay ahead of the elements with a jacket built for performance and style.",
    price: 200,
    originalPrice: 220,
    rating: 4.5,
    category: 'top-selling',
    color: "blue-500",
    sizes: ["S", "M", "L", "XL"], // Multiple sizes
    dressStyle: "Casual",
    dressType: 'Jackets'
  },
  {
    id: 4,
    image: '/jeans-1.png',
    detailImage1 : '/jeans-1-detail-1.png',
    detailImage2 : '/jeans-1-detail-2.png',
    detailImage3 : '/jeans-1-detail-3.png',
    title: 'Denim Edge Jeans',
    description: "Elevate your everyday look with the Denim Edge Jeans, the perfect balance of comfort and style. Crafted from premium stretch denim, these jeans provide all-day wearability and a sleek fit that flatters every body type. The versatile design features classic five-pocket styling and subtle distressing for a modern edge. Whether you're dressing up with a blazer or keeping it casual with a tee, the Denim Edge Jeans adapt effortlessly to any occasion. Durable, breathable, and timeless, they’re a wardrobe staple for every season.",
    price: 250,
    originalPrice: 280,
    rating: 3.5,
    category: 'new-arrival',
    color: "blue-500",
    sizes: ["S", "M", "L", "XL"], // Multiple sizes
    dressStyle: "Casual",
    dressType: 'Jeans'
  },
  {
    id: 5,
    image: '/three-piece-1.png',
    detailImage1 : '/three-piece-1-detail-1.png',
    detailImage2 : '/three-piece-1-detail-2.png',
    detailImage3 : '/three-piece-1-detail-3.png',
    title: 'Elegance Three-Piece Suit',
    description: "Step into sophistication with the Regal Elegance Three-Piece Suit, a timeless ensemble for those who value class and refinement. This suit includes a tailored blazer, matching waistcoat, and perfectly fitted trousers, all crafted from high-quality fabric for a luxurious feel. Designed to enhance your silhouette, it’s ideal for formal events, weddings, or corporate meetings. The sleek design features fine detailing, including a notched lapel, button closures, and subtle stitching that exudes elegance. Pair it with a crisp shirt and tie to complete the look. With the Regal Elegance Suit, you’re ready to make a lasting impression.",
    price: 300,
    originalPrice: 330,
    rating: 4,
    category: 'all',
    color: "green-500",
    sizes: ["S", "M", "L", "XL"], // Multiple sizes
    dressStyle: "Casual",
    dressType: 'Three Piece'
  },
  {
    id: 6,
    image: '/t-shirt-1-detail-2.png',
    detailImage1 : '/t-shirt-1-detail-3.png',
    detailImage2 : '/t-shirt-1-detail-1.png',
    detailImage3 : '/t-shirt-1.png',
    title: 'Urban Edge Tee',
    description: "Stay effortlessly stylish with the Urban Edge Tee, your go-to choice for modern streetwear. Made with ultra-soft, breathable cotton, this t-shirt blends comfort and fashion for all-day wear. The minimalist design is perfect for pairing with jeans, joggers, or layered under a jacket. Available in versatile shades, it’s crafted to suit every occasion, from casual outings to relaxed evenings. With a tailored fit and reinforced stitching, this tee promises durability and timeless appeal. Elevate your wardrobe with a classic that never goes out of style.",
    price: 180,
    originalPrice: 220,
    rating: 3.5,
    category: 'new-arrival',
    color: "green-500",
    sizes: ["S", "M", "L", "XL"], // Multiple sizes
    dressStyle: "Casual",
    dressType: 'T-shirts'
  },
  {
    id: 7,
    image: '/image 9.png',
    detailImage1 : '/image 10.png',
    detailImage2 : '/product-shirt-2-2.webp',
    detailImage3 : '/product-shirt-2-3.webp',
    title: 'Classic Crest Shirt',
    description: "Redefine timeless style with the Classic Crest Shirt, a must-have for your wardrobe. Expertly tailored from premium, breathable fabric, this shirt offers unmatched comfort and durability. Its versatile design features a crisp collar, button-down front, and a subtle chest pocket, making it perfect for both formal and casual settings. Whether paired with trousers for a polished office look or jeans for a laid-back vibe, the Classic Crest Shirt adapts effortlessly to any occasion. Available in a range of colors and patterns, it’s the ultimate blend of sophistication and practicality.",
    price: 55,
    originalPrice: 60,
    rating: 4.5,
    category: 'top-selling',
    color: "yellow-500",
    sizes: ["S", "M", "L", "XL"], // Multiple sizes
    dressStyle: "formal",
    dressType: 'T-shirts'
  },
 ];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  let filteredProducts = products;

  if (category) {
    filteredProducts = products.filter(
      (product) => product.category === category || product.category === 'all'
    );
  }

  return NextResponse.json(filteredProducts);
}
