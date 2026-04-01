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
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const finance = useFinance();
  if (!finance) return null;
  const { role, setRole, user = {} } = finance;

  React.useEffect(() => {
    const sections = ['overview', 'analytics', 'insights', 'transactions', 'settings'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = navItems.find(item => item.target === entry.target.id)?.id;
            if (id) setActiveItem(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
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
      const offset = 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    if (window.innerWidth <= 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <header className="mobile-header glass">
        <div className="logo-container">
          <div className="logo-icon">Z</div>
          <span className="font-outfit">Zorvyan</span>
        </div>
        <button 
          className="mobile-menu-toggle glass-hover"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <aside className={`sidebar glass ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">Z</div>
            <span className="font-outfit">Zorvyan Financial</span>
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
              src={user.avatar} 
              alt="User" 
            />
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p className="user-role">{role.charAt(0).toUpperCase() + role.slice(1)} Mode</p>
            </div>
            <button className="logout-btn">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
