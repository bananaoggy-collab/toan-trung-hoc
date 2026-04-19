import { getPostBySlug, getComments, getRelatedPosts } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AffiliateBanner from "@/components/AffiliateBanner";
import MarkdownViewer from "@/components/MarkdownViewer";
import CommentSection from "@/components/CommentSection";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return notFound();
  }

  const comments = await getComments(post.id);
  const relatedPosts = await getRelatedPosts(post.category_id, params.slug);

  return (
    <>
      <Navbar />
      <main className="main-content" style={{ display: 'flex', justifyContent: 'center' }}>
        
        <article style={{ width: '100%', maxWidth: '720px' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
             <span style={{ color: 'white', background: 'var(--color-primary-light)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{post.category_name}</span>
             <h1 style={{ fontSize: '3rem', margin: '1.5rem 0 1rem 0', lineHeight: 1.3, color: 'var(--color-primary)' }}>{post.title}</h1>
             <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Đăng ngày: {new Date(post.created_at).toLocaleDateString('vi-VN')}</p>
          </div>
          
          <MarkdownViewer content={post.content} />
          
          <div style={{ margin: '4rem 0' }}>
             <AffiliateBanner />
          </div>

          <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid var(--color-border)' }} />
          
          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>Bài viết liên quan</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedPosts.map(rp => (
                  <Link key={rp.id} href={`/${rp.slug}`} style={{ padding: '1.2rem', background: 'var(--color-bg)', borderRadius: '8px', textDecoration: 'none', color: 'inherit', border: '1px solid var(--color-border)' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-primary)' }}>{rp.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{new Date(rp.created_at).toLocaleDateString('vi-VN')}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <CommentSection postId={post.id} initialComments={comments} />

        </article>

      </main>
      <Footer />
    </>
  );
}
