import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import TenantFormModal from './TenantFormModal';

const TenantList = () => {
    const [tenants, setTenants] = useState([
        { id: 1, name: ' Gold & Silver', subdomain: 'gold', status: 'Active', created: '2023-10-12', email: 'admin@sivamgold.com', phone: '9876543210', address: 'Chennai' },
        { id: 2, name: 'Royal Jewellers', subdomain: 'royal-jewels', status: 'Active', created: '2023-11-05', email: 'contact@royal.com', phone: '9988776655', address: 'Bangalore' },
        { id: 3, name: 'Golden Touch', subdomain: 'golden-touch', status: 'Inactive', created: '2024-01-15', email: 'owner@goldentouch.com', phone: '8877665544', address: 'Hyderabad' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTenant, setEditingTenant] = useState(null);

    const handleAddClick = () => {
        setEditingTenant(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (tenant) => {
        setEditingTenant(tenant);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this tenant? This action cannot be undone.')) {
            setTenants(tenants.filter(t => t.id !== id));
        }
    };

    const handleSaveTenant = (tenantData) => {
        if (editingTenant) {
            // Update existing
            setTenants(tenants.map(t => t.id === tenantData.id ? tenantData : t));
        } else {
            // Add new
            const newTenant = {
                ...tenantData,
                id: tenants.length + 1, // Simple ID generation
                created: new Date().toISOString().split('T')[0]
            };
            setTenants([...tenants, newTenant]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="stitch-card" style={{ padding: '0', height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* Toolbar */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flex-center" style={{ gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search tenants..."
                            className="stitch-input"
                            style={{ paddingLeft: '2.5rem', minWidth: '300px' }}
                        />
                    </div>
                    <button className="stitch-btn stitch-btn-outline">
                        <Filter size={18} />
                        Filter
                    </button>
                </div>

                <button className="stitch-btn stitch-btn-primary" onClick={handleAddClick}>
                    <Plus size={18} />
                    Add Tenant
                </button>
            </div>

            {/* Table */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--color-bg)', position: 'sticky', top: 0 }}>
                        <tr>
                            <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Tenant Name</th>
                            <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Subdomain</th>
                            <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Created Date</th>
                            <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-muted)', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map((tenant) => (
                            <tr key={tenant.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.2s' }} className="hover:bg-gray-50">
                                <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{tenant.name}</td>
                                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{tenant.subdomain}.jewelflow.app</td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <span className={`stitch-badge ${tenant.status === 'Active' ? 'stitch-badge-active' : 'stitch-badge-inactive'}`}>
                                        {tenant.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{tenant.created}</td>
                                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button
                                            className="stitch-btn stitch-btn-outline"
                                            style={{ padding: '0.25rem 0.5rem', border: 'none' }}
                                            onClick={() => handleEditClick(tenant)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="stitch-btn stitch-btn-outline"
                                            style={{ padding: '0.25rem 0.5rem', border: 'none', color: 'var(--color-error)' }}
                                            onClick={() => handleDeleteClick(tenant.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <TenantFormModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveTenant}
                    initialData={editingTenant}
                />
            )}

        </div>
    );
};

export default TenantList;
