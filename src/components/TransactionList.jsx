import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  ArrowUpCircle, 
  ArrowDownCircle,
  ChevronDown,
  Download
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import TransactionModal from './TransactionModal';

const TransactionList = () => {
  const { 
    transactions, 
    role, 
    filters, 
    setFilters, 
    resetFilters,
    deleteTransaction,
    exportData
  } = useFinance();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const categories = ['all', 'Salary', 'Food', 'Utilities', 'Freelance', 'Transport', 'Shopping', 'Investment', 'Entertainment'];

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="transaction-section glass animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="section-header">
        <div className="header-left">
          <h2 className="font-outfit">Recent Transactions</h2>
          <p>You have {transactions.length} transactions this month</p>
        </div>
        <div className="header-actions">
          <div className="search-bar glass">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by note or category..." 
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <div className="export-actions">
            <button className="export-btn glass-hover" onClick={() => exportData('json')}>JSON</button>
            <button className="export-btn glass-hover" onClick={() => exportData('csv')}>CSV</button>
          </div>
          {role === 'admin' && (
            <button className="add-btn" onClick={() => { setEditingItem(null); setModalOpen(true); }}>
              <Plus size={18} />
              <span>Add New</span>
            </button>
          )}
        </div>
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <label>Category</label>
          <div className="select-wrapper glass-hover">
            <select 
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              {categories.map(c => <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>)}
            </select>
            <ChevronDown size={14} className="chevron" />
          </div>
        </div>

        <div className="filter-group">
          <label>Type</label>
          <div className="select-wrapper glass-hover">
            <select 
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <ChevronDown size={14} className="chevron" />
          </div>
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <div className="select-wrapper glass-hover">
            <select 
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
            <ChevronDown size={14} className="chevron" />
          </div>
        </div>

        <button className="reset-btn glass-hover" onClick={resetFilters}>
           <span>Reset Filters</span>
        </button>
      </div>

      <div className="table-container">
        {transactions.length === 0 ? (
          <div className="empty-state glass">
             <div className="empty-icon glass">
                 <Search size={32} />
             </div>
             <h3>No transactions found</h3>
             <p>Try adjusting your search or filters to find what you're looking for.</p>
             <button className="reset-btn glass-hover" onClick={resetFilters} style={{ margin: '1rem auto 0', height: '38px' }}>
                Clear All Filters
             </button>
          </div>
        ) : (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                {role === 'admin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map(item => (
                <tr key={item.id} className="transaction-row">
                  <td className="date-cell">
                    <div className="date-icon glass">
                       {item.type === 'income' ? <ArrowUpCircle size={16} className="income-icon"/> : <ArrowDownCircle size={16} className="expense-icon"/>}
                    </div>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </td>
                  <td>
                    <span className="category-tag glass">{item.category}</span>
                  </td>
                  <td className="note-cell">{item.note}</td>
                  <td className={`amount-cell ${item.type}`}>
                    {item.type === 'income' ? '+' : '-'}
                    ${Number(item.amount).toFixed(2)}
                  </td>
                  {role === 'admin' && (
                    <td className="actions-cell">
                      <button onClick={() => handleEdit(item)} className="edit-btn glass-hover">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="delete-btn glass-hover">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <TransactionModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          editItem={editingItem}
        />
      )}

      <style jsx="true">{`
        .transaction-section {
          padding: 1.5rem;
          margin-top: 1rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .header-left p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }
        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          min-width: 250px;
        }
        .search-bar input {
          background: none;
          border: none;
          outline: none;
          color: var(--text-primary);
          width: 100%;
          font-size: 0.875rem;
        }
        .add-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary);
          color: white;
          padding: 0.625rem 1.25rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.875rem;
        }
        .add-btn:hover { background: var(--primary-hover); transform: translateY(-2px); }
        .export-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .export-btn {
          padding: 0.625rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .export-btn:hover { color: var(--primary); background: rgba(99, 102, 241, 0.1); }
        .filters-row {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .filter-group label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .reset-btn {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          height: 38px;
        }
        .reset-btn:hover { color: var(--danger); background: rgba(239, 68, 68, 0.1); }
        .select-wrapper {
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          min-width: 140px;
        }
        .select-wrapper select {
          appearance: none;
          background: none;
          border: none;
          color: var(--text-primary);
          width: 100%;
          font-size: 0.875rem;
          font-family: inherit;
        }
        .select-wrapper .chevron {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-secondary);
        }
        .table-container {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        th {
          text-align: left;
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 1rem;
          border-bottom: 1px solid var(--border-glass);
        }
        td {
          padding: 1rem;
          font-size: 0.875rem;
          border-bottom: 1px solid var(--border-glass);
        }
        .transaction-row:last-child td { border-bottom: none; }
        .date-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .date-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
        .income-icon { color: var(--secondary); }
        .expense-icon { color: var(--danger); }
        .category-tag {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .amount-cell { font-weight: 700; font-family: 'Outfit', sans-serif; }
        .amount-cell.income { color: var(--secondary); }
        .amount-cell.expense { color: var(--text-primary); }
        .actions-cell {
          display: flex;
          gap: 0.5rem;
        }
        .actions-cell button {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
        }
        .edit-btn:hover { color: var(--primary); background: rgba(99, 102, 241, 0.1); }
        .delete-btn:hover { color: var(--danger); background: rgba(239, 68, 68, 0.1); }
        .empty-state {
          padding: 5rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          border-radius: 24px;
          margin-top: 2rem;
        }
        .empty-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }
        .empty-state h3 { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
        .empty-state p { font-size: 0.875rem; color: var(--text-secondary); max-width: 300px; }
        
        .transaction-table {
          min-width: 800px;
        }

        @media (max-width: 640px) {
          .section-header { flex-direction: column; align-items: flex-start; }
          .search-bar { width: 100%; min-width: unset; }
          .header-actions { width: 100%; flex-wrap: wrap; }
          .add-btn { width: 100%; justify-content: center; }
          .filters-row { gap: 1rem; }
          .filter-group { flex: 1; min-width: 140px; }
          .reset-btn { width: 100%; justify-content: center; margin-top: 0; }
        }
      `}</style>
    </div>
  );
};

export default TransactionList;
