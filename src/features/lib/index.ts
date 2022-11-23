/* eslint-disable max-len */
export const getInitialPayment = (firstPaymentPercent: number, carCost: number): number => Math.trunc((firstPaymentPercent * carCost) / 100);

export const getMonthlyPayment = (initialPayment: number, carCoast: number, months: number): number => {
  const payment = (carCoast - initialPayment) * ((0.035 * ((1 + 0.035) ** months)) / (((1 + 0.035) ** months) - 1));

  return Math.trunc(payment);
};

export const getFullSum = (firstPaymentPercent: number, carCost: number, months: number): number => {
  const initialPayment = getInitialPayment(firstPaymentPercent, carCost);

  const mothPayment = getMonthlyPayment(initialPayment, carCost, months);

  const fullSum = initialPayment + mothPayment * months;

  return fullSum;
};

export const limitNumberWithinRange = (num: number, min = -Infinity, max = Infinity) => Math.min(Math.max(num, min), max);

export const isNumeric = (str: string) => {
  if (typeof str !== 'string') return false;

  const newStr = str.replace(/\s/g, '');

  return !Number.isNaN(+newStr) && !Number.isNaN(parseFloat(newStr));
};
