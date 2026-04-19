import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '1rem', boxShadow: 'var(--box-shadow)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Toán Trung Học</Link>
        <div style={{ display: 'flex', gap: '2rem', fontWeight: '500' }}>
          <Link href="/category/math-stories" style={{ transition: 'opacity 0.2s' }} className="nav-link">Math Stories</Link>
          <Link href="/category/did-you-know" style={{ transition: 'opacity 0.2s' }} className="nav-link">Did You Know?</Link>
          <Link href="/category/theory" style={{ transition: 'opacity 0.2s' }} className="nav-link">Lý Thuyết</Link>
          <Link href="/category/exercises" style={{ transition: 'opacity 0.2s' }} className="nav-link">Bài Tập</Link>
          <Link href="/category/exams" style={{ transition: 'opacity 0.2s' }} className="nav-link">Đề Thi</Link>
        </div>
      </div>
      <style>{`
        .nav-link:hover { opacity: 0.8; }
      `}</style>
    </nav>
  );
}
