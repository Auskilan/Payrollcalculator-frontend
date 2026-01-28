import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    // Extract title from path
    const getTitle = () => {
        const path = location.pathname.split('/')[1];
        return path.charAt(0).toUpperCase() + path.slice(1) || 'Dashboard';
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <main style={{
                flex: 1,
                marginLeft: sidebarOpen ? 'var(--sidebar-width)' : '80px',
                transition: 'margin-left 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Header title={getTitle()} />

                <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
