import React, { useState } from 'react';
import {
    Download,
    FileText,
    Search,
    Clock,
    Wallet,
    Users,
    Filter,
    PieChart as PieChartIcon
} from 'lucide-react';

const ReportsDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [downloadingId, setDownloadingId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    const reports = [
        { id: 1, title: 'Employee-wise Attendance Summary', category: 'Attendance', date: 'Jan 27, 2026', type: 'PDF', icon: <Users size={18} /> },
        { id: 2, title: 'Attendance & Overtime Timesheet', category: 'Payroll', date: 'Jan 27, 2026', type: 'XLSX', icon: <FileText size={18} /> },
        { id: 3, title: 'Complete Employee Profile Summary', category: 'Human Resources', date: 'Jan 26, 2026', type: 'PDF', icon: <Users size={18} /> },
        { id: 4, title: 'Dashboard KPIs: Attendance & Payroll', category: 'Analytics', date: 'Jan 27, 2026', type: 'PDF', icon: <PieChartIcon size={18} /> },
        { id: 5, title: 'Biometric Device Health Status', category: 'Infrastructure', date: 'Jan 27, 2026', type: 'CSV', icon: <Clock size={18} /> },
        { id: 6, title: 'Monthly Salary Register', category: 'Payroll', date: 'Jan 25, 2026', type: 'XLSX', icon: <Wallet size={18} /> },
        { id: 7, title: 'Late Comers & Early Leavers', category: 'Attendance', date: 'Jan 27, 2026', type: 'CSV', icon: <Clock size={18} /> },
    ];

    const categories = ['All', ...new Set(reports.map(r => r.category))];

    const handleDownload = (report) => {
        setDownloadingId(report.id);
        // Mock download delay
        setTimeout(() => {
            setDownloadingId(null);
            alert(`${report.title} has been downloaded successfully in ${report.type} format.`);
        }, 1500);
    };

    const handleRequestAccess = () => {
        const email = prompt("Please enter your admin email to request access for custom reports:");
        if (email) {
            alert(`Access request sent for ${email}. Our team will review it shortly.`);
        }
    };

    const filteredReports = reports.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Reports & Analytics</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Visual data insights and organization logs.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2.5rem', marginBottom: '3rem' }}>
                {/* Visual Pie Chart Card */}
                <div className="stitch-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Attendance Status</h3>
                        <PieChartIcon size={20} style={{ color: 'var(--color-primary)' }} />
                    </div>

                    <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '2rem' }}>
                        {/* CSS Donut Chart */}
                        <div style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: 'conic-gradient(var(--color-primary) 0% 75%, var(--color-success) 75% 90%, var(--color-error) 90% 100%)',
                            boxShadow: 'var(--shadow-lg)'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '140px',
                            height: '140px',
                            background: 'var(--color-surface)',
                            borderRadius: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                        }}>
                            <span style={{ fontSize: '1.75rem', fontWeight: '900' }}>94%</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '700' }}>PRESENT</span>
                        </div>
                    </div>

                    <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {[
                            { label: 'Present', color: 'var(--color-primary)', val: '75%' },
                            { label: 'Late', color: 'var(--color-success)', val: '15%' },
                            { label: 'Absent', color: 'var(--color-error)', val: '10%' }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.color }}></div>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>{item.label}</span>
                                <span style={{ fontSize: '0.85rem', fontWeight: '800', marginLeft: 'auto' }}>{item.val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search and List */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', position: 'relative' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search records..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="stitch-input"
                                style={{ paddingLeft: '3.5rem', height: '52px', borderRadius: '12px' }}
                            />
                        </div>
                        <button
                            className={`stitch-btn stitch-btn-outline`}
                            onClick={() => setShowFilters(!showFilters)}
                            style={{
                                height: '52px',
                                padding: '0 1.25rem',
                                borderRadius: '12px',
                                background: showFilters ? 'var(--color-primary-bg)' : 'transparent',
                                borderColor: showFilters ? 'var(--color-primary)' : 'var(--color-border)'
                            }}
                        >
                            <Filter size={20} style={{ color: showFilters ? 'var(--color-primary)' : 'inherit' }} />
                        </button>

                        {/* Category Filter Dropdown */}
                        {showFilters && (
                            <div className="stitch-card" style={{
                                position: 'absolute',
                                top: '60px',
                                right: '0',
                                zIndex: 10,
                                padding: '10px',
                                minWidth: '180px',
                                boxShadow: 'var(--shadow-lg)'
                            }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-muted)', padding: '5px 10px' }}>FILTER BY CATEGORY</p>
                                {categories.map(cat => (
                                    <div
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setShowFilters(false);
                                        }}
                                        style={{
                                            padding: '8px 12px',
                                            cursor: 'pointer',
                                            borderRadius: '6px',
                                            fontSize: '0.9rem',
                                            background: selectedCategory === cat ? 'var(--color-primary-bg)' : 'transparent',
                                            color: selectedCategory === cat ? 'var(--color-primary)' : 'inherit',
                                            fontWeight: selectedCategory === cat ? '700' : '500'
                                        }}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="stitch-card" style={{ padding: '0', overflow: 'hidden', flex: 1, minHeight: '340px' }}>
                        {filteredReports.map((report, index) => (
                            <div
                                key={report.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '1rem 1.5rem',
                                    borderBottom: index === filteredReports.length - 1 ? 'none' : '1px solid var(--color-border)',
                                    background: 'transparent',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: 'var(--color-primary-bg)',
                                    color: 'var(--color-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '1rem'
                                }}>
                                    {report.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '2px' }}>{report.title}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{report.category} • {report.date}</p>
                                </div>
                                <button
                                    onClick={() => handleDownload(report)}
                                    disabled={downloadingId === report.id}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: downloadingId === report.id ? 'var(--color-text-muted)' : 'var(--color-primary)',
                                        cursor: downloadingId === report.id ? 'not-allowed' : 'pointer',
                                        padding: '8px'
                                    }}
                                >
                                    {downloadingId === report.id ? (
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '2px solid var(--color-primary)',
                                            borderTopColor: 'transparent',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }} />
                                    ) : (
                                        <Download size={20} />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                    className="stitch-btn stitch-btn-primary"
                    onClick={handleRequestAccess}
                    style={{ padding: '12px 30px' }}
                >
                    Request for Custom Access
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
};

export default ReportsDashboard;
