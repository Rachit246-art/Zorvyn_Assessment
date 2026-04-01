import React, { useEffect, useState } from 'react';
import { User, Shield, Edit2, Check, X, Activity } from 'lucide-react';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import SummaryCards from './components/SummaryCards';
import AnalyticsSection from './components/AnalyticsSection';
import InsightsSection from './components/InsightsSection';
import TransactionList from './components/TransactionList';
import { useFinance } from './context/FinanceContext';

const Dashboard = () => {
  const finance = useFinance();
  if (!finance) return null;
  const { loading, user = {}, setUser, toast, showNotification } = finance;
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [savedName, setSavedName] = useState(user?.name || '');
  const [savedEmail, setSavedEmail] = useState(user?.email || '');

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setName(savedName);
    setEmail(savedEmail);
    setIsEditing(false);
  };

  const handleSave = () => {
    setSavedName(name);
    setSavedEmail(email);
    setUser({ ...user, name, email }); // Update centralized state
    setIsEditing(false);
    showNotification('Profile updated successfully!');
  };

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
      {loading && <div className="global-loading-bar" />}
      <Sidebar />
      <main className="main-content">
        <header className="page-header animate-fade-in">
          <div className="header-text">
            <h1 className="font-outfit">Financial Dashboard</h1>
            <p>Welcome back, {user.name}! Here's what's happening today.</p>
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
              {/* Personal Profile Card */}
              <div className="glass-hover setting-card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="card-icon primary"><User size={20} /></div>
                    <h3 className="font-outfit">Personal Profile</h3>
                  </div>
                  {!isEditing ? (
                    <button className="edit-profile-btn glass-hover" onClick={handleEdit} title="Edit Profile">
                      <Edit2 size={15} />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <button className="cancel-profile-btn glass-hover" onClick={handleCancel} title="Cancel">
                      <X size={15} />
                    </button>
                  )}
                </div>
                <div className="input-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="glass profile-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={!isEditing}
                    autoComplete="off"
                  />
                </div>
                <div className="input-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="glass profile-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={!isEditing}
                    autoComplete="off"
                  />
                </div>
                {isEditing && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button className="save-btn" onClick={handleSave}>
                      <Check size={16} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Security & Access Card */}
              <div className="glass-hover setting-card">
                <div className="card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="card-icon success"><Shield size={20} /></div>
                    <h3 className="font-outfit">Security &amp; Access</h3>
                  </div>
                </div>
                <p className="setting-desc">
                  You are currently logged in as <strong>Admin</strong>. 
                  Use the bottom toggle in the sidebar to test different permission levels.
                </p>
                <div className="status-badge glass">
                  <span>Standard Encryption Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Centralized Toast Notification */}
          {toast.show && (
            <div className={`settings-toast ${toast.type}`}>
               {toast.type === 'success' ? <Check size={16} /> : <Activity size={16} />}
               <span>{toast.message}</span>
            </div>
          )}
        </section>
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
