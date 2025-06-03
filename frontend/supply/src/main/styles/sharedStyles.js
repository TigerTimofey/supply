export const catalogueContainerStyle = {
  maxWidth: 1900,
  margin: '0 auto',
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
  padding: 32,
  position: 'relative'
};

export const infoIconContainerStyle = {
  position: 'relative',
  display: 'inline-block'
};

export const infoPopupStyle = {
  position: 'absolute',
  left: '50%',
  top: '120%',
  transform: 'translateX(-50%)',
  background: '#fff',
  color: '#23272f',
  border: '1px solid #e0e0e0',
  borderRadius: 8,
  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
  padding: '14px 18px',
  fontSize: 14,
  minWidth: 340,
  maxWidth: 340,
  zIndex: 100,
  whiteSpace: 'pre-line',
  pointerEvents: 'auto'
};

export const infoCopyBtnStyle = {
  marginLeft: 12,
  background: '#61dafb',
  color: '#213254',
  border: 'none',
  borderRadius: 5,
  padding: '4px 12px',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer'
};

export const infoPreStyle = {
  background: '#f7fafd',
  borderRadius: 6,
  padding: 10,
  margin: 0,
  fontSize: 13,
  overflowX: 'auto'
};

export const uploadLabelStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  background: '#f7fafd',
  color: '#213254',
  border: '1px solid #61dafb',
  borderRadius: 8,
  padding: '10px 22px',
  fontWeight: 600,
  fontSize: 15,
  cursor: 'pointer',
  transition: 'background 0.15s, color 0.15s, border 0.15s'
};

export const fileNameSpanStyle = {
  fontSize: 14,
  color: '#666',
  display: 'flex',
  alignItems: 'center',
  gap: 6
};

export const removeFileBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#ff4d4f',
  fontWeight: 700,
  fontSize: 18,
  cursor: 'pointer',
  marginLeft: 4,
  padding: 0,
  lineHeight: 1
};

export const dividerLineStyle = {
  width: '100%',
  height: 1,
  background: '#e0e0e0',
  margin: '24px 0'
};
export const dividerLineStyleModal = {
  width: '100%',
  height: 1,
  background: '#e0e0e0',
  margin: '12px 0'
};

export const searchInputStyle = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 15,
  minWidth: 180
};

export const tableContainerStyle = {
  overflowX: 'auto',
  marginTop: 24
};

export const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  background: '#fff',
  color: '#23272f',
  fontSize: 15
};

export const thStyle = {
  border: '1px solid #e0e0e0',
  padding: 15,
  background: '#f7fafd',
  fontWeight: 700,
  position: 'relative'
};

export const sortIconStyle = (active) => ({
  color: active ? '#61dafb' : '#bbb',
  marginRight: 2
});

export const tdStyle = {
  border: '1px solid #e0e0e0',
  padding: 10
};

export const noDataTdStyle = {
  color: '#888',
  padding: 20,
  textAlign: 'center'
};

export const inputStyle = {
  fontWeight: 500,
  border: '1.5px solid #61dafb',
  borderRadius: 8,
  padding: '10px 16px',
  fontSize: 17,
  background: '#f7fafd',
  outline: 'none',
  transition: 'border 0.2s, box-shadow 0.2s',
  boxShadow: '0 2px 8px rgba(97,218,251,0.10)',
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  display: 'block'
};

export const fieldRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 18,
  minHeight: 54,
  background: 'rgba(97,218,251,0.07)',
  borderRadius: 12,
  padding: '10px 18px'
};

export const labelStyle = {
  fontWeight: 700,
  color: '#3e68bd',
  minWidth: 170,
  flexShrink: 0,
  fontSize: 16
};

export const buttonGroupStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  marginRight: 8
};

export const modalStyle = {
  background: 'linear-gradient(120deg, #f7fafd 60%, #e3f0fa 100%)',
  borderRadius: 22,
  boxShadow: '0 12px 48px rgba(33,50,84,0.22)',
  padding: '48px 36px 36px 36px',
  maxWidth: 720,
  width: '90vw',
  minHeight: 700,
  minWidth: 0,
  margin: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  transition: 'width 0.2s, min-height 0.2s',
  boxSizing: 'border-box'
};

