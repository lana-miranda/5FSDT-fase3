import { Post, User, Comment } from '@/types';

const posts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with React',
    content:
      "React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the basics of React and how to get started.",
    author: 'John Doe',
    description:
      'Learn the fundamentals of React and how to build your first application with this comprehensive guide.',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    published: true,
  },
  {
    id: 2,
    title: 'Advanced TypeScript Patterns',
    content:
      'TypeScript brings static typing to JavaScript, making your code more robust and maintainable. In this advanced guide, we explore powerful patterns and techniques.',
    author: 'Jane Smith',
    description: 'Explore advanced TypeScript patterns and techniques.',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    published: true,
  },
  {
    id: 3,
    title: 'Building Responsive Web Apps',
    content: 'Creating responsive web applications is essential in today\'s multi-device world.',
    author: 'Mike Johnson',
    description: 'Best practices for responsive applications.',
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
    published: false,
  },
];

const comments: Comment[] = [
  { id: 1, postId: 1, author: 'Alice Brown', content: 'Great introduction!', createdAt: '2024-01-16T08:30:00Z' },
  { id: 2, postId: 1, author: 'Bob Wilson', content: 'Thanks for the clear examples.', createdAt: '2024-01-16T15:45:00Z' },
  { id: 3, postId: 2, author: 'Carol Davis', content: 'Advanced patterns explained well.', createdAt: '2024-01-21T11:20:00Z' },
];

const admin: User = { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' };

export const db = {
  posts,
  comments,
  admin,
};

export function nextId(prefix: 'post' | 'comment'): number {
  if (prefix === 'post') return (db.posts.length + 1);
  return (db.comments.length + 1);
}


