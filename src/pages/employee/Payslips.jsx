import React, { useState } from 'react';
import { FileDown, Eye, Search, Filter, Printer } from 'lucide-react';

const Payslips = () => {
    const [previewSlip, setPreviewSlip] = useState(null);

    const slips = [
        { id: 1, month: 'January 2024', basic: '30,000', allowances: '10,000', net: '45,000', date: 'Jan 31, 2024' },
        { id: 2, month: 'December 2023', basic: '30,000', allowances: '10,000', net: '45,200', date: 'Dec 31, 2023' },
        { id: 3, month: 'November 2023', basic: '30,000', allowances: '10,500', net: '46,100', date: 'Nov 30, 2023' },
        { id: 4, month: 'October 2023', basic: '30,000', allowances: '9,500', net: '44,800', date: 'Oct 31, 2023' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.5rem' }}>
                    My Payslips
                </h1>
                <p style={{ color: '#64748B' }}>Access and download your monthly salary statements.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                {slips.map((slip) => (
                    <div key={slip.id} style={{
                        background: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '1.5rem 2rem',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                        border: '1px solid #F1F5F9',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: '#FDF6E3',
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#D4AF37'
                            }}>
                                <FileDown size={28} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1E293B' }}>{slip.month}</h3>
                                <p style={{ fontSize: '0.875rem', color: '#64748B' }}>Paid on: {slip.date}</p>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right', marginRight: '3rem' }}>
                            <p style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' }}>Net Salary</p>
                            <p style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1E293B' }}>₹{slip.net}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setPreviewSlip(slip)}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    borderRadius: '10px',
                                    border: '1px solid #E2E8F0',
                                    background: '#FFFFFF',
                                    color: '#475569',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Eye size={18} />
                                Preview
                            </button>
                            <button style={{
                                padding: '0.75rem 1.25rem',
                                borderRadius: '10px',
                                border: 'none',
                                background: '#1E293B',
                                color: '#FFFFFF',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <FileDown size={18} />
                                Download
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview Modal */}
            {previewSlip && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}>
                    <div style={{
                        background: '#FFFFFF',
                        width: '100%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        borderRadius: '24px',
                        padding: '3rem',
                        position: 'relative',
                        overflowY: 'auto'
                    }}>
                        <button
                            onClick={() => setPreviewSlip(null)}
                            style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                        >
                            <span style={{ fontSize: '2rem' }}>&times;</span>
                        </button>

                        {/* Pay Slip Template */}
                        <div style={{ border: '1px solid #E2E8F0', padding: '2rem', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1E293B' }}>JEWEL FLOW</h2>
                                    <p style={{ color: '#64748B' }}>123 Jewellery Park, Mumbai, Maharashtra</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <h3 style={{ fontWeight: '700' }}>PAY SLIP</h3>
                                    <p style={{ color: '#64748B' }}>{previewSlip.month}</p>
                                </div>
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '1.5rem 0' }} />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Employee Name</p>
                                    <p style={{ fontWeight: '600' }}>Alex Johnson</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Employee ID</p>
                                    <p style={{ fontWeight: '600' }}>JF-2024-088</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Designation</p>
                                    <p style={{ fontWeight: '600' }}>Senior Goldsmith</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Bank Account</p>
                                    <p style={{ fontWeight: '600' }}>XXXX-XXXX-4567</p>
                                </div>
                            </div>

                            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span>Basic Salary</span>
                                    <span style={{ fontWeight: '600' }}>₹{previewSlip.basic}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span>HRA & Other Allowances</span>
                                    <span style={{ fontWeight: '600' }}>₹{previewSlip.allowances}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#EF4444' }}>
                                    <span>TDS / Professional Tax</span>
                                    <span style={{ fontWeight: '600' }}>- ₹500</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>Net Payable Amount</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#D4AF37' }}>₹{previewSlip.net}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button style={{ padding: '0.75rem 1.5rem', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Printer size={18} /> Print
                            </button>
                            <button style={{ padding: '0.75rem 1.5rem', background: '#D4AF37', color: '#FFFFFF', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FileDown size={18} /> Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payslips;
