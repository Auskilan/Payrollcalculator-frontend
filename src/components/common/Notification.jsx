import React, { useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Notification = ({
    message,
    type = 'success',
    onClose,
    duration = 3000,
    position = 'top-right'
}) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle size={24} />,
        error: <AlertCircle size={24} />,
        warning: <AlertTriangle size={24} />,
        info: <Info size={24} />
    };

    const colors = {
        success: {
            bg: '#D1FAE5',
            border: '#10B981',
            text: '#065F46',
            icon: '#10B981'
        },
        error: {
            bg: '#FEE2E2',
            border: '#EF4444',
            text: '#991B1B',
            icon: '#EF4444'
        },
        warning: {
            bg: '#FEF3C7',
            border: '#F59E0B',
            text: '#92400E',
            icon: '#F59E0B'
        },
        info: {
            bg: '#DBEAFE',
            border: '#3B82F6',
            text: '#1E3A8A',
            icon: '#3B82F6'
        }
    };

    const positions = {
        'top-right': { top: '2rem', right: '2rem' },
        'top-left': { top: '2rem', left: '2rem' },
        'bottom-right': { bottom: '2rem', right: '2rem' },
        'bottom-left': { bottom: '2rem', left: '2rem' },
        'top-center': { top: '2rem', left: '50%', transform: 'translateX(-50%)' },
        'bottom-center': { bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }
    };

    const currentColors = colors[type];

    return (
        <div
            style={{
                position: 'fixed',
                ...positions[position],
                zIndex: 9999,
                minWidth: '320px',
                maxWidth: '500px',
                background: currentColors.bg,
                border: `2px solid ${currentColors.border}`,
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                animation: 'slideInRight 0.3s ease-out',
                fontFamily: 'var(--font-sans)'
            }}
        >
            <style>
                {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideInLeft {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
            </style>

            {/* Icon */}
            <div style={{
                color: currentColors.icon,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center'
            }}>
                {icons[type]}
            </div>

            {/* Message */}
            <p style={{
                flex: 1,
                margin: 0,
                color: currentColors.text,
                fontSize: '0.95rem',
                fontWeight: '500',
                lineHeight: '1.5'
            }}>
                {message}
            </p>

            {/* Close Button */}
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: currentColors.text,
                    cursor: 'pointer',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: 0.7,
                    transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default Notification;
