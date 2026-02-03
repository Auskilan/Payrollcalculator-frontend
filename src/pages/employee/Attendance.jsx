import React, { useState } from 'react';
import { Clock, Play, Square, Calendar as CalendarIcon } from 'lucide-react';

const Attendance = () => {
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    // Update time every second
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const attendanceRecords = [
        { date: 'Feb 02, 2024', in: '09:15 AM', out: '--', total: '--', status: 'Present' },
        { date: 'Feb 01, 2024', in: '09:00 AM', out: '06:05 PM', total: '09h 05m', status: 'Present' },
        { date: 'Jan 31, 2024', in: '09:12 AM', out: '06:10 PM', total: '08h 58m', status: 'Present' },
        { date: 'Jan 30, 2024', in: '09:30 AM', out: '06:00 PM', total: '08h 30m', status: 'Late' },
        { date: 'Jan 29, 2024', in: '--', out: '--', total: '--', status: 'Absent' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.5rem' }}>
                        Attendance Tracking
                    </h1>
                    <p style={{ color: '#64748B' }}>Monitor your daily working hours and attendance history.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1E293B' }}>{currentTime}</p>
                    <p style={{ fontSize: '0.875rem', color: '#64748B' }}>{new Date().toDateString()}</p>
                </div>
            </div>

            {/* Clocking Section */}
            <div style={{
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                padding: '2.5rem',
                borderRadius: '24px',
                color: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {isClockedIn ? 'Working hard? Keep it up!' : 'Ready to start your day?'}
                    </h2>
                    <p style={{ opacity: 0.8 }}>
                        {isClockedIn
                            ? 'You clocked in at 09:15 AM today.'
                            : 'Click the button below to record your attendance.'}
                    </p>
                </div>
                <button
                    onClick={() => setIsClockedIn(!isClockedIn)}
                    style={{
                        padding: '1rem 2rem',
                        borderRadius: '16px',
                        border: 'none',
                        background: isClockedIn ? '#EF4444' : '#D4AF37',
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '1.125rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {isClockedIn ? (
                        <><Square size={20} fill="white" /> Clock Out</>
                    ) : (
                        <><Play size={20} fill="white" /> Clock In</>
                    )}
                </button>
            </div>

            {/* Attendance List */}
            <div style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                border: '1px solid #F1F5F9'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1E293B' }}>Monthly History</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFFFFF', fontSize: '0.875rem' }}>
                            All Status
                        </button>
                        <button style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFFFFF', fontSize: '0.875rem' }}>
                            February 2024
                        </button>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #F1F5F9', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', color: '#64748B', fontWeight: '600', fontSize: '0.875rem' }}>DATE</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontWeight: '600', fontSize: '0.875rem' }}>CLOCK IN</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontWeight: '600', fontSize: '0.875rem' }}>CLOCK OUT</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontWeight: '600', fontSize: '0.875rem' }}>TOTAL HOURS</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontWeight: '600', fontSize: '0.875rem' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceRecords.map((record, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #F8FAFC' }}>
                                    <td style={{ padding: '1.25rem 1rem', fontWeight: '500', color: '#1E293B' }}>{record.date}</td>
                                    <td style={{ padding: '1.25rem 1rem', color: '#475569' }}>{record.in}</td>
                                    <td style={{ padding: '1.25rem 1rem', color: '#475569' }}>{record.out}</td>
                                    <td style={{ padding: '1.25rem 1rem', color: '#475569' }}>{record.total}</td>
                                    <td style={{ padding: '1.25rem 1rem' }}>
                                        <span style={{
                                            padding: '0.375rem 0.875rem',
                                            borderRadius: '99px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            background: record.status === 'Present' ? '#ECFDF5' : (record.status === 'Late' ? '#FFF7ED' : '#FEF2F2'),
                                            color: record.status === 'Present' ? '#10B981' : (record.status === 'Late' ? '#F59E0B' : '#EF4444')
                                        }}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
