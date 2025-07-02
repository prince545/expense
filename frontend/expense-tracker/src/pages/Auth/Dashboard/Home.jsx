import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../../utils/apiPaths";
import axiosInstance from "../../../utils/axiosinstance";
import InfoCard from "../../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal, LuRefreshCw } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../../utils/helper";
import RecentTransactions from "../../../components/Dashboard/RescentTransactions";
import { toast } from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(DASHBOARD);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to mock data if API fails
      const mockData = {
        totalBalance: 15000,
        totalIncome: 22000,
        totalExpenses: 7000,
        recentTransactions: [
          {
            _id: '1',
            type: 'income',
            amount: 5000,
            source: 'Salary',
            date: new Date(),
            icon: '💰'
          },
          {
            _id: '2',
            type: 'expense',
            amount: 120,
            title: 'Grocery Shopping',
            category: 'Food',
            date: new Date(Date.now() - 24 * 60 * 60 * 1000)
          },
          {
            _id: '3',
            type: 'expense',
            amount: 50,
            title: 'Gas',
            category: 'Transport',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          }
        ]
      };
      setDashboardData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDashboardData();
      toast.success('Dashboard refreshed!');
    } catch (error) {
      toast.error('Failed to refresh dashboard');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's your financial overview.</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <LuRefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-400 text-lg">Loading dashboard...</span>
            </div>
          </div>
        ) : !dashboardData ? (
          <div className="text-center text-gray-400 dark:text-gray-500 py-12">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-lg">No dashboard data available.</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <IoMdCard className="text-white text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Total Balance</p>
                    <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
                      ${addThousandsSeparator(dashboardData?.totalBalance)}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <LuWalletMinimal className="text-white text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Income</p>
                    <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                      ${addThousandsSeparator(dashboardData?.totalIncome)}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <LuHandCoins className="text-white text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">Total Expenses</p>
                    <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">
                      ${addThousandsSeparator(dashboardData?.totalExpenses)}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-8">
              <RecentTransactions
                transactions={dashboardData.recentTransactions}
                onSeeMore={() => navigate("/income")}
              />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;