import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, MapPin } from 'lucide-react';
import { useOrganization } from '../context/OrganizationContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ title }) => {
    const { organization, selectedLocation } = useOrganization();
    const navigate = useNavigate();
    const [hasNotifications, setHasNotifications] = useState(false);

    useEffect(() => {
        const checkNotifications = () => {
            const leaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
            const pending = leaves.some(l => l.status === 'Pending');
            setHasNotifications(pending);
        };

        checkNotifications();
        window.addEventListener('storage', checkNotifications);
        return () => window.removeEventListener('storage', checkNotifications);
    }, []);

    return (
        <header style={{
            height: 'var(--header-height)',
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 40
        }}>
            <div className="flex-center">
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-text-main)' }}>{title}</h2>
            </div>

            <div className="flex-center" style={{ gap: '1.5rem' }}>

                {/* Search */}
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="stitch-input"
                        style={{ paddingLeft: '2.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', width: '240px' }}
                    />
                </div>

                {/* Organization/Location Selector */}
                {localStorage.getItem('userRole') === 'super_admin' && (
                    <div
                        className="stitch-btn stitch-btn-outline"
                        style={{
                            padding: '0.4rem 0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            background: 'var(--color-bg)'
                        }}
                        onClick={() => navigate('/organization')}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-main)' }}>
                                {selectedLocation?.name || 'Select Location'}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {organization?.name}
                            </span>
                        </div>
                        <MapPin size={18} style={{ color: 'var(--color-primary)' }} />
                    </div>
                )}

                {/* Actions */}
                <button
                    onClick={() => navigate(localStorage.getItem('userRole') === 'super_admin' ? '/leaves' : '/employee/leaves')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', position: 'relative' }}
                >
                    <Bell size={20} />
                    {hasNotifications && (
                        <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: 'var(--color-error)', border: '2px solid white' }} />
                    )}
                </button>

                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
                    <User size={18} />
                </div>

            </div>
        </header>
    );
};

export default Header;
