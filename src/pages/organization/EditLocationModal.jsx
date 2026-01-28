import React, { useState, useEffect } from 'react';
import { X, MapPin, Building2, Save, Power, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

const EditLocationModal = ({ location, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        status: 'Active',
        isMain: false,
        deviceCount: 0,
        biometricEnabled: false
    });

    useEffect(() => {
        if (location) {
            setFormData({
                name: location.name || '',
                address: location.address || '',
                status: location.status || 'Active',
                isMain: location.isMain || false,
                deviceCount: location.deviceCount || 0,
                biometricEnabled: location.biometricEnabled || false
            });
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        if (!formData.name || !formData.address) {
            alert('Please fill in the location name and address.');
            return;
        }
        onSave(location?.id, formData);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem'
        }}>
            <div className="stitch-card animate-fade-in" style={{
                width: '100%',
                maxWidth: '600px',
                padding: '0',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--color-surface)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            borderRadius: '12px',
                            background: 'var(--color-primary-bg)',
                            color: 'var(--color-primary)'
                        }}>
                            <Building2 size={24} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text-main)' }}>
                                {location ? 'Edit Location' : 'Add New Location'}
                            </h2>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                                {location ? `Update details for ${location.name}` : 'Create a new operational branch'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'var(--color-surface-hover)',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-text-muted)',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            transition: 'all 0.2s'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '2rem', maxHeight: '70vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Branch Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                className="stitch-input"
                                placeholder="e.g. Main Branch - T.Nagar"
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Full Address</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-muted)' }} />
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="stitch-input"
                                    style={{ paddingLeft: '2.5rem', minHeight: '100px', resize: 'vertical' }}
                                    placeholder="Enter complete office address..."
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Operation Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="stitch-input"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Device Count</label>
                                <div style={{ position: 'relative' }}>
                                    <Cpu size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-muted)' }} />
                                    <input
                                        name="deviceCount"
                                        value={formData.deviceCount}
                                        onChange={handleChange}
                                        type="number"
                                        className="stitch-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{
                            padding: '1.25rem',
                            background: 'var(--color-surface-hover)',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            border: '1px solid var(--color-border)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ color: 'var(--color-primary)' }}><CheckCircle2 size={20} /></div>
                                    <div>
                                        <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Primary Location</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Set this as the headquarters</p>
                                    </div>
                                </div>
                                <label className="switch" style={{ cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        name="isMain"
                                        checked={formData.isMain}
                                        onChange={handleChange}
                                        style={{ transform: 'scale(1.2)' }}
                                    />
                                </label>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ color: 'var(--color-info)' }}><ShieldCheck size={20} /></div>
                                    <div>
                                        <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Biometric Access</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Enable fingerprint/face ID sync</p>
                                    </div>
                                </div>
                                <label className="switch" style={{ cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        name="biometricEnabled"
                                        checked={formData.biometricEnabled}
                                        onChange={handleChange}
                                        style={{ transform: 'scale(1.2)' }}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderTop: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem'
                }}>
                    <button
                        type="button"
                        className="stitch-btn stitch-btn-outline"
                        onClick={onClose}
                        style={{ minWidth: '100px' }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="stitch-btn stitch-btn-primary"
                        onClick={handleSave}
                        style={{ minWidth: '140px' }}
                    >
                        <Save size={18} />
                        {location ? 'Update Location' : 'Save Location'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditLocationModal;
