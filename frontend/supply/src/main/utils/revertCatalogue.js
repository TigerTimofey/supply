export async function revertCatalogue(historyEntry, userId, setFileName, setRows, setHistory, setHistoryModalOpen) {
  if (!userId || !historyEntry.csv) return;
  await fetch(`https://supply-navy.vercel.app/users/${userId}/catalogue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ csv: historyEntry.csv, csvName: historyEntry.fileName })
  });
  setFileName(historyEntry.fileName);
  const lines = historyEntry.csv.trim().split('\n');
  if (lines.length) {
    const headers = lines[0].split(';').map(h => h.trim());
    const newRows = lines.slice(1).map(line => {
      const cells = line.split(';').map(cell => cell.trim());
      const row = {};
      headers.forEach((h, i) => {
        row[h] = cells[i] || '';
      });
      return row;
    });
    setRows(newRows);
  }
  fetch(`https://supply-navy.vercel.app/users/${userId}/catalogue/history`)
    .then(res => res.json())
    .then(data => setHistory(Array.isArray(data) ? data : []));
  setHistoryModalOpen(false);
}
