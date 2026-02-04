import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    AlertCircle,
    CheckCircle,
    XCircle,
    Download,
    ChevronLeft,
    ChevronRight,
    Edit2,
    Zap,
    Search
} from 'lucide-react';
import EditAttendanceModal from './EditAttendanceModal';

const AttendanceDashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [viewMode, setViewMode] = useState('day'); // 'day', 'week', 'month'
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Attendance Data
    const [attendanceData, setAttendanceData] = useState([
        {
            id: 'EMP001',
            name: 'Priya Sharma',
            role: 'Sales Executive',
            checkIn: '09:05 AM',
            checkOut: '06:10 PM',
            status: 'Present',
            lateMinutes: 5,
            earlyLeaveMinutes: 0,
            workingHours: '9h 05m',
            overtime: '0h 05m',
            overtimeMinutes: 5
        },
        {
            id: 'EMP002',
            name: 'Rahul Verma',
            role: 'Goldsmith',
            checkIn: '09:45 AM',
            checkOut: '06:00 PM',
            status: 'Late',
            lateMinutes: 45,
            earlyLeaveMinutes: 0,
            workingHours: '8h 15m',
            overtime: '-',
            overtimeMinutes: 0
        },
        {
            id: 'EMP003',
            name: 'Anjali Gupta',
            role: 'Store Manager',
            checkIn: '-',
            checkOut: '-',
            status: 'Absent',
            lateMinutes: 0,
            earlyLeaveMinutes: 0,
            workingHours: '0h 0m',
            overtime: '-',
            overtimeMinutes: 0
        },
        {
            id: 'EMP004',
            name: 'Karthik Raja',
            role: 'Security',
            checkIn: '08:50 AM',
            checkOut: '05:30 PM',
            status: 'Half-Day',
            lateMinutes: 0,
            earlyLeaveMinutes: 30,
            workingHours: '8h 40m',
            overtime: '-',
            overtimeMinutes: 0
        },
        {
            id: 'EMP005',
            name: 'Vikram Singh',
            role: 'Senior Artisan',
            checkIn: '09:00 AM',
            checkOut: '08:30 PM',
            status: 'Present',
            lateMinutes: 0,
            earlyLeaveMinutes: 0,
            workingHours: '11h 30m',
            overtime: '2h 30m',
            overtimeMinutes: 150
        }
    ]);

    const handleEditClick = (record) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    const handleSaveEdit = (updatedRecord) => {
        setAttendanceData(prevData => prevData.map(item =>
            item.id === updatedRecord.id ? updatedRecord : item
        ));
        setIsModalOpen(false);
        setSelectedRecord(null);
    };

    const handlePrev = () => {
        const newDate = new Date(selectedDate);
        if (viewMode === 'day') newDate.setDate(selectedDate.getDate() - 1);
        else if (viewMode === 'week') newDate.setDate(selectedDate.getDate() - 7);
        else if (viewMode === 'month') newDate.setMonth(selectedDate.getMonth() - 1);
        setSelectedDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(selectedDate);
        if (viewMode === 'day') newDate.setDate(selectedDate.getDate() + 1);
        else if (viewMode === 'week') newDate.setDate(selectedDate.getDate() + 7);
        else if (viewMode === 'month') newDate.setMonth(selectedDate.getMonth() + 1);
        setSelectedDate(newDate);
    };

    // Date formatting helper
    const formatDisplayDate = () => {
        const now = new Date();
        const isToday = selectedDate.toDateString() === now.toDateString();

        if (viewMode === 'day') {
            return isToday ? 'Today' : selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }
        if (viewMode === 'week') {
            const startOfWeek = new Date(selectedDate);
            startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return `${startOfWeek.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - ${endOfWeek.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
        }
        if (viewMode === 'month') {
            return selectedDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
        }
        return 'Today';
    };

    const getDashboardTitle = () => {
        switch (viewMode) {
            case 'week': return 'Weekly Attendance';
            case 'month': return 'Monthly Attendance';
            default: return 'Daily Attendance';
        }
    };

    // Calculate Total Overtime
    const totalOvertimeMinutes = attendanceData.reduce((acc, curr) => acc + (curr.overtimeMinutes || 0), 0);
    const totalOvertimeHours = Math.floor(totalOvertimeMinutes / 60);
    const totalOvertimeMinsOnly = totalOvertimeMinutes % 60;
    const totalOvertimeDisplay = `${totalOvertimeHours}h ${totalOvertimeMinsOnly}m`;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return 'success';
            case 'Late': return 'warning';
            case 'Absent': return 'error';
            case 'Half-Day': return 'info';
            default: return 'text-muted';
        }
    };

    const getStatusBadgeStyle = (status) => {
        const colorVar = getStatusColor(status);
        let bg = '';
        let color = '';

        if (colorVar === 'success') { bg = 'rgba(16, 185, 129, 0.1)'; color = '#10B981'; }
        else if (colorVar === 'warning') { bg = 'rgba(245, 158, 11, 0.1)'; color = '#F59E0B'; }
        else if (colorVar === 'error') { bg = 'rgba(239, 68, 68, 0.1)'; color = '#EF4444'; }
        else if (colorVar === 'info') { bg = 'rgba(59, 130, 246, 0.1)'; color = '#3B82F6'; }

        return {
            backgroundColor: bg,
            color: color,
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
        };
    };

    const filteredData = attendanceData.filter(record =>
        record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto', paddingBottom: '4rem' }}>

            {/* Header Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
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
                        {getDashboardTitle()}
                    </h1>
                    {/* <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
                        <Calendar size={16} />
                        <span>Manage pupil attendance, track late comers and absentees.</span>
                    </div> */}
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Search Bar */}
                    <div style={{
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: '#fff',
                        border: '1px solid #e2e8f0', // Light border
                        borderRadius: '12px', // Slightly more rounded
                        width: '300px', // Initial width, adjust as needed
                        maxWidth: '100%'
                    }}>
                        <Search size={20} color="#94a3b8" /> {/* Lighter gray for icon */}
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                outline: 'none',
                                fontSize: '0.95rem',
                                color: 'var(--color-text-main)',
                                width: '100%',
                                fontWeight: '500'
                            }}
                        />
                    </div>

                    {/* View Switcher CTA */}
                    <div className="stitch-card" style={{
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'var(--color-surface)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        {['Day', 'Week', 'Month'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode.toLowerCase())}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    background: viewMode === mode.toLowerCase() ? 'var(--color-primary)' : 'transparent',
                                    color: viewMode === mode.toLowerCase() ? '#fff' : 'var(--color-text-muted)',
                                    boxShadow: viewMode === mode.toLowerCase() ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none'
                                }}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>

                    {/* Date Selector */}
                    <div className="stitch-card" style={{ padding: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                            className="stitch-btn stitch-btn-outline"
                            style={{ border: 'none', padding: '10px' }}
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <span style={{ fontWeight: '700', minWidth: '160px', textAlign: 'center', fontSize: '0.95rem' }}>
                            {formatDisplayDate()}
                        </span>
                        <button
                            className="stitch-btn stitch-btn-outline"
                            style={{ border: 'none', padding: '10px' }}
                            onClick={handleNext}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <button className="stitch-btn stitch-btn-outline" style={{ padding: '12px 20px' }}>
                        <Download size={18} /> <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <div className="stitch-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: 'var(--color-success)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Present</p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>19</h2>
                    </div>
                </div>

                <div className="stitch-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(245, 158, 11, 0.1)',
                        color: 'var(--color-warning)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Clock size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Late Arrivals</p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>3</h2>
                    </div>
                </div>

                <div className="stitch-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--color-error)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <XCircle size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Absent</p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>2</h2>
                    </div>
                </div>

                <div className="stitch-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--color-primary-bg)',
                        color: 'var(--color-primary-dark)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Half Day</p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>1</h2>
                    </div>
                </div>

                {/* Overtime Card */}
                <div className="stitch-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(139, 92, 246, 0.1)',
                        color: '#8B5CF6',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Zap size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Total Overtime</p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{totalOvertimeDisplay}</h2>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="stitch-card" style={{ padding: '0', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                    <thead style={{ background: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Employee</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Status</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Check In</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Check Out</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Delay(Mins)</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Overtime</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Work Hrs</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((record) => (
                            <tr key={record.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontWeight: '500' }}>{record.name}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{record.role}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={getStatusBadgeStyle(record.status)}>
                                        {record.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{record.checkIn}</td>
                                <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{record.checkOut}</td>
                                <td style={{ padding: '1rem' }}>
                                    {record.lateMinutes > 0 ? (
                                        <span style={{ color: 'var(--color-error)', fontWeight: '600' }}>{record.lateMinutes} min</span>
                                    ) : (
                                        <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                                    )}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {record.overtimeMinutes > 0 ? (
                                        <span style={{ color: '#8B5CF6', fontWeight: '600' }}>{record.overtime}</span>
                                    ) : (
                                        <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                                    )}
                                </td>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{record.workingHours}</td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        className="stitch-btn stitch-btn-outline"
                                        style={{ padding: '0.25rem', border: 'none' }}
                                        onClick={() => handleEditClick(record)}
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Showing {filteredData.length} of {attendanceData.length} records
            </div>

            <EditAttendanceModal
                visible={isModalOpen}
                record={selectedRecord}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEdit}
            />
        </div>
    );
};

export default AttendanceDashboard;
