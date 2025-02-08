import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client"; // Import the client
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // ✅ Extract userId from the request body
    const { userId, form, customerEmail, cartItems, totalAmount, paymentMethod } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User not logged in" }, { status: 401 });
    }

    if (!form || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    // ✅ Create order object
    const order = {
      _type: "order",
      user: { _type: "reference", _ref: userId },
      products: cartItems.map((item: { product: { _id: any; }; quantity: any; }) => ({
        product: { _type: "reference", _ref: item.product._id },
        quantity: item.quantity,
      })),
      totalAmount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // ✅ Save the order to Sanity
    await client.create(order);

    return NextResponse.json({ message: "Order placed successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
