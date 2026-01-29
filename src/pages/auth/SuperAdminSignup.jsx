import React, { useState } from 'react';
import { Eye, EyeOff, Gem, User, Mail, Lock, Building, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/common/Notification';

const InputField = ({
    label,
    name,
    type = 'text',
    placeholder,
    icon: Icon,
    showPasswordToggle = false,
    isPassword = false,
    value,
    onChange,
    error,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword
}) => {
    const showPass = isPassword && (name === 'password' ? showPassword : showConfirmPassword);

    return (
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
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94A3B8',
                        pointerEvents: 'none'
                    }}>
                        <Icon size={18} />
                    </div>
                )}
                <input
                    type={showPasswordToggle ? (showPass ? 'text' : 'password') : type}
                    name={name}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        paddingLeft: Icon ? '3rem' : '1rem',
                        paddingRight: showPasswordToggle ? '3rem' : '1rem',
                        borderRadius: '8px',
                        border: error ? '1px solid #EF4444' : '1px solid #E2E8F0',
                        background: '#FFFFFF',
                        color: '#0F172A',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-sans)',
                        transition: 'all 0.2s',
                        outline: 'none'
                    }}
                    onFocus={(e) => {
                        if (!error) {
                            e.target.style.borderColor = '#D4AF37';
                            e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                        }
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = error ? '#EF4444' : '#E2E8F0';
                        e.target.style.boxShadow = 'none';
                    }}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => {
                            if (name === 'password') {
                                setShowPassword(!showPassword);
                            } else {
                                setShowConfirmPassword(!showConfirmPassword);
                            }
                        }}
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#94A3B8',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
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
};

const SuperAdminSignup = () => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 4) {
            newErrors.username = 'Username must be at least 4 characters';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);

            // Show success notification
            setNotification({
                message: '🎉 Super Admin account created successfully! Redirecting to shop setup...',
                type: 'success'
            });

            // Redirect to shop details after 2 seconds
            setTimeout(() => {
                navigate('/shop-details');
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
                    position: 'absolute',
                    bottom: '15%',
                    right: '15%',
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
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
                        <Gem size={40} color="#FFFFFF" strokeWidth={2} />
                    </div>

                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '700',
                        color: '#1E293B',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-sans)'
                    }}>
                        Jewel<span style={{ color: '#D4AF37' }}>Flow</span>
                    </h1>

                    <p style={{
                        fontSize: '1.125rem',
                        color: '#64748B',
                        lineHeight: '1.6',
                        marginBottom: '2rem'
                    }}>
                        Create Your Super Admin Account
                    </p>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '2rem',
                        border: '1px solid rgba(212, 175, 55, 0.2)'
                    }}>
                        <p style={{
                            fontSize: '0.95rem',
                            color: '#475569',
                            lineHeight: '1.7'
                        }}>
                            Join the enterprise-grade management system designed for modern jewellery businesses.
                            Get full control with super admin privileges.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
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
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{
                            fontSize: '1.875rem',
                            fontWeight: '700',
                            color: '#0F172A',
                            marginBottom: '0.5rem'
                        }}>
                            Create Super Admin Account
                        </h2>
                        <p style={{
                            color: '#64748B',
                            fontSize: '0.95rem'
                        }}>
                            Fill in the details to create your account
                        </p>
                    </div>

                    <form onSubmit={handleSignup}>
                        {/* Personal Information */}
                        <div style={{
                            background: '#F8FAFC',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            marginBottom: '1.5rem'
                        }}>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem'
                            }}>
                                <InputField
                                    label="Full Name"
                                    name="fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    icon={User}
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    error={errors.fullName}
                                />


                                <InputField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    icon={Mail}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={errors.email}
                                />

                                <InputField
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    placeholder="10-digit number"
                                    icon={Phone}
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    error={errors.phone}
                                />

                                <InputField
                                    label="Company Name"
                                    name="companyName"
                                    type="text"
                                    placeholder="Your company name"
                                    icon={Building}
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    error={errors.companyName}
                                />

                                <InputField
                                    label="Password"
                                    name="password"
                                    placeholder="Enter password (min. 6 characters)"
                                    icon={Lock}
                                    showPasswordToggle={true}
                                    isPassword={true}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={errors.password}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                />

                                <InputField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    placeholder="Re-enter your password"
                                    icon={Lock}
                                    showPasswordToggle={true}
                                    isPassword={true}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    error={errors.confirmPassword}
                                    showConfirmPassword={showConfirmPassword}
                                    setShowConfirmPassword={setShowConfirmPassword}
                                />
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem',
                                cursor: 'pointer',
                                color: '#64748B',
                                fontSize: '0.875rem'
                            }}>
                                <input
                                    type="checkbox"
                                    required
                                    style={{
                                        accentColor: '#D4AF37',
                                        width: '18px',
                                        height: '18px',
                                        cursor: 'pointer',
                                        marginTop: '2px'
                                    }}
                                />
                                <span>
                                    I agree to the{' '}
                                    <a href="#" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: '500' }}>
                                        Terms of Service
                                    </a>
                                    {' '}and{' '}
                                    <a href="#" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: '500' }}>
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>
                        </div>

                        {/* Create Account Button */}
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
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(212, 175, 55, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)';
                                }
                            }}
                        >
                            {loading ? 'Creating Account...' : 'Create Super Admin Account'}
                        </button>
                    </form>

                    {/* Already have account */}
                    <p style={{
                        textAlign: 'center',
                        marginTop: '1.5rem',
                        color: '#64748B',
                        fontSize: '0.875rem'
                    }}>
                        Already have an account?{' '}
                        <a
                            href="/login"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/login');
                            }}
                            style={{
                                color: '#D4AF37',
                                textDecoration: 'none',
                                fontWeight: '600',
                                transition: 'color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#A68625'}
                            onMouseLeave={(e) => e.target.style.color = '#D4AF37'}
                        >
                            Sign In
                        </a>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default SuperAdminSignup;
