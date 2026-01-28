import React, { useState, useEffect } from 'react';
import {
    X,
    Upload,
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    DollarSign,
    Fingerprint,
    Save
} from 'lucide-react';

const AddEmployeeModal = ({ onClose, onSave, initialData }) => {
    const [activeTab, setActiveTab] = useState('personal');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        employeeId: 'EMP005',
        joinDate: '',
        branch: 'Main Branch - T.Nagar',
        designation: '',
        salaryType: 'monthly',
        baseSalary: '',
        experience: 'Fresher',
    });

    useEffect(() => {
        if (initialData) {
            const [first, ...last] = initialData.fullName ? initialData.fullName.split(' ') : ['', ''];
            setFormData({
                firstName: first || '',
                lastName: last.join(' ') || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                address: initialData.address || '',
                employeeId: initialData.employeeId || '',
                joinDate: initialData.joinDate || '',
                branch: initialData.branch || 'Main Branch - T.Nagar',
                designation: initialData.designation || '',
                salaryType: initialData.salaryType ? initialData.salaryType.toLowerCase() : 'monthly',
                baseSalary: initialData.salaryType?.toLowerCase() === 'hourly' ? initialData.hourlyRate : initialData.monthlySalary,
                experience: initialData.experience || 'Fresher'
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Basic validation
        if (!formData.firstName || !formData.email) {
            alert('Please fill in required fields (Name, Email)');
            return;
        }

        const isMonthly = formData.salaryType === 'monthly';

        const newEmployee = {
            employeeId: formData.employeeId,
            fullName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            designation: formData.designation || 'Staff',
            branch: formData.branch,
            salaryType: isMonthly ? 'Monthly' : 'Hourly',
            monthlySalary: isMonthly ? Number(formData.baseSalary) : 0,
            hourlyRate: isMonthly ? 0 : Number(formData.baseSalary),
            experience: formData.experience,
            isActive: true,
            joinDate: formData.joinDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random&color=fff`
        };

        onSave(newEmployee);
    };

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
                maxWidth: '800px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
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
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Add New Employee</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Enter the details for the new staff member.</p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-text-muted)'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
                        {['personal', 'professional', 'salary', 'documents'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.75rem 0',
                                    border: 'none',
                                    background: 'none',
                                    borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                                    color: activeTab === tab ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                                    fontWeight: activeTab === tab ? '600' : '500',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize',
                                    marginRight: '1rem'
                                }}
                            >
                                {tab} Details
                            </button>
                        ))}
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                        {activeTab === 'personal' && (
                            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: 'var(--color-surface-hover)',
                                        border: '1px dashed var(--color-text-muted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--color-text-muted)'
                                    }}>
                                        <User size={32} />
                                    </div>
                                    <button type="button" className="stitch-btn stitch-btn-outline">
                                        Upload Photo
                                    </button>
                                </div>

                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">First Name</label>
                                    <input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        type="text"
                                        className="stitch-input"
                                        placeholder="e.g. Rahul"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Last Name</label>
                                    <input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        type="text"
                                        className="stitch-input"
                                        placeholder="e.g. Verma"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="rahul@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Phone Number</label>
                                    <div style={{ position: 'relative' }}>
                                        <Phone size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            type="tel"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="block mb-2 text-sm font-medium">Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            type="text"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="Full Residential Address"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'professional' && (
                            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Employee ID</label>
                                    <input type="text" className="stitch-input" value={formData.employeeId} readOnly style={{ background: 'var(--color-surface-hover)' }} />
                                </div>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Joining Date</label>
                                    <input
                                        name="joinDate"
                                        value={formData.joinDate}
                                        onChange={handleChange}
                                        type="date"
                                        className="stitch-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Branch</label>
                                    <select
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        className="stitch-input"
                                    >
                                        <option>Main Branch - T. Nagar</option>
                                        <option>Branch 2 - Velachery</option>
                                        <option>Branch 3 - Anna Nagar</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Designation</label>
                                    <div style={{ position: 'relative' }}>
                                        <Briefcase size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                        <input
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            type="text"
                                            className="stitch-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="e.g. Sales Executive"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'salary' && (
                            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                                <div style={{ padding: '1rem', background: 'var(--color-primary-bg)', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>Payroll Configuration</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Configure how this employee is paid and their attendance rules.</p>
                                </div>

                                {/* Experience Section */}
                                <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-info)', marginBottom: '0.75rem' }}>Experience Details</h4>
                                    <div className="form-group">
                                        <label className="block mb-2 text-sm font-medium">Employee Experience</label>
                                        <select
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="stitch-input"
                                        >
                                            <option value="Fresher">Fresher</option>
                                            <option value="1 Year">1 Year</option>
                                            <option value="2 Years">2 Years</option>
                                            <option value="3 Years">3 Years</option>
                                            <option value="5 Years">5 Years</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div className="form-group">
                                        <label className="block mb-2 text-sm font-medium">Salary Type</label>
                                        <select
                                            name="salaryType"
                                            value={formData.salaryType}
                                            onChange={handleChange}
                                            className="stitch-input"
                                        >
                                            <option value="monthly">Monthly Fixed Salary</option>
                                            <option value="hourly">Hourly Wages</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="block mb-2 text-sm font-medium">Base Amount (₹)</label>
                                        <div style={{ position: 'relative' }}>
                                            <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
                                            <input
                                                name="baseSalary"
                                                value={formData.baseSalary}
                                                onChange={handleChange}
                                                type="number"
                                                className="stitch-input"
                                                style={{ paddingLeft: '2.5rem' }}
                                                placeholder="25000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="block mb-2 text-sm font-medium">Biometric Mapping</label>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button type="button" className="stitch-btn stitch-btn-outline" style={{ flex: 1, padding: '1rem' }}>
                                            <Fingerprint size={20} />
                                            Scan Fingerprint
                                        </button>
                                        <button type="button" className="stitch-btn stitch-btn-outline" style={{ flex: 1, padding: '1rem' }}>
                                            <Fingerprint size={20} />
                                            Scan Face ID
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
                                    <Upload size={32} style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }} />
                                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Upload Aadhaar Card</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>PDF or JPG up to 5MB</p>
                                    <button type="button" className="stitch-btn stitch-btn-outline">Browse Files</button>
                                </div>
                                <div style={{ border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
                                    <Upload size={32} style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }} />
                                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Upload PAN Card / ID</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>PDF or JPG up to 5MB</p>
                                    <button type="button" className="stitch-btn stitch-btn-outline">Browse Files</button>
                                </div>
                            </div>
                        )}

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
                        onClick={handleSave}
                    >
                        <Save size={18} />
                        Save Employee
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
