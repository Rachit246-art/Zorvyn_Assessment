import React from 'react';
import { useFinance } from '../context/FinanceContext';

const InsightRow = ({ title, value, description, badge, type }) => {
  const badgeColor = type === 'positive' ? 'var(--win-green)' : type === 'negative' ? 'var(--win-red)' : '#000080';
  return (
    <div className="win-raised" style={{ padding: '6px 8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
      <div className="win-sunken" style={{ minWidth: '90px', padding: '4px 6px', background: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: '13px', fontWeight: 'bold', fontFamily: 'Courier New, monospace' }}>{value}</div>
        {badge && (
          <div style={{ fontSize: '9px', color: badgeColor, fontWeight: 'bold', marginTop: '2px' }}>{badge}</div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '2px' }}>{title}</div>
        <div style={{ fontSize: '10px', color: '#444', lineHeight: 1.4 }}>{description}</div>
      </div>
    </div>
  );
};

const InsightsSection = () => {
  const { insights, stats } = useFinance();
  const diff = insights.currentMonthSpend - insights.prevMonthSpend;
  const isHigher = diff > 0;

  return (
    <div className="win-window" style={{ marginBottom: '6px' }}>
      <div className="win-titlebar">
        <div className="win-titlebar-left">
          <span>⚡</span>
          <span>Smart Insights</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <span className="win-titlebar-btn">_</span>
          <span className="win-titlebar-btn">□</span>
        </div>
      </div>
      <div style={{ padding: '8px', background: 'var(--win-face)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
        <InsightRow
          title="Highest Spending Category"
          value={insights.highestSpendingCategory}
          description={`$${insights.highestSpendingAmount.toFixed(2)} spent on ${insights.highestSpendingCategory} this month.`}
          badge="TOP CATEGORY"
          type="info"
        />
        <InsightRow
          title="Monthly Comparison"
          value={isHigher ? 'Increasing ▲' : 'Decreasing ▼'}
          description={`Spending is ${Math.abs(insights.spendingTrend).toFixed(1)}% ${isHigher ? 'higher' : 'lower'} than last month.`}
          badge={`${Math.abs(insights.spendingTrend).toFixed(1)}%`}
          type={isHigher ? 'negative' : 'positive'}
        />
        <InsightRow
          title="Savings Performance"
          value={stats.income > stats.expenses ? 'Healthy ✓' : 'Low ✗'}
          description={stats.income > stats.expenses
            ? 'Income exceeds expenses. Positive balance maintained!'
            : 'Expenses close to or exceed income. Review your budget.'}
          badge="AUTO-ANALYSIS"
          type={stats.income > stats.expenses ? 'positive' : 'negative'}
        />
      </div>
    </div>
  );
};

export default InsightsSection;
