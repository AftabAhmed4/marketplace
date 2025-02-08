"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client"; // Import Sanity client

const UserProfile = () => {

interface Users{
  name: string;
  email: string;
  _createdAt: any;
}
interface Product{
  _id: string;
  createdAt:number;
  totalAmount: number;
  status:string;
}



  const router = useRouter();
  const [user, setUser] = useState<Users>(); // State to store user data
  const [orders, setOrders] = useState<Product[]>([]); // State to store user orders
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(""); // State to handle errors

  // Fetch user data and orders from Sanity
  useEffect(() => {
    const fetchUserData = async () => {
      const getUserId = async () => {
        const res = await fetch("/api/get-user");
        const data = await res.json();
        return data.userId;
      };

      const userId = await getUserId();

      if (!userId) {
        router.push("/log-in"); // Redirect to login if userId is not found
        return;
      }

      try {
        // Fetch user data from Sanity
        const userData = await client.fetch(
          `*[_type == "user" && _id == $userId][0]`,
          { userId }
        );

        if (!userData) {
          setError("User not found");
          return;
        }

        setUser(userData);

        // Fetch orders for the user
        const userOrders = await client.fetch(
          `*[_type == "order" && user._ref == $userId] | order(createdAt desc)`,
          { userId }
        );

        setOrders(userOrders);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Handle logout
  const handleLogout = () => {
    const getUserId = async () => {
      const res = await fetch("/api/remove-user");
      const data = await res.json();
      return data.userId;
    };
    getUserId()
    router.push("/log-in"); // Redirect to login page
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* User Information Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <p className="text-lg font-medium text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <p className="text-lg font-medium text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Member Since</label>
              <p className="text-lg font-medium text-gray-900">
                {new Date(user?._createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order:Product) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{order._id.slice(-6)} {/* Display last 6 characters of order ID */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Change Password</label>
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Update Email</label>
              <input
                type="email"
                placeholder="New Email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;