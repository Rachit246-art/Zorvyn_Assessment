import React from 'react';
import { useFinance } from '../context/FinanceContext';

const ICONS = { balance: '💰', income: '📥', expenses: '📤', monthly: '📅' };

const StatCard = ({ title, value, icon, trend }) => {
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  const isPos = trend === undefined || trend >= 0;
  return (
    <div className="win-window" style={{ overflow: 'hidden' }}>
      {/* Mini title bar */}
      <div style={{
        background: 'linear-gradient(to right, #0a246a, #a6caf0)',
        color: 'white',
        padding: '2px 6px',
        fontSize: '10px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div style={{ padding: '8px', background: 'var(--win-face)' }}>
        <div className="win-sunken" style={{ padding: '6px 8px', textAlign: 'right', background: 'white' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'Courier New, monospace', color: '#000' }}>
            {formatted}
          </span>
        </div>
        {trend !== undefined && (
          <div style={{ marginTop: '4px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>{isPos ? '▲' : '▼'}</span>
            <span style={{ color: isPos ? 'var(--win-green)' : 'var(--win-red)' }}>
              {Math.abs(trend).toFixed(1)}% vs last month
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const SummaryCards = () => {
  const { stats, insights } = useFinance();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '6px' }}>
      <StatCard title="Total Balance"    value={stats.balance}              icon={ICONS.balance}  />
      <StatCard title="Total Income"     value={stats.income}               icon={ICONS.income}   trend={8.5} />
      <StatCard title="Total Expenses"   value={stats.expenses}             icon={ICONS.expenses} trend={-3.2} />
      <StatCard title="Monthly Spending" value={insights.currentMonthSpend} icon={ICONS.monthly}  trend={insights.spendingTrend} />

      <style>{`
        @media (max-width: 1200px) {
          .summary-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .summary-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default SummaryCards;
