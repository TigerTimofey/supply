export async function removeCatalogue(userId, setFileName, setRows) {
  if (!userId) return;
  await fetch(`https://supply-navy.vercel.app/users/${userId}/catalogue`, {
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
