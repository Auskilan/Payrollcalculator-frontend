import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import SuperAdminSignup from './pages/auth/SuperAdminSignup';
import ShopDetails from './pages/auth/ShopDetails';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import EmployeeList from './pages/employees/EmployeeList';
import AttendanceDashboard from './pages/attendance/AttendanceDashboard';
import LeaveDashboard from './pages/leaves/LeaveDashboard';
import PayrollDashboard from './pages/payroll/PayrollDashboard';
import Organization from './pages/organization/Organization';
import ReportsDashboard from './pages/reports/ReportsDashboard';

// Placeholder components for other routes
const Placeholder = ({ title }) => (
  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
    <h2>{title} Module</h2>
    <p>Coming Soon</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SuperAdminSignup />} />
        <Route path="/shop-details" element={<ShopDetails />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="attendance" element={<AttendanceDashboard />} />
          <Route path="leaves" element={<LeaveDashboard />} />
          <Route path="payroll" element={<PayrollDashboard />} />
          <Route path="organization" element={<Organization />} />
          <Route path="reports" element={<ReportsDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
