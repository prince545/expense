import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>
        <button
          className="flex items-center text-blue-600 hover:underline"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="ml-1 text-base" />
        </button>
      </div>
      <ul className="space-y-3">
        {transactions.slice(0, 5).map((item, index) => (
          <li
            key={item.id || index}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="text-sm font-medium capitalize">{item.category || item.type}</p>
              <p className="text-xs text-gray-500">{moment(item.date).format("Do MMM YYYY")}</p>
            </div>
            <div
              className={`font-semibold ${
                item.type === "expense" ? "text-red-600" : "text-green-600"
              }`}
            >
              {item.type === "expense" ? "-" : "+"}${item.amount}
            </div>
          </li>
        ))}
        {transactions.length === 0 && (
          <li className="text-gray-400 text-sm">No transactions found.</li>
        )}
      </ul>
    </div>
  );
};

export default RecentTransactions;
