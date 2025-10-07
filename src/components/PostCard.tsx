'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { Calendar, User, Edit, Trash2, Eye } from 'lucide-react';

interface PostCardProps {
  post: Post;
  showActions?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, showActions = false, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="card">
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
        }}>
          <Link 
            href={`/posts/${post.id}`}
            style={{ 
              textDecoration: 'none', 
              color: 'inherit',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-light)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text)'}
          >
            {post.title}
          </Link>
        </h3>
        
        <p style={{ 
          marginBottom: '1rem',
          lineHeight: '1.6'
        }}>
          {truncateText(post.description, 150)}
        </p>
      </div>

      <div className="flex items-center" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div className="flex items-center" style={{ gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <div className="flex items-center" style={{ gap: '0.25rem' }}>
            <User size={14} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center" style={{ gap: '0.25rem' }}>
            <Calendar size={14} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          {!post.published && (
            <span className="badge badge-draft">
              Draft
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center" style={{ justifyContent: 'space-between' }}>
        <Link href={`/posts/${post.id}`}>
          <button className="btn btn-secondary btn-sm">
            <Eye size={14} style={{ marginRight: '0.25rem' }} />
            Read More
          </button>
        </Link>

        {showActions && onEdit && onDelete && (
          <div className="flex" style={{ gap: '0.5rem' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onEdit(post)}
            >
              <Edit size={14} style={{ marginRight: '0.25rem' }} />
              Edit
            </button>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(post.id)}
            >
              <Trash2 size={14} style={{ marginRight: '0.25rem' }} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
