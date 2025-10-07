'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, User, Lock } from 'lucide-react';

const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(formData);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="card" style={{ 
        width: '100%', 
        maxWidth: '400px', 
        margin: '1rem',
        background: 'var(--surface)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: 'var(--text)',
            marginBottom: '0.5rem'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Sign in to manage your blog posts
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <div style={{ position: 'relative' }}>
              <User 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }} 
              />
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                disabled={isLoading}
                className="input focus-ring"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }} 
              />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={isLoading}
                className="input focus-ring"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="spinner" style={{ width: '16px', height: '16px' }} />
                Signing in...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <LogIn size={16} />
                Sign In
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
