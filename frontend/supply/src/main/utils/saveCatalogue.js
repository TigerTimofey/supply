export async function saveCatalogue(csvString, fileName, userId) {
  if (!userId) return;
  await fetch(`https://supply-navy.vercel.app/users/${userId}/catalogue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ csv: csvString, csvName: fileName })
  });
}
