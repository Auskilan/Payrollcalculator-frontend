import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Banknote, MapPin, AlertCircle } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, subtext, color }) => (
    <div style={{
        background: '#FFFFFF',
        padding: '1.5rem',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        border: '1px solid #F1F5F9'
    }}>
        <div style={{
            width: '48px',
            height: '48px',
            background: `${color}10`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color
        }}>
            <Icon size={24} />
        </div>
        <div>
            <p style={{ color: '#64748B', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>{label}</p>
            <h3 style={{ color: '#1E293B', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>{value}</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.75rem' }}>{subtext}</p>
        </div>
    </div>
);

const EmployeeDashboard = () => {
    const [latestLeave, setLatestLeave] = useState(null);
    const [leaveBalance, setLeaveBalance] = useState(12);

    useEffect(() => {
        const leaves = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
        // In a real app we'd filter by employee ID
        if (leaves.length > 0) {
            setLatestLeave(leaves[0]);
        }
    }, []);

    const getLeaveStatusDisplay = () => {
        if (!latestLeave) return { value: 'No Requests', sub: 'Apply for leave below', color: '#94A3B8' };

        const status = latestLeave.status;
        if (status === 'Approved') return { value: 'Approved', sub: `Next: ${latestLeave.fromDate}`, color: '#10B981' };
        if (status === 'Rejected') return { value: 'Rejected', sub: 'Check reasons in mail', color: '#EF4444' };
        return { value: 'Pending', sub: 'Awaiting admin review', color: '#F59E0B' };
    };

    const leaveStatus = getLeaveStatusDisplay();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.5rem' }}>
                    Welcome back, Alex!
                </h1>
                <p style={{ color: '#64748B' }}>Here's what's happening with your work profile today.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem'
            }}>
                <StatCard
                    icon={Clock}
                    label="Today's Attendance"
                    value="09:15 AM"
                    subtext="Clocked in successfully"
                    color="#D4AF37"
                />
                <StatCard
                    icon={Calendar}
                    label="Leave Balance"
                    value={`${leaveBalance} Days`}
                    subtext="Available for 2026"
                    color="#0EA5E9"
                />
                <StatCard
                    icon={AlertCircle}
                    label="My Leave Status"
                    value={leaveStatus.value}
                    subtext={leaveStatus.sub}
                    color={leaveStatus.color}
                />
                <StatCard
                    icon={Banknote}
                    label="Last Salary"
                    value="₹45,000"
                    subtext="Paid on Jan 31, 2026"
                    color="#10B981"
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1.8fr 1fr',
                gap: '1.5rem'
            }}>
                {/* Recent Attendance */}
                <div style={{
                    background: '#FFFFFF',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #F1F5F9'
                }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1E293B', marginBottom: '1.5rem' }}>
                        Recent Attendance
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { date: 'Feb 02, 2026', in: '09:15 AM', out: '--:--', status: 'On Time' },
                            { date: 'Feb 01, 2026', in: '09:00 AM', out: '06:05 PM', status: 'On Time' },
                            { date: 'Jan 31, 2026', in: '09:12 AM', out: '06:10 PM', status: 'On Time' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                background: '#F8FAFC',
                                borderRadius: '12px'
                            }}>
                                <div>
                                    <p style={{ fontWeight: '600', color: '#1E293B' }}>{item.date}</p>
                                    <p style={{ fontSize: '0.875rem', color: '#64748B' }}>{item.in} - {item.out}</p>
                                </div>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '99px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    background: item.status === 'On Time' ? '#ECFDF5' : '#FFF7ED',
                                    color: item.status === 'On Time' ? '#10B981' : '#F59E0B'
                                }}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{
                    background: '#FFFFFF',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #F1F5F9'
                }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1E293B', marginBottom: '1.5rem' }}>
                        Quick Actions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid #E2E8F0',
                            background: '#FFFFFF',
                            textAlign: 'left',
                            fontWeight: '600',
                            color: '#1E293B',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <Calendar size={18} color="#D4AF37" />
                            Apply for Leave
                        </button>
                        <button style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid #E2E8F0',
                            background: '#FFFFFF',
                            textAlign: 'left',
                            fontWeight: '600',
                            color: '#1E293B',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <Banknote size={18} color="#D4AF37" />
                            Download Payslip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
