import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

const NAV_ITEMS = [
  { id: 'overview',     label: 'Overview',      icon: '📊', target: 'overview' },
  { id: 'analytics',   label: 'Analytics',     icon: '📈', target: 'analytics' },
  { id: 'insights',    label: 'Smart Insights', icon: '⚡', target: 'insights' },
  { id: 'transactions',label: 'Transactions',   icon: '🗃', target: 'transactions' },
  { id: 'settings',    label: 'Settings',       icon: '⚙',  target: 'settings' },
];

const Sidebar = () => {
  const { role, setRole } = useFinance();
  const [activeItem, setActiveItem] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id, target) => {
    setActiveItem(id);
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'auto' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="win-btn"
        onClick={() => setMobileOpen(o => !o)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '6px',
          right: '6px',
          zIndex: 200,
          minWidth: 'unset',
          padding: '4px 8px',
        }}
      >
        ☰
      </button>

      <aside style={{
        width: 'var(--win-sidebar-width)',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        background: 'var(--win-face)',
        borderRight: '2px solid',
        borderRightColor: 'var(--win-shadow)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        overflowY: 'auto',
      }}>
        {/* Logo / title bar */}
        <div style={{
          background: 'linear-gradient(to right, #0a246a, #a6caf0)',
          color: 'white',
          padding: '6px 8px',
          fontSize: '11px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{ fontSize: '14px' }}>💹</span>
          <span>Vortex Financial</span>
        </div>

        {/* Explorer-style tree nav */}
        <div style={{ flex: 1, padding: '6px 0' }}>
          <div style={{
            padding: '4px 8px',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#555',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Navigation
          </div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id, item.target)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                width: '100%',
                padding: '4px 12px',
                background: activeItem === item.id ? 'var(--win-selected)' : 'transparent',
                color: activeItem === item.id ? 'var(--win-selected-text)' : 'var(--win-text)',
                border: 'none',
                cursor: 'default',
                fontSize: '11px',
                textAlign: 'left',
                fontFamily: 'Tahoma, Arial, sans-serif',
              }}
              onMouseEnter={e => {
                if (activeItem !== item.id) {
                  e.currentTarget.style.background = 'var(--win-selected)';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={e => {
                if (activeItem !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--win-text)';
                }
              }}
            >
              <span style={{ fontSize: '12px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--win-shadow)', margin: '0 4px' }} />
        <div style={{ height: '1px', background: 'var(--win-highlight)', margin: '0 4px 4px' }} />

        {/* Role switcher as radio buttons */}
        <div style={{ padding: '6px 8px' }}>
          <div className="win-groupbox">
            <span className="win-groupbox-label">User Mode</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
              {['viewer', 'admin'].map(r => (
                <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', cursor: 'default' }}>
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={() => setRole(r)}
                    style={{ cursor: 'default' }}
                  />
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                  {r === 'admin' && <span style={{ color: '#800000', fontSize: '9px', fontWeight: 'bold' }}>🔒</span>}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* User profile strip */}
        <div style={{
          background: 'linear-gradient(to right, #0a246a, #a6caf0)',
          padding: '6px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'white',
          fontSize: '10px',
        }}>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="User"
            style={{ width: '24px', height: '24px', borderRadius: '2px', border: '1px solid white', background: 'white' }}
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>John Doe</div>
            <div style={{ opacity: 0.8 }}>{role.charAt(0).toUpperCase() + role.slice(1)}</div>
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1024px) {
          aside { transform: ${mobileOpen ? 'translateX(0)' : 'translateX(-100%)'}; }
          button[style*="display: none"] { display: block !important; }
          .main-content { margin-left: 0 !important; }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
