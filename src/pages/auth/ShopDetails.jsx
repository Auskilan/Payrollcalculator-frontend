import React, { useState } from 'react';
import { Store, MapPin, Phone, Hash, Globe, Navigation, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/common/Notification';

// Component moved outside to prevent re-renders losing focus
const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, textarea = false, value, onChange, error }) => (
    <div style={{ marginBottom: '1.25rem' }}>
        <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1E293B'
        }}>
            {label}
        </label>
        <div style={{ position: 'relative' }}>
            {Icon && (
                <div style={{
                    position: 'absolute',
                    left: '1rem',
                    top: textarea ? '1rem' : '50%',
                    transform: textarea ? 'none' : 'translateY(-50%)',
                    color: '#94A3B8',
                    pointerEvents: 'none'
                }}>
                    <Icon size={18} />
                </div>
            )}
            {textarea ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={3}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        paddingLeft: Icon ? '3rem' : '1rem',
                        borderRadius: '8px',
                        border: error ? '1px solid #EF4444' : '1px solid #E2E8F0',
                        background: '#FFFFFF',
                        color: '#0F172A',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-sans)',
                        transition: 'all 0.2s',
                        outline: 'none',
                        resize: 'vertical'
                    }}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        paddingLeft: Icon ? '3rem' : '1rem',
                        borderRadius: '8px',
                        border: error ? '1px solid #EF4444' : '1px solid #E2E8F0',
                        background: '#FFFFFF',
                        color: '#0F172A',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-sans)',
                        transition: 'all 0.2s',
                        outline: 'none'
                    }}
                />
            )}
        </div>
        {error && (
            <p style={{
                color: '#EF4444',
                fontSize: '0.75rem',
                marginTop: '0.25rem',
                marginBottom: 0
            }}>
                {error}
            </p>
        )}
    </div>
);

const ShopDetails = () => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        shopName: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.shopName.trim()) newErrors.shopName = 'Shop name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pincode.replace(/\s/g, ''))) {
            newErrors.pincode = 'Invalid pincode';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);

            // Store flag that shop setup is complete
            localStorage.setItem('isShopSetupComplete', 'true');

            setNotification({
                message: '🎉 Shop details saved successfully! Setup complete.',
                type: 'success'
            });

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        }, 1500);
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#FFFFFF'
        }}>
            {/* Notification */}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                    position="top-right"
                />
            )}

            {/* Left Side - Jewellery Illustration */}
            <div style={{
                flex: '1',
                background: 'linear-gradient(135deg, #FDF6E3 0%, #F4E8D0 50%, #E8D4B8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%'
                }} />

                <div style={{
                    textAlign: 'center',
                    zIndex: 1,
                    maxWidth: '500px'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #D4AF37 0%, #F4D06F 100%)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)'
                    }}>
                        <Store size={40} color="#FFFFFF" strokeWidth={2} />
                    </div>

                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '700',
                        color: '#1E293B',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-sans)'
                    }}>
                        Shop <span style={{ color: '#D4AF37' }}>Details</span>
                    </h1>

                    <p style={{
                        fontSize: '1.125rem',
                        color: '#64748B',
                        lineHeight: '1.6',
                        marginBottom: '2rem'
                    }}>
                        Set up your business location
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                background: '#FFFFFF',
                overflowY: 'auto'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '480px'
                }}>
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/signup')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'none',
                            border: 'none',
                            color: '#D4AF37',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            marginBottom: '1.5rem',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'color 0.2s'
                        }}
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{
                            fontSize: '1.875rem',
                            fontWeight: '700',
                            color: '#0F172A',
                            marginBottom: '0.5rem'
                        }}>
                            Tell us about your shop
                        </h2>
                        <p style={{
                            color: '#64748B',
                            fontSize: '0.95rem'
                        }}>
                            We need a few details to configure your dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{
                            background: '#F8FAFC',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            marginBottom: '1.5rem'
                        }}>
                            <InputField
                                label="Shop Name"
                                name="shopName"
                                placeholder="Enter your shop name"
                                icon={Store}
                                value={formData.shopName}
                                onChange={handleInputChange}
                                error={errors.shopName}
                            />

                            <InputField
                                label="Address"
                                name="address"
                                placeholder="Full street address"
                                icon={MapPin}
                                textarea={true}
                                value={formData.address}
                                onChange={handleInputChange}
                                error={errors.address}
                            />

                            {/* Added fields below Address as requested */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <InputField
                                    label="City"
                                    name="city"
                                    placeholder="City"
                                    icon={Navigation}
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    error={errors.city}
                                />
                                <InputField
                                    label="State"
                                    name="state"
                                    placeholder="State"
                                    icon={Globe}
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    error={errors.state}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <InputField
                                    label="Pincode"
                                    name="pincode"
                                    placeholder="654321"
                                    icon={Hash}
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    error={errors.pincode}
                                />
                                <InputField
                                    label="Phone Number"
                                    name="phone"
                                    placeholder="Contact number"
                                    icon={Phone}
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    error={errors.phone}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: loading
                                    ? '#CBD5E1'
                                    : 'linear-gradient(135deg, #D4AF37 0%, #A68625 100%)',
                                color: '#FFFFFF',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                boxShadow: loading ? 'none' : '0 4px 12px rgba(212, 175, 55, 0.3)',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {loading ? 'Saving...' : 'Complete Setup'}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShopDetails;
