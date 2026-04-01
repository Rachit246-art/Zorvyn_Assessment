import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import SummaryCards from './components/SummaryCards';
import AnalyticsSection from './components/AnalyticsSection';
import InsightsSection from './components/InsightsSection';
import TransactionList from './components/TransactionList';

const Dashboard = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <header className="page-header animate-fade-in">
          <div className="header-text">
            <h1 className="font-outfit">Financial Dashboard</h1>
            <p>Welcome back! Here's what's happening with your accounts today.</p>
          </div>
          <div className="date-display glass">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        <section id="overview">
          <SummaryCards />
        </section>
        
        <section id="analytics" style={{ paddingTop: '2rem' }}>
          <AnalyticsSection />
        </section>

        <section id="insights" style={{ paddingTop: '2rem' }}>
          <InsightsSection />
        </section>

        <section id="transactions" style={{ paddingTop: '2rem' }}>
          <TransactionList />
        </section>
        
        <section id="settings" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="glass" style={{ padding: '2.5rem', marginTop: '1rem' }}>
            <h2 className="font-outfit" style={{ marginBottom: '0.5rem' }}>Account Settings</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Manage your workspace preferences, security settings, and global notifications here.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
               <div className="glass-hover" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                 <h4 className="font-outfit" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Profile Information</h4>
                 <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Update your avatar, name and personal details.</p>
               </div>
               <div className="glass-hover" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                 <h4 className="font-outfit" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Security & Privacy</h4>
                 <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Manage your password and multi-factor authentication.</p>
               </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx="true">{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-glass);
        }
        .header-text h1 {
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .header-text p {
          color: var(--text-secondary);
          font-size: 1rem;
        }
        .date-display {
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 1rem;
          }
          .header-text h1 {
            font-size: 1.875rem;
          }
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <FinanceProvider>
      <Dashboard />
    </FinanceProvider>
  );
}

export default App;