export const responsiveModalStyle = {
  ...modalStyle,
  padding: '24px 4px 24px 4px',
  maxWidth: '100vw',
  width: '100vw',
  minHeight: 0,
  margin: 0,
  borderRadius: 0,
  top: 0,
  left: 0,
  position: 'fixed'
};

export const mobileFieldRowStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
  marginBottom: 18,
  minHeight: 54,
  background: 'rgba(97,218,251,0.07)',
  borderRadius: 12,
  padding: '10px 10px'
};

export const mobileLabelEditRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  width: '100%',
  marginBottom: 4,
  textAlign: 'center'
};

export const closeBtnStyle = {
  position: 'absolute',
  top: 18,
  right: 18,
  background: 'none',
  border: 'none',
  fontSize: 32,
  color: '#213254',
  cursor: 'pointer',
  fontWeight: 700,
  opacity: 0.7
};

export const profileHeaderStyle = {
  color: '#213254',
  fontWeight: 900,
  fontSize: 34,
  letterSpacing: 1,
  margin: 0
};

export const loadingContainerStyle = {
  minHeight: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
};

export const messageStyle = (success) => ({
  marginTop: 10,
  color: success ? '#4BB543' : '#ff4d4f',
  fontWeight: 500,
  textAlign: 'center'
});

export const mapContainerStyle = {
  width: '100%',
  borderRadius: 14,
  overflow: 'hidden',
  boxShadow: '0 2px 16px rgba(33,50,84,0.10)',
  marginTop: 18
};

export const navStyle = {
  background: '#23272f',
  color: '#fff',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 18,
  position: 'relative'
};

export const navBrandStyle = {
  fontWeight: 900,
  fontSize: 22,
  letterSpacing: '0.08em',
  color: '#61dafb',
  cursor: 'pointer'
};

export const navMenuStyle = {
  display: 'flex',
  gap: 24
};

export const navBtnStyle = (active) => ({
  background: 'none',
  border: 'none',
  color: active ? '#61dafb' : '#fff',
  fontWeight: active ? 700 : 500,
  fontSize: 17,
  cursor: 'pointer',
  padding: '6px 10px',
  borderBottom: active ? '2px solid #61dafb' : '2px solid transparent',
  transition: 'color 0.15s, border-bottom 0.15s'
});

export const navDropdownStyle = {
  position: 'relative',
  display: 'inline-block'
};

export const navDropdownBtnStyle = {
  background: '#61dafb',
  color: '#23272f',
  border: 'none',
  borderRadius: 8,
  padding: '8px 18px',
  fontWeight: 700,
  fontSize: 16,
  cursor: 'pointer',
  display: 'none'
};

export const navDropdownMenuStyle = {
  position: 'absolute',
  right: 0,
  top: '100%',
  background: '#fff',
  color: '#23272f',
  borderRadius: 12,
  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  minWidth: 180,
  padding: '8px 0',
  transition: 'all 0.2s',
  overflow: 'hidden',
  textAlign: 'center',
  zIndex: 1000
};

export const navDropdownHeaderStyle = {
  padding: '12px 24px',
  fontWeight: 600,
  fontSize: 17,
  borderBottom: '1px solid #eee',
  background: '#f7fafd'
};

export const navDropdownItemStyle = {
  width: '100%',
  background: 'none',
  border: 'none',
  padding: '14px 24px',
  textAlign: 'center',
  fontSize: 16,
  color: '#23272f',
  cursor: 'pointer',
  borderRadius: 0,
  fontWeight: 500,
  transition: 'background 0.15s'
};

export const navDropdownProfileBtnStyle = {
  width: '100%',
  background: 'none',
  border: 'none',
  padding: '14px 24px',
  textAlign: 'center',
  fontSize: 16,
  color: '#23272f',
  cursor: 'pointer',
  borderRadius: 0,
  fontWeight: 500,
  transition: 'background 0.15s'
};

export const navDropdownLogoutBtnStyle = {
  width: '100%',
  background: 'none',
  border: 'none',
  padding: '14px 24px',
  textAlign: 'center',
  fontSize: 16,
  color: '#23272f',
  cursor: 'pointer',
  borderRadius: 0,
  fontWeight: 500,
  transition: 'background 0.15s'
};

export const navBurgerStyle = {
  display: 'none',
  position: 'relative'
};

