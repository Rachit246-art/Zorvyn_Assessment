import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, DollarSign, Type, FileText } from 'lucide-react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
                  <label><DollarSign size={14} /> Amount</label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    required 
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
                  />
                </div>
              </div>

              <div className="modal-footer">
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

          <style jsx="true">{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
              padding: 1rem;
            }
            .modal-content {
              width: 100%;
              max-width: 500px;
              padding: 2rem;
              border-radius: 24px;
            }
            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2rem;
            }
            .modal-header h2 { font-size: 1.5rem; }
            .close-btn { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
            .form-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1.5rem;
              margin-bottom: 2rem;
            }
            .full-width { grid-column: span 2; }
            .input-group { display: flex; flex-direction: column; gap: 0.5rem; }
            .input-group label { font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem; }
            .input-group input, .input-group select, .input-group textarea {
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid var(--border-glass);
              border-radius: 12px;
              padding: 0.75rem 1rem;
              color: var(--text-primary);
              font-family: inherit;
              font-size: 0.875rem;
              outline: none;
              transition: var(--transition);
            }
            .input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color: var(--primary); background: rgba(255, 255, 255, 0.08); }
            .type-toggle { padding: 4px; border-radius: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
            .type-toggle button { padding: 8px; border-radius: 8px; font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); }
            .type-toggle button.active { background: var(--bg-card-hover); color: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            .modal-footer { display: flex; gap: 1rem; justify-content: flex-end; }
            .cancel-btn { padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 600; font-size: 0.875rem; color: var(--text-secondary); }
            .submit-btn { padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 600; font-size: 0.875rem; background: var(--primary); color: white; }
            .submit-btn:hover { background: var(--primary-hover); transform: translateY(-2px); }
            .viewer-notice {
              padding: 0.75rem 1.5rem;
              border-radius: 12px;
              background: rgba(255, 255, 255, 0.05);
              color: var(--text-secondary);
              font-size: 0.875rem;
              font-weight: 600;
              border: 1px solid var(--border-glass);
            }
            
            @media (max-width: 500px) {
              .form-grid { grid-template-columns: 1fr; gap: 1rem; }
              .full-width { grid-column: auto; }
              .modal-content { padding: 1.5rem; border-radius: 0; min-height: 100vh; max-width: 100vw; display: flex; flex-direction: column; overflow-y: auto; }
              .modal-footer { flex-direction: column; gap: 0.75rem; margin-top: auto; }
              .modal-footer button, .viewer-notice { width: 100%; text-align: center; }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;
