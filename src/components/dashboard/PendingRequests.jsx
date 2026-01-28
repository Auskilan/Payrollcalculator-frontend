import React from 'react';
import { User, Check, X } from 'lucide-react';

const PendingRequests = () => {
    const requests = [
        { id: 1, type: 'Leave Request', user: 'Sarah Smith', time: '2 Days', avatar: null },
        { id: 2, type: 'Leave Request', user: 'Sarah Smith', time: '2 Days', avatar: null },
        { id: 3, type: 'Leave Request', user: 'Sarah Smith', time: '2 Days', avatar: null },
    ];

    return (
        <div className="stitch-card" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 className="stitch-heading" style={{ fontSize: '1.1rem', fontWeight: '600' }}>Pending Requests</h3>
                <span className="stitch-badge stitch-badge-active" style={{ fontSize: '0.75rem' }}>{requests.length} New</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {requests.map((req) => (
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
                            borderRadius: '50%',
                            background: 'var(--color-surface-hover)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-muted)',
                            flexShrink: 0
                        }}>
                            <User size={20} />
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-main)' }}>{req.type}</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{req.time}</span>
                            </div>

                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                                {req.user}
                            </p>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button className="stitch-btn stitch-btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', borderRadius: '20px' }}>
                                    <span style={{ marginRight: '4px' }}>Approve</span>
                                </button>
                                <button className="stitch-btn stitch-btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', borderRadius: '20px', background: 'white' }}>
                                    <span style={{ marginRight: '4px' }}>Reject</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All footer if needed */}
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-primary-dark)',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                }}>
                    View all requests
                </button>
            </div>
        </div>
    );
};

export default PendingRequests;
