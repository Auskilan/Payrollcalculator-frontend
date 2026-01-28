import React, { useState, useEffect } from 'react';
import { X, Save, Building, Globe, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const TenantFormModal = ({ onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        subdomain: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                subdomain: initialData.subdomain || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                address: initialData.address || '',
                status: initialData.status || 'Active'
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (!formData.name || !formData.subdomain) {
            alert('Please fill in required fields (Name, Subdomain)');
            return;
        }

        // Simple subdomain validation (alphanumeric validation)
        const subdomainRegex = /^[a-z0-9-]+$/;
        if (!subdomainRegex.test(formData.subdomain)) {
            alert('Subdomain must be lowercase alphanumeric with hyphens only.');
            return;
        }

        onSave({
            ...initialData,
            ...formData
        });
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
                maxWidth: '600px',
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
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                            {initialData ? 'Edit Tenant' : 'Add New Tenant'}
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            {initialData ? 'Update tenant details below.' : 'Enter details for the new tenant.'}
                        </p>
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

                {/* Body */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div className="form-group">
                            <label className="block mb-2 text-sm font-medium">Branch  <span style={{ color: 'var(--color-error)' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <Building size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    className="stitch-input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    placeholder="e.g. Sivam Gold & Silver"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="block mb-2 text-sm font-medium">Subdomain <span style={{ color: 'var(--color-error)' }}>*</span></label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <Globe size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)', zIndex: 1 }} />
                                <input
                                    name="subdomain"
                                    value={formData.subdomain}
                                    onChange={handleChange}
                                    type="text"
                                    className="stitch-input"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '120px' }}
                                    placeholder="e.g. sivam-gold"
                                />
                                <span style={{ position: 'absolute', right: '12px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>.jewelflow.app</span>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="form-group">
                                <label className="block mb-2 text-sm font-medium">Admin Email</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        className="stitch-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                        placeholder="admin@company.com"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="block mb-2 text-sm font-medium">Phone</label>
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
                        </div>

                        <div className="form-group">
                            <label className="block mb-2 text-sm font-medium">Address</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                <input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    type="text"
                                    className="stitch-input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    placeholder="Full Address"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="block mb-2 text-sm font-medium">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="stitch-input"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>

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
                        {initialData ? 'Update Tenant' : 'Create Tenant'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TenantFormModal;
