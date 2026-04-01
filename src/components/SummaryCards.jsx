import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="stat-card glass glass-hover animate-fade-in">
    <div className="card-header">
      <div className={`icon-wrapper ${color}`}>
        <Icon size={20} />
      </div>
      {trend !== undefined && (
        <div className={`trend ${trend >= 0 ? 'up' : 'down'}`}>
          {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{Math.abs(trend.toFixed(1))}%</span>
        </div>
      )}
    </div>
    <div className="card-content">
      <p className="card-title">{title}</p>
      <h3 className="card-value font-outfit">
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
      </h3>
    </div>
    
    <style jsx="true">{`
      .stat-card {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        position: relative;
        overflow: hidden;
      }
      
      .stat-card::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle at top right, var(--primary), transparent);
        opacity: 0.1;
        pointer-events: none;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .icon-wrapper {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
      }
      
      .icon-wrapper.primary { color: var(--primary); background: rgba(99, 102, 241, 0.15); }
      .icon-wrapper.success { color: var(--secondary); background: rgba(16, 185, 129, 0.15); }
      .icon-wrapper.danger { color: var(--danger); background: rgba(239, 68, 68, 0.15); }
      .icon-wrapper.warning { color: #f59e0b; background: rgba(245, 158, 11, 0.15); }
      
      .trend {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 20px;
      }
      
      .trend.up { color: var(--secondary); background: rgba(16, 185, 129, 0.1); }
      .trend.down { color: var(--danger); background: rgba(239, 68, 68, 0.1); }
      
      .card-title {
        font-size: 0.875rem;
        color: var(--text-secondary);
        font-weight: 500;
        margin-bottom: 0.25rem;
      }
      
      .card-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
      }

      @media (max-width: 640px) {
        .stat-card {
           padding: 1.25rem 1rem;
           gap: 0.75rem;
        }
        .icon-wrapper { width: 36px; height: 36px; border-radius: 10px; }
        .card-value { font-size: 1.25rem; }
        .card-title { font-size: 0.8125rem; }
      }
    `}</style>
  </div>
);

const SummaryCards = () => {
  const { stats, insights } = useFinance();
  
  return (
    <div className="dashboard-grid">
      <StatCard 
        title="Total Balance" 
        value={stats.balance} 
        icon={Wallet} 
        color="primary"
      />
      <StatCard 
        title="Total Income" 
        value={stats.income} 
        icon={TrendingUp} 
        trend={8.5} 
        color="success"
      />
      <StatCard 
        title="Total Expenses" 
        value={stats.expenses} 
        icon={TrendingDown} 
        trend={-3.2} 
        color="danger"
      />
      <StatCard 
        title="Monthly Spending" 
        value={insights.currentMonthSpend} 
        icon={Activity} 
        trend={insights.spendingTrend}
        color="warning"
      />
    </div>
  );
};

export default SummaryCards;
