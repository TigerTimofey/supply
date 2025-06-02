export async function saveCatalogue(csvString, fileName, userId) {
  if (!userId) return;
  await fetch(`http://localhost:8080/users/${userId}/catalogue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ csv: csvString, csvName: fileName })
  });
}
