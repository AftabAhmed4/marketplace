'use client'

import Link from 'next/link';
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleFormSubmit = (event:any) => {
    event.preventDefault();
    
    // Get form values
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Simple validation
    if (!name || !email || !password) {
      setModalMessage('All fields are required!');
      setModalVisible(true);
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setModalMessage('Please enter a valid email address.');
      setModalVisible(true);
      return;
    }

    // If form is valid, show success message
    setModalMessage('Account created successfully!');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
          </div>
        </div>

        <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <div className="relative flex items-center">
                <input name="name" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter name" />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <div className="relative flex items-center">
                <input name="email" type="email" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input name="password" type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />
              </div>
            </div>

            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                I accept the <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
              </label>
            </div>
          </div>

          <div className="!mt-12">
            <button type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
              Create an account
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link href='/log-in' className="text-blue-600 font-semibold hover:underline ml-1">Login here</Link></p>
        </form>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <p className="text-gray-800 text-lg">{modalMessage}</p>
            <div className="flex justify-end mt-4">
              <Link href='/'> <button onClick={closeModal} className="text-blue-600 font-semibold">Close</button></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
