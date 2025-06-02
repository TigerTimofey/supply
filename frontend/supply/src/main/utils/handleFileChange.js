export async function handleFileChange(e, setFileName, setRows, saveCatalogue, userId) {
  const file = e.target.files[0];
  if (!file) return;
  setFileName(file.name);
  const text = await file.text();
  const lines = text.trim().split('\n');
  if (!lines.length) return;
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
  await saveCatalogue(text, file.name, userId);
}
