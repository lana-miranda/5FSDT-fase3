'use client';

import React, { useState, useEffect } from 'react';
import { Post, PostFormData } from '@/types';
import { Save, X } from 'lucide-react';

interface PostFormProps {
  initialData?: Post;
  onSubmit: (data: PostFormData) => Promise<boolean>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    author: '',
    description: '',
    published: false,
  });

  const [errors, setErrors] = useState<Partial<PostFormData>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        author: initialData.author,
        description: initialData.description,
        published: initialData.published,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name as keyof PostFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PostFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const success = await onSubmit(formData);
    if (success && !initialData) {
      setFormData({
        title: '',
        content: '',
        author: '',
        description: '',
        published: false,
      });
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            disabled={isLoading}
            className="input focus-ring"
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">Author *</label>
          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            disabled={isLoading}
            className="input focus-ring"
          />
          {errors.author && <div className="error">{errors.author}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a brief description of the post"
            disabled={isLoading}
            className="textarea focus-ring"
            style={{ minHeight: '80px' }}
          />
          <div className="form-hint">
            {formData.description.length}/200 characters
          </div>
          {errors.description && <div className="error">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content here..."
            disabled={isLoading}
            className="textarea focus-ring"
            style={{ minHeight: '200px' }}
          />
          {errors.content && <div className="error">{errors.content}</div>}
        </div>

        <div className="form-group">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              disabled={isLoading}
              className="focus-ring"
            />
            <label htmlFor="published" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>
              Publish immediately
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4" style={{ marginTop: '1.5rem' }}>
          {onCancel && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isLoading}
            >
              <X size={16} style={{ marginRight: '0.25rem' }} />
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="spinner" style={{ width: '16px', height: '16px' }} />
                Saving...
              </div>
            ) : (
              <>
                <Save size={16} style={{ marginRight: '0.25rem' }} />
                {initialData ? 'Update Post' : 'Create Post'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
