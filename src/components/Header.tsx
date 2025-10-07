'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
  import { Search, User, LogOut, Plus, Settings } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="flex flex-between items-center">
          <div className="flex items-center justify-between gap-4 full-width mobile-flex-col">
            {onSearch && (
              <div style={{ position: 'relative', minWidth: '300px' }}>
                <Search 
                  size={20} 
                  style={{ 
                    position: 'absolute', 
                    left: '0.75rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: 'var(--text-light)'
                  }} 
                />
                <input
                  type="text"
                  placeholder="Buscar posts..."
                  onChange={(e) => onSearch(e.target.value)}
                  className="input focus-ring"
                  style={{
                    width: '100%',
                    paddingLeft: '2.5rem',
                  }}
                />
              </div>
            )}

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2">
                  <Link href="/create">
                    <button className="btn btn-sm">
                      <Plus size={16} style={{ marginRight: '0.25rem' }} />
                      Novo Post
                    </button>
                  </Link>
                  
                  {user?.role === 'admin' && (
                    <Link href="/admin">
                      <button className="btn btn-secondary btn-sm">
                        <Settings size={16} style={{ marginRight: '0.25rem' }} />
                        Painel
                      </button>
                    </Link>
                  )}
                  </div>
                <div className="flex items-center gap-2">

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} />
                    <span style={{ fontSize: '0.875rem' }}>{user?.username}</span>
                  </div>

                  <button className="btn btn-secondary btn-sm" onClick={logout}>
                    <LogOut size={16} style={{ marginRight: '0.25rem' }} />
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
