import React, { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    FileText,
    Fingerprint,
    CreditCard,
    Edit3,
    Trash2
} from 'lucide-react';
import AddEmployeeModal from './AddEmployeeModal';
import { useOrganization } from '../../context/OrganizationContext';

const EmployeeList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [salaryTypeFilter, setSalaryTypeFilter] = useState('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const { selectedLocation } = useOrganization();

    // Employees Data State
    const [employees, setEmployees] = useState([
        {
            employeeId: 'EMP001',
            fullName: 'Priya Sharma',
            designation: 'Sales Executive',
            branch: 'Main Branch - T.Nagar',
            salaryType: 'Monthly',
            hourlyRate: 0,
            monthlySalary: 30000,
            experience: '3 Years',
            isActive: true,
            avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=F4D06F&color=fff',
            joinDate: '12 Jan 2023',
            email: 'priya@example.com',
            phone: '9876543210',
            address: 'Chennai'
        },
        {
            employeeId: 'EMP002',
            fullName: 'Rahul Verma',
            designation: 'Goldsmith',
            branch: 'Branch 2 - Velachery',
            salaryType: 'Hourly',
            hourlyRate: 500,
            monthlySalary: 0,
            experience: '5 Years',
            isActive: true,
            avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=0F172A&color=fff',
            joinDate: '15 Mar 2023',
            email: 'rahul@example.com',
            phone: '9988776655',
            address: 'Chennai'
        },
        {
            employeeId: 'EMP003',
            fullName: 'Anjali Gupta',
            designation: 'Store Manager',
            branch: 'Main Branch - T.Nagar',
            salaryType: 'Monthly',
            hourlyRate: 0,
            monthlySalary: 45000,
            experience: '5 Years',
            isActive: false,
            avatar: 'https://ui-avatars.com/api/?name=Anjali+Gupta&background=D4AF37&color=fff',
            joinDate: '01 Feb 2022',
            email: 'anjali@example.com',
            phone: '8877665544',
            address: 'Bangalore'
        },
        {
            employeeId: 'EMP004',
            fullName: 'Karthik Raja',
            designation: 'Security',
            branch: 'Branch 1 - Anna Nagar',
            salaryType: 'Hourly',
            hourlyRate: 400,
            monthlySalary: 0,
            experience: 'Fresher',
            isActive: false,
            avatar: 'https://ui-avatars.com/api/?name=Karthik+Raja&background=EF4444&color=fff',
            joinDate: '20 Nov 2023',
            email: 'karthik@example.com',
            phone: '7766554433',
            address: 'Madurai'
        }
    ]);

    const handleAddClick = () => {
        setEditingEmployee(null);
        setIsAddModalOpen(true);
    };

    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
        setIsAddModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
            setEmployees(employees.filter(emp => emp.employeeId !== id));
        }
    };

    const handleSaveEmployee = (employeeData) => {
        if (editingEmployee) {
            // Update existing
            setEmployees(employees.map(emp => emp.employeeId === employeeData.employeeId ? employeeData : emp));
        } else {
            // Add new
            setEmployees([employeeData, ...employees]);
        }
        setIsAddModalOpen(false);
        setEditingEmployee(null);
    };

    const handleExportCSV = () => {
        const headers = ['EmployeeId', 'FullName', 'Designation', 'Branch', 'Experience', 'SalaryType', 'HourlyRate', 'MonthlySalary', 'IsActive', 'Join Date', 'Email', 'Phone', 'Address'];

        const rows = filteredEmployees.map(emp => [
            emp.employeeId,
            emp.fullName,
            emp.designation,
            emp.branch,
            emp.experience || 'Fresher',
            emp.salaryType,
            emp.hourlyRate,
            emp.monthlySalary,
            emp.isActive ? 'True' : 'False',
            emp.joinDate,
            emp.email,
            emp.phone || '',
            emp.address || ''
        ].map(field => `"${field}"`).join(','));

        const csvContent = [
            headers.join(','),
            ...rows
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'employees_export.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.designation.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = salaryTypeFilter === 'all' || emp.salaryType.toLowerCase() === salaryTypeFilter;
        const matchesLocation = !selectedLocation || emp.branch === selectedLocation.name;
        return matchesSearch && matchesFilter && matchesLocation;
    });

    return (
        <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>

            {/* Header Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
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
                        Employee List
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Manage your staff, roles, and salary configurations for <span style={{ color: 'var(--color-primary-dark)', fontWeight: '600' }}>{selectedLocation?.name}</span>.
                    </p>
                </div>
                <button
                    className="stitch-btn stitch-btn-primary"
                    onClick={handleAddClick}
                >
                    <Plus size={20} />
                    Add Employee
                </button>
            </div>

            {/* Controls Bar */}
            <div className="stitch-card" style={{
                padding: '1rem',
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--color-text-muted)'
                        }} />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="stitch-input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div style={{ position: 'relative', width: '200px' }}>
                        <Filter size={18} style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--color-text-muted)'
                        }} />
                        <select
                            className="stitch-input"
                            style={{ paddingLeft: '2.5rem', appearance: 'none' }}
                            value={salaryTypeFilter}
                            onChange={(e) => setSalaryTypeFilter(e.target.value)}
                        >
                            <option value="all">All Salary Types</option>
                            <option value="monthly">Monthly Fixed</option>
                            <option value="hourly">Hourly Rate</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        className="stitch-btn stitch-btn-outline"
                        onClick={handleExportCSV}
                    >
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Employees Table (Flat List) */}
            <div className="stitch-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Employee ID</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Full Name</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Designation</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Experience</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Salary Type</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Hourly Rate</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Monthly Salary</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Status</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.employeeId} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background-color 0.2s' }}>
                                <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    {emp.employeeId}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <img
                                            src={emp.avatar}
                                            alt={emp.fullName}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: 'var(--radius-full)',
                                                border: '1px solid var(--color-border)'
                                            }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: '500' }}>{emp.fullName}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{emp.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{emp.designation}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{emp.branch}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        color: 'var(--color-info)',
                                        fontWeight: '500',
                                        fontSize: '0.85rem',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        padding: '0.25rem 0.6rem',
                                        borderRadius: 'var(--radius-sm)'
                                    }}>
                                        {emp.experience || 'Fresher'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        color: 'var(--color-primary-dark)',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                        background: 'var(--color-primary-bg)',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: 'var(--radius-sm)'
                                    }}>
                                        {emp.salaryType}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>
                                    {emp.hourlyRate ? `₹${emp.hourlyRate}` : '-'}
                                </td>
                                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>
                                    {emp.monthlySalary ? `₹${emp.monthlySalary.toLocaleString()}` : '-'}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span
                                        className={`stitch-badge ${emp.isActive ? 'stitch-badge-active' : 'stitch-badge-inactive'}`}
                                        style={{
                                            backgroundColor: !emp.isActive ? 'rgba(245, 158, 11, 0.1)' : undefined, // Example for inactive, adjust as needed
                                            color: !emp.isActive ? 'var(--color-warning)' : undefined
                                        }}
                                    >
                                        {emp.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            className="stitch-btn stitch-btn-outline"
                                            style={{ padding: '0.4rem', border: 'none' }}
                                            title="Edit"
                                            onClick={() => handleEditClick(emp)}
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            className="stitch-btn stitch-btn-outline"
                                            style={{ padding: '0.4rem', border: 'none', color: 'var(--color-error)' }}
                                            title="Delete"
                                            onClick={() => handleDeleteClick(emp.employeeId)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <button className="stitch-btn stitch-btn-outline" style={{ padding: '0.4rem', border: 'none' }} title="Details">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredEmployees.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        No employees found matching your search.
                    </div>
                )}
            </div>

            {/* Add Employee Modal */}
            {isAddModalOpen && (
                <AddEmployeeModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleSaveEmployee}
                    initialData={editingEmployee}
                />
            )}

        </div>
    );
};

export default EmployeeList;
