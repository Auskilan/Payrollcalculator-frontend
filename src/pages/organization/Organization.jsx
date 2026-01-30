import React, { useState } from 'react';
import { useOrganization } from '../../context/OrganizationContext';
import {
    Building2,
    MapPin,
    Users,
    Plus,
    Edit2,
    CheckCircle,
    Calendar,
    Search,
    Filter
} from 'lucide-react';
import EditLocationModal from './EditLocationModal';
import AddLocationModal from './AddLocationModal';

const Organization = () => {
    const { organization, locations, selectedLocation, setSelectedLocation, updateLocation, addLocation, setOrganization } = useOrganization();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [locationToEdit, setLocationToEdit] = useState(null);
    const [isAddingMode, setIsAddingMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEditClick = (e, loc) => {
        e.stopPropagation();
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

    const filteredLocations = locations.filter(loc =>
        loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>

            {/* Page Header - Matches Employee List style */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(135deg, var(--color-text-main), var(--color-text-muted))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Organization
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Manage your company details and <span style={{ color: 'var(--color-primary-dark)', fontWeight: '600' }}>office locations</span>.
                    </p>
                </div>
                <button
                    className="stitch-btn stitch-btn-primary"
                    onClick={handleAddClick}
                >
                    <Plus size={20} />
                    Add Location
                </button>
            </div>

            {/* Company Summary Card */}
            <div className="stitch-card" style={{ marginBottom: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', padding: '1.5rem' }}>
                <div style={{
                    width: '64px', height: '64px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)'
                }}>
                    <Building2 size={32} />
                </div>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{organization.name}</h2>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                            <span className="stitch-badge stitch-badge-active">{organization.status}</span>
                        </div>
                        <div className="flex-center" style={{ gap: '0.4rem' }}>
                            <Calendar size={14} />
                            <span>Since {organization.createdAt}</span>
                        </div>
                    </div>
                </div>
                <button className="stitch-btn stitch-btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={handleEditCompany}>
                    <Edit2 size={14} />
                    <span>Edit Company</span>
                </button>
            </div>

            {/* Controls Bar - Matches Employee List style */}
            <div className="stitch-card" style={{
                padding: '1rem',
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--color-text-muted)'
                        }} />
                        <input
                            type="text"
                            placeholder="Search locations by name or address..."
                            className="stitch-input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Filter size={18} style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--color-text-muted)'
                        }} />
                        <select className="stitch-input" style={{ paddingLeft: '2.5rem', width: '180px', appearance: 'none' }}>
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Locations Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
                {filteredLocations.map(loc => (
                    <div
                        key={loc.id}
                        className="stitch-card"
                        style={{
                            position: 'relative',
                            cursor: 'pointer',
                            border: selectedLocation?.id === loc.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                            transform: selectedLocation?.id === loc.id ? 'translateY(-4px)' : 'none',
                            boxShadow: selectedLocation?.id === loc.id ? '0 12px 24px -10px rgba(212, 175, 55, 0.2)' : 'var(--shadow-sm)',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={() => setSelectedLocation(loc)}
                    >
                        {selectedLocation?.id === loc.id && (
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--color-primary)' }}>
                                <CheckCircle size={22} fill="currentColor" stroke="var(--color-surface)" />
                            </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                padding: '0.75rem',
                                borderRadius: '10px',
                                background: selectedLocation?.id === loc.id ? 'var(--color-primary-bg)' : 'var(--color-surface-hover)',
                                color: selectedLocation?.id === loc.id ? 'var(--color-primary-dark)' : 'var(--color-text-muted)'
                            }}>
                                <MapPin size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{loc.name}</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span className={`stitch-badge ${loc.status === 'Active' ? 'stitch-badge-active' : 'stitch-badge-inactive'}`}>
                                        {loc.status}
                                    </span>
                                    {loc.isMain && (
                                        <span style={{
                                            fontSize: '0.65rem', background: 'var(--color-primary)', color: '#fff',
                                            padding: '2px 8px', borderRadius: '100px', fontWeight: '800', textTransform: 'uppercase'
                                        }}>
                                            HQ
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--color-surface-hover)', marginBottom: '1.25rem' }}>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem', minHeight: '34px', lineHeight: '1.5' }}>
                                {loc.address}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: 'var(--color-text-main)', fontSize: '0.9rem' }}>
                                <Users size={16} />
                                <span>{loc.employeeCount} Employees</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                            <button
                                className="stitch-btn stitch-btn-outline"
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', border: 'none' }}
                                onClick={(e) => handleEditClick(e, loc)}
                            >
                                <Building2 size={14} />
                                <span>Manage Details</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isEditModalOpen && (
                isAddingMode ? (
                    <AddLocationModal
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleSaveLocation}
                    />
                ) : (
                    <EditLocationModal
                        location={locationToEdit}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleSaveLocation}
                    />
                )
            )}
        </div>
    );
};

export default Organization;
