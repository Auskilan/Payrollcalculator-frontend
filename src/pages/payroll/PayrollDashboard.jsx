import React, { useState } from 'react';
import {
    DollarSign,
    Calculator,
    FileCheck,
    Lock,
    Download,
    Eye,
    CheckCircle,
    Search
} from 'lucide-react';

const PayrollDashboard = () => {
    const [month, setMonth] = useState('October 2023');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Payroll Data
    const payrollData = [
        {
            id: 'PAY001',
            employee: 'Priya Sharma',
            basicSalary: 25000,
            workingHours: 192,
            deductions: 500, // Late/Absent
            overtime: 1200,
            finalSalary: 25700,
            status: 'Approved',
        },
        {
            id: 'PAY002',
            employee: 'Rahul Verma',
            basicSalary: 18000,
            workingHours: 180,
            deductions: 0,
            overtime: 0,
            finalSalary: 18000,
            status: 'Draft',
        },
        {
            id: 'PAY003',
            employee: 'Anjali Gupta',
            basicSalary: 35000,
            workingHours: 160,
            deductions: 2000, // Unpaid Leave
            overtime: 0,
            finalSalary: 33000,
            status: 'Locked',
        }
    ];

    const filteredPayroll = payrollData.filter(item =>
        item.employee.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Approved':
                return (
                    <span className="stitch-badge stitch-badge-active" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle size={12} /> Approved
                    </span>
                );
            case 'Locked':
                return (
                    <span className="stitch-badge" style={{ background: 'var(--color-bg)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Lock size={12} /> Locked
                    </span>
                );
            default: // Draft
                return (
                    <span className="stitch-badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-info)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FileCheck size={12} /> Draft
                    </span>
                );
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(135deg, var(--color-text-main), var(--color-text-muted))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Payroll Management
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Calculate salaries, manage deductions, and process payments.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Search Bar */}
                    <div style={{
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        width: '300px',
                        maxWidth: '100%'
                    }}>
                        <Search size={20} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                outline: 'none',
                                fontSize: '0.95rem',
                                color: 'var(--color-text-main)',
                                width: '100%',
                                fontWeight: '500'
                            }}
                        />
                    </div>

                    <select className="stitch-input" value={month} onChange={(e) => setMonth(e.target.value)} style={{ width: '180px' }}>
                        <option>September 2023</option>
                        <option>October 2023</option>
                        <option>November 2023</option>
                    </select>
                    <button className="stitch-btn stitch-btn-primary">
                        <Calculator size={18} />
                        Run Payroll
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <div className="stitch-card" style={{ padding: '1.5rem' }}>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Total Payroll Cost</p>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary-dark)' }}>₹ 76,700</h2>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--color-success)' }}>+2.5% from last month</p>
                </div>

                <div className="stitch-card" style={{ padding: '1.5rem' }}>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Pending Approvals</p>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>1</h2>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>Needs review</p>
                </div>

                <div className="stitch-card" style={{ padding: '1.5rem' }}>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Paid Employees</p>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>2 / 3</h2>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--color-success)' }}>Processing...</p>
                </div>
            </div>

            {/* Payroll Table */}
            <div className="stitch-card" style={{ padding: '0', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                    <thead style={{ background: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Employee</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Status</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Work Hrs</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Base Salary</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>(+) Overtime</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>(-) Deductions</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Net Salary</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayroll.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{item.employee}</td>
                                <td style={{ padding: '1rem' }}>{getStatusBadge(item.status)}</td>
                                <td style={{ padding: '1rem' }}>{item.workingHours}h</td>
                                <td style={{ padding: '1rem' }}>₹{item.basicSalary.toLocaleString()}</td>
                                <td style={{ padding: '1rem', color: 'var(--color-success)' }}>+ ₹{item.overtime.toLocaleString()}</td>
                                <td style={{ padding: '1rem', color: 'var(--color-error)' }}>- ₹{item.deductions.toLocaleString()}</td>
                                <td style={{ padding: '1rem', fontWeight: '700', fontSize: '1.1rem' }}>₹{item.finalSalary.toLocaleString()}</td>
                                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <button className="stitch-btn stitch-btn-outline" style={{ padding: '0.25rem', border: 'none' }} title="View Breakdown">
                                        <Eye size={18} />
                                    </button>
                                    <button className="stitch-btn stitch-btn-outline" style={{ padding: '0.25rem', border: 'none' }} title="Download Slip">
                                        <Download size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PayrollDashboard;
