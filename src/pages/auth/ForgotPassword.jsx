import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, CheckCircle, KeyRound, Lock, Eye, EyeOff, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset, 4: Success
    const [loading, setLoading] = useState(false);

    // Form States
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // UI States
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    // Handlers
    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        setLoading(true);
        setError('');
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setTimeLeft(600); // Reset timer
            setStep(2);
        }, 1500);
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;

        let newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to next input
        if (element.value && element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (timeLeft === 0) {
            setError('OTP has expired. Please request a new one.');
            return;
        }
        if (otpCode.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }
        setLoading(true);
        setError('');
        // Simulate API verification
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 1500);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError('');
        // Simulate API password update
        setTimeout(() => {
            setLoading(false);
            setStep(4);
        }, 1500);
    };

    // Auto redirect on success
    useEffect(() => {
        if (step === 4) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step, navigate]);

    // Timer Logic
    useEffect(() => {
        if (step === 2 && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleResendOtp = () => {
        setLoading(true);
        // Simulate OTP resend
        setTimeout(() => {
            setLoading(false);
            setTimeLeft(600);
            setOtp(['', '', '', '', '', '']);
            setError('');
        }, 1500);
    };

    const handleBackToLogin = () => navigate('/login');

    const renderLeftPanel = () => (
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
                    fontSize: '4rem',
                    marginBottom: '2rem',
                    filter: 'drop-shadow(0 4px 6px rgba(212, 175, 55, 0.2))'
                }}>
                    🔐
                </div>

                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    color: '#1E293B',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-sans)'
                }}>
                    {step === 1 && "Forgot Your Password?"}
                    {step === 2 && "Check Your Email"}
                    {step === 3 && "Secure Your Account"}
                    {step === 4 && "All Set!"}
                </h2>

                <p style={{
                    fontSize: '1.125rem',
                    color: '#64748B',
                    lineHeight: '1.7',
                    marginBottom: '2rem'
                }}>
                    {step === 1 && "No worries! Enter your email address and we'll send you instructions to reset your password."}
                    {step === 2 && `We've sent a verification code to ${email}. Please enter it to verify your identity.`}
                    {step === 3 && "Create a strong password to protect your account. Use a mix of letters, numbers, and symbols."}
                    {step === 4 && "Your password has been successfully reset. You can now login with your new credentials."}
                </p>

                {step === 1 && (
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        textAlign: 'left'
                    }}>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#475569',
                            fontWeight: '600',
                            marginBottom: '0.75rem'
                        }}>
                            Security Tips
                        </p>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            color: '#64748B',
                            fontSize: '0.9rem',
                            lineHeight: '2'
                        }}>
                            <li>✓ Never share your OTP with anyone</li>
                            <li>✓ Use a unique password for your account</li>
                            <li>✓ Enable two-factor authentication if available</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#FFFFFF'
        }}>
            {renderLeftPanel()}

            {/* Right Side - Form */}
            <div style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                background: '#FFFFFF'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '420px'
                }}>
                    {step !== 4 && (
                        <button
                            onClick={step === 1 ? handleBackToLogin : () => setStep(step - 1)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'none',
                                border: 'none',
                                color: '#D4AF37',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                marginBottom: '2rem',
                                transition: 'color 0.2s'
                            }}
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>
                    )}

                    {/* Step 1: Email Input */}
                    {step === 1 && (
                        <form onSubmit={handleEmailSubmit}>
                            <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem' }}>
                                Reset Password
                            </h2>
                            <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '2rem' }}>
                                Enter your email linked to your account
                            </p>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#1E293B' }}>
                                    Email Address
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 3rem',
                                            borderRadius: '8px',
                                            border: '1px solid #E2E8F0',
                                            outline: 'none',
                                            fontSize: '0.95rem'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = '#D4AF37'; e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            </div>
                            {error && <p style={{ color: '#EF4444', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}
                            <button type="submit" disabled={loading} style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: loading ? '#CBD5E1' : 'linear-gradient(135deg, #D4AF37 0%, #A68625 100%)',
                                color: '#FFFFFF',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}>
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </form>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === 2 && (
                        <form onSubmit={handleOtpSubmit}>
                            <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem' }}>
                                Enter OTP
                            </h2>
                            <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '2rem' }}>
                                Enter the 6-digit code sent to your email
                            </p>

                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                                {otp.map((data, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        name="otp"
                                        maxLength="1"
                                        value={data}
                                        onChange={e => handleOtpChange(e.target, index)}
                                        onKeyDown={e => handleOtpKeyDown(e, index)}
                                        onFocus={e => e.target.select()}
                                        disabled={timeLeft === 0}
                                        style={{
                                            width: '45px',
                                            height: '45px',
                                            textAlign: 'center',
                                            fontSize: '1.25rem',
                                            fontWeight: '600',
                                            borderRadius: '8px',
                                            border: '1px solid #E2E8F0',
                                            outline: 'none',
                                            color: '#1E293B',
                                            background: timeLeft === 0 ? '#F1F5F9' : '#FFFFFF'
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Timer Display */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                marginBottom: '1.5rem',
                                color: timeLeft < 60 ? '#EF4444' : '#64748B',
                                fontSize: '0.95rem',
                                fontWeight: '500'
                            }}> This code will expire in
                                <Timer size={18} />
                                <span>{formatTime(timeLeft)}</span>
                            </div>

                            {error && <p style={{ color: '#EF4444', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

                            <button type="submit" disabled={loading || timeLeft === 0} style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: loading || timeLeft === 0 ? '#CBD5E1' : 'linear-gradient(135deg, #D4AF37 0%, #A68625 100%)',
                                color: '#FFFFFF',
                                fontWeight: '600',
                                cursor: loading || timeLeft === 0 ? 'not-allowed' : 'pointer'
                            }}>
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                <span style={{ color: '#64748B', fontSize: '0.9rem' }}>
                                    {timeLeft === 0 ? "Code expired? " : "Didn't receive the code? "}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={loading}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#D4AF37',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        opacity: loading ? 0.7 : 1
                                    }}
                                >
                                    Resend
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: Reset Password */}
                    {step === 3 && (
                        <form onSubmit={handlePasswordSubmit}>
                            <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem' }}>
                                New Password
                            </h2>
                            <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '2rem' }}>
                                Create a new password for your account
                            </p>

                            {/* New Password */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#1E293B' }}>
                                    New Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Min. 8 characters"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 3rem',
                                            paddingRight: '3rem',
                                            borderRadius: '8px',
                                            border: '1px solid #E2E8F0',
                                            outline: 'none',
                                            fontSize: '0.95rem'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = '#D4AF37'; e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                                    />
                                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#1E293B' }}>
                                    Confirm Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Re-enter password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 3rem',
                                            paddingRight: '3rem',
                                            borderRadius: '8px',
                                            border: '1px solid #E2E8F0',
                                            outline: 'none',
                                            fontSize: '0.95rem'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = '#D4AF37'; e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {error && <p style={{ color: '#EF4444', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}

                            <button type="submit" disabled={loading} style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: loading ? '#CBD5E1' : 'linear-gradient(135deg, #D4AF37 0%, #A68625 100%)',
                                color: '#FFFFFF',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}>
                                {loading ? 'Reseting...' : 'Reset Password'}
                            </button>
                        </form>
                    )}

                    {/* Step 4: Success */}
                    {step === 4 && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem',
                                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                            }}>
                                <CheckCircle size={40} color="#FFFFFF" strokeWidth={2} />
                            </div>

                            <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.75rem' }}>
                                Password Reset!
                            </h2>

                            <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                                Your password has been successfully updated. You can now login with your new credentials.
                            </p>

                            <button
                                onClick={handleBackToLogin}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #D4AF37 0%, #A68625 100%)',
                                    color: '#FFFFFF',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
                                }}
                            >
                                Back to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
