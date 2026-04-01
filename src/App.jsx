import React, { useEffect, useRef } from 'react';
import { User, Shield } from 'lucide-react';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import SummaryCards from './components/SummaryCards';
import AnalyticsSection from './components/AnalyticsSection';
import InsightsSection from './components/InsightsSection';
import TransactionList from './components/TransactionList';

const Dashboard = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('section-visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
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

        <section id="overview" className="reveal-section">
          <SummaryCards />
        </section>
        
        <section id="analytics" className="reveal-section" style={{ paddingTop: '2rem' }}>
          <AnalyticsSection />
        </section>

        <section id="insights" className="reveal-section" style={{ paddingTop: '2rem' }}>
          <InsightsSection />
        </section>

        <section id="transactions" className="reveal-section" style={{ paddingTop: '2rem' }}>
          <TransactionList />
        </section>
        
        <section id="settings" className="reveal-section" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
          <div className="glass" style={{ padding: '2.5rem', marginTop: '1rem' }}>
            <div className="settings-header" style={{ marginBottom: '2.5rem' }}>
              <h2 className="font-outfit" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Account Settings</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Control your profile details and security preferences.</p>
            </div>
            
            <div className="settings-grid">
              <div className="glass-hover setting-card">
                <div className="card-header">
                  <div className="card-icon primary"><User size={20} /></div>
                  <h3 className="font-outfit">Personal Profile</h3>
                </div>
                <div className="input-field">
                  <label>Full Name</label>
                  <input type="text" defaultValue="John Doe" className="glass" autoComplete="off" />
                </div>
                <div className="input-field">
                  <label>Email Address</label>
                  <input type="email" defaultValue="john@vortex-finance.com" className="glass" autoComplete="off" />
                </div>
              </div>

              <div className="glass-hover setting-card">
                <div className="card-header">
                  <div className="card-icon success"><Shield size={20} /></div>
                  <h3 className="font-outfit">Security & Access</h3>
                </div>
                <p className="setting-desc">
                  You are currently logged in as <strong>{new URLSearchParams(window.location.search).get('role') || 'Admin'}</strong>. 
                  Use the bottom toggle in the sidebar to test different permission levels.
                </p>
                <div className="status-badge glass">
                  <span>Standard Encryption Active</span>
                </div>
              </div>
            </div>

            <div className="settings-footer">
              <button 
                className="save-btn glass-hover" 
                onClick={() => alert('Account preferences have been updated successfully!')}
              >
                Save Changes
              </button>
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

        /* Settings Styles */
        .settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; align-items: stretch; }
        .setting-card { padding: 2.25rem; border-radius: 20px; border: 1px solid var(--border-glass); background: rgba(255,255,255,0.02); transition: var(--transition); display: flex; flex-direction: column; }
        .setting-card .card-header { display: flex; align-items: center; justify-content: flex-start; gap: 1rem; margin-bottom: 2rem; }
        .card-icon { width: 42px; height: 42px; border-radius: 12px; color: white; display: flex; align-items: center; justify-content: center; }
        .card-icon.primary { background: var(--primary); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }
        .card-icon.success { background: var(--secondary); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2); }
        .input-field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; width: 100%; }
        .input-field label { font-size: 0.75rem; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; text-align: left; }
        .input-field input { width: 100%; padding: 12px 16px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-glass); border-radius: 10px; color: white; font-family: inherit; transition: var(--transition); box-sizing: border-box; }
        .input-field input:focus { border-color: var(--primary); background: rgba(0,0,0,0.4); outline: none; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
        .setting-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem; text-align: left; }
        .status-badge { display: inline-flex; align-items: center; padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; color: var(--secondary); background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); }
        .settings-footer { margin-top: 3rem; display: flex; justify-content: flex-end; padding-top: 2rem; border-top: 1px solid var(--border-glass); }
        .save-btn { padding: 12px 36px; background: var(--primary); color: white; border-radius: 12px; font-weight: 600; font-size: 0.9375rem; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3); transition: var(--transition); cursor: pointer; }
        .save-btn:active { transform: scale(0.98); }

        /* ── Scroll Reveal Animations ── */
        .reveal-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal-section.section-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Stagger children inside revealed sections ── */
        .reveal-section.section-visible .stat-card:nth-child(1)  { transition-delay: 0.05s; }
        .reveal-section.section-visible .stat-card:nth-child(2)  { transition-delay: 0.12s; }
        .reveal-section.section-visible .stat-card:nth-child(3)  { transition-delay: 0.19s; }
        .reveal-section.section-visible .stat-card:nth-child(4)  { transition-delay: 0.26s; }
        .reveal-section.section-visible .chart-card:nth-child(1) { transition-delay: 0.10s; }
        .reveal-section.section-visible .chart-card:nth-child(2) { transition-delay: 0.22s; }
        .reveal-section.section-visible .insight-card:nth-child(1) { transition-delay: 0.08s; }
        .reveal-section.section-visible .insight-card:nth-child(2) { transition-delay: 0.18s; }
        .reveal-section.section-visible .insight-card:nth-child(3) { transition-delay: 0.28s; }
        .reveal-section.section-visible .setting-card:nth-child(1) { transition-delay: 0.10s; }
        .reveal-section.section-visible .setting-card:nth-child(2) { transition-delay: 0.22s; }

        /* stat cards need their own animation because they're inside reveal-section */
        .stat-card, .chart-card, .insight-card, .setting-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .reveal-section.section-visible .stat-card,
        .reveal-section.section-visible .chart-card,
        .reveal-section.section-visible .insight-card,
        .reveal-section.section-visible .setting-card {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Hover lift on interactive cards ── */
        .stat-card:hover, .chart-card:hover, .insight-card:hover  {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 1.25rem;
            margin-bottom: 2rem;
            padding-bottom: 1.25rem;
          }
          .header-text h1 {
            font-size: 1.5rem;
          }
          .header-text p {
            font-size: 0.875rem;
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
