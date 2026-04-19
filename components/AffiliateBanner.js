export default function AffiliateBanner({ position = "horizontal" }) {
  const style = position === "sidebar" 
    ? { width: '100%', minHeight: '400px', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed #94a3b8', borderRadius: '8px', padding: '1rem', textAlign: 'center' }
    : { width: '100%', height: '120px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem 0', border: '1px dashed #94a3b8', borderRadius: '8px' };

  return (
    <div style={style}>
      <span style={{ color: '#64748b', fontWeight: 'bold' }}>💰 [Affiliate Slot: Shopee / Tiki Books]</span>
      {position === "sidebar" && <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>Gợi ý sách luyện thi tốt nhất</p>}
    </div>
  );
}
