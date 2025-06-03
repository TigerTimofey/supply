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

export const confirmModalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.25)',
  zIndex: 3000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const confirmModalBoxStyle = {
  background: '#fff',
  borderRadius: 12,
  padding: 32,
  minWidth: 320,
  maxWidth: 400,
  boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
  position: 'relative'
};

export const confirmModalTitleStyle = {
  marginTop: 0,
  color: '#213254',
  fontSize: 20
};

export const confirmModalTextStyle = {
  marginBottom: 24,
  color: '#444',
  fontSize: 15
};

export const confirmModalBtnGroupStyle = {
  display: 'flex',
  gap: 16,
  justifyContent: 'flex-end'
};

export const confirmModalCancelBtnStyle = {
  background: '#f0f4f8',
  color: '#213254',
  border: '1px solid #d1d5db',
  borderRadius: 5,
  padding: '6px 18px',
  fontWeight: 500,
  fontSize: 15,
  cursor: 'pointer'
};

export const confirmModalConfirmBtnStyle = {
  background: '#61dafb',
  color: '#213254',
  border: 'none',
  borderRadius: 5,
  padding: '6px 18px',
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer'
};
export const supplierModalCategoryBtnStyle = (selected) => ({
  padding: '7px 18px',
  borderRadius: 20,
  border: selected ? '2px solid #61dafb' : '1px solid #ccc',
  background: selected ? '#61dafb' : '#f7fafd',
  color: selected ? '#213254' : '#222',
  fontWeight: 600,
  cursor: 'pointer',
  outline: 'none',
  fontSize: 15,
  transition: 'all 0.15s'
});

export const supplierModalCategoryTagStyle = {
  display: 'inline-block',
  background: '#e3f0fa',
  color: '#213254',
  borderRadius: 14,
  padding: '4px 14px',
  marginRight: 6,
  fontWeight: 600,
  fontSize: 15
};

export const supplierModalCategoryListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  justifyContent: 'center'
};

export const supplierModalMessageStyle = (success) => ({
  marginTop: 10,
  color: success ? '#4BB543' : '#ff4d4f',
  fontWeight: 500,
  textAlign: 'center'
});

export const supplierModalMapContainerStyle = {
  width: '100%',
  borderRadius: 14,
  overflow: 'hidden',
  boxShadow: '0 2px 16px rgba(33,50,84,0.10)',
  marginTop: 18
};

export const supplierModalEditBtnGroupStyle = {
  display: 'flex',
  gap: 8,
  marginTop: 8,
  justifyContent: 'center'
};

export const smsInviteModalContainerStyle = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(33,50,84,0.18)',
  padding: 32,
  minWidth: 0,
  width: 400,
  maxWidth: '95vw',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative'
};

export const smsInviteModalTitleStyle = {
  color: '#213254',
  marginBottom: 14,
  fontWeight: 900,
  fontSize: 20,
  width: '100%',
  textAlign: 'center'
};

export const smsInviteModalInputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 8,
  border: '1.5px solid #61dafb',
  fontSize: 15,
  marginBottom: 12
};

export const smsInviteModalTextareaStyle = {
  width: '100%',
  borderRadius: 8,
  border: '1.5px solid #61dafb',
  fontSize: 15,
  padding: '10px 12px',
  marginBottom: 12,
  resize: 'vertical',
  minHeight: 90
};

export const smsInviteModalInfoStyle = {
  color: '#888',
  fontSize: 13,
  marginBottom: 10,
  textAlign: 'center'
};

export const smsInviteModalSendBtnStyle = (disabled) => ({
  ...saveBtnStyle,
  width: '100%',
  fontSize: 16,
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer'
});

export const inviteCustomersInfoBoxStyle = {
  background: '#f7fafd',
  border: '1.5px solid #61dafb',
  borderRadius: 10,
  padding: '16px 18px',
  marginTop: 18,
  fontSize: 15,
  color: '#213254'
};

export const inviteCustomersBtnStyle = {
  ...saveBtnStyle,
  width: '100%',
  fontSize: 16,
  marginBottom: 40
};

