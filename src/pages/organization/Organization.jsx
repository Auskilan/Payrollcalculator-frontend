import React, { useState } from 'react';
import { useOrganization } from '../../context/OrganizationContext';
import { Building2, MapPin, Users, Plus, Edit2, CheckCircle, Calendar } from 'lucide-react';
import EditLocationModal from './EditLocationModal';

const Organization = () => {
    const { organization, locations, selectedLocation, setSelectedLocation, updateLocation, addLocation, setOrganization } = useOrganization();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [locationToEdit, setLocationToEdit] = useState(null);
    const [isAddingMode, setIsAddingMode] = useState(false);

    const handleEditClick = (e, loc) => {
        e.stopPropagation(); // Prevent card selection
        setLocationToEdit(loc);
        setIsAddingMode(false);
        setIsEditModalOpen(true);
    };

    const handleAddClick = () => {
        setLocationToEdit(null);
        setIsAddingMode(true);
        setIsEditModalOpen(true);
    };

    const handleSaveLocation = (id, updates) => {
        if (isAddingMode) {
            addLocation(updates);
        } else {
            // Business Logic: If setting as Main, unset others
            if (updates.isMain) {
                locations.forEach(l => {
                    if (l.id !== id && l.isMain) {
                        updateLocation(l.id, { isMain: false });
                    }
                });
            }
            updateLocation(id, updates);
        }
        setIsEditModalOpen(false);
    };

    const handleEditCompany = () => {
        const newName = prompt("Enter new company name:", organization.name);
        if (newName && newName !== organization.name) {
            setOrganization(prev => ({ ...prev, name: newName }));
        }
    };

    return (
        <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Where do you operate?</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Manage your company details and office locations.</p>
                </div>
            </div>

            {/* Company Card */}
            <div className="stitch-card" style={{ marginBottom: '3rem', display: 'flex', gap: '2rem', alignItems: 'center', padding: '2.5rem' }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <Building2 size={40} />
                </div>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>{organization.name}</h2>
                    <div style={{ display: 'flex', gap: '2rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                            <span className="stitch-badge stitch-badge-active">{organization.status}</span>
                        </div>
                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                            <Calendar size={18} />
                            <span>Since {organization.createdAt}</span>
                        </div>
                    </div>
                </div>
                <button className="stitch-btn stitch-btn-outline" onClick={handleEditCompany}>
                    <Edit2 size={16} />
                    <span>Edit Company</span>
                </button>
            </div>

            {/* Locations Section */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Locations</h3>
                <button className="stitch-btn stitch-btn-primary" onClick={handleAddClick}>
                    <Plus size={18} />
                    <span>Add Location</span>
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {locations.map(loc => (
                    <div
                        key={loc.id}
                        className="stitch-card"
                        style={{
                            position: 'relative',
                            cursor: 'pointer',
                            border: selectedLocation?.id === loc.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                            transform: selectedLocation?.id === loc.id ? 'translateY(-4px)' : 'none',
                            boxShadow: selectedLocation?.id === loc.id ? 'var(--shadow-lg)' : 'var(--shadow-sm)'
                        }}
                        onClick={() => setSelectedLocation(loc)}
                    >
                        {selectedLocation?.id === loc.id && (
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--color-primary)' }}>
                                <CheckCircle size={24} fill="currentColor" stroke="var(--color-surface)" />
                            </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                background: selectedLocation?.id === loc.id ? 'var(--color-primary-bg)' : 'var(--color-bg)',
                                color: selectedLocation?.id === loc.id ? 'var(--color-primary-dark)' : 'var(--color-text-muted)'
                            }}>
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.25rem' }}>{loc.name}</h4>
                                <span className={`stitch-badge ${loc.status === 'Active' ? 'stitch-badge-active' : 'stitch-badge-inactive'}`}>
                                    {loc.status}
                                </span>
                                {loc.isMain && (
                                    <span style={{
                                        marginLeft: '0.5rem', fontSize: '0.7rem', background: 'var(--color-primary)', color: '#fff',
                                        padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase'
                                    }}>
                                        Main
                                    </span>
                                )}
                            </div>
                        </div>

                        <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', marginBottom: '1.5rem' }}>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem', minHeight: '40px' }}>{loc.address}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: 'var(--color-text-main)' }}>
                                <Users size={18} />
                                <span>{loc.employeeCount} Employees</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: 'auto' }}>
                            <button
                                className="stitch-btn stitch-btn-outline"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                onClick={(e) => handleEditClick(e, loc)}
                            >
                                <Edit2 size={16} />
                                <span>Edit Details</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isEditModalOpen && (
                <EditLocationModal
                    location={locationToEdit}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveLocation}
                />
            )}
        </div>
    );
};

export default Organization;
