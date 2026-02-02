import React, { useState } from 'react';
import { Eye, EyeOff, Gem, User, Mail, Lock, Phone, IdCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/common/Notification';

const InputField = ({
    label,
    name,
    type = 'text',
    placeholder,
    icon: Icon,
    showPasswordToggle = false,
    value,
    onChange,
    error,
    showPassword,
    setShowPassword
}) => {
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
                    type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
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
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#94A3B8',
                            cursor: 'pointer',
                        }}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {error && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{error}</p>}
        </div>
    );
};

const EmployeeSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        employeeId: '',
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setNotification({
                message: '🎉 Account created! You can now login to the employee portal.',
                type: 'success'
            });
            setTimeout(() => navigate('/login'), 2000);
        }, 1500);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#FFFFFF' }}>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <div style={{
                flex: '1',
                background: 'linear-gradient(135deg, #FDF6E3 0%, #F4E8D0 50%, #E8D4B8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem'
            }}>
                <div style={{ textAlign: 'center', maxWidth: '400px' }}>
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
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '1rem' }}>
                        Employee<span style={{ color: '#D4AF37' }}>Portal</span>
                    </h1>
                    <p style={{ color: '#64748B', lineHeight: '1.6' }}>
                        Join your team and manage your workspace effortlessly.
                    </p>
                </div>
            </div>

            <div style={{ flex: '1.2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', overflowY: 'auto' }}>
                <div style={{ width: '100%', maxWidth: '450px' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem' }}>Create Account</h2>
                        <p style={{ color: '#64748B' }}>Enter your details assigned by your company</p>
                    </div>

                    <form onSubmit={handleSignup}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <InputField label="Full Name" name="fullName" icon={User} value={formData.fullName} onChange={handleInputChange} />
                            <InputField label="Email" name="email" type="email" icon={Mail} value={formData.email} onChange={handleInputChange} />
                            <InputField label="Phone" name="phone" icon={Phone} value={formData.phone} onChange={handleInputChange} />
                            <InputField label="Employee ID" name="employeeId" icon={IdCard} value={formData.employeeId} onChange={handleInputChange} />
                            <InputField label="Username" name="username" icon={User} value={formData.username} onChange={handleInputChange} />
                            <InputField label="Password" name="password" icon={Lock} showPasswordToggle={true} showPassword={showPassword} setShowPassword={setShowPassword} value={formData.password} onChange={handleInputChange} />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: loading ? '#CBD5E1' : 'linear-gradient(135deg, #D4AF37 0%, #A68625 100%)',
                                color: '#FFFFFF',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                marginTop: '1rem'
                            }}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up as Employee'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748B', fontSize: '0.875rem' }}>
                        Already have an account? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: '600' }}>Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeSignup;
