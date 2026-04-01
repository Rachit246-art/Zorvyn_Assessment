import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, IndianRupee, Type, FileText } from 'lucide-react';
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
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: 'Food',
        type: 'expense',
        note: ''
      });
    }
  }, [editItem]);

  const clearForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: 'Food',
      type: 'expense',
      note: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(formData.amount) <= 0) {
      alert('Please enter a valid amount greater than zero.');
      return;
    }
    if (editItem) {
      editTransaction(formData);
    } else {
      addTransaction(formData);
    }
    onClose();
  };

  const categories = ['Salary', 'Food', 'Utilities', 'Freelance', 'Transport', 'Shopping', 'Investment', 'Entertainment'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div 
            className="modal-content glass"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="modal-header">
              <h2 className="font-outfit">{editItem ? 'Edit' : 'Add'} Transaction</h2>
              <button onClick={onClose} className="close-btn glass-hover">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label><Calendar size={14} /> Date</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label><IndianRupee size={14} /> Amount</label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    required 
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    autoComplete="off"
                  />
                </div>

                <div className="input-group">
                  <label><Type size={14} /> Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="input-group">
                  <label>Type</label>
                  <div className="type-toggle glass">
                    <button 
                      type="button" 
                      className={formData.type === 'income' ? 'active' : ''}
                      onClick={() => setFormData({ ...formData, type: 'income' })}
                    >
                      Income
                    </button>
                    <button 
                      type="button" 
                      className={formData.type === 'expense' ? 'active' : ''}
                      onClick={() => setFormData({ ...formData, type: 'expense' })}
                    >
                      Expense
                    </button>
                  </div>
                </div>

                <div className="input-group full-width">
                  <label><FileText size={14} /> Description</label>
                  <textarea 
                    placeholder="Enter description..." 
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="modal-footer">
                {!editItem && <button type="button" onClick={clearForm} className="cancel-btn glass-hover" style={{ marginRight: 'auto' }}>Clear</button>}
                <button type="button" onClick={onClose} className="cancel-btn glass-hover">Cancel</button>
                {role === 'admin' ? (
                  <button type="submit" className="submit-btn">{editItem ? 'Save Changes' : 'Add Transaction'}</button>
                ) : (
                  <div className="viewer-notice glass">
                     <span>Read-only Mode</span>
                  </div>
                )}
              </div>
            </form>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;
