export const metadata = {
  title: 'Admin Dashboard - Toán Trung Học',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📝 Admin Dashboard</h2>
        <a href="/" className="btn btn-secondary">Quay lại trang chủ</a>
      </header>
      {children}
    </div>
  );
}
