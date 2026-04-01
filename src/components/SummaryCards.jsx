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
