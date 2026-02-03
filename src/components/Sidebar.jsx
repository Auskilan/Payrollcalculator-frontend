import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Building2,
    Users,
    Clock,
    Calendar,
    Banknote,
    FileBarChart,
    Settings,
    Gem,
    LogOut,
    ChevronLeft
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();

    // In a real app, this would come from an auth context
    const role = localStorage.getItem('userRole') || 'super_admin';

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const adminMenuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Building2, label: 'Organization', path: '/organization' },
        { icon: Users, label: 'Employees', path: '/employees' },
        { icon: Clock, label: 'Attendance', path: '/attendance' },
        { icon: Calendar, label: 'Leaves', path: '/leaves' },
        { icon: Banknote, label: 'Payroll', path: '/payroll' },
        { icon: FileBarChart, label: 'Reports', path: '/reports' },
    ];

    const employeeMenuItems = [
        { icon: LayoutDashboard, label: 'My Dashboard', path: '/employee/dashboard' },
        { icon: Clock, label: 'My Attendance', path: '/employee/attendance' },
        { icon: Calendar, label: 'Leaves', path: '/employee/leaves' },
        { icon: Banknote, label: 'My Payslips', path: '/employee/payslips' },
    ];

    const menuItems = role === 'employee' ? employeeMenuItems : adminMenuItems;

    return (
        <aside style={{
            width: isOpen ? 'var(--sidebar-width)' : '80px',
            height: '100vh',
            background: 'var(--color-surface)',
            borderRight: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.3s ease',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 50
        }}>
            {/* Brand */}
            <div style={{
                height: 'var(--header-height)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isOpen ? 'flex-start' : 'center',
                padding: '0 1.5rem',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                }}>
                    <Gem size={18} />
                </div>
                {isOpen && (
                    <span style={{
                        marginLeft: '0.75rem',
                        fontWeight: '700',
                        fontSize: '1.25rem',
                        background: 'linear-gradient(90deg, var(--color-text-main), var(--color-text-muted))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        JewelFlow
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `stitch-nav-item ${isActive ? 'active' : ''}`}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                textDecoration: 'none',
                                color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                                background: isActive ? 'var(--color-primary-bg)' : 'transparent',
                                fontWeight: isActive ? 500 : 400,
                                justifyContent: isOpen ? 'flex-start' : 'center',
                                transition: 'all 0.2s'
                            })}
                        >
                            <item.icon size={20} strokeWidth={1.5} />
                            {isOpen && <span style={{ marginLeft: '1rem' }}>{item.label}</span>}
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* Footer / User */}
            <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <button
                    className="stitch-btn stitch-btn-outline"
                    style={{ width: '100%', justifyContent: isOpen ? 'flex-start' : 'center', border: 'none' }}
                    onClick={handleLogout}
                >
                    <LogOut size={20} />
                    {isOpen && <span style={{ marginLeft: '0.75rem' }}>Logout</span>}
                </button>
            </div>

        </aside>
    );
};

export default Sidebar;
