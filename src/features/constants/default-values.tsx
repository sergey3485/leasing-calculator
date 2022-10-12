import { getInitialPayment, getMonthlyPayment } from '../lib';

export { getInitialPayment, getMonthlyPayment } from '../lib';

export interface LeasingData {
  car_cost: number;
  initial_payment_percent: number;
  initial_payment: number;
  lease_term: number;
  total_sum: number;
  monthly_payment_from: number;
}

export const defaultData: LeasingData = {
  car_cost: 1000000,
  initial_payment_percent: 10,
  initial_payment: getInitialPayment(10, 1000000),
  lease_term: 1,
  // eslint-disable-next-line max-len
  total_sum: getInitialPayment(10, 1000000) + getMonthlyPayment(getInitialPayment(10, 1000000), 1000000, 1) * 1,
  monthly_payment_from: getMonthlyPayment(getInitialPayment(10, 1000000), 1000000, 1),
};
