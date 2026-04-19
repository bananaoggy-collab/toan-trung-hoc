"use client";
import { useState } from 'react';
import { submitComment } from '@/app/actions/commentActions';

export default function CommentSection({ postId, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    
    setLoading(true);
    const newComment = await submitComment({ post_id: postId, author, content });
    setComments([newComment, ...comments]);
    setAuthor('');
    setContent('');
    setLoading(false);
  };

  return (
    <section>
      <h3 style={{ marginBottom: '1.5rem' }}>💬 Bình luận ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', background: 'var(--color-bg)', padding: '1.5rem', borderRadius: 'var(--border-radius)' }}>
        <input 
          type="text" 
          placeholder="Tên của bạn" 
          required
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', width: '100%', maxWidth: '300px', outline: 'none' }} 
        />
        <textarea 
          placeholder="Bạn nghĩ gì về bài viết này..." 
          required
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          rows="3" 
          style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', width: '100%', outline: 'none', fontFamily: 'inherit' }} 
        />
        <button type="submit" disabled={loading} className="btn" style={{ alignSelf: 'flex-start' }}>
          {loading ? 'Đang gửi...' : 'Gửi bình luận'}
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {comments.length === 0 ? <p style={{ color: 'var(--color-text-muted)' }}>Hãy là người đầu tiên bình luận!</p> : comments.map(c => (
          <div key={c.id} style={{ padding: '1.5rem', background: '#fff', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)' }}>
            <strong style={{ fontSize: '1.1rem' }}>{c.author}</strong> 
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginLeft: '1rem' }}>{new Date(c.created_at).toLocaleDateString('vi-VN')}</span>
            <p style={{ marginTop: '0.75rem', marginBottom: 0, lineHeight: '1.5' }}>{c.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
