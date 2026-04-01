import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';

const TransactionModal = ({ isOpen, onClose, editItem }) => {
  const { role, addTransaction, editTransaction } = useFinance();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: 'Food',
    type: 'expense',
    note: ''
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData({ date: new Date().toISOString().split('T')[0], amount: '', category: 'Food', type: 'expense', note: '' });
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) editTransaction(formData);
    else addTransaction(formData);
    onClose();
  };

  const categories = ['Salary', 'Food', 'Utilities', 'Freelance', 'Transport', 'Shopping', 'Investment', 'Entertainment'];

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div className="win-window" style={{ width: '380px', maxWidth: '95vw' }}>
        {/* Title bar */}
        <div className="win-titlebar">
          <div className="win-titlebar-left">
            <span>💳</span>
            <span>{editItem ? 'Edit Transaction' : 'Add New Transaction'}</span>
          </div>
          <div style={{ display: 'flex', gap: '2px' }}>
            <span className="win-titlebar-btn" onClick={onClose} style={{ cursor: 'default' }}>✕</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '12px', background: 'var(--win-face)', display: 'flex', flexDirection: 'column', gap: '8px' }}>

            {/* Date & Amount */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label className="win-label">Date:</label>
                <input
                  type="date"
                  className="win-input"
                  style={{ width: '100%' }}
                  required
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="win-label">Amount ($):</label>
                <input
                  type="number"
                  className="win-input"
                  style={{ width: '100%' }}
                  placeholder="0.00"
                  required
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            {/* Category & Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label className="win-label">Category:</label>
                <select
                  className="win-input"
                  style={{ width: '100%' }}
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="win-label">Type:</label>
                <div className="win-groupbox" style={{ padding: '4px 8px', marginTop: 0 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', cursor: 'default', marginBottom: '2px' }}>
                    <input type="radio" name="txtype" value="income" checked={formData.type === 'income'} onChange={() => setFormData({ ...formData, type: 'income' })} />
                    Income
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', cursor: 'default' }}>
                    <input type="radio" name="txtype" value="expense" checked={formData.type === 'expense'} onChange={() => setFormData({ ...formData, type: 'expense' })} />
                    Expense
                  </label>
                </div>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="win-label">Description:</label>
              <textarea
                className="win-input"
                style={{ width: '100%', height: '60px', resize: 'vertical', fontFamily: 'Tahoma, Arial, sans-serif' }}
                placeholder="Enter description..."
                value={formData.note}
                onChange={e => setFormData({ ...formData, note: e.target.value })}
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div style={{
            background: 'var(--win-face)',
            borderTop: '1px solid var(--win-shadow)',
            padding: '8px 12px',
            display: 'flex',
            gap: '6px',
            justifyContent: 'flex-end',
          }}>
            {role === 'admin' ? (
              <button type="submit" className="win-btn primary">
                {editItem ? 'Save Changes' : 'Add Transaction'}
              </button>
            ) : (
              <span style={{ fontSize: '11px', color: 'var(--win-disabled)', border: '1px solid var(--win-shadow)', padding: '4px 12px' }}>
                🔒 Read-only Mode
              </span>
            )}
            <button type="button" className="win-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
