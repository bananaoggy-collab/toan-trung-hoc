import { getPostBySlug, getComments } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AffiliateBanner from "@/components/AffiliateBanner";
import MarkdownViewer from "@/components/MarkdownViewer";
import CommentSection from "@/components/CommentSection";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return notFound();
  }

  const comments = await getComments(post.id);

  return (
    <>
      <Navbar />
      <main className="main-content" style={{ display: 'flex', gap: '3rem', flexDirection: 'row', flexWrap: 'wrap' }}>
        
        {/* Main Article Content */}
        <article style={{ flex: '1 1 700px', background: 'var(--color-bg-white)', padding: '3rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)', border: '1px solid var(--color-border)' }}>
          <div style={{ marginBottom: '2rem' }}>
             <span style={{ color: 'white', background: 'var(--color-primary)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>{post.category_name}</span>
             <h1 style={{ fontSize: '2.8rem', margin: '1rem 0', lineHeight: 1.2 }}>{post.title}</h1>
             <p style={{ color: 'var(--color-text-muted)' }}>Đăng ngày: {new Date(post.created_at).toLocaleDateString('vi-VN')}</p>
          </div>
          
          <MarkdownViewer content={post.content} />
          
          <div style={{ marginTop: '4rem' }}>
             <AffiliateBanner />
          </div>

          <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid var(--color-border)' }} />
          
          <CommentSection postId={post.id} initialComments={comments} />

        </article>

        {/* Sidebar */}
        <aside style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ background: 'var(--color-bg)', border: 'none' }}>
             <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Về Toán Trung Học</h4>
             <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>Nền tảng chia sẻ kiến thức toán học trực quan và sinh động nhất dành cho học sinh cấp 2 & cấp 3 tại Việt Nam.</p>
          </div>
          <AffiliateBanner position="sidebar" />
        </aside>

      </main>
      <Footer />
    </>
  );
}
