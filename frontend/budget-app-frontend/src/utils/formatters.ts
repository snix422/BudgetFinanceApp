export const formatMoney = (amount: number = 0, withGrosze: boolean = false): string => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: withGrosze ? 2 : 0,
    minimumFractionDigits: withGrosze ? 2 : 0,
  }).format(amount);
};
