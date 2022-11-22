/* eslint-disable max-len */
import {
  sample,
  createEvent,
  createStore,
  Store,
  Event,
  Effect,
} from 'effector';

import {
  getFullSum,
  getInitialPayment,
  getMonthlyPayment,
  limitNumberWithinRange,
} from '../lib';

export interface InputLogicModel {
  $valueValue: Store<number>;
  changeInputValue: Event<number>;
  changeInputValueSlider: Event<number>;
  onInputBlur: Event<number>;
}

const inputLogic = (defaultValue: number, min: number, max: number) => {
  const $inputValue = createStore<number>(defaultValue);

  const changeInputValue = createEvent<number>();

  const changeInputValueSlider = createEvent<number>();

  const onInputBlur = createEvent<number>();

  sample({
    clock: [changeInputValue, changeInputValueSlider],
    target: $inputValue,
  });

  sample({
    clock: onInputBlur,
    source: $inputValue,
    fn: (value) => limitNumberWithinRange(value, min, max),
    target: $inputValue,
  });

  return {
    $inputValue,
    changeInputValue,
    changeInputValueSlider,
    onInputBlur,
  };
};

export const autoInput = inputLogic(1000000, 1000000, 6000000);

export const percentInput = inputLogic(10, 10, 40);

export const termsInput = inputLogic(1, 1, 60);

export const $firstPayment = createStore<number>(getInitialPayment(10, 1000000));

export const $monthlyPayment = createStore<number>(getMonthlyPayment(getInitialPayment(10, 1000000), 1000000, 1));

export const $fullSum = createStore<number>((getInitialPayment(10, 1000000) + getMonthlyPayment(getInitialPayment(10, 1000000), 1000000, 1) * 1));

sample({
  clock: [percentInput.$inputValue, autoInput.$inputValue],
  source: [percentInput.$inputValue, autoInput.$inputValue],
  fn: (data) => getInitialPayment(limitNumberWithinRange(data[0], 10, 40), limitNumberWithinRange(data[1], 1000000, 6000000)),
  target: $firstPayment,
});

sample({
  clock: [$firstPayment, autoInput.$inputValue, percentInput.$inputValue],
  source: [$firstPayment, autoInput.$inputValue, percentInput.$inputValue],
  fn: (data) => getMonthlyPayment(data[0], limitNumberWithinRange(data[1], 1000000, 6000000), limitNumberWithinRange(data[2], 1, 60)),
  target: $monthlyPayment,
});

sample({
  clock: [percentInput.$inputValue, autoInput.$inputValue, termsInput.$inputValue],
  source: [percentInput.$inputValue, autoInput.$inputValue, termsInput.$inputValue],
  fn: (data) => getFullSum(limitNumberWithinRange(data[0], 10, 40), limitNumberWithinRange(data[1], 1000000, 6000000), limitNumberWithinRange(data[2], 1, 60)),
  target: $fullSum,
});
