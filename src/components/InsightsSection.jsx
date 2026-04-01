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

    </div>
  );
};

export default InsightsSection;
