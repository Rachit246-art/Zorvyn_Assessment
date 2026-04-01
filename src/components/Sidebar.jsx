import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  PieChart, 
  LogOut, 
  Shield, 
  User,
  Settings,
  Menu,
  Zap,
  X
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const Sidebar = () => {
  const { role, setRole } = useFinance();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, target: 'overview' },
    { id: 'analytics', label: 'Analytics', icon: PieChart, target: 'analytics' },
    { id: 'insights', label: 'Insights', icon: Zap, target: 'insights' },
    { id: 'transactions', label: 'Transactions', icon: History, target: 'transactions' },
    { id: 'settings', label: 'Settings', icon: Settings, target: 'settings' },
  ];

  const handleNavClick = (id, target) => {
    setActiveItem(id);
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.innerWidth <= 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        className="mobile-menu-btn glass"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          padding: '0.75rem',
          zIndex: 100
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`sidebar glass ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">V</div>
            <span className="font-outfit">Vortex Financial</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button 
              key={item.id} 
              className={`nav-item ${item.id === activeItem ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id, item.target)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="role-switcher glass">
            <div className="role-toggle">
              <button 
                className={role === 'viewer' ? 'active' : ''} 
                onClick={() => setRole('viewer')}
              >
                <User size={14} />
                <span>Viewer</span>
              </button>
              <button 
                className={role === 'admin' ? 'active' : ''} 
                onClick={() => setRole('admin')}
              >
                <Shield size={14} />
                <span>Admin</span>
              </button>
            </div>
          </div>
          
          <div className="user-profile">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
              alt="User" 
            />
            <div className="user-info">
              <p className="user-name">John Doe</p>
              <p className="user-role">{role.charAt(0).toUpperCase() + role.slice(1)} Mode</p>
            </div>
            <button className="logout-btn">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <style jsx="true">{`
        .sidebar {
          width: var(--nav-width);
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          border-radius: 0;
          border-left: none;
          border-top: none;
          border-bottom: none;
          display: flex;
          flex-direction: column;
          z-index: 50;
          padding: 1.5rem;
          transition: var(--transition);
        }

        .sidebar-header {
          margin-bottom: 2.5rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.25rem;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-text-fill-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 1rem;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          color: var(--text-secondary);
          width: 100%;
          text-align: left;
        }

        .nav-item:hover, .nav-item.active {
          background: var(--bg-card-hover);
          color: var(--text-primary);
        }

        .nav-item.active {
          box-shadow: inset 0 0 0 1px var(--border-glass);
          background: var(--primary);
          color: white;
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-glass);
        }

        .role-switcher {
          padding: 4px;
          border-radius: 12px;
        }

        .role-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
        }

        .role-toggle button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 8px;
          border-radius: 8px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .role-toggle button.active {
          background: var(--bg-card-hover);
          color: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-profile img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-card-hover);
        }

        .user-info {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.875rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .logout-btn {
          color: var(--text-secondary);
        }

        .logout-btn:hover {
          color: var(--danger);
        }

        @media (max-width: 1024px) {
          .mobile-menu-btn { display: block !important; }
          .sidebar {
            transform: translateX(-100%);
            width: 280px;
            background: rgba(10, 10, 12, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 20px 0 50px rgba(0,0,0,0.5);
          }
          .sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
