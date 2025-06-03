export async function clearHistory(userId, setHistory, setHistoryModalOpen) {
  if (!userId) return;
  await fetch(`https://supply-sooty.vercel.app/users/${userId}/catalogue/history`, {
    method: 'DELETE'
  });
  setHistory([]);
  setHistoryModalOpen(false);
}
