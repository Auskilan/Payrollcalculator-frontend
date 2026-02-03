import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Building, MapPin, Phone, Mail, Camera, Edit2, Shield, UserCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../../context/OrganizationContext';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { organization, setOrganization } = useOrganization();

    const userRole = localStorage.getItem('userRole') || 'employee';
    const userName = localStorage.getItem('userName') || (userRole === 'super_admin' ? 'Sivam Admin' : 'Alex Johnson');
    const userId = localStorage.getItem('userId') || 'ST-1001';
    const userEmail = localStorage.getItem('userEmail') || 'contact@sivamgold.com';

    // Form state for shop/profile details
    const [formData, setFormData] = useState({
        shopName: organization?.name || 'Sivam Gold & Silver',
        address: '123 Gold St, T.Nagar',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600017',
        phone: '9876543210',
        email: userEmail
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (userRole === 'super_admin') {
            setOrganization(prev => ({ ...prev, name: formData.shopName }));
            // Also store in localStorage to persist mock
            localStorage.setItem('shopName', formData.shopName);
        }
        setShowEditModal(false);
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            {/* Profile CTA Icon (Trigger) */}
            <div
                id="profile-cta-icon"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'var(--color-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary-dark)',
                    cursor: 'pointer',
                    border: isOpen ? '2px solid var(--color-primary)' : '2px solid transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isOpen ? '0 0 15px rgba(212, 175, 55, 0.3)' : 'var(--shadow-sm)',
                    transform: isOpen ? 'scale(1.05)' : 'scale(1)'
                }}
            >
                <User size={22} />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 15px)',
                    right: 0,
                    width: '320px',
                    background: 'var(--color-surface)',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    border: '1px solid var(--color-border)',
                    zIndex: 1000,
                    overflow: 'hidden',
                    animation: 'dropdownAppear 0.3s ease-out',
                    transformOrigin: 'top right'
                }}>
                    {/* Header with Background Gradient */}
                    <div style={{
                        padding: '1.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #FFF9EB 0%, #FFFFFF 100%)',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem'
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '18px',
                            background: 'var(--color-surface)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-primary)',
                            boxShadow: '0 10px 20px rgba(212, 175, 55, 0.12)',
                            position: 'relative',
                            border: '1px solid var(--color-primary-light)'
                        }}>
                            <UserCircle size={42} strokeWidth={1.5} />
                            {userRole === 'employee' && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    right: '-5px',
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: 'var(--color-primary)',
                                    border: '2px solid white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                }}>
                                    <Camera size={12} />
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: 0, color: 'var(--color-text-main)', fontSize: '1.125rem', fontWeight: '700', letterSpacing: '-0.01em' }}>{userName}</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '6px' }}>
                                <span style={{
                                    padding: '3px 8px',
                                    background: 'var(--color-primary-bg)',
                                    color: 'var(--color-primary-dark)',
                                    borderRadius: '6px',
                                    fontSize: '0.65rem',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {userRole === 'super_admin' ? 'Super Admin' : 'Staff'}
                                </span>
                                {userRole === 'employee' && (
                                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: '500' }}>#{userId}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div style={{ padding: '1.25rem' }}>
                        <div style={{
                            padding: '1.5rem',
                            background: '#F8FAFC',
                            borderRadius: '16px',
                            marginBottom: '1rem',
                            border: '1px solid #F1F5F9'
                        }}>
                            {userRole === 'super_admin' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', color: 'var(--color-primary)' }}>
                                            <Building size={18} />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Store name</p>
                                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-text-main)' }}>{formData.shopName}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', color: 'var(--color-text-muted)' }}>
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Registered Layout</p>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-main)', lineHeight: '1.4', fontWeight: '500' }}>
                                                {formData.city}, {formData.state}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', color: 'var(--color-primary)' }}>
                                            <Shield size={18} />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Access Level</p>
                                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-text-main)' }}>Full Payroll Info</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', color: 'var(--color-text-muted)' }}>
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Professional Email</p>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: '500' }}>{formData.email}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => setShowEditModal(true)}
                            className="stitch-btn stitch-btn-outline"
                            style={{
                                width: '100%',
                                justifyContent: 'space-between',
                                border: '1px solid var(--color-border)',
                                padding: '0.85rem 1.25rem',
                                borderRadius: '14px',
                                background: '#FFFFFF',
                                marginBottom: '0.75rem'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Edit2 size={16} color="var(--color-primary)" />
                                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{userRole === 'super_admin' ? 'Edit Shop Info' : 'Edit Profile & Photo'}</span>
                            </div>
                            <X size={14} style={{ opacity: 0.3, transform: 'rotate(45deg)' }} />
                        </button>

                        <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '0.5rem', paddingTop: '0.75rem' }}>
                            <button
                                onClick={handleLogout}
                                className="stitch-btn"
                                style={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    color: 'var(--color-error)',
                                    background: 'transparent',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px'
                                }}
                            >
                                <LogOut size={18} />
                                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Logout Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Full-Screen Modal for Editing */}
            {showEditModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '1.5rem'
                }}>
                    <div style={{
                        background: 'var(--color-surface)',
                        width: '100%',
                        maxWidth: '560px',
                        borderRadius: '28px',
                        overflow: 'hidden',
                        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.3)',
                        animation: 'modalEntrance 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <div style={{
                            padding: '2rem 2.5rem',
                            borderBottom: '1px solid var(--color-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'linear-gradient(to right, #F8FAFC, #FFFFFF)'
                        }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-text-main)', letterSpacing: '-0.02em' }}>
                                    {userRole === 'super_admin' ? 'Update Shop Registry' : 'My Professional Profile'}
                                </h3>
                                <p style={{ margin: '6px 0 0', fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                                    {userRole === 'super_admin' ? 'Modifying identity for Sivam Gold & Silver' : 'Manage your contact information and photo'}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowEditModal(false)}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: '#F1F5F9',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--color-text-muted)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.target.style.background = '#E2E8F0'; e.target.style.color = '#0F172A'; }}
                                onMouseLeave={(e) => { e.target.style.background = '#F1F5F9'; e.target.style.color = '#94A3B8'; }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} style={{ padding: '2.5rem' }}>
                            <div style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '0.75rem' }} className="custom-scrollbar">
                                {userRole === 'super_admin' ? (
                                    <>
                                        <div style={{ marginBottom: '1.75rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop Name</label>
                                            <div style={{ position: 'relative' }}>
                                                <Building size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                                <input name="shopName" value={formData.shopName} onChange={handleInputChange} className="stitch-input" style={{ paddingLeft: '3rem', height: '52px', fontSize: '1rem' }} />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '1.75rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address Details</label>
                                            <div style={{ position: 'relative' }}>
                                                <MapPin size={20} style={{ position: 'absolute', left: '14px', top: '18px', color: '#94A3B8' }} />
                                                <textarea name="address" value={formData.address} onChange={handleInputChange} className="stitch-input" style={{ paddingLeft: '3rem', minHeight: '100px', paddingTop: '15px' }} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem', marginBottom: '1.75rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem', color: '#334155', textTransform: 'uppercase' }}>City</label>
                                                <input name="city" value={formData.city} onChange={handleInputChange} className="stitch-input" style={{ height: '52px' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem', color: '#334155', textTransform: 'uppercase' }}>State</label>
                                                <input name="state" value={formData.state} onChange={handleInputChange} className="stitch-input" style={{ height: '52px' }} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem', color: '#334155', textTransform: 'uppercase' }}>Pincode</label>
                                                <input name="pincode" value={formData.pincode} onChange={handleInputChange} className="stitch-input" style={{ height: '52px' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem', color: '#334155', textTransform: 'uppercase' }}>Contact Number</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Phone size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                                    <input name="phone" value={formData.phone} onChange={handleInputChange} className="stitch-input" style={{ paddingLeft: '3rem', height: '52px' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                                            <div style={{
                                                width: '120px',
                                                height: '120px',
                                                borderRadius: '32px',
                                                background: '#F8FAFC',
                                                margin: '0 auto 1.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '3px dashed #E2E8F0',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                transition: 'all 0.3s'
                                            }}
                                                className="upload-box-large"
                                            >
                                                <div style={{ textAlign: 'center' }}>
                                                    <Camera size={36} color="var(--color-primary)" />
                                                    <p style={{ margin: '8px 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Change Photo</p>
                                                </div>
                                                <input type="file" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                                            </div>
                                            <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '800' }}>{userName}</h4>
                                            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Staff ID: {userId}</p>
                                        </div>

                                        <div style={{ marginBottom: '1.75rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem', color: '#334155', textTransform: 'uppercase' }}>Email Address</label>
                                            <div style={{ position: 'relative' }}>
                                                <Mail size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                                <input name="email" value={formData.email} onChange={handleInputChange} className="stitch-input" style={{ paddingLeft: '3rem', height: '52px' }} />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '1.75rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.75rem', color: '#334155', textTransform: 'uppercase' }}>Phone Number</label>
                                            <div style={{ position: 'relative' }}>
                                                <Phone size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                                <input name="phone" value={formData.phone} onChange={handleInputChange} className="stitch-input" style={{ paddingLeft: '3rem', height: '52px' }} />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="stitch-btn"
                                    style={{ flex: 1, height: '52px', background: '#F1F5F9', color: '#475569', fontWeight: '700' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="stitch-btn stitch-btn-primary"
                                    style={{ flex: 1, height: '52px', fontWeight: '700' }}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes dropdownAppear {
                    from { opacity: 0; transform: scale(0.95) translateY(-10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes modalEntrance {
                    from { opacity: 0; transform: scale(0.9) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .upload-box-large:hover {
                    background: var(--color-primary-bg) !important;
                    border-color: var(--color-primary) !important;
                    transform: translateY(-2px);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
                #profile-cta-icon:hover {
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
                }
            `}</style>
        </div>
    );
};

export default ProfileDropdown;
