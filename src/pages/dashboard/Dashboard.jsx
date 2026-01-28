import React from 'react';
import { Users, Building, Activity, Calendar } from 'lucide-react';
import PendingRequests from '../../components/dashboard/PendingRequests';

const Dashboard = () => {
    return (
        <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, var(--color-text-main), var(--color-text-muted))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Dashboard
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    Welcome back, Admin. Here's what's happening today.
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {/* Stat Card 1 */}
                <div className="stitch-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        color: 'var(--color-primary-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Users size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Total Employees</p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>124</h3>
                    </div>
                </div>

                {/* Stat Card 2 */}
                <div className="stitch-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: 'var(--color-info)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Building size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Active Branches</p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>3</h3>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div className="stitch-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: 'var(--color-success)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Activity size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Attendance Today</p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>96%</h3>
                    </div>
                </div>

                {/* Stat Card 4 */}
                <div className="stitch-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--color-error)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>On Leave</p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>4</h3>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2rem' }}>
                {/* Attendance Chart */}
                <div className="stitch-card" style={{ minHeight: '350px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Attendance Flow</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Weekly activity across all branches</p>
                        </div>
                        <div style={{ padding: '4px 12px', borderRadius: '100px', background: 'var(--color-primary-bg)', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '700' }}>
                            Last 7 Days
                        </div>
                    </div>

                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '10px 0' }}>
                        {[45, 75, 55, 90, 85, 40, 30].map((h, i) => (
                            <div key={i} style={{ flex: 1, position: 'relative' }}>
                                <div style={{
                                    height: `${h}%`,
                                    background: i === 3 ? 'var(--color-primary)' : 'var(--color-surface-hover)',
                                    borderRadius: '8px 8px 2px 2px',
                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}></div>
                                <span style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    fontSize: '0.75rem',
                                    color: 'var(--color-text-muted)',
                                    marginTop: '12px',
                                    fontWeight: '600'
                                }}>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expense Allocation */}
                <div className="stitch-card" style={{ minHeight: '350px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>Expense Summary</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                        <div style={{
                            width: '160px',
                            height: '160px',
                            borderRadius: '50%',
                            background: 'conic-gradient(var(--color-primary) 0% 65%, var(--color-info) 65% 85%, var(--color-error) 85% 100%)',
                            position: 'relative',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                width: '100px', height: '100px', borderRadius: '50%', background: 'var(--color-surface)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Monthly</span>
                                <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>₹1.8M</span>
                            </div>
                        </div>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { label: 'Fixed Payroll', color: 'var(--color-primary)', pct: '65%' },
                                { label: 'Benefits', color: 'var(--color-info)', pct: '20%' },
                                { label: 'Other Ops', color: 'var(--color-error)', pct: '15%' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: item.color }}></div>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{item.label}</span>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{item.pct}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pending Requests */}
                <div style={{ gridColumn: 'span 2' }}>
                    <PendingRequests />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
