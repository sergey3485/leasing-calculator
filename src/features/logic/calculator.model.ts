/* eslint-disable max-len */
import {
  sample,
  createEvent,
  createStore,
} from 'effector';

import {
  getFullSum,
  getInitialPayment,
  getMonthlyPayment,
} from '../lib';

export const $autoCost = createStore<string>('1000000');

export const $leasingTerms = createStore<string>('1');

export const $paymentPercent = createStore<string>('10');

export const $firstPayment = createStore<string>(getInitialPayment(10, 1000000).toString());

export const $monthlyPayment = createStore<string>(getMonthlyPayment(getInitialPayment(10, 1000000), 1000000, 1).toLocaleString('ru'));

export const $fullSum = createStore<string>((getInitialPayment(10, 1000000) + getMonthlyPayment(getInitialPayment(10, 1000000), 1000000, 1) * 1).toLocaleString('ru'));

export const changeAutoCost = createEvent<string>();

export const changeSliderAutoCostValue = createEvent<string>();

export const changeLeasingTerms = createEvent<string>();

export const changeLeasingTermsSliderValue = createEvent<string>();

export const changeFirstPaymentPercent = createEvent<string>();

export const changeFirstPaymentPercentSliderValue = createEvent<string>();

sample({
  clock: [changeAutoCost, changeSliderAutoCostValue],
  fn: (autoCost) => autoCost.replace(/\s/g, ''),
  target: $autoCost,
});

sample({
  clock: [changeLeasingTerms, changeLeasingTermsSliderValue],
  target: $leasingTerms,
});

sample({
  clock: [changeFirstPaymentPercent, changeFirstPaymentPercentSliderValue],
  target: $paymentPercent,
});

sample({
  clock: [$paymentPercent, $autoCost],
  source: [$paymentPercent, $autoCost],
  fn: (data) => getInitialPayment(Number(data[0]), Number(data[1])).toLocaleString('ru'),
  target: $firstPayment,
});

sample({
  clock: [$firstPayment, $autoCost, $leasingTerms],
  source: [$firstPayment, $autoCost, $leasingTerms],
  fn: (data) => getMonthlyPayment(Number(data[0].replace(/\s/g, '')), Number(data[1]), Number(data[2])).toLocaleString('ru'),
  target: $monthlyPayment,
});

sample({
  clock: [$paymentPercent, $autoCost, $leasingTerms],
  source: [$paymentPercent, $autoCost, $leasingTerms],
  fn: (data) => getFullSum(Number(data[0]), Number(data[1]), Number(data[2])).toLocaleString('ru'),
  target: $fullSum,
});
