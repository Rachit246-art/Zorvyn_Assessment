/**
 * Mock API Service
 * Simulates a real REST API with network latency using Promises + setTimeout.
 * In a real app, these would be fetch() calls to a backend server.
 */

const BASE_DELAY = 400; // ms — simulate realistic network latency

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate GET /transactions
export const fetchTransactions = async () => {
  await delay(BASE_DELAY);
  const saved = localStorage.getItem('finance_transactions');
  if (!saved) throw new Error('No transactions found');
  return JSON.parse(saved);
};

// Simulate POST /transactions
export const createTransaction = async (transaction) => {
  await delay(BASE_DELAY);
  const existing = JSON.parse(localStorage.getItem('finance_transactions') || '[]');
  const newItem = { ...transaction, id: Date.now().toString(), createdAt: new Date().toISOString() };
  const updated = [newItem, ...existing];
  localStorage.setItem('finance_transactions', JSON.stringify(updated));
  return newItem;
};

// Simulate PUT /transactions/:id
export const updateTransaction = async (transaction) => {
  await delay(BASE_DELAY);
  const existing = JSON.parse(localStorage.getItem('finance_transactions') || '[]');
  const updated = existing.map((t) => (t.id === transaction.id ? { ...transaction, updatedAt: new Date().toISOString() } : t));
  localStorage.setItem('finance_transactions', JSON.stringify(updated));
  return transaction;
};

// Simulate DELETE /transactions/:id
export const deleteTransactionApi = async (id) => {
  await delay(BASE_DELAY);
  const existing = JSON.parse(localStorage.getItem('finance_transactions') || '[]');
  const updated = existing.filter((t) => t.id !== id);
  localStorage.setItem('finance_transactions', JSON.stringify(updated));
  return { success: true, id };
};

// Simulate GET /summary — returns aggregated stats
export const fetchSummary = async () => {
  await delay(BASE_DELAY / 2);
  const transactions = JSON.parse(localStorage.getItem('finance_transactions') || '[]');
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
  return { income, expenses, balance: income - expenses, count: transactions.length };
};
