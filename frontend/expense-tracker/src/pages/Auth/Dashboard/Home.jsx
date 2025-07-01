 import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../../utils/apiPaths";
import axiosInstance from "../../../utils/axiosinstance";
import InfoCard from "../../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../../utils/helper";
import RecentTransactions from "../../../components/Dashboard/RescentTransactions";
const Home = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Simulate loading and set mock data
    setTimeout(() => {
      const mockData = {
        totalBalance: 15000,
        totalIncome: 22000,
        totalExpenses: 7000,
      };
      setDashboardData(mockData);
      setLoading(false);
    }, 1000);
  }, [navigate]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-gray-500 text-lg">Loading...</span>
          </div>
        ) : !dashboardData ? (
          <div className="text-center text-gray-400">No dashboard data available.</div>
        ) : (
  <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-green-100 border-l-4 border-green-500 p-5 rounded-lg shadow-md flex items-center gap-4">
        <div className="text-green-600 text-3xl">
          <IoMdCard />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Balance</p>
          <h2 className="text-xl font-bold text-green-800">
            ${addThousandsSeparator(dashboardData?.totalBalance)}
          </h2>
        </div>
      </div>

      <div className="bg-blue-100 border-l-4 border-blue-500 p-5 rounded-lg shadow-md flex items-center gap-4">
        <div className="text-blue-600 text-3xl">
          <LuWalletMinimal />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Income</p>
          <h2 className="text-xl font-bold text-blue-800">
            ${addThousandsSeparator(dashboardData?.totalIncome)}
          </h2>
        </div>
      </div>

      <div className="bg-red-100 border-l-4 border-red-500 p-5 rounded-lg shadow-md flex items-center gap-4">
        <div className="text-red-600 text-3xl">
          <LuHandCoins />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Expenses</p>
          <h2 className="text-xl font-bold text-red-800">
            ${addThousandsSeparator(dashboardData?.totalExpenses)}
          </h2>
        </div>
      </div>
    </div>
    {/* Recent Transactions */}
    <div className="mt-8">
      <RecentTransactions
        transactions={dashboardData.recentTransactions}
        onSeeMore={() => navigate("/expense")}
      />
    </div>
  </>
)}
      </div>
      
    </DashboardLayout>
  );
};

export default Home;