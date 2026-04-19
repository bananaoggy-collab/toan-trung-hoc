export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1e293b', color: 'white', padding: '2rem 1rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p>&copy; {new Date().getFullYear()} Toán Trung Học. Make Math Easy & Fun.</p>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Hỗ trợ học sinh từ 13-18 tuổi tự tin trong các kì thi.</p>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Liên hệ hợp tác / Phản hồi: admin@toantrunghoc.vn</p>
      </div>
    </footer>
  );
}
