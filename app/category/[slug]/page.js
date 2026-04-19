import { getPostsByCategory, getCategories } from "@/lib/db";
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AffiliateBanner from "@/components/AffiliateBanner";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }) {
  const categories = await getCategories();
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return notFound();
  }

  const posts = await getPostsByCategory(category.slug);

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--color-bg-white)', borderRadius: 'var(--border-radius)', marginBottom: '3rem', border: '1px solid var(--color-border)' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)' }}>Chuyên mục: {category.name}</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Khám phá các bài viết thuộc chuyên mục {category.name}</p>
        </section>

        <section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {posts.length === 0 ? <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', gridColumn: '1 / -1' }}>Chưa có bài viết nào trong chuyên mục này.</p> : posts.map(p => (
              <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0.5rem 0', fontSize: '1.3rem' }}>
                  <Link href={`/${p.slug}`} style={{ color: 'inherit' }}>{p.title}</Link>
                </h3>
                <p style={{ flex: 1, color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{p.excerpt || p.content.substring(0, 100) + '...'}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                   <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{new Date(p.created_at).toLocaleDateString('vi-VN')}</span>
                   <Link href={`/${p.slug}`} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Đọc ngay &rarr;</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <div style={{ marginTop: '4rem' }}>
           <AffiliateBanner />
        </div>
      </main>
      <Footer />
    </>
  );
}