export const inviteCustomersLinkInputStyle = {
  flex: 1,
  padding: '8px 10px',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 14,
  background: '#fff'
};

export const inviteCustomersLinkBtnStyle = (copied) => ({
  ...saveBtnStyle,
  minWidth: 90,
  fontSize: 15,
  background: copied ? '#4BB543' : saveBtnStyle.background,
  color: copied ? '#fff' : saveBtnStyle.color
});

export const inviteCustomersCustomerSeeStyle = {
  marginTop: 14,
  color: '#888',
  fontSize: 15,
  textAlign: 'center',
  width: '100%',
  marginBottom: 30
};

export const inviteCustomersWelcomeBoxStyle = {
  fontSize: 17,
  color: '#213254',
  marginBottom: 22,
  textAlign: 'center',
  width: '100%',
  background: 'linear-gradient(90deg, #f7fafd 60%, #e3f0fa 100%)',
  borderRadius: 12,
  padding: '18px 10px 18px 10px',
  boxShadow: '0 2px 12px rgba(33,50,84,0.07)'
};

export const inviteCustomersWelcomeTitleStyle = {
  fontWeight: 900,
  fontSize: 22,
  color: '#213254',
  marginBottom: 8
};

export const inviteCustomersWelcomeSubtitleStyle = {
  fontWeight: 600,
  color: '#3e68bd',
  fontSize: 16,
  marginBottom: 8
};

export const inviteCustomersWelcomeSupplierStyle = {
  fontWeight: 700,
  fontSize: 18,
  color: '#213254'
};

export const inviteCustomersConnectBtnStyle = {
  ...saveBtnStyle,
  marginTop: 12,
  minWidth: 90,
  fontSize: 15
};

export const inviteCustomersModalTitleStyle = {
  color: '#213254',
  marginBottom: 12,
  fontWeight: 900,
  fontSize: 26,
  width: '100%',
  textAlign: 'center'
};

export const inviteCustomersModalSectionTitleStyle = {
  color: '#213254',
  marginBottom: 12,
  fontWeight: 900,
  fontSize: 16,
  width: '100%',
  textAlign: 'center'
};

export const chatPageContainerStyle = (isMobile) => ({
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  gap: isMobile ? 0 : 24,
  minHeight: 400
});

export const chatPageListInputStyle = {
  marginBottom: 42,
  padding: '7px 10px',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 15
};

export const chatPageClientListStyle = (isMobile) => ({
  minWidth: isMobile ? '100%' : 220,
  borderRight: isMobile ? 'none' : '1px solid #e0e0e0',
  borderBottom: isMobile ? '1px solid #e0e0e0' : 'none',
  paddingRight: isMobile ? 0 : 8,
  paddingBottom: isMobile ? 18 : 0,
  maxHeight: isMobile ? 'unset' : 500,
  overflowY: 'auto',
  marginBottom: isMobile ? 18 : 0,
  width: isMobile ? '100%' : undefined
});

export const chatPageClientItemStyle = (isMobile, selected) => ({
  borderRadius: 8,
  background: selected ? '#e6fbe6' : 'transparent',
  color: selected ? '#1ca21c' : '#213254',
  fontWeight: selected ? 700 : 500,
  cursor: 'pointer',
  marginBottom: isMobile ? 0 : 4,
  marginRight: isMobile ? 8 : 0,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px',
  minWidth: isMobile ? 120 : undefined,
  border: isMobile && selected ? '1.5px solid #1ca21c' : 'none'
});

export const chatPageClientProBadgeStyle = {
  marginLeft: 6,
  background: '#61dafb',
  color: '#213254',
  fontWeight: 700,
  fontSize: 12,
  borderRadius: 6,
  padding: '2px 10px',
  letterSpacing: 1,
  boxShadow: '0 1px 4px rgba(33,50,84,0.08)'
};

export const chatPageChatAreaStyle = (isMobile) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 300,
  marginTop: isMobile ? 18 : 0,
  width: isMobile ? '100%' : undefined
});

export const chatPageChatHeaderStyle = {
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 8,
  color: '#213254'
};

