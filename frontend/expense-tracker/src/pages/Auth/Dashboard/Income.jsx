import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { INCOME, INCOME_DOWNLOAD } from '../../../utils/apiPaths';
import axiosInstance from '../../../utils/axiosinstance';
import { addThousandsSeparator } from '../../../utils/helper';
import { toast } from 'react-hot-toast';
import { LuTrash2, LuDownload, LuPlus } from 'react-icons/lu';
import moment from 'moment';

const Income = () => {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    icon: '💰'
  });

  const incomeSources = [
    { value: 'Salary', label: '💰 Salary' },
    { value: 'Freelance', label: '💼 Freelance' },
    { value: 'Business', label: '🏢 Business' },
    { value: 'Investment', label: '📈 Investment' },
    { value: 'Gift', label: '🎁 Gift' },
    { value: 'Other', label: '📦 Other' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchIncomes();
  }, [navigate]);

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${INCOME}/get`);
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      toast.error('Failed to load incomes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`${INCOME}/add`, formData);
      toast.success('Income added successfully!');
      setFormData({
        source: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        icon: '💰'
      });
      setShowForm(false);
      fetchIncomes();
    } catch (error) {
      console.error('Error adding income:', error);
      toast.error('Failed to add income');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this income?')) {
      return;
    }
    try {
      await axiosInstance.delete(`${INCOME}/${id}`);
      toast.success('Income deleted successfully!');
      fetchIncomes();
    } catch (error) {
      console.error('Error deleting income:', error);
      toast.error('Failed to delete income');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(INCOME_DOWNLOAD, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Income data downloaded successfully!');
    } catch (error) {
      console.error('Error downloading income:', error);
      toast.error('Failed to download income data');
    }
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Income Management</h1>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <LuDownload size={18} />
              Download Excel
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LuPlus size={18} />
              Add Income
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Total Income</h2>
          <p className="text-2xl font-bold text-blue-600">${addThousandsSeparator(totalIncome)}</p>
        </div>

        {/* Add Income Form */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Add New Income</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source
                  </label>
                  <select
                    required
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select income source</option>
                    {incomeSources.map(source => (
                      <option key={source.value} value={source.value}>{source.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="💰"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Income
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Incomes List */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Recent Income</h3>
          </div>
          
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading incomes...</div>
          ) : incomes.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No income records found. Add your first income!</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {incomes.map((income) => (
                <div key={income._id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {income.icon || '💰'}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{income.source}</h4>
                      <p className="text-sm text-gray-500">
                        {moment(income.date).format('MMM DD, YYYY')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-green-600">
                      +${addThousandsSeparator(income.amount)}
                    </span>
                    <button
                      onClick={() => handleDelete(income._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete income"
                    >
                      <LuTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Income;