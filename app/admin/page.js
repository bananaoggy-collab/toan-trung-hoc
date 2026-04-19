import { getPosts } from "@/lib/db";
import Link from "next/link";
import { removePost } from "./actions";

export default async function AdminPage() {
  const posts = await getPosts();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3>Danh sách bài viết</h3>
        <Link href="/admin/create" className="btn">Tạo bài viết mới</Link>
      </div>

      <div style={{ background: 'var(--color-bg-white)', borderRadius: 'var(--border-radius)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th style={{ padding: '1rem' }}>Tiêu đề</th>
              <th style={{ padding: '1rem' }}>Chuyên mục</th>
              <th style={{ padding: '1rem' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '1rem', textAlign: 'center' }}>Chưa có bài viết nào</td></tr>
            ) : posts.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem' }}>{p.id}</td>
                <td style={{ padding: '1rem' }}>{p.title}</td>
                <td style={{ padding: '1rem' }}>{p.category_name}</td>
                <td style={{ padding: '1rem' }}>
                   <form action={removePost}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', color: 'red', borderColor: 'red' }}>Xóa</button>
                   </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
