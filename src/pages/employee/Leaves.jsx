import React, { useState, useEffect } from 'react';
import { Send, Clock, CheckCircle2, XCircle, AlertCircle, Edit, Trash2 } from 'lucide-react';

import Notification from '../../components/common/Notification';

const Leaves = () => {
    const [showForm, setShowForm] = useState(false);
    const [notification, setNotification] = useState(null);
    const [leaveRequests, setLeaveRequests] = useState([]);

    // Form state
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        type: 'Annual Leave',
        startDate: '',
        endDate: '',
        reason: ''
    });


    // Load leaves from localStorage
    useEffect(() => {
        const savedLeaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
        // In a real app, we'd filter for the logged-in employee
        setLeaveRequests(savedLeaves);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.startDate || !formData.endDate || !formData.reason) {
            setNotification({ message: 'Please fill all fields', type: 'error' });
            return;
        }

        if (editingId) {
            const updatedLeaves = leaveRequests.map(req =>
                req.id === editingId
                    ? {
                        ...req,
                        type: formData.type,
                        fromDate: formData.startDate,
                        toDate: formData.endDate,
                        days: Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1,
                        reason: formData.reason
                    }
                    : req
            );
            localStorage.setItem('leaveRequests', JSON.stringify(updatedLeaves));
            setLeaveRequests(updatedLeaves);
            setNotification({ message: 'Leave request updated successfully!', type: 'success' });
        } else {
            const newRequest = {
                id: 'L' + Date.now(),
                employeeId: 'EMP-ALEX', // Simulated current user
                name: 'Alex Johnson',
                role: 'Senior Goldsmith',
                type: formData.type,
                fromDate: formData.startDate,
                toDate: formData.endDate,
                days: Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1,
                reason: formData.reason,
                status: 'Pending',
                appliedOn: new Date().toISOString().split('T')[0]
            };

            const updatedLeaves = [newRequest, ...leaveRequests];
            localStorage.setItem('leaveRequests', JSON.stringify(updatedLeaves));
            setLeaveRequests(updatedLeaves);
            setNotification({
                message: '🎉 Leave request submitted successfully! Waiting for admin approval.',
                type: 'success'
            });
        }

        setShowForm(false);
        setEditingId(null);
        setFormData({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
    };

    const handleEdit = (request) => {
        setFormData({
            type: request.type,
            startDate: request.fromDate,
            endDate: request.toDate,
            reason: request.reason
        });
        setEditingId(request.id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this leave request?')) {
            const updatedLeaves = leaveRequests.filter(req => req.id !== id);
            localStorage.setItem('leaveRequests', JSON.stringify(updatedLeaves));
            setLeaveRequests(updatedLeaves);
            setNotification({ message: 'Leave request deleted successfully', type: 'success' });
        }
    };


    const getStatusStyles = (status) => {
        switch (status) {
            case 'Approved': return { background: '#ECFDF5', color: '#10B981', icon: CheckCircle2 };
            case 'Rejected': return { background: '#FEF2F2', color: '#EF4444', icon: XCircle };
            default: return { background: '#FFF7ED', color: '#F59E0B', icon: Clock };
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.5rem' }}>
                        Leave Management
                    </h1>
                    <p style={{ color: '#64748B' }}>Request time off and track your leave applications.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {showForm && (
                        <button
                            onClick={() => { setShowForm(false); setEditingId(null); setFormData({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' }); }}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '12px',
                                border: '1px solid #E2E8F0',
                                background: '#FFFFFF',
                                color: '#64748B',
                                fontWeight: '600',
                                cursor: 'pointer',
                                marginRight: '1rem'
                            }}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            if (showForm) {
                                setEditingId(null);
                                setFormData({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
                            }
                        }}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #D4AF37 0%, #A68625 100%)',
                            color: '#FFFFFF',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
                        }}
                    >
                        <Send size={18} />
                        {showForm ? 'View My Leaves' : 'Apply for Leave'}
                    </button>
                </div>

            </div>

            {showForm ? (
                <div style={{
                    background: '#FFFFFF',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #F1F5F9',
                    maxWidth: '800px'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '2rem' }}>
                        {editingId ? 'Edit Leave Request' : 'Apply for Leave'}
                    </h2>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>Leave Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none' }}
                            >
                                <option>Annual Leave</option>
                                <option>Sick Leave</option>
                                <option>Casual Leave</option>
                                <option>Marriage Leave</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none' }}
                            />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>Reason</label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                rows={4}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', resize: 'none' }}
                                placeholder="Why are you taking this leave?"
                            ></textarea>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <button type="submit" style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: 'none',
                                background: '#1E293B',
                                color: '#FFFFFF',
                                fontWeight: '700',
                                cursor: 'pointer'
                            }}>
                                {editingId ? 'Update Request' : 'Submit Request'}
                            </button>

                        </div>
                    </form>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                    {leaveRequests.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                            <AlertCircle size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                            <p>You haven't applied for any leaves yet.</p>
                        </div>
                    ) : (
                        leaveRequests.map((request) => {
                            const styles = getStatusStyles(request.status);
                            const StatusIcon = styles.icon;

                            return (
                                <div key={request.id} style={{
                                    background: '#FFFFFF',
                                    padding: '1.5rem',
                                    borderRadius: '20px',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid #F1F5F9',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.25rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1E293B' }}>{request.type}</h3>
                                            <p style={{ fontSize: '0.875rem', color: '#64748B' }}>{request.days} Day{request.days > 1 ? 's' : ''}</p>
                                        </div>
                                        <span style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.375rem',
                                            padding: '0.375rem 0.875rem',
                                            borderRadius: '99px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            background: styles.background,
                                            color: styles.color
                                        }}>
                                            <StatusIcon size={14} />
                                            {request.status.toUpperCase()}
                                        </span>
                                    </div>


                                    <div style={{ display: 'flex', gap: '1rem', background: '#F8FAFC', padding: '1rem', borderRadius: '12px' }}>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Start</p>
                                            <p style={{ fontWeight: '600', color: '#475569' }}>{request.fromDate}</p>
                                        </div>
                                        <div style={{ borderLeft: '1px solid #E2E8F0' }}></div>
                                        <div style={{ flex: 1, paddingLeft: '1rem' }}>
                                            <p style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>End</p>
                                            <p style={{ fontWeight: '600', color: '#475569' }}>{request.toDate}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p style={{ fontSize: '0.875rem', color: '#64748B', display: 'flex', gap: '0.5rem' }}>
                                            <AlertCircle size={16} />
                                            {request.reason}
                                        </p>
                                    </div>

                                    {request.status === 'Pending' && (
                                        <div style={{
                                            display: 'flex',
                                            gap: '0.75rem',
                                            marginTop: '0.5rem',
                                            paddingTop: '1rem',
                                            borderTop: '1px dashed #E2E8F0',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <button
                                                onClick={() => handleEdit(request)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    background: '#F1F5F9',
                                                    color: '#475569',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.target.style.background = '#E2E8F0'}
                                                onMouseLeave={(e) => e.target.style.background = '#F1F5F9'}
                                            >
                                                <Edit size={16} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(request.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    background: '#FEF2F2',
                                                    color: '#EF4444',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.target.style.background = '#FEE2E2'}
                                                onMouseLeave={(e) => e.target.style.background = '#FEF2F2'}
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>

                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default Leaves;
