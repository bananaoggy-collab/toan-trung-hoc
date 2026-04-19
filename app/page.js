import { getPosts } from "@/lib/db";
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AffiliateBanner from "@/components/AffiliateBanner";

export default async function HomePage() {
  const posts_raw = await getPosts();
  const posts = posts_raw.slice(0, 6);

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section style={{ 
          textAlign: 'center', 
          padding: '6rem 1rem', 
          color: 'white', 
          borderRadius: 'var(--border-radius)', 
          marginBottom: '3rem', 
          boxShadow: 'var(--box-shadow)',
          backgroundImage: 'linear-gradient(rgba(0, 11, 61, 0.7), rgba(0, 11, 61, 0.7)), url(/banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <h1 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '1rem' }}>Me&Math</h1>
          <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>Học toán chưa bao giờ dễ dàng và thú vị đến thế. Khám phá lý thuyết trực quan, giải bài tập chi tiết và làm quen đề thi thực tế.</p>
        </section>

        <AffiliateBanner />

        <section style={{ marginTop: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <h2 style={{ fontSize: '2rem', color: 'var(--color-text)' }}>Bài Viết Mới Nhất</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {posts.length === 0 ? <p style={{ color: 'var(--color-text-muted)' }}>Chưa có bài viết.</p> : posts.map(p => (
              <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.category_name}</span>
                <h3 style={{ margin: '0.75rem 0', fontSize: '1.4rem' }}>
                  <Link href={`/${p.slug}`} style={{ color: 'inherit' }}>{p.title}</Link>
                </h3>
                <p style={{ flex: 1, color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{p.excerpt || p.content.substring(0, 120) + '...'}</p>
                <Link href={`/${p.slug}`} className="btn btn-secondary" style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}>Đọc tiếp &rarr;</Link>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
