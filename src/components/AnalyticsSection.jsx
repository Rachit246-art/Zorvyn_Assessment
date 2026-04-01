import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useFinance } from '../context/FinanceContext';
import { format, subDays, startOfToday } from 'date-fns';

const AnalyticsSection = () => {
  const { allTransactions } = useFinance();

  // Process data for trend chart (Last 7 days)
  const trendData = [...Array(7)].map((_, i) => {
    const date = format(subDays(startOfToday(), 6 - i), 'MMM dd');
    const dayTransactions = allTransactions.filter(t => 
      format(new Date(t.date), 'MMM dd') === date
    );
    const balance = dayTransactions.reduce((acc, t) => 
      t.type === 'income' ? acc + t.amount : acc - t.amount, 0
    );
    return { name: date, amount: balance };
  });

  // Process data for category breakdown (Expenses only)
  const categoryDataObj = {};
  allTransactions.filter(t => t.type === 'expense').forEach(t => {
    categoryDataObj[t.category] = (categoryDataObj[t.category] || 0) + t.amount;
  });
  
  const categoryData = Object.entries(categoryDataObj).map(([name, value]) => ({ name, value }));
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const name = label || payload[0].name;
      const value = payload[0].value;
      const color = payload[0].payload.fill || payload[0].color;

      return (
        <div className="custom-tooltip glass" style={{ padding: '12px 16px', border: '1px solid var(--border-glass)', borderRadius: '12px' }}>
          <p className="label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>{name}</p>
          <p className="value" style={{ color: color, fontWeight: 700, fontSize: '1rem' }}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-grid">
      <div className="chart-card glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="chart-header">
          <h3 className="font-outfit">Balance Trend</h3>
          <p>Last 7 days activity</p>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-glass)', strokeWidth: 1 }} />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="var(--primary)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorAmount)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="chart-header">
          <h3 className="font-outfit">Spending Breakdown</h3>
          <p>By category</p>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={window.innerWidth < 640 ? 50 : 60}
                outerRadius={window.innerWidth < 640 ? 70 : 80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.1)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                align="center" 
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsSection;