export const navBurgerBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#61dafb',
  fontSize: 28,
  cursor: 'pointer',
  padding: 6,
  marginLeft: 12
};

export const navBurgerMenuStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '80vw',
  maxWidth: 320,
  height: '100vh',
  background: '#23272f',
  color: '#fff',
  zIndex: 2000,
  boxShadow: '-2px 0 16px rgba(0,0,0,0.18)',
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 16px 16px 16px',
  gap: 16
};

export const navBurgerHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 24
};

export const navBurgerBrandStyle = {
  fontWeight: 900,
  fontSize: 22,
  color: '#61dafb'
};

export const navBurgerCloseBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#61dafb',
  fontSize: 32,
  cursor: 'pointer',
  marginLeft: 12,
  padding: 0,
  lineHeight: 1
};

export const navBurgerPageBtnStyle = (active) => ({
  background: 'none',
  border: 'none',
  color: active ? '#61dafb' : '#fff',
  fontWeight: active ? 700 : 500,
  fontSize: 18,
  cursor: 'pointer',
  padding: '10px 0',
  borderBottom: active ? '2px solid #61dafb' : '2px solid transparent',
  textAlign: 'left'
});

export const navBurgerProfileBtnStyle = {
  background: '#f7fafd',
  color: '#213254',
  border: '1.5px solid #61dafb',
  borderRadius: 8,
  padding: '12px 0',
  fontWeight: 700,
  fontSize: 16,
  cursor: 'pointer',
  marginTop: 8,
  marginBottom: 8
};

export const navBurgerLogoutBtnStyle = {
  background: '#61dafb',
  color: '#23272f',
  border: 'none',
  borderRadius: 8,
  padding: '12px 0',
  fontWeight: 700,
  fontSize: 16,
  cursor: 'pointer',
  marginTop: 8
};

export const navBurgerMenuGap16 = { gap: 16 };

export const navBurgerMenuGap24 = { gap: 24 };

export const navBurgerMenuGap8 = { gap: 8 };

export const navBurgerMenuGap18 = { gap: 18 };

export const navBurgerMenuGap10 = { gap: 10 };

export const navBurgerMenuGap6 = { gap: 6 };

export const navBurgerMenuGap12 = { gap: 12 };

export const navBurgerMenuGap4 = { gap: 4 };

export const navBurgerMenuGap0 = { gap: 0 };

export const navBurgerMenuGap32 = { gap: 32 };

export const navBurgerMenuGap36 = { gap: 36 };

export const navBurgerMenuGap14 = { gap: 14 };

export const navBurgerMenuGap20 = { gap: 20 };

export const navBurgerMenuGap28 = { gap: 28 };

export const navBurgerMenuGap34 = { gap: 34 };

export const navBurgerMenuGap38 = { gap: 38 };

export const navBurgerMenuGap40 = { gap: 40 };

export const navBurgerMenuGap44 = { gap: 44 };

export const navBurgerMenuGap48 = { gap: 48 };

export const navBurgerMenuGap52 = { gap: 52 };

export const navBurgerMenuGap56 = { gap: 56 };

export const navBurgerMenuGap60 = { gap: 60 };

export const navBurgerMenuGap64 = { gap: 64 };

export const navBurgerMenuGap68 = { gap: 68 };

export const navBurgerMenuGap72 = { gap: 72 };

export const navBurgerMenuGap76 = { gap: 76 };

export const navBurgerMenuGap80 = { gap: 80 };

export const navBurgerMenuGap84 = { gap: 84 };

export const navBurgerMenuGap88 = { gap: 88 };

export const navBurgerMenuGap92 = { gap: 92 };

export const navBurgerMenuGap96 = { gap: 96 };

export const navBurgerMenuGap100 = { gap: 100 };

export const navBurgerMenuGap104 = { gap: 104 };

export const navBurgerMenuGap108 = { gap: 108 };

export const navBurgerMenuGap112 = { gap: 112 };

export const navBurgerMenuGap116 = { gap: 116 };

export const navBurgerMenuGap120 = { gap: 120 };

export const navBurgerMenuGap124 = { gap: 124 };

export const navBurgerMenuGap128 = { gap: 128 };

export const navBurgerMenuGap132 = { gap: 132 };

export const navBurgerMenuGap136 = { gap: 136 };

export const navBurgerMenuGap140 = { gap: 140 };

