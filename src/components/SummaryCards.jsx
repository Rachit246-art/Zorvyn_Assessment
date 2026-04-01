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
        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
      </h3>
    </div>
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

      <style jsx="true">{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 1200px) {
          .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .dashboard-grid { 
            grid-template-columns: repeat(2, 1fr) !important; 
            gap: 0.75rem !important; 
          }
        }
        
        .stat-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          min-height: 160px;
          position: relative;
          overflow: hidden;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
        }
        .icon-wrapper.primary { color: var(--primary); background: rgba(99, 102, 241, 0.1); }
        .icon-wrapper.success { color: var(--secondary); background: rgba(16, 185, 129, 0.1); }
        .icon-wrapper.danger { color: var(--danger); background: rgba(239, 68, 68, 0.1); }
        .icon-wrapper.warning { color: #f59e0b; background: rgba(245, 158, 11, 0.1); }

        .trend {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .trend.up { color: var(--secondary); background: rgba(16, 185, 129, 0.1); }
        .trend.down { color: var(--danger); background: rgba(239, 68, 68, 0.1); }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .card-title {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .card-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        @media (max-width: 640px) {
          .stat-card { padding: 1rem; min-height: 130px; }
          .card-value { font-size: 1.125rem; }
          .card-title { font-size: 0.75rem; }
          .icon-wrapper { width: 36px; height: 36px; }
        }
      `}</style>
    </div>
  );
};

export default SummaryCards;
