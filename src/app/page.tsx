import Image from "next/image";
import Hero from "../../public/hero.png"
import Hero2 from '../../public/mobile-hero.png'
import Asd from "../../public/Frame 60.png"

// compoments
import NewArrival from "@/components/NewArrival";
import TopSelling from "@/components/TopSelling"
import Review from "@/components/Reviw"
import Link from "next/link";



export default function Home() {
  return ( 
<div>


{/* // Start Hero Section */}
<div className="relative bg-gray-100">
  {/* Hero Image */}
  <div className="w-full h-full overflow-hidden">
    {/* Large Screen Image */}
    <Image
      src={Hero}
      alt="hero"
      className="hidden sm:block object-cover w-full h-[70vh] lg:h-[80vh]"
    />
    {/* Small Screen Image */}
    <Image
      src={Hero2}
      alt="hero"
      className="block sm:hidden object-cover w-full h-full"
    />


    {/* Text Section */}
    <div className="absolute top-[10%] sm:top-[15%] left-5 sm:left-10 lg:left-[5%] text-gray-800">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black">
        FIND CLOTHES
      </h1>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black">
        THAT MATCHES
      </h1>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black">
        YOUR STYLE
      </h1>
      <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg sm:w-[50%]">
        Browse through our diverse range of meticulously crafted garments, designed
        to bring out your individuality and cater to your sense of style.
      </p>
      <Link href='/store'> <button className="mt-6 bg-black text-white rounded-full px-6 py-2 sm:px-8 sm:py-3 lg:w-60 lg:h-12">
        SHOP NOW
      </button></Link>
    </div>
  </div>
</div>
{/* End Hero Section */}


  
{/* second  navbar start */}
<div className="bg-black  lg:p-4 text-white  ">
  <ul className="flex flex-wrap justify-center gap-4 sm:justify-between px-6 py-3 sm:py-2 p-4 sm:px-5 md:px-20 ">
    <li className="xl:text-2xl lg:text-xl font-bold">VERSACE</li>
    <li className =" xl:text-2xl lg:text-xl font-bold">ZARA</li>
    <li className =" xl:text-2xl lg:text-xl font-bold">GUCCI</li>
    <li className ="xl:text-2xl lg:text-xl font-bold">PARADA</li>
    <li className ="xl:text-2xl lg:text-xl font-bold">Calvinklein</li>
  </ul>

</div>


{/* NEW ARRIVAL */}
<div id="new-arrival">
<NewArrival/>
</div>


 {/* top selling start */}


 <div id="sale">
  <TopSelling/>
 </div>


 {/* img secton  start*/}
 <div id="Brand">
 <div className="flex justify-center mt-16 ">
 <Image src={Asd} alt="Ashirt" className="rounded xl:w-[1400px] lg:w-[900px]"  /> 
 </div>
 </div>
 {/* image section end */}

 {/* reweiew section */}
<Review/>
 {/* rewiwew end */}



</div >

  );
}
