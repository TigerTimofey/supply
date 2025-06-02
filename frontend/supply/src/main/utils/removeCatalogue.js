export async function removeCatalogue(userId, setFileName, setRows) {
  if (!userId) return;
  await fetch(`http://localhost:8080/users/${userId}/catalogue`, {
    method: 'PUT'
  });
  setFileName('');
  setRows([
    {
      code: '',
      name: '',
      description: '',
      size: '',
      order_unit: '',
      price: '',
      price_per_measure: '',
      price_measure_unit: '',
      optional_hide_from_market: ''
    }
  ]);
}
