import React from 'react';

export default function CatalogueStats({ rows, history, onShowHistory }) {
  const total = rows.length && rows[0].code ? rows.length : 0;
  const priceCount = rows.filter(r => r.price && r.price !== '0' && r.price !== '').length;
  const hasHistory = Array.isArray(history) && history.length > 0;

  return (
    <div style={{
      display: 'flex',
      gap: 24,
      marginBottom: 32,
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    }}>
      <div style={{
        flex: '1 1 200px',
        background: '#f7fafd',
        borderRadius: 12,
        padding: '24px 18px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        minWidth: 200,
        textAlign: 'left'
      }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>0% of products updated in the last 2 weeks</div>
        <div style={{ color: '#213254', fontWeight: 700, fontSize: 16 }}>0 OUT OF {total}</div>
      </div>
      <div style={{
        flex: '1 1 200px',
        background: '#f7fafd',
        borderRadius: 12,
        padding: '24px 18px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        minWidth: 200,
        textAlign: 'left'
      }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
          {total === 0 ? '0%' : `${Math.round((priceCount / total) * 100)}%`} of products have prices
        </div>
        <div style={{ color: '#213254', fontWeight: 700, fontSize: 16 }}>{priceCount} OUT OF {total}</div>
      </div>
      <div style={{
        flex: '1 1 200px',
        background: '#f7fafd',
        borderRadius: 12,
        padding: '24px 18px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        minWidth: 200,
        textAlign: 'left'
      }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
          0% of products have pictures
        </div>
        <div style={{ color: '#213254', fontWeight: 700, fontSize: 16 }}>0 OUT OF {total}</div>
      </div>
      <div style={{
        flex: '1 1 200px',
        background: '#f7fafd',
        borderRadius: 12,
        padding: '24px 18px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        minWidth: 200,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Revert catalogue</div>
        {hasHistory ? (
          <div
            style={{
              color: '#213254',
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 8,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={onShowHistory}
            tabIndex={0}
            role="button"
            title="Show History & Revert"
          >
            Show History & Revert
          </div>
        ) : (
          <div style={{ color: '#213254', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
            NO PREVIOUS VERSIONS AVAILABLE
          </div>
        )}
      </div>
    </div>
  );
}
