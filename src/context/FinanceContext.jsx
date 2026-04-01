import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { createTransaction, updateTransaction, deleteTransactionApi } from '../services/mockApi';

const FinanceContext = createContext();

const INITIAL_TRANSACTIONS = [
  { id: '1', date: '2026-03-28', amount: 1200, category: 'Salary', type: 'income', note: 'Monthly Salary' },
  { id: '2', date: '2026-03-29', amount: 45.5, category: 'Food', type: 'expense', note: 'Dinner at Italian Place' },
  { id: '3', date: '2026-03-30', amount: 120, category: 'Utilities', type: 'expense', note: 'Electricity Bill' },
  { id: '4', date: '2026-03-31', amount: 200, category: 'Freelance', type: 'income', note: 'Logo Design Project' },
  { id: '5', date: '2026-04-01', amount: 15, category: 'Transport', type: 'expense', note: 'Uber Ride' },
  { id: '6', date: '2026-03-25', amount: 80, category: 'Shopping', type: 'expense', note: 'New T-Shirt' },
  { id: '7', date: '2026-03-20', amount: 250, category: 'Investment', type: 'income', note: 'Stock Dividends' },
  { id: '8', date: '2026-03-15', amount: 95, category: 'Entertainment', type: 'expense', note: 'Movie & Snacks' },
];

export const FinanceProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem('finance_role') || 'admin');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    type: 'all',
    sortBy: 'date-desc',
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('finance_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Derived state: Summary stats
  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  // Derived state: Filtered transactions
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => 
        t.category.toLowerCase().includes(q) || 
        t.note.toLowerCase().includes(q)
      );
    }

    if (filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }

    if (filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type);
    }

    // Sort
    result.sort((a, b) => {
      if (filters.sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (filters.sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (filters.sortBy === 'amount-desc') return b.amount - a.amount;
      if (filters.sortBy === 'amount-asc') return a.amount - b.amount;
      return 0;
    });

    return result;
  }, [transactions, filters]);

  // Insights
  const insights = useMemo(() => {
    const categories = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
    });
    
    const highestSpendingCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0] || ['None', 0];
    
    // Monthly comparison (Current vs Previous)
    const now = new Date();
    const currentMonthInterval = { start: startOfMonth(now), end: endOfMonth(now) };
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthInterval = { start: startOfMonth(prevMonth), end: endOfMonth(prevMonth) };

    const currentMonthSpend = transactions
      .filter(t => t.type === 'expense' && isWithinInterval(new Date(t.date), currentMonthInterval))
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const prevMonthSpend = transactions
      .filter(t => t.type === 'expense' && isWithinInterval(new Date(t.date), prevMonthInterval))
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      highestSpendingCategory: highestSpendingCategory[0],
      highestSpendingAmount: highestSpendingCategory[1],
      currentMonthSpend,
      prevMonthSpend,
      spendingTrend: prevMonthSpend === 0 ? 0 : ((currentMonthSpend - prevMonthSpend) / prevMonthSpend) * 100
    };
  }, [transactions]);

  // Actions — all go through the Mock API (async, with loading state)
  const addTransaction = async (t) => {
    if (role !== 'admin') return;
    setLoading(true);
    try {
      const newItem = await createTransaction(t);
      setTransactions(prev => [newItem, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    if (role !== 'admin') return;
    setLoading(true);
    try {
      await deleteTransactionApi(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } finally {
      setLoading(false);
    }
  };

  const editTransaction = async (updated) => {
    if (role !== 'admin') return;
    setLoading(true);
    try {
      const saved = await updateTransaction(updated);
      setTransactions(prev => prev.map(t => t.id === saved.id ? saved : t));
    } finally {
      setLoading(false);
    }
  };

  const exportData = (format) => {
    let blob;
    let extension = format;

    if (format === 'json') {
      const data = JSON.stringify(transactions, null, 2);
      blob = new Blob([data], { type: 'application/json' });
    } else if (format === 'csv') {
      const headers = ['Date', 'Category', 'Note', 'Amount', 'Type'];
      const rows = transactions.map(t => [
        t.date,
        t.category,
        t.note.replace(/,/g, ''), // Basic CSV sanitization
        t.amount,
        t.type
      ]);
      const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
      blob = new Blob([csvContent], { type: 'text/csv' });
    }

    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-${new Date().toISOString().slice(0, 10)}.${extension}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      type: 'all',
      sortBy: 'date-desc',
    });
  };

  return (
    <FinanceContext.Provider value={{
      role, setRole,
      loading,
      transactions: filteredTransactions,
      allTransactions: transactions,
      stats,
      filters, setFilters, resetFilters,
      insights,
      addTransaction,
      deleteTransaction,
      editTransaction,
      exportData
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
