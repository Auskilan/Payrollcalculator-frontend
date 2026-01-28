import React, { useState, useEffect } from 'react';
import { X, Save, Clock, Calendar, AlertCircle } from 'lucide-react';

const EditAttendanceModal = ({ visible, onClose, onSave, record }) => {
    const [formData, setFormData] = useState({
        status: 'Present',
        checkIn: '',
        checkOut: '',
        overtime: ''
    });

    useEffect(() => {
        if (record) {
            setFormData({
                status: record.status || 'Present',
                checkIn: record.checkIn === '-' ? '' : convertToTimeInput(record.checkIn),
                checkOut: record.checkOut === '-' ? '' : convertToTimeInput(record.checkOut),
                overtime: record.overtime === '-' ? '' : parseOvertime(record.overtime)
            });
        }
    }, [record]);

    // Helper to convert "09:05 AM" to "09:05" for input type="time"
    const convertToTimeInput = (timeStr) => {
        if (!timeStr) return '';
        // Handle various formats if needed, assuming "hh:mm A" mock format
        // Simple parser for "09:05 AM" -> "09:05" (24h format needed for input time?)
        // Actually input type="time" expects "HH:mm" (24h).
        // Let's implement a quick parser.
        try {
            const [time, period] = timeStr.split(' ');
            let [hours, minutes] = time.split(':');
            if (period === 'PM' && hours !== '12') hours = parseInt(hours) + 12;
            if (period === 'AM' && hours === '12') hours = '00';
            return `${hours}:${minutes}`;
        } catch (e) {
            return '';
        }
    };

    // Helper to parser "2h 30m" to "02:30"
    const parseOvertime = (otStr) => {
        if (!otStr) return '';
        try {
            const match = otStr.match(/(\d+)h\s*(\d+)m/);
            if (match) {
                const h = match[1].padStart(2, '0');
                const m = match[2].padStart(2, '0');
                return `${h}:${m}`; // Using time input for duration for simplicity
            }
            return '';
        } catch (e) {
            return '';
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert back to display format
        // This is a simplified logic. Real app would use Date objects.
        const formatTime = (timeVal) => {
            if (!timeVal) return '-';
            const [h, m] = timeVal.split(':');
            const hour = parseInt(h);
            const period = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            return `${String(displayHour).padStart(2, '0')}:${m} ${period}`;
        };

        const formatOvertime = (timeVal) => {
            if (!timeVal) return '-';
            const [h, m] = timeVal.split(':');
            return `${parseInt(h)}h ${parseInt(m)}m`;
        };

        const updatedRecord = {
            ...record,
            status: formData.status,
            checkIn: formData.checkIn ? formatTime(formData.checkIn) : '-',
            checkOut: formData.checkOut ? formatTime(formData.checkOut) : '-',
            overtime: formData.overtime ? formatOvertime(formData.overtime) : '-',
            // Recalculate working hours? keeping it simple for now or parsing it.
            // Let's just pass these fields and let the parent handle or assume updated.
        };

        onSave(updatedRecord);
    };

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div className="stitch-card animate-fade-in" style={{
                width: '100%',
                maxWidth: '500px',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.25rem',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--color-surface)'
                }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Edit Attendance</h3>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                            {/* Employee Info Read-only */}
                            <div style={{ padding: '0.75rem', background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '40px', height: '40px', background: 'var(--color-primary-bg)',
                                    color: 'var(--color-primary-dark)', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600'
                                }}>
                                    {record?.name?.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{record?.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{record?.role}</div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="form-group">
                                <label className="block mb-2 text-sm font-medium">Attendance Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="stitch-input"
                                >
                                    <option value="Present">Present</option>
                                    <option value="Late">Late</option>
                                    <option value="Half-Day">Half-Day</option>
                                    <option value="Absent">Absent</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {/* Check In */}
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Check In Time</label>
                                    <div style={{ position: 'relative' }}>
                                        <Clock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                        <input
                                            type="time"
                                            name="checkIn"
                                            value={formData.checkIn}
                                            onChange={handleChange}
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                        />
                                    </div>
                                </div>

                                {/* Check Out */}
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Check Out Time</label>
                                    <div style={{ position: 'relative' }}>
                                        <Clock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                        <input
                                            type="time"
                                            name="checkOut"
                                            value={formData.checkOut}
                                            onChange={handleChange}
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Overtime */}
                            <div className="form-group">
                                <label className="block mb-2 text-sm font-medium">Overtime Duration</label>
                                <div style={{ position: 'relative' }}>
                                    <AlertCircle size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8B5CF6' }} />
                                    <input
                                        type="time"
                                        name="overtime"
                                        value={formData.overtime}
                                        onChange={handleChange}
                                        className="stitch-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                    />
                                    <small style={{ color: 'var(--color-text-muted)', display: 'block', marginTop: '0.25rem' }}>
                                        Format: HH:MM duration
                                    </small>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.25rem',
                    borderTop: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '0.75rem'
                }}>
                    <button type="button" className="stitch-btn stitch-btn-outline" onClick={onClose}>Cancel</button>
                    <button
                        type="button"
                        className="stitch-btn stitch-btn-primary"
                        onClick={handleSubmit}
                    >
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditAttendanceModal;
