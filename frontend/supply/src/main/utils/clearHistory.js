export async function clearHistory(userId, setHistory, setHistoryModalOpen) {
  if (!userId) return;
  await fetch(`http://localhost:8080/users/${userId}/catalogue/history`, {
    method: 'DELETE'
  });
  setHistory([]);
  setHistoryModalOpen(false);
}
