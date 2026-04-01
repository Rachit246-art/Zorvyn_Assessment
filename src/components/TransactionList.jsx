import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import TransactionModal from './TransactionModal';

const TransactionList = () => {
  const { transactions, role, filters, setFilters, resetFilters, deleteTransaction, exportData } = useFinance();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const categories = ['all', 'Salary', 'Food', 'Utilities', 'Freelance', 'Transport', 'Shopping', 'Investment', 'Entertainment'];

  const handleEdit = (item) => { setEditingItem(item); setModalOpen(true); };
  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) deleteTransaction(id);
  };

  return (
    <div className="win-window" style={{ marginBottom: '6px' }}>
      {/* Title bar */}
      <div className="win-titlebar">
        <div className="win-titlebar-left">
          <span>🗃</span>
          <span>Recent Transactions — {transactions.length} records</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <span className="win-titlebar-btn">_</span>
          <span className="win-titlebar-btn">□</span>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{
        background: 'var(--win-face)',
        borderBottom: '1px solid var(--win-shadow)',
        padding: '4px 6px',
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        {role === 'admin' && (
          <button className="win-btn primary" onClick={() => { setEditingItem(null); setModalOpen(true); }}>
            ➕ New Transaction
          </button>
        )}
        <button className="win-btn" onClick={() => exportData('csv')}>📄 Export CSV</button>
        <button className="win-btn" onClick={() => exportData('json')}>📋 Export JSON</button>
        <div style={{ width: '1px', height: '20px', background: 'var(--win-shadow)', margin: '0 2px' }} />
        <button className="win-btn" onClick={resetFilters}>↺ Reset Filters</button>
      </div>

      {/* Filter bar */}
      <div style={{
        background: 'var(--win-face)',
        borderBottom: '1px solid var(--win-shadow)',
        padding: '4px 6px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: '11px',
      }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <label className="win-label" style={{ marginBottom: 0 }}>🔍 Search:</label>
          <input
            type="text"
            className="win-input"
            style={{ width: '160px' }}
            placeholder="Search note or category…"
            value={filters.search}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        {/* Category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <label className="win-label" style={{ marginBottom: 0 }}>Category:</label>
          <select className="win-input" value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}>
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
          </select>
        </div>

        {/* Type */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <label className="win-label" style={{ marginBottom: 0 }}>Type:</label>
          <select className="win-input" value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <label className="win-label" style={{ marginBottom: 0 }}>Sort:</label>
          <select className="win-input" value={filters.sortBy} onChange={e => setFilters({ ...filters, sortBy: e.target.value })}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Table area */}
      <div style={{ background: 'var(--win-window-bg)', overflowX: 'auto' }}>
        {transactions.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', fontSize: '11px', color: '#555' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>No transactions found</div>
            <div>Try adjusting your search or filters.</div>
            <button className="win-btn" style={{ marginTop: '12px' }} onClick={resetFilters}>Clear All Filters</button>
          </div>
        ) : (
          <table className="win-table transaction-table" style={{ minWidth: '700px' }}>
            <thead>
              <tr>
                <th style={{ width: '16px' }}></th>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                {role === 'admin' && <th style={{ width: '70px', textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, idx) => (
                <tr key={item.id} className="transaction-row">
                  <td style={{ textAlign: 'center', padding: '2px 4px' }}>
                    {item.type === 'income' ? '📥' : '📤'}
                  </td>
                  <td className="date-cell">{new Date(item.date).toLocaleDateString()}</td>
                  <td>
                    <span style={{
                      background: 'var(--win-face)',
                      border: '1px solid var(--win-shadow)',
                      padding: '1px 6px',
                      fontSize: '10px',
                    }}>{item.category}</span>
                  </td>
                  <td style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.note}</td>
                  <td style={{
                    textAlign: 'right',
                    fontFamily: 'Courier New, monospace',
                    fontWeight: 'bold',
                    color: item.type === 'income' ? 'var(--win-green)' : 'var(--win-red)',
                  }}>
                    {item.type === 'income' ? '+' : '-'}${Number(item.amount).toFixed(2)}
                  </td>
                  {role === 'admin' && (
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="win-btn"
                        style={{ minWidth: 'unset', padding: '1px 6px', fontSize: '10px', marginRight: '2px' }}
                        onClick={() => handleEdit(item)}
                      >✏</button>
                      <button
                        className="win-btn"
                        style={{ minWidth: 'unset', padding: '1px 6px', fontSize: '10px', color: '#800000' }}
                        onClick={() => handleDelete(item.id)}
                      >🗑</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Status bar */}
      <div className="win-statusbar">
        <span className="win-statusbar-panel">{transactions.length} object(s)</span>
        {filters.search && <span className="win-statusbar-panel">Filtered by: &quot;{filters.search}&quot;</span>}
        {filters.category !== 'all' && <span className="win-statusbar-panel">Category: {filters.category}</span>}
        {filters.type !== 'all' && <span className="win-statusbar-panel">Type: {filters.type}</span>}
      </div>

      {modalOpen && (
        <TransactionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editItem={editingItem} />
      )}
    </div>
  );
};

export default TransactionList;
