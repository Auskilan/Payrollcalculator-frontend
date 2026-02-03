import React, { useState } from 'react';
import { Eye, EyeOff, Gem } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('super_admin');
  const [username, setUsername] = useState('superadmin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const roleCredentials = {
    super_admin: { user: 'superadmin', pass: 'admin123', label: 'Super Admin' },
    employee: { user: 'employee01', pass: 'user123', label: 'Employee' }
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (roleCredentials[newRole]) {
      setUsername(roleCredentials[newRole].user);
      setPassword(roleCredentials[newRole].pass);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      // Store role and metadata for sidebar/profile
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', role === 'super_admin' ? 'Sivam Admin' : 'Alex Johnson');
      localStorage.setItem('userId', role === 'super_admin' ? 'ADM-001' : 'ST-1001');
      localStorage.setItem('userEmail', role === 'super_admin' ? 'admin@sivamgold.com' : 'alex@sivamgold.com');
      localStorage.setItem('shopName', role === 'super_admin' ? 'Sivam Gold & Silver' : '');

      // Redirect based on setup completion
      if (role === 'super_admin') {
        const isShopSetup = localStorage.getItem('isShopSetupComplete');
        if (!isShopSetup) {
          navigate('/shop-details');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Employee login
        navigate('/employee/dashboard');
      }
    }, 1500);
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#FFFFFF'
    }}>
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
            Enterprise Management System for Modern Jewellery Business
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
              Streamline your jewellery shop operations with our comprehensive attendance,
              payroll, and HR management solution.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              color: '#0F172A',
              marginBottom: '0.5rem'
            }}>
              Welcome Back
            </h2>
            <p style={{
              color: '#64748B',
              fontSize: '0.95rem'
            }}>
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Role Selection */}
            <div style={{
              background: '#F8FAFC',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1E293B'
                }}>
                  Select Role
                </label>
                <div style={{
                  display: 'flex',
                  gap: '0.75rem'
                }}>
                  {Object.entries(roleCredentials).map(([key, config]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleRoleChange(key)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: role === key
                          ? '2px solid #D4AF37'
                          : '1px solid #E2E8F0',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        background: role === key ? '#FDF6E3' : '#FFFFFF',
                        color: role === key ? '#D4AF37' : '#64748B',
                        transition: 'all 0.2s'
                      }}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Username */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1E293B'
                }}>
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    color: '#0F172A',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#D4AF37';
                    e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: '1rem', position: 'relative' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1E293B'
                }}>
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    paddingRight: '3rem',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    color: '#0F172A',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#D4AF37';
                    e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '2.3rem',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {/* Remember Me & Forgot Password */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.75rem'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                color: '#64748B',
                fontSize: '0.875rem'
              }}>
                <input
                  type="checkbox"
                  style={{
                    accentColor: '#D4AF37',
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer'
                  }}
                />
                Remember me
              </label>
              <a
                href="/forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/forgot-password');
                }}
                style={{
                  color: '#D4AF37',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#A68625'}
                onMouseLeave={(e) => e.target.style.color = '#D4AF37'}
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
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
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ margin: '1.75rem 0', position: 'relative', textAlign: 'center' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />
            <span style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFFFF',
              padding: '0 1rem',
              color: '#94A3B8',
              fontSize: '0.8rem'
            }}>
              Or continue with
            </span>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            style={{
              width: '100%',
              padding: '0.875rem',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              background: '#FFFFFF',
              color: '#0F172A',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.borderColor = '#D4AF37';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              style={{ width: '18px', height: '18px' }}
            />
            Google Workspace
          </button>

          {/* Sign Up Link */}
          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: '#64748B',
            fontSize: '0.875rem'
          }}>
            Don't have an account?{' '}
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                navigate('/signup');
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
              Create Super Admin Account
            </a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
