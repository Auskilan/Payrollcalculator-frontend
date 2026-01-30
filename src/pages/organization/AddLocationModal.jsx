import React, { useState } from 'react';
import {
    X,
    MapPin,
    Building2,
    Save,
    Map,
    Navigation,
    Activity,
    Cpu,
    CheckCircle2,
    ShieldCheck,
    Phone,
    Mail,
    Globe
} from 'lucide-react';

const AddLocationModal = ({ onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState('branch');
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        state: '',
        address: '',
        status: 'Active',
        deviceCount: 0,
        isMain: false,
        biometricEnabled: false,
        phone: '',
        email: '',
        website: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        if (!formData.name || !formData.address) {
            alert('Please fill in required fields (Branch Name, Address)');
            return;
        }

        onSave(null, formData);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div className="stitch-card animate-fade-in" style={{
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--color-surface)'
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Add New Location</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Enter the details for the new branch.</p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-text-muted)'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
                        {[
                            { id: 'branch', label: 'Branch Details' },
                            { id: 'contact', label: 'Contact Details' },
                            { id: 'asset', label: 'Asset Details' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '0.75rem 0',
                                    border: 'none',
                                    background: 'none',
                                    borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                                    color: activeTab === tab.id ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                                    fontWeight: activeTab === tab.id ? '600' : '500',
                                    cursor: 'pointer',
                                    marginRight: '1rem'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                        {activeTab === 'branch' && (
                            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="block mb-2 text-sm font-medium">Branch Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <Building2 size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="e.g. Main Branch - T. Nagar"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">City</label>
                                    <div style={{ position: 'relative' }}>
                                        <Navigation size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            type="text"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="e.g. Chennai"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">State</label>
                                    <div style={{ position: 'relative' }}>
                                        <Map size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            type="text"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="e.g. Tamil Nadu"
                                        />
                                    </div>
                                </div>

                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="block mb-2 text-sm font-medium">Full Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            type="text"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="Complete office address"
                                        />
                                    </div>
                                </div>

                                <div style={{
                                    gridColumn: 'span 2',
                                    padding: '1.25rem',
                                    background: 'var(--color-surface-hover)',
                                    borderRadius: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    border: '1px solid var(--color-border)',
                                    marginTop: '0.5rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                padding: '0.5rem',
                                                borderRadius: '0.5rem',
                                                background: 'var(--color-primary-bg)',
                                                color: 'var(--color-primary)'
                                            }}>
                                                <CheckCircle2 size={18} />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>Primary Location</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Set this as the headquarters</p>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            name="isMain"
                                            checked={formData.isMain}
                                            onChange={handleChange}
                                            style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                padding: '0.5rem',
                                                borderRadius: '0.5rem',
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                color: 'var(--color-info)'
                                            }}>
                                                <ShieldCheck size={18} />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>Biometric Access</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Enable fingerprint/face ID sync</p>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            name="biometricEnabled"
                                            checked={formData.biometricEnabled}
                                            onChange={handleChange}
                                            style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Phone Number</label>
                                    <div style={{ position: 'relative' }}>
                                        <Phone size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            type="tel"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="branch@company.com"
                                        />
                                    </div>
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="block mb-2 text-sm font-medium">Website</label>
                                    <div style={{ position: 'relative' }}>
                                        <Globe size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            type="url"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="https://www.company.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'asset' && (
                            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Operation Status</label>
                                    <div style={{ position: 'relative' }}>
                                        <Activity size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem', appearance: 'none' }}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Device Count</label>
                                    <div style={{ position: 'relative' }}>
                                        <Cpu size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="deviceCount"
                                            value={formData.deviceCount}
                                            onChange={handleChange}
                                            type="number"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <div style={{ gridColumn: 'span 2', padding: '1rem', background: 'var(--color-primary-bg)', borderRadius: 'var(--radius-md)' }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-primary-dark)', fontWeight: '500' }}>
                                        Note: Device count is automatically synced from the connected biometric systems.
                                    </p>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.5rem',
                    borderTop: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem'
                }}>
                    <button type="button" className="stitch-btn stitch-btn-outline" onClick={onClose}>Cancel</button>
                    <button
                        type="button"
                        className="stitch-btn stitch-btn-primary"
                        onClick={handleSave}
                    >
                        <Save size={18} />
                        Save Location
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddLocationModal;
