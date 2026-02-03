import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight,
    FileText,
    MoreVertical
} from 'lucide-react';

const LeaveDashboard = () => {
    const [activeTab, setActiveTab] = useState('All');

    // Mock Data
    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: 'L001',
            employeeId: 'EMP001',
            name: 'Priya Sharma',
            role: 'Sales Executive',
            type: 'Sick Leave',
            fromDate: '2026-01-22',
            toDate: '2026-01-23',
            days: 2,
            reason: 'High fever and viral infection',
            status: 'Pending',
            appliedOn: '2026-01-20'
        },
        {
            id: 'L002',
            employeeId: 'EMP002',
            name: 'Rahul Verma',
            role: 'Goldsmith',
            type: 'Casual Leave',
            fromDate: '2026-02-10',
            toDate: '2026-02-12',
            days: 3,
            reason: 'Family wedding in hometown',
            status: 'Approved',
            appliedOn: '2026-01-15'
        },
        {
            id: 'L003',
            employeeId: 'EMP005',
            name: 'Vikram Singh',
            role: 'Senior Artisan',
            type: 'Emergency Leave',
            fromDate: '2026-01-21',
            toDate: '2026-01-21',
            days: 1,
            reason: 'Medical emergency',
            status: 'Approved',
            appliedOn: '2026-01-20'
        },
        {
            id: 'L004',
            employeeId: 'EMP003',
            name: 'Anjali Gupta',
            role: 'Store Manager',
            type: 'Sick Leave',
            fromDate: '2026-01-18',
            toDate: '2026-01-18',
            days: 1,
            reason: 'Migraine',
            status: 'Rejected',
            appliedOn: '2026-01-18'
        },
    ]);

    const stats = {
        pending: leaveRequests.filter(r => r.status === 'Pending').length,
        approved: leaveRequests.filter(r => r.status === 'Approved').length,
        rejected: leaveRequests.filter(r => r.status === 'Rejected').length,
        today: leaveRequests.filter(r => {
            const today = '2026-01-21';
            return r.status === 'Approved' && currentIsBetween(today, r.fromDate, r.toDate);
        }).length
    };

    function currentIsBetween(target, start, end) {
        return target >= start && target <= end;
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'success';
            case 'Pending': return 'warning';
            case 'Rejected': return 'error';
            default: return 'text-muted';
        }
    };

    const getStatusBadgeStyle = (status) => {
        const colorVar = getStatusColor(status);
        let bg, color;
        if (colorVar === 'success') { bg = 'rgba(16, 185, 129, 0.1)'; color = '#10B981'; }
        else if (colorVar === 'warning') { bg = 'rgba(245, 158, 11, 0.1)'; color = '#F59E0B'; }
        else if (colorVar === 'error') { bg = 'rgba(239, 68, 68, 0.1)'; color = '#EF4444'; }
        else { bg = '#F1F5F9'; color = '#64748B'; }

        return {
            backgroundColor: bg,
            color: color,
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
        };
    };

    const handleAction = (id, newStatus) => {
        setLeaveRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
        ));
    };

    const filteredRequests = activeTab === 'All'
        ? leaveRequests
        : leaveRequests.filter(req => req.status === activeTab);

    return (
        <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>

            {/* Header */}
            <div style={{
                marginBottom: '2rem'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, var(--color-text-main), var(--color-text-muted))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Leave Management
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
                    <Calendar size={16} />
                    <span>Track and manage employee leave requests.</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <div className="stitch-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(245, 158, 11, 0.1)',
                        color: '#F59E0B',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Clock size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Pending Requests</p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.pending}</h2>
                    </div>
                </div>

                <div className="stitch-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10B981',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Approved</p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.approved}</h2>
                    </div>
                </div>

                <div className="stitch-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <XCircle size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Rejected</p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.rejected}</h2>
                    </div>
                </div>

                <div className="stitch-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#3B82F6',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>On Leave Today</p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.today}</h2>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {['All', 'Pending', 'Approved', 'Rejected'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: activeTab === tab ? 'var(--color-primary)' : 'var(--color-surface)',
                            color: activeTab === tab ? '#FFF' : 'var(--color-text-muted)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            boxShadow: activeTab === tab ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Leave Table */}
            <div className="stitch-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Employee</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Leave Type</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Duration</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Reason</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Status</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((req) => (
                                <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '36px', height: '36px', borderRadius: '50%',
                                                background: 'var(--color-primary-bg)', color: 'var(--color-primary-dark)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600'
                                            }}>
                                                {req.name.charAt(0)}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: '500' }}>{req.name}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{req.role}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--color-text-main)' }}>
                                        {req.type}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: '500' }}>{req.days} Day{req.days > 1 ? 's' : ''}</span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                                {new Date(req.fromDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                                {req.days > 1 && ` - ${new Date(req.toDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', maxWidth: '250px' }}>
                                        <p style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--color-text-muted)' }}>
                                            {req.reason}
                                        </p>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={getStatusBadgeStyle(req.status)}>
                                            {req.status === 'Approved' && <CheckCircle size={12} />}
                                            {req.status === 'Rejected' && <XCircle size={12} />}
                                            {req.status === 'Pending' && <Clock size={12} />}
                                            {req.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {req.status === 'Pending' ? (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    className="stitch-btn stitch-btn-outline"
                                                    style={{ borderColor: '#10B981', color: '#10B981', padding: '0.25rem 0.6rem' }}
                                                    onClick={() => handleAction(req.id, 'Approved')}
                                                    title="Approve"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                                <button
                                                    className="stitch-btn stitch-btn-outline"
                                                    style={{ borderColor: '#EF4444', color: '#EF4444', padding: '0.25rem 0.6rem' }}
                                                    onClick={() => handleAction(req.id, 'Rejected')}
                                                    title="Reject"
                                                >
                                                    <XCircle size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="stitch-btn stitch-btn-outline" style={{ border: 'none', color: 'var(--color-text-muted)' }}>
                                                <MoreVertical size={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                    <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <p>No leave requests found</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Showing {filteredRequests.length} record{filteredRequests.length !== 1 ? 's' : ''}
            </div>


        </div>
    );
};

export default LeaveDashboard;
