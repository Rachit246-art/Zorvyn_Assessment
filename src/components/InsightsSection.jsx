import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target, 
  AlertCircle 
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const InsightCard = ({ title, value, icon: Icon, description, badge, type }) => (
  <div className="insight-card glass glass-hover animate-fade-in">
    <div className="insight-icon-container">
      <Icon size={20} />
    </div>
    <div className="insight-details">
      <div className="insight-header">
         <h4>{title}</h4>
         {badge && <span className={`badge ${type}`}>{badge}</span>}
      </div>
      <p className="insight-value">{value}</p>
      <p className="insight-desc">{description}</p>
    </div>

    <style jsx="true">{`
      .insight-card {
        padding: 1.5rem;
        display: flex;
        gap: 1.25rem;
        align-items: flex-start;
      }
      .insight-icon-container {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(99, 102, 241, 0.1);
        color: var(--primary);
        flex-shrink: 0;
      }
      .insight-details { flex: 1; }
      .insight-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
      .insight-header h4 { font-size: 0.875rem; color: var(--text-secondary); font-weight: 500; }
      .insight-value { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
      .insight-desc { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; }
      .badge { font-size: 0.625rem; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 20px; }
      .badge.positive { background: rgba(16, 185, 129, 0.1); color: var(--secondary); }
      .badge.negative { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
      .badge.info { background: rgba(99, 102, 241, 0.1); color: var(--primary); }
    `}</style>
  </div>
);

const InsightsSection = () => {
  const { insights, stats } = useFinance();
  
  const diff = insights.currentMonthSpend - insights.prevMonthSpend;
  const isHigher = diff > 0;
  
  return (
    <div className="insights-section">
      <div className="section-title">
        <Zap size={20} className="icon" />
        <h2 className="font-outfit">Smart Insights</h2>
      </div>

      <div className="insights-grid">
        <InsightCard 
          title="Highest Spending"
          value={insights.highestSpendingCategory}
          icon={TrendingUp}
          description={`You've spent $${insights.highestSpendingAmount.toFixed(2)} on ${insights.highestSpendingCategory} this month.`}
          badge="Top Category"
          type="info"
        />

        <InsightCard 
          title="Monthly Comparison"
          value={isHigher ? "Increasing" : "Decreasing"}
          icon={isHigher ? TrendingUp : TrendingDown}
          description={`Your spending is ${Math.abs(insights.spendingTrend).toFixed(1)}% ${isHigher ? 'higher' : 'lower'} than last month.`}
          badge={`${Math.abs(insights.spendingTrend).toFixed(1)}%`}
          type={isHigher ? "negative" : "positive"}
        />

        <InsightCard 
          title="Savings Performance"
          value={stats.income > stats.expenses ? "Healthy" : "Low"}
          icon={Target}
          description={stats.income > stats.expenses 
            ? "Your income exceeds expenses. You're maintaining a positive balance!" 
            : "Your expenses are close to or exceed your income. Consider reviewing your budget."}
          badge="Auto-Analysis"
          type={stats.income > stats.expenses ? "positive" : "negative"}
        />
      </div>

      <style jsx="true">{`
        .insights-section { margin-bottom: 2rem; }
        .section-title { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .section-title h2 { font-size: 1.5rem; font-weight: 700; }
        .section-title .icon { color: var(--primary); }
        .insights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 1024px) { .insights-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default InsightsSection;