export const chatPageChatProBadgeStyle = {
  marginLeft: 10,
  background: '#e6fbe6',
  color: '#1ca21c',
  fontWeight: 700,
  fontSize: 13,
  borderRadius: 6,
  padding: '2px 10px'
};

export const chatPageMessagesContainerStyle = (isMobile) => ({
  flex: 1,
  background: '#f7fafd',
  borderRadius: 10,
  padding: 16,
  marginBottom: 12,
  minHeight: 200,
  maxHeight: isMobile ? 260 : 320,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 8
});

export const chatPageMessageRowStyle = (fromMe) => ({
  display: 'flex',
  flexDirection: fromMe ? 'row-reverse' : 'row',
  alignItems: 'flex-end',
  marginBottom: 2
});

export const chatPageMessageBubbleStyle = (fromMe) => ({
  alignSelf: fromMe ? 'flex-end' : 'flex-start',
  background: fromMe ? '#61dafb' : '#fff',
  color: '#213254',
  borderRadius: 8,
  padding: '8px 14px',
  maxWidth: '70%',
  fontSize: 15,
  boxShadow: '0 1px 4px rgba(33,50,84,0.04)'
});

export const chatPageMessageDateStyle = (fromMe) => ({
  fontSize: 11,
  color: '#888',
  margin: fromMe ? '0 10px 0 0' : '0 0 0 10px',
  minWidth: 80,
  textAlign: fromMe ? 'left' : 'right',
  whiteSpace: 'nowrap'
});

export const chatPageInputRowStyle = {
  display: 'flex',
  gap: 8
};

export const chatPageInputStyle = {
  flex: 1,
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid #ccc',
  fontSize: 15
};

export const chatPageSendBtnStyle = {
  ...saveBtnStyle,
  minWidth: 80
};

export const chatPageNoClientStyle = {
  color: '#888',
  fontSize: 16,
  marginTop: 40
};

export const customersMobileCardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: 10,
  marginBottom: 18,
  padding: 16,
  background: '#f7fafd'
};

export const customersMobileNameStyle = {
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 6
};

export const customersMobileProStyle = {
  color: '#1ca21c',
  fontWeight: 700,
  fontSize: 12,
  marginBottom: 10
};

export const customersMobileDashStyle = {
  color: '#888',
  fontSize: 12,
  marginBottom: 10
};

export const customersMobileStatStyle = {
  fontSize: 14,
  marginBottom: 4
};

export const customersMobileBtnArchiveStyle = {
  ...saveBtnStyle,
  background: '#f0f4f8',
  color: '#e74c3c',
  fontSize: 13,
  padding: '6px 12px'
};

export const customersMobileBtnRestoreStyle = {
  ...saveBtnStyle,
  background: '#e6fbe6',
  color: '#1ca21c',
  fontSize: 13,
  padding: '6px 12px'
};

export const customersOnboardBoxStyle = {
  background: '#f7fafd',
  border: '1.5px solid #61dafb',
  borderRadius: 10,
  padding: '18px 24px',
  marginBottom: 28,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 10
};

export const customersOnboardTitleStyle = {
  fontWeight: 700,
  color: '#213254',
  fontSize: 18,
  marginBottom: 2
};

export const customersOnboardSubtitleStyle = {
  color: '#3e68bd',
  fontWeight: 600,
  fontSize: 15
};

export const customersOnboardBtnGroupStyle = {
  display: 'flex',
  gap: 16,
  marginTop: 14
};

export const customersTabBtnStyle = (active) => ({
  ...saveBtnStyle,
  background: active ? '#61dafb' : '#f0f4f8',
  color: active ? '#213254' : '#888',
  flex: 1,
  minWidth: 120
});

export const customersTableRowStyle = (i) => ({
  background: i % 2 === 0 ? '#fff' : '#f8fafd'
});
export const marketingIdeasContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 24,
  marginBottom: 32
};

export const marketingIdeaCardStyle = {
  flex: '1 1 320px',
  minWidth: 260,
  maxWidth: 400,
  background: '#f7fafd',
  border: '2.5px solid #61dafb',
  borderRadius: 16,
  padding: '28px 24px',
  boxShadow: '0 2px 12px rgba(33,50,84,0.06)',
  display: 'flex',
  flexDirection: 'column',
  gap: 12
};

