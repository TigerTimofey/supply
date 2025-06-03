import React from 'react';
import {
  catalogueStatsContainerStyle,
  catalogueStatsCardStyle,
  catalogueStatsTitleStyle,
  catalogueStatsValueStyle,
  catalogueStatsHistoryLinkStyle,
  catalogueStatsNoHistoryStyle
} from '../../styles/sharedStyles';

export default function CatalogueStats({ rows, history, onShowHistory }) {
  const total = rows.length && rows[0].code ? rows.length : 0;
  const priceCount = rows.filter(r => r.price && r.price !== '0' && r.price !== '').length;
  const hasHistory = Array.isArray(history) && history.length > 0;

  return (
    <div style={catalogueStatsContainerStyle}>
      <div style={catalogueStatsCardStyle}>
        <div style={catalogueStatsTitleStyle}>0% of products updated in the last 2 weeks</div>
        <div style={catalogueStatsValueStyle}>0 OUT OF {total}</div>
      </div>
      <div style={catalogueStatsCardStyle}>
        <div style={catalogueStatsTitleStyle}>
          {total === 0 ? '0%' : `${Math.round((priceCount / total) * 100)}%`} of products have prices
        </div>
        <div style={catalogueStatsValueStyle}>{priceCount} OUT OF {total}</div>
      </div>
      <div style={catalogueStatsCardStyle}>
        <div style={catalogueStatsTitleStyle}>
          0% of products have pictures
        </div>
        <div style={catalogueStatsValueStyle}>0 OUT OF {total}</div>
      </div>
      <div style={{ ...catalogueStatsCardStyle, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={catalogueStatsTitleStyle}>Revert catalogue</div>
        {hasHistory ? (
          <div
            style={catalogueStatsHistoryLinkStyle}
            onClick={onShowHistory}
            tabIndex={0}
            role="button"
            title="Show History & Revert"
          >
            Show History & Revert
          </div>
        ) : (
          <div style={catalogueStatsNoHistoryStyle}>
            NO PREVIOUS VERSIONS AVAILABLE
          </div>
        )}
      </div>
    </div>
  );
}
