import { adminLogout } from "../../actions/authActions";

export const metadata = {
  title: 'Admin Dashboard - Me&Math',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📝 Me&Math Admin</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="/" className="btn btn-secondary">Quay lại trang chủ</a>
          <form action={adminLogout}>
             <button type="submit" className="btn" style={{ background: '#dc2626', borderColor: '#dc2626' }}>Logout</button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
