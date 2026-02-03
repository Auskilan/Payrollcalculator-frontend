import React, { useState, useEffect } from 'react';
import { User, Check, X, Clock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PendingRequests = () => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    // Load only pending requests from localStorage
    useEffect(() => {
        const loadRequests = () => {
            const allLeaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
            const pending = allLeaves.filter(req => req.status === 'Pending');
            setRequests(pending);
        };

        loadRequests();
        // Listen for storage changes (if employee applies while admin is on dashboard)
        window.addEventListener('storage', loadRequests);
        return () => window.removeEventListener('storage', loadRequests);
    }, []);

    const handleAction = (id, newStatus) => {
        const allLeaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
        const updated = allLeaves.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
        );
        localStorage.setItem('leaveRequests', JSON.stringify(updated));
        setRequests(updated.filter(req => req.status === 'Pending'));
    };

    return (
        <div className="stitch-card" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ padding: '8px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', color: 'var(--color-primary-dark)' }}>
                        <Clock size={20} />
                    </div>
                    <h3 className="stitch-heading" style={{ fontSize: '1.1rem', fontWeight: '700' }}>Pending Requests</h3>
                </div>
                <span className="stitch-badge stitch-badge-active" style={{ fontSize: '0.75rem', background: requests.length > 0 ? 'rgba(245, 158, 11, 0.1)' : '#F1F5F9', color: requests.length > 0 ? '#F59E0B' : '#64748B' }}>
                    {requests.length} New
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {requests.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                        <p style={{ fontSize: '0.9rem' }}>No new requests at the moment.</p>
                    </div>
                ) : (
                    requests.map((req) => (
                        <div key={req.id} className="request-item" style={{
                            display: 'flex',
                            gap: '1rem',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid var(--color-border)',
                            alignItems: 'flex-start'
                        }}>
                            {/* Avatar */}
                            <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '10px',
                                background: 'var(--color-primary-bg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-primary-dark)',
                                fontWeight: '700',
                                flexShrink: 0
                            }}>
                                {req.name.charAt(0)}
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text-main)' }}>{req.type}</h4>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={12} /> {req.days} Day{req.days > 1 ? 's' : ''}
                                    </span>
                                </div>

                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                                    <span style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{req.name}</span> • {req.role}
                                </p>

                                <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '0.75rem', lineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    "{req.reason}"
                                </p>

                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button
                                        onClick={() => handleAction(req.id, 'Approved')}
                                        className="stitch-btn"
                                        style={{
                                            padding: '0.4rem 1rem',
                                            fontSize: '0.8rem',
                                            borderRadius: '8px',
                                            background: '#10B981',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        <Check size={14} /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(req.id, 'Rejected')}
                                        className="stitch-btn stitch-btn-outline"
                                        style={{
                                            padding: '0.4rem 1rem',
                                            fontSize: '0.8rem',
                                            borderRadius: '8px',
                                            background: 'white',
                                            borderColor: '#EF4444',
                                            color: '#EF4444',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        <X size={14} /> Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button
                    onClick={() => navigate('/leaves')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary-dark)',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}
                >
                    Management Portal
                </button>
            </div>
        </div>
    );
};

export default PendingRequests;
