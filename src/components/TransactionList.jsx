import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Minus,
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
    loading,
    filters, 
    setFilters, 
    resetFilters,
    deleteTransaction,
    exportData
  } = useFinance();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [groupBy, setGroupBy] = useState('none');

  const categories = ['All', 'Salary', 'Food', 'Utilities', 'Freelance', 'Transport', 'Shopping', 'Investment', 'Entertainment'];

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  // Apply date range filter on top of existing filters
  const displayedTransactions = transactions.filter(t => {
    if (dateFrom && t.date < dateFrom) return false;
    if (dateTo && t.date > dateTo) return false;
    return true;
  });

  // Group transactions by category or month
  const groupedTransactions = (() => {
    if (groupBy === 'none') return { All: displayedTransactions };
    return displayedTransactions.reduce((groups, t) => {
      const key = groupBy === 'category'
        ? t.category
        : new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
      return groups;
    }, {});
  })();

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
          <div className="select-wrapper">
            <select 
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              {categories.map(c => <option key={c} value={c === 'All' ? 'all' : c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="chevron" />
          </div>
        </div>

        <div className="filter-group">
          <label>Type</label>
          <div className="select-wrapper">
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
          <div className="select-wrapper">
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

        <div className="filter-group">
          <label>From Date</label>
          <input
            type="date"
            className="date-input glass"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>To Date</label>
          <input
            type="date"
            className="date-input glass"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Group By</label>
          <div className="select-wrapper">
            <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
              <option value="none">No Grouping</option>
              <option value="category">Category</option>
              <option value="month">Month</option>
            </select>
            <ChevronDown size={14} className="chevron" />
          </div>
        </div>

        <div className="reset-filter-group">
          <button className="reset-btn" onClick={() => { resetFilters(); setDateFrom(''); setDateTo(''); setGroupBy('none'); }}>
             <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="api-loading-overlay">
          <div className="api-spinner"></div>
          <span>Syncing...</span>
        </div>
      )}

      <div className="table-container">
        {displayedTransactions.length === 0 ? (
          <div className="empty-state glass">
             <div className="empty-icon glass">
                 <Search size={32} />
             </div>
             <h3>No transactions found</h3>
             <p>Try adjusting your search or filters to find what you're looking for.</p>
             <button className="reset-btn glass-hover" onClick={() => { resetFilters(); setDateFrom(''); setDateTo(''); setGroupBy('none'); }} style={{ margin: '1rem auto 0', height: '38px' }}>
                Clear All Filters
             </button>
          </div>
        ) : (
          <>
            {/* Mobile cards — one group at a time */}
            <div className="mobile-cards">
              {Object.entries(groupedTransactions).map(([groupName, groupItems]) => (
                <div key={groupName}>
                  {groupBy !== 'none' && (
                    <div className="group-header">
                      <span className="group-label">{groupName}</span>
                      <span className="group-count">{groupItems.length} transaction{groupItems.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {groupItems.map((item) => (
                    <div key={item.id} className="mobile-transaction-card glass animate-fade-in">
                      <div className="card-top">
                        <div className="card-info">
                          <div className={`type-indicator ${item.type}`}>
                            {item.type === 'income' ? <Plus size={12} /> : <Minus size={12} />}
                          </div>
                          <span className="card-date">{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                        <span className={`card-amount ${item.type}`}>
                          {item.type === 'income' ? '+' : '-'}${Math.abs(item.amount).toFixed(2)}
                        </span>
                      </div>
                      <div className="card-mid">
                        <span className="card-category-badge">{item.category}</span>
                        <p className="card-desc">{item.note || 'No description'}</p>
                      </div>
                      {role === 'admin' && (
                        <div className="card-actions">
                          <button onClick={() => handleEdit(item)} className="card-action-btn edit glass-hover">Edit</button>
                          <button onClick={() => handleDelete(item.id)} className="card-action-btn delete glass-hover">Delete</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Desktop — ONE single table, group headers as colspan rows */}
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
                {Object.entries(groupedTransactions).map(([groupName, groupItems]) => (
                  <React.Fragment key={groupName}>
                    {groupBy !== 'none' && (
                      <tr className="group-header-row">
                        <td colSpan={role === 'admin' ? 5 : 4}>
                          <div className="group-header-cell">
                            <span className="group-label">{groupName}</span>
                            <span className="group-count">{groupItems.length} transaction{groupItems.length !== 1 ? 's' : ''}</span>
                          </div>
                        </td>
                      </tr>
                    )}
                    {groupItems.map((item) => (
                      <tr key={item.id} className="transaction-row animate-fade-in">
                        <td className="date-cell">
                           <div className="date-icon glass">
                              {item.type === 'income' ? <Plus size={14} className="income-icon"/> : <Minus size={14} className="expense-icon"/>}
                           </div>
                           <span>{new Date(item.date).toLocaleDateString()}</span>
                        </td>
                        <td>
                          <span className="category-tag glass">{item.category}</span>
                        </td>
                        <td className="note-cell">{item.note}</td>
                        <td className={`amount-cell ${item.type}`}>
                          {item.type === 'income' ? '+' : '-'}${Math.abs(item.amount).toFixed(2)}
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
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </>
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
        /* Loading overlay */
        .api-loading-overlay {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          margin-bottom: 1rem;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 12px;
          font-size: 0.8125rem;
          color: var(--primary);
          font-weight: 600;
          animation: fadeIn 0.2s ease;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .api-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(99, 102, 241, 0.3);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        /* Date range inputs */
        .date-input {
          width: 100%;
          padding: 10px 12px;
          background: rgba(0,0,0,0.2);
          border: 1px solid var(--border-glass);
          border-radius: 10px;
          color: white;
          font-family: inherit;
          font-size: 0.8125rem;
          cursor: pointer;
        }
        .date-input::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; cursor: pointer; }

        /* Group headers (outside table — mobile) */
        .group-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0;
          margin: 1.5rem 0 0.75rem 0;
          border-bottom: 1px solid var(--border-glass);
        }
        /* Group headers (inside table — desktop) */
        .group-header-row td {
          padding: 0;
          border: none;
          background: transparent;
        }
        .group-header-cell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0 0.5rem 0;
          border-bottom: 1px solid var(--border-glass);
          margin-bottom: 0.25rem;
        }
        .group-label {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.02em;
        }
        .group-count {
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.05);
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid var(--border-glass);
        }

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
          gap: 0.75rem;
          align-items: center;
          flex-wrap: wrap;
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
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: end;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
        .filter-group label {
          font-size: 0.6875rem;
          color: var(--text-secondary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          white-space: nowrap;
        }
        .reset-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          font-size: 0.8125rem;
          font-weight: 600;
          height: 42px;
          width: 100%;
          transition: var(--transition);
        }
        .reset-btn:hover { color: var(--danger); background: rgba(239, 68, 68, 0.08); border-color: rgba(239,68,68,0.3); }
        .select-wrapper {
          position: relative;
          height: 42px;
          border-radius: 10px;
          border: 1px solid var(--border-glass);
          background: rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }
        .select-wrapper:hover { border-color: rgba(255,255,255,0.18); }
        .select-wrapper select {
          appearance: none;
          background: none;
          border: none;
          color: var(--text-primary);
          width: 100%;
          height: 100%;
          padding: 0 2rem 0 0.875rem;
          font-size: 0.875rem;
          font-family: inherit;
          cursor: pointer;
          outline: none;
        }
        .select-wrapper .chevron {
          position: absolute;
          right: 0.625rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-secondary);
        }
        .date-input {
          width: 100%;
          height: 42px;
          padding: 0 0.875rem;
          background: rgba(0,0,0,0.2);
          border: 1px solid var(--border-glass);
          border-radius: 10px;
          color: white;
          font-family: inherit;
          font-size: 0.875rem;
          cursor: pointer;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }
        .date-input:hover { border-color: rgba(255,255,255,0.18); }
        .date-input:focus { border-color: var(--primary); outline: none; }
        .date-input::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.4; cursor: pointer; }
        .reset-filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
        .reset-filter-group::before {
          content: ' ';
          display: block;
          font-size: 0.6875rem;
          line-height: 1.2;
          visibility: hidden;
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
        
        .mobile-cards { display: none; }
        .transaction-table {
          min-width: 800px;
        }

        @media (max-width: 768px) {
          .transaction-table { display: none; }
          .mobile-cards { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; box-sizing: border-box; }
          .mobile-transaction-card { padding: 1rem; width: 100%; box-sizing: border-box; overflow: hidden; }
          .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; width: 100%; }
          .card-info { display: flex; align-items: center; gap: 0.5rem; overflow: hidden; }
          .card-date { font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap; }
          .card-amount { font-size: 0.9375rem; font-weight: 700; white-space: nowrap; }
          .card-mid { margin-bottom: 0.75rem; width: 100%; overflow: hidden; }
          .card-category-badge { font-size: 0.5625rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.05); color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.375rem; display: inline-block; }
          .card-desc { font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
          .card-actions { display: flex; gap: 0.5rem; border-top: 1px solid var(--border-glass); padding-top: 0.75rem; margin-top: 0.375rem; width: 100%; }
          .card-action-btn { flex: 1; padding: 0.5rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; text-align: center; }
          .card-action-btn.edit { color: var(--primary); }
          .card-action-btn.delete { color: var(--danger); }
          .type-indicator { width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          .type-indicator.income { background: rgba(16, 185, 129, 0.1); color: var(--secondary); }
          .type-indicator.expense { background: rgba(239, 68, 68, 0.1); color: var(--danger); }

          .section-header { flex-direction: column; align-items: flex-start; gap: 1rem; width: 100%; }
          .header-actions { width: 100%; flex-wrap: wrap; gap: 0.5rem; }
          .search-bar { width: 100%; min-width: 100%; }
          .export-actions { flex: 1; display: flex; gap: 0.5rem; }
          .export-btn { flex: 1; text-align: center; }
          .add-btn { width: 100%; justify-content: center; }
          .filters-row {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          .filter-group { width: 100%; }
          .reset-btn {
            grid-column: span 2;
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionList;
