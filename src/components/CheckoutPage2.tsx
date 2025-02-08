// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import Link from "next/link";




// const CheckoutPage = ({
//     amount,
//     form,
//     isFilled,
//   }: { 
//     amount: number;
//     form: { 
//       fullName: string;
//       city: string;
//       address: string;
//       phone: string;
//       email: string;
//     };
//     isFilled: boolean;
//   }) => {

    






//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState<string>();
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);



//   function convertToSubcurrency(totalAmount: number, factor = 100) {
//     return Math.round(totalAmount * factor);
//   }



//   useEffect(() => {
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, [amount]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error: submitError } = await elements.submit();

//     if (submitError) {
//       setErrorMessage(submitError.message);
//       setLoading(false);
//       return;
//     }

//     const { error } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: `http://www.localhost:3000/success?amount=${amount}`,
//       },
//     });

//     if (error) {
//       // This point is only reached if there's an immediate error when
//       // confirming the payment. Show the error to your customer (for example, payment details incomplete)
//       setErrorMessage(error.message);
//     } else {
//       // The payment UI automatically closes with a success animation.
//       // Your customer is redirected to your `return_url`.
//     }

//     setLoading(false);
//   };

//   if (!clientSecret || !stripe || !elements) {
//     return (
//       <div className="flex items-center justify-center">
//         <div
//           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
//           role="status"
//         >
//           <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }













  
//   return (
// <div>


//     <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
//       {clientSecret && <PaymentElement />}

//       {errorMessage && <div>{errorMessage}</div>}

//       <button
//         disabled={!stripe || loading}
//         className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse" onClick={()=>{ if(!isFilled) alert('Please Fill All Fields') }}
//        >
//         {!loading ? `Pay $${amount}` : "Processing..."}
//       </button>
//     </form>



//     </div>
//   );
// };

// export default CheckoutPage;




































"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useCart } from "./CartContext";
import { client } from "@/sanity/lib/client";




const CheckoutPage = ({
  amount,
    form,
    isFilled,
    // paymentMode
  }: { 
    amount: number;
    form: { 
      fullName: string;
      city: string;
      address: string;
      phone: string;
      email: string;
    };
    isFilled: boolean;
    // paymentMode:string
  }) => {

    






  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);



  function convertToSubcurrency(amount: number, factor = 100) {
    return Math.round(amount * factor);
  }



  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/success?amount=${amount}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }











  const { cartItems } = useCart(); // Access cart items
  const getUserId = async () => {
    const res = await fetch("/api/get-user");
    const data = await res.json();
    return data.userId;
  };



  const handlePlaceOrder = async () => {
    if (!isFilled) {
      alert("Please fill all fields");
      console.log('form not fill')
      return;
      
    }
  
   
  
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
        amount,
        // paymentMode: paymentMode,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      
      // Save the order to Sanity
      await client.create(order);
      console.log("Order created successfully:", order);
  
      // Redirect to the order confirmation page
      
    } catch (err) {
      console.error("Sanity error:", err);
      alert("Sanity API error: ");
      console.log(err)
    } finally {
     
    }
  };


  
  return (
<div>


    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse" 
        // onClick={handlePlaceOrder}
       >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>



    </div>
  );
};

export default CheckoutPage;