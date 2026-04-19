export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#000828', color: 'white', padding: '2rem 1rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p>&copy; {new Date().getFullYear()} Me&Math. Make Math Easy & Fun.</p>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Hỗ trợ học sinh từ 13-18 tuổi tự tin trong các kì thi.</p>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Liên hệ hợp tác / Phản hồi: admin@meandmath.com</p>
      </div>
    </footer>
  );
}
