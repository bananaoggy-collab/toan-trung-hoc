"use client";

import { useState } from "react";
import { adminLogin } from "@/app/actions/authActions";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.target);
    try {
      const res = await adminLogin(formData);
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      }
    } catch (err) {
      // NEXT_REDIRECT is thrown by the Next.js router. Catching it prevents proper redirection if not re-thrown.
      // But since we aren't doing extreme logic, just catching everything that isn't NEXT_REDIRECT
      if (err.message && err.message.includes('NEXT_REDIRECT')) {
        throw err;
      }
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>🛠️ Admin Login</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>Vui lòng đăng nhập để tiếp tục.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="password" 
            name="password" 
            placeholder="Mật khẩu..." 
            required 
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', fontSize: '1rem' }}
          />
          {error && <p style={{ color: '#dc2626', fontSize: '0.9rem', margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading} className="btn" style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
            {loading ? "Đang xác thực..." : "Đăng Nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
