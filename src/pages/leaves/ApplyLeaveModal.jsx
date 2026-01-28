import React, { useState } from 'react';
import { X, Calendar, FileText, Upload, Save } from 'lucide-react';

const ApplyLeaveModal = ({ visible, onClose, onApply }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        type: 'Sick Leave',
        fromDate: '',
        toDate: '',
        reason: ''
    });

    const employees = [
        { id: 'EMP001', name: 'Priya Sharma', role: 'Sales Executive' },
        { id: 'EMP002', name: 'Rahul Verma', role: 'Goldsmith' },
        { id: 'EMP003', name: 'Anjali Gupta', role: 'Store Manager' },
        { id: 'EMP004', name: 'Karthik Raja', role: 'Security' },
        { id: 'EMP005', name: 'Vikram Singh', role: 'Senior Artisan' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.employeeId || !formData.fromDate || !formData.toDate || !formData.reason) {
            alert('Please fill in all fields');
            return;
        }

        const employee = employees.find(e => e.id === formData.employeeId);
        const diffTime = Math.abs(new Date(formData.toDate) - new Date(formData.fromDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        const newLeave = {
            id: `L${Math.floor(Math.random() * 1000)}`,
            ...formData,
            days: diffDays,
            name: employee.name,
            role: employee.role,
            status: 'Pending',
            appliedOn: new Date().toISOString().split('T')[0]
        };

        onApply(newLeave);
        // Reset form
        setFormData({
            employeeId: '',
            type: 'Sick Leave',
            fromDate: '',
            toDate: '',
            reason: ''
        });
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
                maxWidth: '600px',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--color-surface)'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Apply for Leave</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Submit a new leave request for approval.</p>
                    </div>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Employee Selection */}
                            <div className="form-group">
                                <label className="block mb-2 text-sm font-medium">Employee</label>
                                <select
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    className="stitch-input"
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Leave Type */}
                            <div className="form-group">
                                <label className="block mb-2 text-sm font-medium">Leave Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="stitch-input"
                                >
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Privilege Leave">Privilege Leave</option>
                                    <option value="Emergency Leave">Emergency Leave</option>
                                    <option value="Maternity/Paternity Leave">Maternity/Paternity Leave</option>
                                </select>
                            </div>

                            {/* Dates */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">From Date</label>
                                    <div style={{ position: 'relative' }}>
                                        <Calendar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                        <input
                                            type="date"
                                            name="fromDate"
                                            value={formData.fromDate}
                                            onChange={handleChange}
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">To Date</label>
                                    <div style={{ position: 'relative' }}>
                                        <Calendar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                        <input
                                            type="date"
                                            name="toDate"
                                            value={formData.toDate}
                                            onChange={handleChange}
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            min={formData.fromDate}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="form-group">
                                <label className="block mb-2 text-sm font-medium">Reason</label>
                                <div style={{ position: 'relative' }}>
                                    <FileText size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                    <textarea
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        className="stitch-input"
                                        style={{ paddingLeft: '2.5rem', minHeight: '100px', resize: 'vertical' }}
                                        placeholder="Please describe the reason for leave..."
                                    />
                                </div>
                            </div>

                            {/* Upload (Mock) */}
                            <div style={{ border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center' }}>
                                <Upload size={24} style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }} />
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Attach Document (Optional)</h4>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>Medical certificate, invitation, etc.</p>
                                <button type="button" className="stitch-btn stitch-btn-outline" style={{ fontSize: '0.85rem' }}>Browse Files</button>
                            </div>

                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.5rem',
                    borderTop: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem'
                }}>
                    <button type="button" className="stitch-btn stitch-btn-outline" onClick={onClose}>Cancel</button>
                    <button
                        type="button"
                        className="stitch-btn stitch-btn-primary"
                        onClick={handleSubmit}
                    >
                        <Save size={18} />
                        Submit Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeaveModal;
