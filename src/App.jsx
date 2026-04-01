import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import SummaryCards from './components/SummaryCards';
import AnalyticsSection from './components/AnalyticsSection';
import InsightsSection from './components/InsightsSection';
import TransactionList from './components/TransactionList';

const Dashboard = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">

        {/* Main window chrome */}
        <div className="win-window" style={{ marginBottom: '6px' }}>
          <div className="win-titlebar">
            <div className="win-titlebar-left">
              <span style={{ fontSize: '12px' }}>📊</span>
              <span>Vortex Financial Dashboard</span>
            </div>
            <div style={{ display: 'flex', gap: '2px' }}>
              <span className="win-titlebar-btn">_</span>
              <span className="win-titlebar-btn">□</span>
              <span className="win-titlebar-btn" style={{ fontWeight: 'bold', color: '#800000' }}>✕</span>
            </div>
          </div>

          {/* Menu bar */}
          <div style={{
            background: 'var(--win-face)',
            borderBottom: '1px solid var(--win-shadow)',
            display: 'flex',
            gap: '0',
            padding: '2px 0 0 0',
            fontSize: '11px',
          }}>
            {['File', 'Edit', 'View', 'Accounts', 'Reports', 'Tools', 'Help'].map(m => (
              <span key={m} style={{
                padding: '3px 8px',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.target.style.background = 'var(--win-selected)'; e.target.style.color = 'white'; }}
              onMouseLeave={e => { e.target.style.background = ''; e.target.style.color = ''; }}
              >{m}</span>
            ))}
          </div>

          {/* Toolbar */}
          <div style={{
            background: 'var(--win-face)',
            borderBottom: '1px solid var(--win-shadow)',
            padding: '3px 4px',
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            {['◀ Back', '▶ Forward', '⟳ Refresh', '🏠 Home'].map(b => (
              <button key={b} className="win-btn" style={{ minWidth: 'unset', padding: '2px 8px', fontSize: '11px' }}>{b}</button>
            ))}
            <div style={{ width: '1px', height: '20px', background: 'var(--win-shadow)', margin: '0 2px' }} />
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '4px' }}>
              <span style={{ fontSize: '11px' }}>Address:</span>
              <div className="win-sunken" style={{ flex: 1, padding: '1px 4px', fontSize: '11px', background: 'white' }}>
                C:\Vortex\Financial\Dashboard.exe
              </div>
              <button className="win-btn" style={{ minWidth: 'unset', padding: '2px 12px', fontSize: '11px' }}>Go</button>
            </div>
          </div>

          {/* Date status bar at top */}
          <div style={{
            background: 'var(--win-face)',
            padding: '4px 8px',
            fontSize: '11px',
            color: '#000',
            borderBottom: '1px solid var(--win-shadow)',
          }}>
            <span>📅 {today}</span>
          </div>
        </div>

        {/* Overview section */}
        <section id="overview" style={{ marginBottom: '6px' }}>
          <SummaryCards />
        </section>

        <section id="analytics" style={{ marginBottom: '6px' }}>
          <AnalyticsSection />
        </section>

        <section id="insights" style={{ marginBottom: '6px' }}>
          <InsightsSection />
        </section>

        <section id="transactions" style={{ marginBottom: '6px' }}>
          <TransactionList />
        </section>

        {/* Settings Panel */}
        <section id="settings" style={{ marginBottom: '6px' }}>
          <div className="win-window">
            <div className="win-titlebar">
              <div className="win-titlebar-left">
                <span>⚙</span>
                <span>Account Settings</span>
              </div>
            </div>
            <div style={{ padding: '8px', background: 'var(--win-face)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div className="win-groupbox">
                  <span className="win-groupbox-label">Profile Information</span>
                  <p style={{ fontSize: '11px', marginTop: '4px' }}>Update your avatar, name and personal details.</p>
                  <div style={{ marginTop: '8px' }}>
                    <button className="win-btn">Edit Profile...</button>
                  </div>
                </div>
                <div className="win-groupbox">
                  <span className="win-groupbox-label">Security &amp; Privacy</span>
                  <p style={{ fontSize: '11px', marginTop: '4px' }}>Manage your password and multi-factor authentication.</p>
                  <div style={{ marginTop: '8px' }}>
                    <button className="win-btn">Change Password...</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status bar */}
        <div className="win-statusbar" style={{ marginTop: '4px' }}>
          <span className="win-statusbar-panel">Ready</span>
          <span className="win-statusbar-panel">John Doe — Admin Mode</span>
          <span style={{ flex: 1 }} />
          <span className="win-statusbar-panel">{today}</span>
        </div>
      </main>
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
