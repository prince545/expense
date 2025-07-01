import React from 'react';
import moment from 'moment';
import { addThousandsSeparator } from '../../utils/helper';

const TransactionInfoCard = ({ transaction }) => {
  const { type, amount, date, category, source, title, icon } = transaction;

  // Get appropriate icon and color based on transaction type
  const getTransactionIcon = () => {
    if (type === 'income') {
      return icon || '💰';
    }
    
    // Expense categories with icons
    const expenseIcons = {
      'Food': '🍕',
      'Transport': '🚗',
      'Utilities': '⚡',
      'Health': '🏥',
      'Entertainment': '🎬',
      'Other': '📦'
    };
    
    return expenseIcons[category] || '📦';
  };

  const getTransactionTitle = () => {
    if (type === 'income') {
      return source || 'Income';
    }
    return title || category || 'Expense';
  };

  const getTransactionSubtitle = () => {
    if (type === 'income') {
      return 'Income';
    }
    return category || 'Expense';
  };

  const getAmountColor = () => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  const getAmountPrefix = () => {
    return type === 'income' ? '+' : '-';
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="text-2xl">
          {getTransactionIcon()}
        </div>
        <div>
          <h4 className="font-medium text-gray-900 text-sm">
            {getTransactionTitle()}
          </h4>
          <p className="text-xs text-gray-500 capitalize">
            {getTransactionSubtitle()} • {moment(date).format('MMM DD, YYYY')}
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className={`font-semibold text-lg ${getAmountColor()}`}>
          {getAmountPrefix()}${addThousandsSeparator(amount)}
        </span>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