export const navBurgerMenuGap144 = { gap: 144 };

export const navBurgerMenuGap148 = { gap: 148 };

export const navBurgerMenuGap152 = { gap: 152 };

export const navBurgerMenuGap156 = { gap: 156 };

export const navBurgerMenuGap160 = { gap: 160 };

export const navBurgerMenuGap164 = { gap: 164 };

export const navBurgerMenuGap168 = { gap: 168 };

export const navBurgerMenuGap172 = { gap: 172 };

export const navBurgerMenuGap176 = { gap: 176 };

export const navBurgerMenuGap180 = { gap: 180 };

export const navBurgerMenuGap184 = { gap: 184 };

export const navBurgerMenuGap188 = { gap: 188 };

export const navBurgerMenuGap192 = { gap: 192 };

export const navBurgerMenuGap196 = { gap: 196 };

export const navBurgerMenuGap200 = { gap: 200 };

export const navBurgerMenuGap204 = { gap: 204 };

export const navBurgerMenuGap208 = { gap: 208 };

export const navBurgerMenuGap212 = { gap: 212 };

export const navBurgerMenuGap216 = { gap: 216 };

export const navBurgerMenuGap220 = { gap: 220 };

export const navBurgerMenuGap224 = { gap: 224 };

export const navBurgerMenuGap228 = { gap: 228 };

export const navBurgerMenuGap232 = { gap: 232 };

export const navBurgerMenuGap236 = { gap: 236 };

export const navBurgerMenuGap240 = { gap: 240 };

export const navBurgerMenuGap244 = { gap: 244 };

export const navBurgerMenuGap248 = { gap: 248 };

export const navBurgerMenuGap252 = { gap: 252 };

export const navBurgerMenuGap256 = { gap: 256 };

export const navBurgerMenuGap260 = { gap: 260 };

export const navBurgerMenuGap264 = { gap: 264 };

export const navBurgerMenuGap268 = { gap: 268 };

export const navBurgerMenuGap272 = { gap: 272 };

export const navBurgerMenuGap276 = { gap: 276 };

export const navBurgerMenuGap280 = { gap: 280 };

export const navBurgerMenuGap284 = { gap: 284 };

export const navBurgerMenuGap288 = { gap: 288 };

export const navBurgerMenuGap292 = { gap: 292 };

export const navBurgerMenuGap296 = { gap: 296 };

export const navBurgerMenuGap300 = { gap: 300 };

export const navBurgerMenuGap304 = { gap: 304 };

export const navBurgerMenuGap308 = { gap: 308 };

export const navBurgerMenuGap312 = { gap: 312 };

export const navBurgerMenuGap316 = { gap: 316 };

export const navBurgerMenuGap320 = { gap: 320 };

export const navBurgerMenuGap324 = { gap: 324 };

export const navBurgerMenuGap328 = { gap: 328 };

export const navBurgerMenuGap332 = { gap: 332 };

export const navBurgerMenuGap336 = { gap: 336 };

export const navBurgerMenuGap340 = { gap: 340 };

export const navBurgerMenuGap344 = { gap: 344 };

export const navBurgerMenuGap348 = { gap: 348 };

export const navBurgerMenuGap352 = { gap: 352 };

export const navBurgerMenuGap356 = { gap: 356 };

export const navBurgerMenuGap360 = { gap: 360 };

export const navBurgerMenuGap364 = { gap: 364 };

export const navBurgerMenuGap368 = { gap: 368 };

export const navBurgerMenuGap372 = { gap: 372 };

export const navBurgerMenuGap376 = { gap: 376 };

export const navBurgerMenuGap380 = { gap: 380 };

export const navBurgerMenuGap384 = { gap: 384 };

export const navBurgerMenuGap388 = { gap: 388 };

export const navBurgerMenuGap392 = { gap: 392 };

export const navBurgerMenuGap396 = { gap: 396 };

export const navBurgerMenuGap400 = { gap: 400 };

export const saveBtnStyle = {
  background: '#61dafb',
  color: '#213254',
  border: 'none',
  borderRadius: 8,
  padding: '7px 18px',
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer'
};

export const cancelBtnStyle = {
  background: '#f0f4f8',
  color: '#213254',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  padding: '7px 18px',
  fontWeight: 500,
  fontSize: 15,
  cursor: 'pointer'
};