export const marketingIdeaTitleStyle = {
  fontWeight: 800,
  fontSize: 20,
  color: '#61dafb',
  marginBottom: 8
};

export const marketingIdeaDescStyle = {
  color: '#213254',
  fontSize: 16,
  marginBottom: 8
};

export const marketingIdeaBtnStyle = {
  ...saveBtnStyle,
  marginTop: 8,
  background: '#61dafb',
  color: '#213254'
};
export const marketingPhoneModalOverlayStyle = {
  position: 'fixed',
  zIndex: 9999,
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(33,50,84,0.18)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const marketingPhoneModalStyle = {
  width: 320,
  height: 600,
  background: '#f7fafd',
  borderRadius: 36,
  boxShadow: '0 8px 48px rgba(33,50,84,0.18)',
  border: '3px solid #61dafb',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden'
};

export const marketingPhoneModalNotchStyle = {
  width: 80,
  height: 12,
  background: '#e0e0e0',
  borderRadius: 8,
  margin: '18px auto 0 auto'
};

export const marketingPhoneModalCloseBtnStyle = {
  position: 'absolute',
  top: 18,
  right: 18,
  background: 'none',
  border: 'none',
  fontSize: 28,
  color: '#213254',
  cursor: 'pointer',
  fontWeight: 700,
  opacity: 0.7
};

export const marketingPhoneModalContentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '36px 24px 24px 24px'
};

export const marketingPhoneModalHeaderStyle = {
  fontWeight: 800,
  fontSize: 22,
  color: '#61dafb',
  marginBottom: 18,
  textAlign: 'center'
};

export const marketingPhoneModalOfferStyle = {
  color: '#213254',
  fontSize: 16,
  marginBottom: 24,
  textAlign: 'center'
};

export const marketingPhoneModalDemoBoxStyle = {
  background: '#fff',
  borderRadius: 18,
  boxShadow: '0 2px 12px rgba(33,50,84,0.08)',
  padding: 18,
  marginTop: 10,
  width: '100%',
  maxWidth: 240,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

export const marketingPhoneModalDemoTitleStyle = (color) => ({
  fontWeight: 700,
  fontSize: 16,
  marginBottom: 8,
  color
});

export const marketingPhoneModalDemoDescStyle = (color) => ({
  color,
  fontSize: 14,
  marginBottom: 10,
  textAlign: 'center'
});

export const marketingPhoneModalDemoBtnStyle = (bg, color) => ({
  ...saveBtnStyle,
  background: bg,
  color,
  fontWeight: 700,
  fontSize: 15,
  borderRadius: 8,
  marginTop: 6
});

export const marketingPhoneModalDemoBadgeStyle = {
  background: '#f7fafd',
  border: '1.5px solid #61dafb',
  borderRadius: 8,
  padding: '8px 12px',
  fontWeight: 600,
  color: '#213254',
  fontSize: 14
};

export const marketingPhoneModalDemoInfoStyle = {
  marginTop: 18,
  textAlign: 'center',
  color: '#888',
  fontSize: 14
};

export const loginTitleStyle = {
  marginBottom: 24,
  fontWeight: 700,
  letterSpacing: 1
};

export const loginFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16
};

export const paymentsTableContainerStyle = {
  overflowX: 'auto'
};

export const paymentsTableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  background: '#fff',
  fontSize: 15
};

export const paymentsTableRowStyle = (i) => ({
  background: i % 2 === 0 ? '#fff' : '#f8fafd'
});

export const paymentsTableNoDataStyle = {
  color: '#888',
  padding: 24
};

export const paymentsTabBtnStyle = (active) => ({
  ...saveBtnStyle,
  background: active ? '#61dafb' : '#f0f4f8',
  color: active ? '#213254' : '#888',
  minWidth: 120,
  fontSize: 15
});

export const paymentsConnectBoxStyle = {
  marginBottom: 18
};

export const paymentsConnectTitleStyle = {
  fontWeight: 600,
  color: '#213254',
  paddingRight: 12,
  paddingBottom: 18
};

