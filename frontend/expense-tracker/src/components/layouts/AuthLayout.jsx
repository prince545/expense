

import React from 'react';
import { LuPiggyBank } from 'react-icons/lu'; // Financial icon
import Image from '../../assets/images/image2.jpg'; // Your dashboard image

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Auth Content */}
      <div className="w-full md:w-[55vw] px-6 md:px-16 py-12 flex flex-col">
        <div className="mb-8 flex items-center gap-3">
          <LuPiggyBank className="text-3xl text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">ExpenseTracker</h2>
        </div>
        
        <div className="flex-grow flex items-center">
          <div className="w-full max-w-md">
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Financial Clarity Awaits
              </h1>
              <p className="text-gray-600">
                Take control of your spending with our intuitive tools
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Demo */}
      <div className="hidden md:flex w-[45vw] bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
        {/* Dashboard Preview */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <img 
            src={Image} 
            alt="Dashboard preview" 
            className="rounded-xl shadow-2xl border-8 border-white transform rotate-1"
          />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mt-16 -mr-16"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-200 rounded-full -mb-24 -ml-24"></div>
      </div>
    </div>
  );
};

export default AuthLayout;