export const modalOverlayStyle = (isMobile = false) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(33,50,84,0.22)',
  zIndex: 4000,
  display: 'flex',
  justifyContent: 'center',
  backdropFilter: 'blur(2px)',
  overflowY: isMobile ? 'auto' : 'unset'
});

export const modalHeaderRowStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
  marginBottom: 24,
  gap: 18
};

export const modalFormStyle = {
  width: '100%',
  marginBottom: 28,
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  minHeight: 420
};

export const editBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#3e68bd',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 15,
  textDecoration: 'underline',
  padding: 0
};

export const linkBtnStyle = {
  marginTop: 16,
  background: 'none',
  border: 'none',
  color: '#61dafb',
  cursor: 'pointer',
  fontSize: 15,
  textDecoration: 'underline'
};

export const registerContainerStyle = {
  background: 'rgba(247, 247, 247, 0.09)',
  padding: 32,
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
  minWidth: 320,
  maxWidth: 400,
  width: '100%',
  marginLeft: 16,
  marginRight: 16
};

export const categoryListStyle = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
  marginBottom: 8,
  justifyContent: 'center'
};

export const categoryBtnStyle = (selected) => ({
  padding: '8px 16px',
  borderRadius: 20,
  border: selected ? '2px solid #61dafb' : '1px solid #ccc',
  background: selected ? '#61dafb' : '#fff',
  color: selected ? '#213254' : '#222',
  fontWeight: 600,
  cursor: 'pointer',
  outline: 'none',
  fontSize: 15,
  transition: 'all 0.15s'
});
export const catalogueHistoryModalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.25)',
  zIndex: 2000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const catalogueHistoryModalStyle = {
  background: '#fff',
  borderRadius: 12,
  padding: 32,
  minWidth: 340,
  maxWidth: 500,
  boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
  position: 'relative'
};

export const catalogueHistoryCloseBtnStyle = {
  position: 'absolute',
  top: 16,
  right: 16,
  background: 'none',
  border: 'none',
  fontSize: 22,
  color: '#213254',
  cursor: 'pointer'
};

export const catalogueHistoryTitleStyle = {
  marginTop: 0,
  color: '#213254'
};

export const catalogueHistoryNoHistoryStyle = {
  color: '#888'
};

export const catalogueHistoryListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
};

export const catalogueHistoryListItemStyle = {
  marginBottom: 18,
  borderBottom: '1px solid #eee',
  paddingBottom: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

export const catalogueHistoryListItemActionStyle = {
  // bold by default, but you can add more if needed
};

export const catalogueHistoryListItemDateStyle = {
  color: '#888',
  marginLeft: 8,
  fontSize: 13
};

export const catalogueHistoryRevertBtnStyle = {
  marginLeft: 10,
  background: '#61dafb',
  color: '#213254',
  border: 'none',
  borderRadius: 5,
  padding: '2px 10px',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer'
};

export const catalogueHistoryClearBtnStyle = {
  marginTop: 8,
  background: '#f0f4f8',
  color: '#213254',
  border: '1px solid #d1d5db',
  borderRadius: 5,
  padding: '4px 12px',
  fontWeight: 500,
  fontSize: 13,
  cursor: 'pointer',
  width: '100%',
  marginBottom: 8,
  transition: 'background 0.15s, color 0.15s, border 0.15s'
};

export const catalogueStatsContainerStyle = {
  display: 'flex',
  gap: 24,
  marginBottom: 32,
  flexWrap: 'wrap',
  justifyContent: 'space-between'
};

export const catalogueStatsCardStyle = {
  flex: '1 1 200px',
  background: '#f7fafd',
  borderRadius: 12,
  padding: '24px 18px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  minWidth: 200,
  textAlign: 'left'
};

export const catalogueStatsTitleStyle = {
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 8
};

export const catalogueStatsValueStyle = {
  color: '#213254',
  fontWeight: 700,
  fontSize: 16
};

export const catalogueStatsHistoryLinkStyle = {
  color: '#213254',
  fontWeight: 700,
  fontSize: 16,
  marginBottom: 8,
  cursor: 'pointer',
  textDecoration: 'underline'
};

export const catalogueStatsNoHistoryStyle = {
  color: '#213254',
  fontWeight: 700,
  fontSize: 16,
  marginBottom: 8
};