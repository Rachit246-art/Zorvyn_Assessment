import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useFinance } from '../context/FinanceContext';
import { format, subDays, startOfToday } from 'date-fns';

const COLORS = ['#000080', '#008080', '#800000', '#808000', '#800080', '#008000'];

const Win2kTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const name = label || payload[0].name;
  return (
    <div className="win-window" style={{ padding: 0, fontSize: '11px', minWidth: '120px' }}>
      <div style={{
        background: 'linear-gradient(to right, #0a246a, #a6caf0)',
        color: 'white',
        padding: '2px 6px',
        fontSize: '10px',
        fontWeight: 'bold',
      }}>{name}</div>
      <div style={{ padding: '4px 8px', background: 'var(--win-face)' }}>
        <span style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)}
        </span>
      </div>
    </div>
  );
};

const AnalyticsSection = () => {
  const { allTransactions } = useFinance();

  const trendData = [...Array(7)].map((_, i) => {
    const date = format(subDays(startOfToday(), 6 - i), 'MMM dd');
    const dayTx = allTransactions.filter(t => format(new Date(t.date), 'MMM dd') === date);
    const amount = dayTx.reduce((a, t) => t.type === 'income' ? a + t.amount : a - t.amount, 0);
    return { name: date, amount };
  });

  const catObj = {};
  allTransactions.filter(t => t.type === 'expense').forEach(t => {
    catObj[t.category] = (catObj[t.category] || 0) + t.amount;
  });
  const categoryData = Object.entries(catObj).map(([name, value]) => ({ name, value }));

  return (
    <div className="win-window" style={{ marginBottom: '6px' }}>
      <div className="win-titlebar">
        <div className="win-titlebar-left">
          <span>📈</span>
          <span>Analytics</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <span className="win-titlebar-btn">_</span>
          <span className="win-titlebar-btn">□</span>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ background: 'var(--win-face)', padding: '4px 4px 0' }}>
        <div className="win-tabs">
          <div className="win-tab active">Balance Trend (7 days)</div>
          <div className="win-tab">Spending Breakdown</div>
        </div>
      </div>

      <div style={{
        background: 'var(--win-window-bg)',
        border: '2px solid',
        borderColor: 'var(--win-shadow) var(--win-highlight) var(--win-highlight) var(--win-shadow)',
        margin: '0 4px 4px',
        padding: '8px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
          {/* Trend chart */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>📊</span> Balance Trend — Last 7 Days
            </div>
            <div style={{ height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="w2kGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000080" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#000080" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d0d0d0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'Tahoma' }} axisLine={{ stroke: '#808080' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'Tahoma' }} axisLine={{ stroke: '#808080' }} tickLine={false} />
                  <Tooltip content={<Win2kTooltip />} />
                  <Area type="linear" dataKey="amount" stroke="#000080" strokeWidth={2} fill="url(#w2kGrad)" dot={{ r: 3, fill: '#000080', stroke: '#fff', strokeWidth: 1 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie chart */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>🥧</span> Spending by Category
            </div>
            <div style={{ height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="45%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={9}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#d4d0c8" strokeWidth={1} />
                    ))}
                  </Pie>
                  <Tooltip content={<Win2kTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
