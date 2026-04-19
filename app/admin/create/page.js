import { getCategories } from "@/lib/db";
import { addPost } from "../actions";

export default async function CreatePostPage() {
  const categories = await getCategories();

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h3>Tạo Bài Viết Mới</h3>
      <form action={addPost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600' }}>Tiêu đề</label>
          <input name="title" required type="text" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600' }}>URL Slug</label>
          <input name="slug" required type="text" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="vi-du-bai-viet" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600' }}>Chuyên mục</label>
          <select name="category_id" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: '#fff' }}>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600' }}>Tóm tắt (Excerpt)</label>
          <textarea name="excerpt" rows="2" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'var(--font-inter)' }}></textarea>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600' }}>Nội dung (Hỗ trợ định dạng & Toán học KaTeX với $)</label>
          <textarea name="content" required rows="15" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'monospace' }}></textarea>
        </div>

        <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Lưu bài viết</button>
      </form>
    </div>
  );
}
