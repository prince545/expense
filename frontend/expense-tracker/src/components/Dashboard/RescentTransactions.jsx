import React, { useState } from "react";
import { LuArrowRight, LuChevronDown } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSeeMore = (type) => {
    setShowDropdown(false);
    if (type === 'income') {
      window.location.href = '/income';
    } else if (type === 'expense') {
      window.location.href = '/expense';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-xl font-semibold text-gray-800">Recent Transactions</h5>
        <div className="relative">
          <button
            className="flex items-center text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            See All <LuChevronDown className="ml-1 text-base" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => handleSeeMore('income')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                View All Income
              </button>
              <button
                onClick={() => handleSeeMore('expense')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
              >
                View All Expenses
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((transaction, index) => (
            <TransactionInfoCard 
              key={transaction._id || index} 
              transaction={transaction} 
            />
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <p className="text-gray-500 text-sm mb-2">No transactions yet</p>
            <p className="text-gray-400 text-xs">
              Start by adding some income or expenses to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
