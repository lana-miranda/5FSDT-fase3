'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  const spinnerSize = {
    sm: '16px',
    md: '24px',
    lg: '32px',
  }[size];

  return (
    <div className="flex items-center" style={{ flexDirection: 'column', gap: '1rem' }}>
      <div className="spinner" style={{ width: spinnerSize, height: spinnerSize }} />
      {text && <p className="muted" style={{ fontSize: '0.875rem' }}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