export const paymentsConnectBtnGroupStyle = {
  display: 'flex',
  gap: 8,
  marginBottom: 18
};

export const paymentsSearchInputStyle = {
  display: 'flex',
  gap: 16,
  marginBottom: 18,
  alignItems: 'center'
};

export const paymentsCSVBtnStyle = {
  ...saveBtnStyle,
  fontSize: 15
};
export const supplierRemindersCardColStyle = {
  flex: 1,
  minWidth: 260,
  maxWidth: 340,
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  marginTop: 24
};

export const supplierRemindersCardStyle = (color) => ({
  background: '#f7fafd',
  border: `2px solid ${color}`,
  borderRadius: 14,
  padding: '22px 18px',
  marginBottom: 0,
  boxShadow: '0 2px 12px rgba(33,50,84,0.06)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 14
});

export const supplierRemindersCardTitleStyle = (color) => ({
  fontWeight: 700,
  fontSize: 17,
  color,
  marginBottom: 6
});

export const supplierRemindersCardDescStyle = {
  color: '#213254',
  fontSize: 15
};

export const supplierRemindersCardBtnStyle = (color) => ({
  marginTop: 12,
  background: color,
  color: '#213254',
  fontWeight: 600,
  border: 'none',
  borderRadius: 8,
  padding: '10px 0',
  cursor: 'pointer',
  fontSize: 15,
  width: '100%'
});

export const supplierRemindersCardStatusDoneStyle = {
  minWidth: 54,
  minHeight: 54,
  borderRadius: '50%',
  background: '#d6f5e6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: 22,
  color: '#1ca21c',
  border: '2px solid #1ca21c'
};

export const supplierRemindersCardStatusNotDoneStyle = {
  minWidth: 54,
  minHeight: 54,
  borderRadius: '50%',
  background: '#ffe6e6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: 22,
  color: '#e74c3c',
  border: '2px solid #e74c3c'
};

export const ordersOnboardBannerStyle = (isMobile) => ({
  background: '#f7fafd',
  border: '1.5px solid #61dafb',
  borderRadius: 10,
  padding: '18px 24px',
  marginBottom: 28,
  display: 'flex',
  alignItems: isMobile ? 'flex-start' : 'center',
  justifyContent: 'space-between',
  gap: 18,
  flexDirection: isMobile ? 'column' : 'row'
});

export const ordersOnboardBannerTitleStyle = {
  fontWeight: 700,
  color: '#213254',
  fontSize: 18,
  marginBottom: 2
};

export const ordersOnboardBannerSubtitleStyle = {
  color: '#3e68bd',
  fontWeight: 600,
  fontSize: 15
};

export const ordersOnboardBannerBtnStyle = (isMobile) => ({
  minWidth: 160,
  fontSize: 16,
  padding: '10px 22px',
  marginTop: isMobile ? 18 : 0
});

export const ordersMobileCustomerCardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: 10,
  marginBottom: 18,
  padding: 16,
  background: '#f7fafd'
};

export const ordersMobileCustomerNameStyle = {
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 6
};

export const ordersMobileCustomerDaysStyle = {
  fontSize: 12,
  color: '#888',
  marginBottom: 10
};

export const ordersMobileDayRowStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8
};

export const ordersMobileDayCellStyle = (bg) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: bg,
  borderRadius: 6,
  padding: '10px 14px',
  marginBottom: 2,
  boxShadow: '0 1px 4px rgba(33,50,84,0.04)',
  cursor: 'pointer'
});

export const ordersMobileDayLabelStyle = {
  color: '#3e68bd',
  fontWeight: 600
};

export const ordersMobileDayOrderStyle = (color) => ({
  fontWeight: 600,
  color
});

export const ordersMobileDayEmptyStyle = {
  height: 36,
  background: '#f7fafd',
  borderRadius: 6,
  marginBottom: 2
};

export const ordersNoCustomersStyle = {
  color: '#888',
  padding: 24,
  textAlign: 'center'
};

export const ordersNoCustomersSubtitleStyle = {
  color: '#3e68bd',
  fontWeight: 600
};
